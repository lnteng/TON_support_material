import "@stdlib/deploy";

/*
  TASK 5 - NFT random swap 
  The smart contract contains a bunch of different NFTs.
  A user brings his NFT (sends it to the smart contract), with 2.1 TON (2 for admin's profit, 0.1 for gas) in attachment (as fee for swap).
  The smart contract randomly chooses some NFT from the available NFTs (including the newly incoming one) and gives it to the user in exchange for the brought NFT (but occasionally just returns user's NFT in some cases).
  Admin can deposit NFTs without swap logic. Any NFT received from the admin is considered deposited. Admin can't swap.
  Admin can withdraw all NFTs at once, and also all TONs collected from users as fees.
  Implement getter that will return NFT addresses held by the smart contract.
  Implement getter that will return the amount of admin`s profit collected.

  In details, the smart contract (later: SC) should have this logic:
  Messages
  * AdminWithdrawalProfit 
   - SC should check that sender is the admin / otherwise throw "Insufficient privelegies"
   - SC should send all collected fees to admin except 0.1 TON (use AdminFetchProfit message as body)
     In other words: after each such operation, the contract's balance should be equal to 0.1 TON (which are reserved for storage) and the rest should be sent to the admin
  * AdminWithdrawalAllNFTs
   - SC should check that incoming tx TON value is enough for NFT withdrawal. Specifically, at least: (1 + totalNftsHeld * 0.08) TONs. Otherwise throw "Insufficent funds"
   - SC should check that sender is the admin, throw "Invalid sender" otherwise
   - If all checks pass, SC should send NFTs one by one to the admin 
   - SC should be able to withdraw all NFTs by a single message from admin
  * OwnershipAssigned 
   - if prevOwner is the owner's (admin) address, then add NFT to the collection
   - if value of TON attached is less then 2.1 TON then stop execution and return NFT back,
     but only in case that TON attached is enough to process refund without losing TONs on the SC's balance
   - randomly select NFT to send from all the NFTs that smart contract has
   - send the selected NFT to the sender with all remaining balance (except for admin profit = fees collected from this and other swaps)
     In other words: the contract's balance should increase by exactly 2 TON, some incoming TONs will be consumed for gas and the remainings of the incoming TONs should be refunded to the sender
  
  Getters
  * profit
   - returns how much collected fees is available to withdraw for the admin (all fees minus 0.1 TON)
  * nfts
   - returns dict of held NFTs with NFT indexes (sequential numbers from 0, 1, 2 ... and up to 'totalNftsHeld-1') as keys and NFT address as values 
     the order of NFTs in this dictionary doesn't matter
*/

message AdminWithdrawalProfit {
  queryId: Int as uint64;
}

message AdminWithdrawalAllNFTs {
  queryId: Int as uint64;
}

message AdminFetchProfit {
  queryId: Int as uint64;
}

message(0x05138d91) OwnershipAssigned {
    queryId: Int as uint64;
    prevOwner: Address;
    forwardPayload: Slice as remaining; 
}

message(0x5fcc3d14) Transfer { 
    queryId: Int as uint64;            
    newOwner: Address; 
    responseDestination: Address; 
    customPayload: Cell?; 
    forwardAmount: Int as coins; 
    forwardPayload: Slice as remaining; 
}

