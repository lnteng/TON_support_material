import "@stdlib/deploy";

/*
  TASK 5 - NFT random swap 
  The smart contract contains a bunch of different NFTs.
  A user brings his NFT (sends it to the smart contract), with 2.1 TON (2 for admin's profit, 0.1 for gas) in attachment (as fee for swap).
  The smart contract randomly chooses some NFT from the available NFTs (including the newly incoming one) and gives it to the user in exchange for the brought NFT (but occasionally just returns user's NFT in some cases).
  Admin can deposit NFTs without swap logic. Any NFT received from the admin is considered deposited. Admin can't swap.
  Admin can withdraw all NFTs at once, and also all TONs collected from users as fees.
  Implement getter that will return NFT addresses held by the smart contract.
  Implement getter that will return the amount of admin`s profit collected.

  In details, the smart contract (later: SC) should have this logic:
  Messages
  * AdminWithdrawalProfit 
   - SC should check that sender is the admin / otherwise throw "Insufficient privelegies"
   - SC should send all collected fees to admin except 0.1 TON (use AdminFetchProfit message as body)
     In other words: after each such operation, the contract's balance should be equal to 0.1 TON (which are reserved for storage) and the rest should be sent to the admin
  * AdminWithdrawalAllNFTs
   - SC should check that incoming tx TON value is enough for NFT withdrawal. Specifically, at least: (1 + totalNftsHeld * 0.08) TONs. Otherwise throw "Insufficent funds"
   - SC should check that sender is the admin, throw "Invalid sender" otherwise
   - If all checks pass, SC should send NFTs one by one to the admin 
   - SC should be able to withdraw all NFTs by a single message from admin
  * OwnershipAssigned 
   - if prevOwner is the owner's (admin) address, then add NFT to the collection
   - if value of TON attached is less then 2.1 TON then stop execution and return NFT back,
     but only in case that TON attached is enough to process refund without losing TONs on the SC's balance
   - randomly select NFT to send from all the NFTs that smart contract has
   - send the selected NFT to the sender with all remaining balance (except for admin profit = fees collected from this and other swaps)
     In other words: the contract's balance should increase by exactly 2 TON, some incoming TONs will be consumed for gas and the remainings of the incoming TONs should be refunded to the sender
  
  Getters
  * profit
   - returns how much collected fees is available to withdraw for the admin (all fees minus 0.1 TON)
  * nfts
   - returns dict of held NFTs with NFT indexes (sequential numbers from 0, 1, 2 ... and up to 'totalNftsHeld-1') as keys and NFT address as values 
     the order of NFTs in this dictionary doesn't matter
*/

/*
  TASK 5 - NFT 랜덤 스왑
  스마트 컨트랙트는 다양한 NFT를 보유하고 있습니다.
  스마트 컨트랙트가 보유한 NFT 주소를 반환하는 getter를 구현해야 합니다.
  수집된 관리자 수익을 반환하는 getter를 구현해야 합니다.

  상세하게, 스마트 계약(SC)은 다음과 같은 로직을 가져야 합니다:
  메시지:
  * OwnershipAssigned
  - prevOwner가 소유자(admin)주소인 경우 NFT를 컬렉션에 추가합니다. 관리자는 스왑이 불가능하며 스왑 로직 없이 NFT를 입금할 수 있다.
  - 사용자는 자신의 NFT를 스마트 계약으로 보냅니다. 이때 2.1 TON(관리자의 이익을 위한 2 TON 및 가스 비용을 위한 0.1 TON)이 첨부됩니다(스왑 수수료로 사용됩니다).
  - 첨부된 TON의 가치가 2.1 TON 미만이면 실행을 중지하고 NFT를 반환해야 합니다. 단, 스마트 컨트랙트의 잔액을 손실 없이 환불 처리할 수 있는 경우에만 이루어져야 합니다.
  - 사용자에게 받은 NFT를 포함하여 스마트 컨트랙트가 가지고 있는 모든 NFT에서 보낼 NFT를 무작위로 선택합니다.
  - 선택된 NFT를 발신자에게 모든 잔액(관리자 이익인 수수료를 제외)과 함께 보내야 합니다. 다시 말해, 계약의 잔액은 정확히 2 TON 늘어나고 일부 수신 TON은 가스로 사용되며 남은 수신 TON은 발신자에게 환불되어야 합니다.

  * AdminWithdrawalProfit
  - SC는 보낸 사람이 관리자인지 확인해야 합니다. 그렇지 않으면 "Insufficient privelegies"이라는 오류를 발생시킵니다.
  - SC는 수집된 수수료를 0.1 TON(스토리지를 위해 예약된 금액)을 제외한 나머지를 관리자에게 보내야 합니다. AdminFetchProfit
  -> 다시 말해, 이 작업 후에 컨트랙트의 잔액은 0.1 TON(스토리지)이어야 하고 나머지는 관리자에게 보내져야 합니다.

  * AdminWithdrawalAllNFTs
  - SC는 수신 트랜잭션의 TON 값이 NFT 인출을 위해 충분한지 확인해야 합니다. 구체적으로, 최소한 (1 + 보유 NFT 총 수 * 0.08) TON이어야 합니다. 그렇지 않으면 "Insufficent funds"이라는 오류를 발생시켜야 합니다.
  - SC는 보낸 사람이 관리자인지 확인해야 합니다. 그렇지 않으면 "Invalid sender"이라는 오류를 발생시켜야 합니다.
  - 모든 확인이 통과하면 SC는 NFT를 하나씩 관리자에게 보내야 합니다.
  - SC는 관리자의 메시지 하나로 모든 NFT를 인출할 수 있어야 합니다.

  게터:
  * profit
  - 관리자가 인출 가능한 수수료 얼마인지 반환합니다(0.1 TON을 제외한 모든 수수료).

  * nfts
  - NFT 인덱스(0, 1, 2 ~ 'totalNftsHeld-1' 까지의 순차 번호)로 된 딕셔너리 형태로 보유한 NFT의 주소를 반환합니다 index -> address map.
  이 딕셔너리의 순서는 중요하지 않습니다.
*/

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
    customPayload: Cell?; 
    forwardAmount: Int as coins; 
    forwardPayload: Slice as remaining; 
}

