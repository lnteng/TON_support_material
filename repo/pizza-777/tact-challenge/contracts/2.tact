import "@stdlib/deploy";

message(0x44) Refund {
    queryId: Int as uint64;
    sender: Address;
}

contract Task2 with Deployable {
    admin: Address;
    init(admin: Address){
        self.admin = admin;
    }

    receive(msg: Refund){
        require(sender() == self.admin, "only admin");
        nativeReserve(0, 2);
        send(SendParameters{to: msg.sender, //+
                value: 0, //+
                mode: SendRemainingBalance,
                bounce: true
            }
        );
    }

    receive(msg: Slice){
        require(sender() != self.admin, "not admin");
        nativeReserve(0, 2);
        let body: Cell = beginCell().storeAddress(sender()).storeRef(beginCell().storeSlice(msg).endCell()).endCell(); //store original msg in the first ref in the outcoming body
        send(SendParameters{to: self.admin,
                value: 0, //+
                mode: SendRemainingBalance,
                bounce: true, //+
                body: body //+
            }
        );
    }
}