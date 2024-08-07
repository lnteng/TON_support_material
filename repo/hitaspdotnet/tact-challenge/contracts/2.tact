import "@stdlib/deploy";

message(0x44) Refund {
  queryId: Int as uint64;
  sender: Address;
}

contract Task2 with Deployable {
  admin: Address;

  init(admin: Address) {
    self.admin = admin;
  }
  
  receive(msg: Refund) {
    require(context().sender == self.admin, "Invalid sender");
    send(SendParameters {
      to: msg.sender,
      value: 0,
      bounce: false,
      mode: SendRemainingBalance + SendIgnoreErrors
    });
  }

  receive(msg: Slice) {
    send(SendParameters{
      to: self.admin,
      value: 0, 
      mode: SendRemainingBalance + SendIgnoreErrors,
      body: beginCell().storeAddress(context().sender).storeRef(msg.asCell()).endCell()
    });
  }
}
