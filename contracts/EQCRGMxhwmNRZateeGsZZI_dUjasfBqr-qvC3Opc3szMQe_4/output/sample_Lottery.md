# TACT Compilation Report
Contract: Lottery
BOC Size: 2282 bytes

# Types
Total Types: 17

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

## TokenNotification
TLB: `token_notification#7362d09c query_id:uint64 amount:coins from:address forward_payload:remainder<slice> = TokenNotification`
Signature: `TokenNotification{query_id:uint64,amount:coins,from:address,forward_payload:remainder<slice>}`

## TokenExcesses
TLB: `token_excesses#d53276db queryId:uint64 = TokenExcesses`
Signature: `TokenExcesses{queryId:uint64}`

## TokenTransfer
TLB: `token_transfer#0f8a7ea5 queryId:uint64 amount:coins destination:address response_destination:address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = TokenTransfer`
Signature: `TokenTransfer{queryId:uint64,amount:coins,destination:address,response_destination:address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## Feed
TLB: `feed#b5362230 query_id:uint64 = Feed`
Signature: `Feed{query_id:uint64}`

## ChangeFee
TLB: `change_fee#71865ca1 feePercent:uint8 = ChangeFee`
Signature: `ChangeFee{feePercent:uint8}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## Swap
TLB: `swap#ea06185d query_id:uint64 amount:coins swap_step:SwapStep{pool_addr:address,params:SwapStepParams{kind:bool,limit:coins,next:Maybe ^cell}} swap_params:^cell = Swap`
Signature: `Swap{query_id:uint64,amount:coins,swap_step:SwapStep{pool_addr:address,params:SwapStepParams{kind:bool,limit:coins,next:Maybe ^cell}},swap_params:^cell}`

## SwapStep
TLB: `_ pool_addr:address params:SwapStepParams{kind:bool,limit:coins,next:Maybe ^cell} = SwapStep`
Signature: `SwapStep{pool_addr:address,params:SwapStepParams{kind:bool,limit:coins,next:Maybe ^cell}}`

## SwapStepParams
TLB: `_ kind:bool limit:coins next:Maybe ^cell = SwapStepParams`
Signature: `SwapStepParams{kind:bool,limit:coins,next:Maybe ^cell}`

## SwapParams
TLB: `_ deadline:uint32 recipient_addr:Maybe address referral_addr:Maybe address fulfill_payload:Maybe ^cell reject_payload:Maybe ^cell = SwapParams`
Signature: `SwapParams{deadline:uint32,recipient_addr:Maybe address,referral_addr:Maybe address,fulfill_payload:Maybe ^cell,reject_payload:Maybe ^cell}`

## FeedEvent
TLB: `feed_event#0068f632 feeder:address feed_amount:coins win_amount:coins = FeedEvent`
Signature: `FeedEvent{feeder:address,feed_amount:coins,win_amount:coins}`

# Get Methods
Total Get Methods: 3

## id

## getTotalAmount

## getFee

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
24312: Only owner is allowed to change fee
36877: Only owner is allowed to change owner
38064: Wrong jetton source