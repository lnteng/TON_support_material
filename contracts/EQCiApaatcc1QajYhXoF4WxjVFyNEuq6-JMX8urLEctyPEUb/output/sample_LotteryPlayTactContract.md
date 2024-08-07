# TACT Compilation Report
Contract: LotteryPlayTactContract
BOC Size: 2345 bytes

# Types
Total Types: 14

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

## JoinInfo
TLB: `join_info#bf813085 seqno:uint128 = JoinInfo`
Signature: `JoinInfo{seqno:uint128}`

## JoinChildInfo
TLB: `join_child_info#e4c5a145 seqno:uint128 address:address = JoinChildInfo`
Signature: `JoinChildInfo{seqno:uint128,address:address}`

## DrawInfo
TLB: `draw_info#cf49203f seqno:uint128 = DrawInfo`
Signature: `DrawInfo{seqno:uint128}`

## DrawChildInfo
TLB: `draw_child_info#a5fba866 seqno:uint128 address:address = DrawChildInfo`
Signature: `DrawChildInfo{seqno:uint128,address:address}`

## TakeInfo
TLB: `take_info#a6a17f47 receiver:address = TakeInfo`
Signature: `TakeInfo{receiver:address}`

## PlayerInfo
TLB: `_ address:address amount:uint128 = PlayerInfo`
Signature: `PlayerInfo{address:address,amount:uint128}`

# Get Methods
Total Get Methods: 7

## balance

## father

## playerList

## playerQuantity

## finished

## winner

## tonQuantity

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
15101: seqno can not empty
29294: address can not empty
49469: Access denied
60523: the value must be greater than 0.1