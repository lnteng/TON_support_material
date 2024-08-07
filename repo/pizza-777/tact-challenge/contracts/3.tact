import "@stdlib/deploy";

/*
  TASK 3 - DEX
  Create a simple jetton dex contract that trades one pair of jettons: A and B.
  The price of jettons depends on the amount of jettons that smart contract has.
  Therefore, the smart contract needs to keep track of how much jettons it has.
  
  Price for the jetton A in swap B->A should be calculated by formula "amountOfJettonAOnContract * decimal / amountOfJettonBOnContract".
  Token prices must be decimalized for accuracy, so it is the prices that must be adjusted to decimal 1e9.
  Decimals are only needed for price accuracy. It should be set as 1e9.
  So, if smart contract has 10 of jetton A and 2 of jetton B, then after sending 1 jetton B you should receive 5 of jettons A.

  Example formula for amountOfAJettonToSend in B->A swap will be
  (amountOfJettonAOnContract * decimal / amountOfJettonBOnContract) * amountOfTokenBToSwap / decimal

  If smart contract pool doesn't have enough jettons to trade,
  then it should send incoming jettons back to the user. For a clearer explanation,
  let's look at the example we described above (smart contract has 10 of jetton A and 2 of jetton B).
  If user will send 3 jettons B, smart contract should reject the message (because contract does not have 3 * 5 = 15 jettons A)
  and send 3 jettons B back to the user.

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
    queryId: Int as uint64; // should be 0
    amount: Int as coins; // should be amount of jettons to send
    destination: Address; // should be user address / TokenNotification.from
    responseDestination: Address?; // should be myAddress()
    customPayload: Cell?; // should be null
    forwardTonAmount: Int as coins; // should be ton("0.01")
    forwardPayload: Slice as remaining; // should be emptySlice()
}
message(0xd53276db) TokenExcesses {
    queryId: Int as uint64;
}

contract Task3 with Deployable {
    owner: Address;
    aAmount: Int as coins;
    bAmount: Int as coins;
    jettonAddressA: Address;
    jettonAddressB: Address;
    decimal: Int;
    jetton: Address?;
    init(admin: Address, newJettonAddressA: Address, newJettonAddressB: Address){
        self.owner = admin;
        self.jettonAddressA = newJettonAddressA; //dex jetton wallet A
        self.jettonAddressB = newJettonAddressB; //dex jetton wallet B
        self.aAmount = 0;
        self.bAmount = 0;
        self.decimal = 1000000000;
    }

    receive(msg: TokenNotification){
        //  nativeReserve(0, 2);

        let ctx: Context = context();
        // if (msg.from == myAddress()) {
        //     return ;
        // }
        //check the new price aftr money comes
        require(ctx.sender == self.jettonAddressA || ctx.sender == self.jettonAddressB, "0");
        //require(msg.amount > 0, "Jetton amount is 0");
        if (ctx.sender == self.jettonAddressA) {
            if (msg.from == self.owner) {
                self.aAmount = self.aAmount + msg.amount;
                return ;
            }
            //return if has no A jettons or  for exchange
            if (self.aAmount == 0 || self.bAmount == 0) {
                self.sendJettons(msg, ctx.sender, msg.amount);
                return ;
            }

            //dump("jettonA received");

            let amount: Int = self.bAmount * 1000000000 / self.aAmount * msg.amount / 1000000000;
            if (amount > self.bAmount) {
                self.sendJettons(msg, ctx.sender, msg.amount);
                //self.aAmount = self.aAmount - msg.amount;
                return ;
            }
             if(amount == 0) {
                return;
            }
            self.sendJettons(msg, self.jettonAddressB, amount); //change to B
            self.bAmount = self.bAmount - amount;
            self.aAmount = self.aAmount + msg.amount;
        } else {
            if (msg.from == self.owner) {
                self.bAmount = self.bAmount + msg.amount;
                return ;
            }
            //return if has no A jettons or  for exchange
            if (self.bAmount == 0 || self.aAmount == 0) {
                self.sendJettons(msg, ctx.sender, msg.amount);
                return ;
            }
            //dump("jettonB received");
            // self.bAmount = self.bAmount + msg.amount;
            let amount: Int = self.aAmount * 1000000000 / self.bAmount * msg.amount / 1000000000;
            if (amount > self.aAmount) {
                self.sendJettons(msg, ctx.sender, msg.amount);
                //  self.bAmount = self.bAmount - msg.amount;
                return ;
            }
            if(amount == 0) {
                return;
            }
            self.sendJettons(msg, self.jettonAddressA, amount);
            self.aAmount = self.aAmount - amount;
            self.bAmount = self.bAmount + msg.amount;
        }
        return ;
    }

     fun sendJettons(msg: TokenNotification, to: Address, amount: Int) {
        //check return
        //dump("send swap");
        //dump(amount);
        send(SendParameters{to: to,
                value: ton("0.1"), //send 0.2
                body: TokenTransfer{queryId: 0,
                    amount: amount,
                    destination: msg.from,
                    responseDestination: myAddress(),
                    customPayload: null,
                    forwardTonAmount: ton("0.01"), //remove when return
                    forwardPayload: emptySlice()
                }.toCell()
            }
        );
    }

    get fun price(jetton: Address): Int {
        // require(self.aAmount > 0 && self.bAmount > 0, "Wrong amount");
        // require(jetton == self.jettonAddressA || jetton == self.jettonAddressB, "Wrong addr");
        if (jetton == self.jettonAddressA) {
            return self.bAmount * 1000000000 / self.aAmount;
        }
        return self.aAmount * 1000000000 / self.bAmount;
    }

    get fun balance(jetton: Address): Int {
        //  require(jetton == self.jettonAddressA || jetton == self.jettonAddressB, "Wrong addr");
        if (jetton == self.jettonAddressA) {
            return self.aAmount;
        }
        return self.bAmount;
    }
    // receive(msg: TokenExcesses){//check it

    // }

    // receive(){//check replenish

    // }
}