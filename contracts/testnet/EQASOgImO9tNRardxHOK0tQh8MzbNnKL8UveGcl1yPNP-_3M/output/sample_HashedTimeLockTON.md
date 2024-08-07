# TACT Compilation Report
Contract: HashedTimeLockTON
BOC Size: 1235 bytes

# Types
Total Types: 13

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

## HTLC
TLB: `_ hashlock:int257 secret:int257 amount:int257 timelock:int257 sender:address _receiver:address redeemed:bool refunded:bool = HTLC`
Signature: `HTLC{hashlock:int257,secret:int257,amount:int257,timelock:int257,sender:address,_receiver:address,redeemed:bool,refunded:bool}`

## TonTransferInitiated
TLB: `_ __hashlock:int257 __amount:int257 __chainId:int257 __timelock:int257 __sender:address __receiver:address __targetCurrencyReceiverAddress:^string = TonTransferInitiated`
Signature: `TonTransferInitiated{__hashlock:int257,__amount:int257,__chainId:int257,__timelock:int257,__sender:address,__receiver:address,__targetCurrencyReceiverAddress:^string}`

## Create
TLB: `create#ad7c3067 data:TonTransferInitiated{__hashlock:int257,__amount:int257,__chainId:int257,__timelock:int257,__sender:address,__receiver:address,__targetCurrencyReceiverAddress:^string} = Create`
Signature: `Create{data:TonTransferInitiated{__hashlock:int257,__amount:int257,__chainId:int257,__timelock:int257,__sender:address,__receiver:address,__targetCurrencyReceiverAddress:^string}}`

## TonTransferClaimed
TLB: `_ __hashlock:int257 __receiver:address __amount:int257 = TonTransferClaimed`
Signature: `TonTransferClaimed{__hashlock:int257,__receiver:address,__amount:int257}`

## Redeem
TLB: `redeem#05c464f4 data:TonTransferClaimed{__hashlock:int257,__receiver:address,__amount:int257} = Redeem`
Signature: `Redeem{data:TonTransferClaimed{__hashlock:int257,__receiver:address,__amount:int257}}`

## TonTransferRefunded
TLB: `_ __hashlock:int257 __receiver:address __amount:int257 = TonTransferRefunded`
Signature: `TonTransferRefunded{__hashlock:int257,__receiver:address,__amount:int257}`

## Refund
TLB: `refund#3d5a4d37 data:TonTransferRefunded{__hashlock:int257,__receiver:address,__amount:int257} = Refund`
Signature: `Refund{data:TonTransferRefunded{__hashlock:int257,__receiver:address,__amount:int257}}`

# Get Methods
Total Get Methods: 1

## getHTLCDetails
Argument: hashlock

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
4670: Funds Not Sent
11493: Contract Already Exists
13236: Contract does not exist
21683: Not Future Timelock
38239: Not Passed Timelock
46887: Already Redeemed
49162: Already Refunded
50918: Hashlock Not Match