import "@stdlib/deploy";

message AdminWithdrawalProfit {
  queryId: Int as uint64;
}

message AdminWithdrawalAllNFTs {
  queryId: Int as uint64;
}

message WithdrawalAllNFTsInternal {
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
  nfts: map<Int as uint16, Address>;
  next_item: Int as uint16 = 0;
  
  init(seed: Int, owner: Address) {
    self.owner = owner;
    self.seed = seed; // needed to deploy multiple smart contracts copies from one admin address
  }

  receive(msg: OwnershipAssigned) {
    if(msg.prevOwner == self.owner) {
      self.nfts.set(self.next_item, sender());
      self.next_item = self.next_item + 1;
      return;
    } else {
      let luck: Int = nativeRandomInterval(self.next_item);
      if(context().value >= ton("2.1") && luck < self.next_item) {
        send(SendParameters{
          to: self.nfts.get(luck)!!,
          value: context().value - ton("2"),
          mode: SendIgnoreErrors,
          body: beginCell()
            .storeUint(0x5fcc3d14, 32)
            .storeUint(msg.queryId, 64)
            .storeAddress(msg.prevOwner)
            .storeAddress(msg.prevOwner)
            .storeUint(0, 1)
            .storeCoins(0)
          .endCell()
        });

        self.nfts.set(luck, sender());
      } else {
        send(SendParameters{
          to: sender(),
          value: 0,
          bounce: false,
          mode: SendRemainingValue ,
          body: beginCell()
            .storeUint(0x5fcc3d14, 32)
            .storeUint(msg.queryId, 64)
            .storeAddress(msg.prevOwner)
            .storeAddress(msg.prevOwner)
            .storeUint(0, 1)
            .storeCoins(0)
          .endCell()
        });
      }
    } 
  }

  receive(msg: AdminWithdrawalProfit) {
    require(sender() == self.owner, "Insufficient privelegies");

    send(SendParameters{
          to: sender(),
          value: myBalance() - ton("0.1"),
          mode: SendRemainingValue,
          body: AdminFetchProfit {
            queryId: msg.queryId
          }.toCell()});
  }

  receive(msg: AdminWithdrawalAllNFTs) {
    require(context().value > (ton("1") + self.next_item * ton("0.08")), "Insufficent funds");
    require(sender() == self.owner, "Invalid sender");

    if(self.next_item <= 200) {
      repeat(self.next_item) {
        send(SendParameters{
          to: self.nfts.get(self.next_item - 1)!!,
          value: ton("0.08"),
          mode: 0,
          body: beginCell()
            .storeUint(0x5fcc3d14, 32)
            .storeUint(msg.queryId, 64)
            .storeAddress(self.owner)
            .storeAddress(self.owner)
            .storeUint(0, 1)
            .storeCoins(0)
          .endCell()
        });
        self.next_item = self.next_item - 1;
      }
      self.nfts = emptyMap();
    } else {
      repeat(200) {
        send(SendParameters{
          to: self.nfts.get(self.next_item - 1)!!,
          value: ton("0.08"),
          mode: 0,
          body: beginCell()
            .storeUint(0x5fcc3d14, 32)
            .storeUint(msg.queryId, 64)
            .storeAddress(self.owner)
            .storeAddress(self.owner)
            .storeUint(0, 1)
            .storeCoins(0)
          .endCell()
        });
        self.next_item = self.next_item - 1;
      }
      send(SendParameters{
        to: myAddress(),
        value: 0,
        mode: SendRemainingBalance,
        body: WithdrawalAllNFTsInternal {
          queryId: msg.queryId
        }.toCell()
      });
    }  
  }

  receive(msg: WithdrawalAllNFTsInternal) {
    require(sender() == myAddress(), "Invalid sender");

    if(self.next_item <= 200) {
      repeat(self.next_item) {
        send(SendParameters{
          to: self.nfts.get(self.next_item - 1)!!,
          value: ton("0.08"),
          mode: 0,
          body: beginCell()
            .storeUint(0x5fcc3d14, 32)
            .storeUint(msg.queryId, 64)
            .storeAddress(self.owner)
            .storeAddress(self.owner)
            .storeUint(0, 1)
            .storeCoins(0)
          .endCell()
        });
        self.next_item = self.next_item - 1;
      }
      self.nfts = emptyMap();
    } else {
      repeat(200) {
        send(SendParameters{
          to: self.nfts.get(self.next_item - 1)!!,
          value: ton("0.08"),
          mode: 0,
          body: beginCell()
            .storeUint(0x5fcc3d14, 32)
            .storeUint(msg.queryId, 64)
            .storeAddress(self.owner)
            .storeAddress(self.owner)
            .storeUint(0, 1)
            .storeCoins(0)
          .endCell()
        });
        self.next_item = self.next_item - 1;
      }
      send(SendParameters{
        to: myAddress(),
        value: 0,
        mode: SendRemainingBalance,
        body: WithdrawalAllNFTsInternal {
          queryId: msg.queryId
        }.toCell()
      });
    }
  }

  get fun profit(): Int {
    if(myBalance() > ton("0.1")) {
      return myBalance() - ton("0.1");
    }
    return 0;
  }
  
  get fun nfts(): map<Int as uint16, Address> { 
    if(self.next_item == 0) {
      return emptyMap();
    }
    return self.nfts;
  }
}