import "@stdlib/deploy";

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

message NftWithdrawal {
  queryId: Int as uint64;
  nftAddress: Address;
}

contract Task4 with Deployable {
  seed: Int as uint128;
  owner: Address? = null;
  unlockTime: Int as uint32 = 0;
  nft: Address? = null;
  
  init(seed: Int) {
    self.seed = seed; 
  }

  receive(msg: OwnershipAssigned) {
    let sender: Address = sender();
    if(self.nft != null) {
        send(SendParameters{
            to: sender,
            bounce: false,
            value: 0,
            body: Transfer{
              queryId: msg.queryId,           
              newOwner: msg.prevOwner, 
              responseDestination: msg.prevOwner, 
              customPayload: null, 
              forwardAmount: 0,
              forwardPayload: emptySlice()
            }.toCell(),
            mode: SendRemainingValue + SendIgnoreErrors
        });
    } else {
      self.owner = msg.prevOwner;
      self.nft = sender;
      self.unlockTime = now() + msg.forwardPayload.loadUint(32);
    }
  }

  receive(msg: NftWithdrawal) {
    let sender: Address = sender();
    require(sender == self.owner, "Invalid sender");
    require(msg.nftAddress == self.nft, "Invalid NFT");
    if(self.time() > 0) {
     self.reply("NFT is still locked".asComment());
    } else {
        self.nft = null;
        self.owner = null;
        send(SendParameters{
            to: msg.nftAddress,
            bounce: true,
            mode: SendRemainingBalance + SendIgnoreErrors,
            value: 0,
            body: Transfer{
              queryId: msg.queryId,           
              newOwner: sender, 
              responseDestination: sender,
              customPayload: null, 
              forwardAmount: 0,
              forwardPayload: emptySlice()
            }.toCell()
        });
    }
  }

  get fun time(): Int {
    return self.unlockTime - now(); // 
  }

  get fun nft(): Address? {
    return self.nft;
  }

  get fun owner(): Address? {
    return self.owner;
  }
}