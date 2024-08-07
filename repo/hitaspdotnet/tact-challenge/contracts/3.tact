import "@stdlib/deploy";

message(0x7362d09c) TokenNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    from: Address;
    forwardPayload: Slice as remaining;
}

message(0xf8a7ea5) TokenTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    responseDestination: Address?;
    customPayload: Cell?;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}

inline fun simpleSend(jetton: Address, amount: Int, to: Address) {
    send(SendParameters {
              to: jetton,
              value: 0,
              bounce:false,
              mode: SendRemainingValue,
              body: TokenTransfer { 
                queryId: 0,
                amount: amount,
                destination: to,
                responseDestination: myAddress(),
                customPayload: null,
                forwardTonAmount: ton("0.01"),
                forwardPayload: emptySlice()
              }.toCell()
            });
}


contract Task3 with Deployable {
  owner: Address;
  aAmount: Int;
  bAmount: Int;
  jettonAddressA: Address;
  jettonAddressB: Address;
  decimal: Int;

  init(admin: Address, newJettonAddressA: Address, newJettonAddressB: Address) {
    self.owner = admin;
    self.jettonAddressA = newJettonAddressA;
    self.jettonAddressB = newJettonAddressB;
    self.aAmount = 0;
    self.bAmount = 0;
    self.decimal = 1000000000;
  }

  receive(msg: TokenNotification) {
    let sender: Address = sender();
    require(sender == self.jettonAddressA || sender == self.jettonAddressB, "Unsupported jetton sent!");
    
    if(msg.from != self.owner) {
      if(sender == self.jettonAddressA) {
        if(msg.amount > self.aAmount){
          simpleSend(sender, msg.amount, msg.from);
        } else {
          let swapAmount:Int = (self.bAmount * self.decimal / self.aAmount) * msg.amount / self.decimal;
          simpleSend(self.jettonAddressB, swapAmount, msg.from);
          
          self.aAmount = self.aAmount + msg.amount;
          self.bAmount = self.bAmount - swapAmount;
        }
      } else {
        if(msg.amount > self.bAmount){
          simpleSend(self.jettonAddressB, msg.amount, msg.from);
        } else {
          let swapAmount:Int = (self.aAmount * self.decimal / self.bAmount) * msg.amount / self.decimal;
          simpleSend(self.jettonAddressA, swapAmount, msg.from);
          
          self.bAmount = self.bAmount + msg.amount;
          self.aAmount = self.aAmount - swapAmount;
        }
      }
    } else {
      if(sender == self.jettonAddressA) {
        self.aAmount = self.aAmount + msg.amount;
      } else {
        self.bAmount = self.bAmount + msg.amount;
      }
    }
  }

  get fun price(jetton: Address): Int { 
    if(jetton == self.jettonAddressA) {
      return self.bAmount * self.decimal / self.aAmount;
    }

    if(jetton == self.jettonAddressB) {
      return self.aAmount * self.decimal / self.bAmount;
    }
    return 0;
  }
  
  get fun balance(jetton: Address): Int { 
    if(jetton == self.jettonAddressA) {
      return self.aAmount;
    }
    
    if(jetton == self.jettonAddressB) {
      return self.bAmount;
    }
    return 0;
  }
}