import "@stdlib/deploy";

/*
  TASK 3 - DEX
  Create a simple jetton dex contract that trades one pair of jettons: A and B.
  The price of jettons depends on the amount of jettons that smart contract has.
  Therefore, the smart contract needs to keep track of how much jettons it has.
  
  Price for the jetton A in swap B->A should be calculated by formula "amountOfJettonAOnContract * decimal / amountOfJettonBOnContract".
  Decimals are only needed for price accuracy. It should be set as 1e9.
  So, if smart contract has 10 of jetton A and 2 of jetton B, then after sending 1 jetton B you should receive 5 of jettons A.

  If smart contract pool doesn't have enough jettons to trade
  (for example someone sends 99999 jettons of B, but dex pool only has 10 of jettons A),
  then sent incoming jettons (B, in our example) back to the sender.

  If smart contract receives a different jetton (neither A nor B) then throw an error.

  Implement a getter that returns the number of jettons in the pool and
  one more to get the price of jetton A or jetton B.
  Getters' behavior with incorrect parameter (address other than that of jetton A or B)
  is undefined (there are no such tests).
  
  Note:
  Admin can add jettons A and B just by sending them to the smart contract (we need to add initial supply to the pool for it to be functional).
  To be exact: any jettons (A or B) received from the admin are "added". Admin can't swap.
*/

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

contract Task3 with Deployable {
  owner: Address;
  a: Int = 0;
  b: Int = 0;
  jA: Address;
  jB: Address;

  const decimal: Int = 1000000000;

  init(admin: Address, newJA: Address, newJB: Address) {
    self.owner = admin;
    self.jA = newJA; // wallet address
    self.jB = newJB; // wallet address
  }

  receive(msg: TokenNotification) {
    let jettonAddress: Address = sender();
    require(jettonAddress == self.jA || jettonAddress == self.jB, "not an paired jetton");
    if(msg.from == self.owner) {
      if(jettonAddress == self.jA) { self.a = self.a + msg.amount; }
      else { self.b = self.b + msg.amount; }
    } else {
      let jet1: Int = self.a; // get B send A
      let jet2: Int = self.b;
      // let dest: Address = self.jA;
      if(jettonAddress == self.jA) { //  get B send A 
        jet1 = self.b;
        jet2 = self.a;
      }
      let to_recv: Int = (jet1 * self.decimal / jet2) * msg.amount / self.decimal;
      if(jet1 < to_recv || to_recv == 0) {
          to_recv = msg.amount;
        } else if(jettonAddress == self.jA) {
            self.a = self.a + msg.amount;
            self.b = self.b - to_recv;
            jettonAddress = self.jB;
          } else {
            self.b = self.b + msg.amount;
            self.a = self.a - to_recv;
            jettonAddress = self.jA;
          }
          send(SendParameters{
            to: jettonAddress,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            bounce: true, 
            body: TokenTransfer {
                queryId: 0,
                amount: to_recv,
                destination: msg.from,
                responseDestination: myAddress(),
                customPayload: null,
                forwardTonAmount: ton("0.01"),
                forwardPayload: emptySlice()
            }.toCell()
          });
    }
  } 

  get fun price(token: Address): Int { 
    if(token == self.jB) {
      return self.a * self.decimal / self.b; 
    } 
      return self.b * self.decimal / self.a; //
  }
  
  get fun balance(token: Address): Int { 
    if(token == self.jA) {
      return self.a;
    }
      return self.b;
  }
}