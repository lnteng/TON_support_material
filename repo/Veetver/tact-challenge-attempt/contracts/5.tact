import "@stdlib/deploy";


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
    customPayload: Cell? = null; 
    forwardAmount: Int as uint128 = 0; 
    forwardPayload: Slice as remaining; 
}

contract Task5 with Deployable {
  seed: Int as uint128;
  owner: Address;
  nfts: map<Int as uint16, Address>;
  nftCount: Int as uint16 = 0;
  
  init(seed: Int, owner: Address) {
    self.owner = owner;
    self.seed = seed;
  }

  receive(msg: OwnershipAssigned) {
    if (msg.prevOwner == self.owner) {
      self.nfts.set(self.nftCount, sender());
      self.nftCount = self.nftCount + 1;
    } else {

      if (context().value >= 2100000000) {
        nativeReserve(2000000000, 0);
        let nftId: Int = random(0, self.nftCount);
        let returnNft: Address = sender();

        if (self.nftCount > nftId) {
          returnNft = self.nfts.get(nftId)!!;
          self.nfts.set(nftId, sender());
        }
        
        send(SendParameters{
          to: returnNft,
          value: 0,
          mode: SendRemainingValue,
          body: Transfer {
            queryId: msg.queryId,
            newOwner: msg.prevOwner,
            responseDestination: msg.prevOwner,
            forwardPayload: emptySlice()
          }.toCell()
        });
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
  }

  receive(msg: AdminWithdrawalProfit) {
    require(sender() == self.owner, "Insufficient privileges");
    send(SendParameters{
      to: sender(),
      value: myBalance() - 100000000,
      mode: SendRemainingValue,
      body: AdminFetchProfit{
        queryId: msg.queryId
      }.toCell()
    });
  }

  receive(msg: AdminWithdrawalAllNFTs) {
    if (sender() == self.owner) {
      require(context().value >= (1000000000 + self.nftCount * 80000000), "Insufficent funds");
    } 
    require((sender() == self.owner) || (sender() == myAddress()), "Invalid sender");

      repeat(min(165, self.nftCount)) {
        send(SendParameters{
          to: self.nfts.get(self.nftCount - 1)!!,
          value: 60000000,
          body: Transfer {
            queryId: msg.queryId,
            newOwner: self.owner,
            responseDestination: self.owner,
            forwardPayload: emptySlice()
            }.toCell()
        });
        self.nftCount = self.nftCount - 1;
    }

    if (self.nftCount > 0) {
      send(SendParameters{
        to: myAddress(),
        value: 1000000000 + self.nftCount * 60000000,
        body: AdminWithdrawalAllNFTs {
          queryId: msg.queryId
        }.toCell()
      });
    } else {
      self.nfts = emptyMap();
    }
  }

  get fun profit(): Int { 
    return max(0, myBalance() - 100000000);
  }
  
  get fun nfts(): map<Int as uint16, Address> {
    return self.nfts;
  }
}