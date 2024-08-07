import "@stdlib/deploy";

/*
  TASK 4 - NFT locker
  Implement a smart contract that will lock NFT for a period of time specified by the owner.
  Smart conrtact should contain logic to process following messages and getters: 

  Messages: 
  * OwnershipAssigned
   - Recives nft + time (in a forwardPayload message as uint32) for which this nft will be locked + address of the sender of the nft (prevOwner).
   - If the smart contract already holds an nft then return the incoming nft back to the sender
  * NftWithdrawal
   - Request withdrawal of the locked nft
   - If sender is not the owner (that came from OwnershipAssigned as prevOwner address) then throw "Invalid sender" 
   - If time has not passed then send message back to the sender with the comment "NFT is still locked" according to the TON's "message with text comment" standard 
   - Otherwise (all good) send the locked nft back to the owner with all the remaining TON balance
   Note that the order of checks is important
   (in case: "sender is not the owner" and "time has not passed" at the same time, "Invalid sender" error takes priority)

  Getters:
  * time
   - get how much lock time is left
  * nft
   - get the address of the locked nft 
  * owner
   - get the owner of the locked nft (that came from OwnershipAssigned as prevOwner)
*/

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

  lockedNFT: Address?;
  NFTowner: Address?;
  lockedUntil: Int as uint32 = 0;
  
  init(seed: Int) {
    self.seed = seed; // needed to deploy multiple smart contracts copies from one admin address
  }

  receive(msg: OwnershipAssigned) {
    if (self.lockedNFT == null) { // Has NFT locked?
        // Locking NFT...
        self.lockedNFT = sender();
        self.NFTowner = msg.prevOwner;
        self.lockedUntil = now() + msg.forwardPayload.loadUint(32);
    } else { // Return NFT back to user
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            body: Transfer{
                queryId: msg.queryId,
                newOwner: msg.prevOwner,
                responseDestination: msg.prevOwner,
                customPayload: null,
                forwardAmount: 0,
                forwardPayload: emptySlice()
            }.toCell()
        });
    }
  }

    receive(msg: NftWithdrawal) {
        require(sender() == self.NFTowner, "Invalid sender");
        if (self.lockedUntil > now()) { // Is NFT still locked?
            self.reply("NFT is still locked".asComment());
        } else {
            self.NFTowner = null;
            self.lockedNFT = null;
            send(SendParameters{
                to: msg.nftAddress,
                value: 0,
                mode: SendRemainingBalance,
                body: Transfer{
                    queryId: msg.queryId,
                    newOwner: sender(),
                    responseDestination: sender(),
                    customPayload: null,
                    forwardAmount: 0,
                    forwardPayload: emptySlice()
                }.toCell()
            });
        }
    }

    get fun time(): Int {
        return max(0, self.lockedUntil - now());
    }

    get fun nft(): Address? {
        return self.lockedNFT;
    }

    get fun owner(): Address? {
        return self.NFTowner;
    }
}