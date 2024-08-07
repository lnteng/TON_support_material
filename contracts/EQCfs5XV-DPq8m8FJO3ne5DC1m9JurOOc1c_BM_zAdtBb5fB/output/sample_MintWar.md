# TACT Compilation Report
Contract: MintWar
BOC Size: 1674 bytes

# Types
Total Types: 6

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## MintEvent
TLB: `mint_event#55292ab3 sender:address value:uint256 rate:uint256 points:uint256 = MintEvent`
Signature: `MintEvent{sender:address,value:uint256,rate:uint256,points:uint256}`

## MintJetton
TLB: `mint_jetton#2a5bdc04 rate:uint256 = MintJetton`
Signature: `MintJetton{rate:uint256}`

## AccountState
TLB: `_ points:uint256 fees:uint256 totalPoints:uint256 totalFees:uint256 = AccountState`
Signature: `AccountState{points:uint256,fees:uint256,totalPoints:uint256,totalFees:uint256}`

# Get Methods
Total Get Methods: 5

## get_points_by_address
Argument: address

## get_shares_by_address
Argument: address

## get_totalPoints

## get_all_accounts

## get_account_state
Argument: address

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
6852: Mint not start
29082: Mint ended
40176: Invalid rate
55259: Insufficient fee
59445: Only owner can claim fee