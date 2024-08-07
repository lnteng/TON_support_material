# TACT Compilation Report
Contract: WitnessConsensus
BOC Size: 4563 bytes

# Types
Total Types: 22

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## NewParticipantEvent
TLB: `new_participant_event#37925619 address:address votes:int257 unfreezeTime:int257 = NewParticipantEvent`
Signature: `NewParticipantEvent{address:address,votes:int257,unfreezeTime:int257}`

## ParticipantQuitEvent
TLB: `participant_quit_event#3a11f26e address:address votes:int257 unfreezeTime:int257 = ParticipantQuitEvent`
Signature: `ParticipantQuitEvent{address:address,votes:int257,unfreezeTime:int257}`

## OpenRound
TLB: `open_round#2c7b2804 round:int257 = OpenRound`
Signature: `OpenRound{round:int257}`

## Vote
TLB: `vote#c6d5d522 round:int257 payload:^string = Vote`
Signature: `Vote{round:int257,payload:^string}`

## FinalizeRound
TLB: `finalize_round#89436476 round:int257 = FinalizeRound`
Signature: `FinalizeRound{round:int257}`

## PayloadVotes
TLB: `_ payload:^string votes:int257 guarded:bool = PayloadVotes`
Signature: `PayloadVotes{payload:^string,votes:int257,guarded:bool}`

## RoundParticipantInfo
TLB: `_ address:address votes:int257 payloadHash:int257 guard:bool = RoundParticipantInfo`
Signature: `RoundParticipantInfo{address:address,votes:int257,payloadHash:int257,guard:bool}`

## InternalRoundOpened
TLB: `internal_round_opened#887e5ca3 round:int257 = InternalRoundOpened`
Signature: `InternalRoundOpened{round:int257}`

## InternalVote
TLB: `internal_vote#77bab779 round:int257 payload:^string participant:address guard:bool votes:coins = InternalVote`
Signature: `InternalVote{round:int257,payload:^string,participant:address,guard:bool,votes:coins}`

## InternalFinalize
TLB: `internal_finalize#f5d995b6 minVotes:int257 = InternalFinalize`
Signature: `InternalFinalize{minVotes:int257}`

## InternalFinalized
TLB: `internal_finalized#a6f19e23 round:int257 winnerPayload:Maybe ^string winnerVotes:Maybe int257 winnerGuarded:bool goodParticipants:dict<int, address> goodParticipantsCount:int257 goodParticipantsVotes:dict<address, int> badParticipants:dict<int, address> badParticipantsCount:int257 badParticipantsVotes:dict<address, int> = InternalFinalized`
Signature: `InternalFinalized{round:int257,winnerPayload:Maybe ^string,winnerVotes:Maybe int257,winnerGuarded:bool,goodParticipants:dict<int, address>,goodParticipantsCount:int257,goodParticipantsVotes:dict<address, int>,badParticipants:dict<int, address>,badParticipantsCount:int257,badParticipantsVotes:dict<address, int>}`

## PromoteToGuard
TLB: `promote_to_guard#473919df address:address = PromoteToGuard`
Signature: `PromoteToGuard{address:address}`

## RevokeGuard
TLB: `revoke_guard#93c4ed56 address:address = RevokeGuard`
Signature: `RevokeGuard{address:address}`

## SetRoundReward
TLB: `set_round_reward#510433f4 amount:coins = SetRoundReward`
Signature: `SetRoundReward{amount:coins}`

# Get Methods
Total Get Methods: 8

## openedRound

## isParticipant
Argument: participant

## participantStake
Argument: participant

## pendingReward
Argument: participant

## checkGuardAddress
Argument: address

## votingRoundAddress
Argument: round

## owner

## stopped

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
2768: only opened rounds can be finalized
5655: only passed rounds can be finalized
5681: not a guard
17999: guard must vote for candidate
18736: wrong round
20445: parent only
23980: already voted
25476: unfreeze not passed yet
29552: invalid round
34495: invalid payload hash by counter
36401: unfreeze not found
37813: min votes not exceeded
38183: invalid payload votes by hash
39981: too much
40368: Contract stopped
42431: min stake
46604: round was finalized
47963: bad sender
48360: not a participant
48930: min votes required
53296: Contract not stopped
53872: unfreeze passed
56100: already opened
57037: no rewards
57851: already finalized