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
  nft: Address? = null;
  lockUntil: Int as uint32 = 0;
  
  init(seed: Int) {
    self.seed = seed; // needed to deploy multiple smart contracts copies from one admin address
  }

  receive(msg: OwnershipAssigned) {
    if(self.nft != null){
      send(SendParameters{
        to: sender(),
        value: 0,
        mode: SendRemainingValue,
        body: beginCell()
            .storeUint(0x5fcc3d14, 32)
            .storeUint(msg.queryId, 64)
            .storeAddress(msg.prevOwner)
            .storeAddress(msg.prevOwner)
            .storeUint(0, 1)
            .storeCoins(0)
          .endCell()
      });
      return;
    }
    self.nft = sender();
    self.owner = msg.prevOwner;
    self.lockUntil = now() + msg.forwardPayload.loadUint(32);
  }

  receive(msg: NftWithdrawal) {
    require(self.owner == sender(), "Invalid sender");
    
    if(self.lockUntil > now()){
      send(SendParameters{
        to: sender(),
        value: 0,
        mode: SendRemainingValue,
        body: "NFT is still locked".asComment()
      });
    } else {

      send(SendParameters{
        to: self.nft!!,
        value: 0,
        mode: SendRemainingBalance,
        body: beginCell()
            .storeUint(0x5fcc3d14, 32)
            .storeUint(msg.queryId, 64)
            .storeAddress(self.owner!!)
            .storeAddress(self.owner!!)
            .storeUint(0, 1)
            .storeCoins(0)
          .endCell()
      });

      self.owner = null;
      self.nft = null;
      self.lockUntil = 0;
    } 
  }

  get fun time(): Int {
    if(self.lockUntil > 0) {
      return self.lockUntil - now();
    }
    return 0;
  }

  get fun nft(): Address? {
    return self.nft;
  }

  get fun owner(): Address? {
    return self.owner;
  }
}