contract Task5 with Deployable {
  seed: Int as uint128;
  owner: Address;

//custom
  totalNftsHeld: Int;
  nftCollection: map<Int as uint16, Address>;
  nftCollectionCopy: map<Int as uint16, Address>;
  adminProfit: Int as coins;
  
  init(seed: Int, owner: Address) {
    self.owner = owner;
    self.seed = seed; // needed to deploy multiple smart contracts copies from one admin address
    self.nftCollection = emptyMap();
    self.nftCollectionCopy = emptyMap();
    self.adminProfit = 0;
    self.totalNftsHeld = 0;
  }
 
  receive(msg: OwnershipAssigned) {     
    //if prevOwner is the owner's (admin) address, then add NFT to the collection
    let ctx: Context = context();
    if(msg.prevOwner == self.owner){
      self.nftCollection.set(self.totalNftsHeld, ctx.sender);
      self.totalNftsHeld = self.totalNftsHeld + 1;
      return;
    }
    //  if value of TON attached is less then 2.1 TON then stop execution and return NFT back,
    //  but only in case that TON attached is enough to process refund without losing TONs on the SC's balance 
    if(ctx.value < ton("2.1")){  
     require(ctx.value > ton("0.1"), "Insufissient gas");   
      send(SendParameters{
        to: ctx.sender,
        value: 0, 
        mode: SendRemainingValue,        
        body: Transfer{
          queryId: msg.queryId,            
          newOwner: msg.prevOwner, 
          responseDestination: msg.prevOwner,     
          forwardAmount: 0, 
          customPayload: null,
          forwardPayload: emptySlice() 
        }.toCell()});
      return;
    }    
      
    //- randomly select NFT to send from all the NFTs that smart contract has       
    self.nftCollectionCopy = self.nftCollection;
    self.nftCollection.set(self.totalNftsHeld, ctx.sender);
    

    let key: Int = random(0, self.totalNftsHeld);
    let randNft: Address? = self.nftCollection.get(key);    
    self.nftCollectionCopy.set(key, ctx.sender);
    self.nftCollection = self.nftCollectionCopy;
    self.nftCollectionCopy = emptyMap();
    send(SendParameters{
        to: randNft!!, //change to random
        value: 0,
        bounce: true,
        mode: SendRemainingValue,        
        body: Transfer{
          queryId: msg.queryId,            
          newOwner: msg.prevOwner, 
          responseDestination: msg.prevOwner,     
          forwardAmount: 0, 
          customPayload: null,
          forwardPayload: emptySlice() 
        }.toCell()});  
        
        self.adminProfit = self.adminProfit + ton("2");
        
  }

  receive(msg: AdminWithdrawalProfit) {
    //check the sender is admin
    nativeReserve(ton("0.1"), 2);
    require(sender() == self.owner, "Insufficient privelegies");
   
    send(SendParameters{
      to: self.owner,
      value: 0,
      mode: SendRemainingBalance,
      body: AdminFetchProfit {
        queryId: msg.queryId
      }.toCell()
    });
  }

  receive(msg: AdminWithdrawalAllNFTs) {
    require(context().value >= (ton("1") + self.totalNftsHeld * ton("0.08")), "Insufficient funds");//todo if doesn't work throw error (not require)
    require(sender() == self.owner, "Invalid sender");
    // If all checks pass, SC should send NFTs one by one to the admin 
    // SC should be able to withdraw all NFTs by a single message from admin
    if(self.totalNftsHeld > 200){
      self.totalNftsHeld = 200;
    }
    let i: Int = self.totalNftsHeld;
    let owner: Address = self.owner;
    while(i > 0){
     send(SendParameters{
        to: self.nftCollection.get(i-1)!!,
        value: ton("0.06"),
        mode: 0,
        bounce: false,
        body: Transfer{
          queryId: i,            
          newOwner: owner, 
          responseDestination: owner,     
          forwardAmount: 0, 
          customPayload: null,
          forwardPayload: emptySlice() 
        }.toCell()});
        i = i - 1;        
    }
        // if(self.totalNftsHeld == 0){
        //   return;
        // }
        // send(SendParameters{
        // to: myAddress(),
        // value: 0,
        // mode: SendRemainingBalance,
        // bounce: false,
        // body: AdminWithdrawalAllNFTs{
        //   queryId: msg.queryId                      
        // }.toCell()});
    }  
 
//returns how much collected fees is available to withdraw for the admin (all fees minus 0.1 TON)
  get fun profit(): Int { 
    if(self.adminProfit < ton("0.1")){
      return 0;
    }
    return self.adminProfit - ton("0.1");
  }
  //- returns dict of held NFTs with NFT indexes (sequential numbers from 0, 1, 2 ... and up to 'totalNftsHeld-1')
  // as keys and NFT address as values 
  get fun nfts(): map<Int as uint16, Address> { 
    return self.nftCollection;
  }
}