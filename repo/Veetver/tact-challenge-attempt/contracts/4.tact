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
    customPayload: Cell? = null; 
    forwardAmount: Int as uint16 = 0; 
    forwardPayload: Slice as remaining; 
}

message NftWithdrawal {
  queryId: Int as uint64;
  nftAddress: Address;
}

contract Task4 with Deployable {
  seed: Int as uint128;
  prevOwner: Address? = null;
  nftAddress: Address? = null;
  time: Int as uint32 = 0;
  
  init(seed: Int) {
    self.seed = seed;
  }

  receive(msg: OwnershipAssigned) {
    if (self.nftAddress == null) {
      self.nftAddress = sender();
      self.prevOwner = msg.prevOwner;
      self.time = now() + msg.forwardPayload.loadUint(32);
    } else {
      send(SendParameters{
        to: sender(),
        value: 0,
        mode: SendRemainingValue,
        body: Transfer {
          queryId: msg.queryId, 
          newOwner: msg.prevOwner,
          responseDestination: msg.prevOwner,
          forwardPayload: emptySlice()
        }.toCell()
      });
    }
  }

  receive(msg: NftWithdrawal) {
    require(sender() == self.prevOwner, "Invalid sender");
    if (self.time > now()) {
      self.reply("NFT is still locked".asComment());
    } else {
      self.nftAddress = null;
      self.prevOwner = null;
      send(SendParameters{
        to: msg.nftAddress,
        value: 0,
        mode: SendRemainingBalance,
        body: Transfer {
          queryId: msg.queryId,
          newOwner: sender(),
          responseDestination: sender(),
          forwardPayload: emptySlice()
        }.toCell()
      });
    }
  }

  get fun time(): Int {
    return self.time - now();
  }

  get fun nft(): Address? {
    return self.nftAddress;
  }

  get fun owner(): Address? {
    return self.prevOwner;
  }
}