contract Task5 with Deployable {
  seed: Int as uint128;
  owner: Address;
  nextNftIndex: Int as uint16 = 0;
  nftsMap: map<Int as uint16, Address>;
  
  init(seed: Int, owner: Address) {
    self.seed = seed; // needed to deploy multiple smart contracts copies from one admin address
    self.owner = owner;
  }

  receive(msg: OwnershipAssigned) { // owner contract -> Transfer Message -> nft item contract -> OwnershipAssigned Message -> Task5 contract -> Trasfer Message -> nft item contract
    let ctx: Context = context();
    if (msg.prevOwner == self.owner) {  // if owner?
      self.nftsMap.set(self.nextNftIndex, ctx.sender);
      self.nextNftIndex = self.nextNftIndex + 1;
    } else {  // if user?
      if (ctx.value < ton("2.1")) { // if fail?
        send(SendParameters{
          to: ctx.sender,
          value: 0,
          mode: SendRemainingValue + SendIgnoreErrors,
          bounce: true,
          body: Transfer {
            queryId: msg.queryId,
            newOwner: msg.prevOwner,
            responseDestination: msg.prevOwner,
            customPayload: null,
            forwardAmount: 0,
            forwardPayload: emptySlice()
          }.toCell()
        });
      } else {  // if success?
        self.nftsMap.set(self.nextNftIndex, ctx.sender);

        nativeReserve(ton("2.0"), 0);

        let randomNumber: Int = random(0, self.nextNftIndex);
        let randomNftAddress: Address? = self.nftsMap.get(randomNumber);

        send(SendParameters{
          to: randomNftAddress!!,
          value: 0,
          mode: SendRemainingBalance + SendIgnoreErrors,
          bounce: true,
          body: Transfer {
            queryId: msg.queryId,
            newOwner: msg.prevOwner,
            responseDestination: msg.prevOwner,
            customPayload: null,
            forwardAmount: 0, 
            forwardPayload: emptySlice()
          }.toCell()
        });

        self.nftsMap.set(randomNumber, self.nftsMap.get(self.nextNftIndex));
        self.nftsMap.set(self.nextNftIndex, null);
      }
    }
  }

  receive(msg: AdminWithdrawalProfit) { // owner contract -> AdminWithdrawalProfit Message -> Task5 contract -> AdminFetchProfit Message -> owner contract
    require(sender() == self.owner, "Insufficient privelegies");
    require(myBalance() >= ton("0.1"), "Not enough TONs for withdrawal.");

    nativeReserve(ton("0.1"), 2);

    send(SendParameters{
      to: self.owner,
      value: 0,
      mode: SendRemainingBalance + SendIgnoreErrors,
      bounce: true,
      body: AdminFetchProfit{ queryId: msg.queryId }.toCell()
    });
  }

  receive(msg: AdminWithdrawalAllNFTs) { // owner contract -> AdminWithdrawalAllNFTs Message -> Task5 contract -> Transfer Message -> each nft item contract
    let ctx: Context = context();
    let minimalCoins: Int = (1 + self.nextNftIndex * 8 / 100) * pow(10, 9);
    require(myBalance() >= minimalCoins, "Insufficent funds");
    require(ctx.sender == self.owner, "Invalid sender");

    let i: Int = 0;
    let getNftAddress: Address? = null;
    repeat (self.nextNftIndex) {
      getNftAddress = self.nftsMap.get(i);
      send(SendParameters{
        to: getNftAddress!!,
        value: ton("0.05"),
        mode: SendIgnoreErrors,
        bounce: true,
        body: Transfer {
          queryId: msg.queryId,
          newOwner: self.owner,
          responseDestination: self.owner,
          customPayload: null,
          forwardAmount: 0, 
          forwardPayload: emptySlice()
        }.toCell()
      });
      i = i + 1;
    }

    self.nextNftIndex = 0;
    self.nftsMap = emptyMap();
  }

  get fun profit(): Int { 
    let remainingProfit: Int = myBalance() - ton("0.1");
    if (remainingProfit <= 0) {
      return 0;
    } else {
      return remainingProfit;
    }
  }
  
  get fun nfts(): map<Int as uint16, Address> { 
    return self.nftsMap;
  }
}
