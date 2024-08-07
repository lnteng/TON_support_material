# TACT Compilation Report
Contract: DataSaver
BOC Size: 959 bytes

# Types
Total Types: 8

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## DataResponse
TLB: `_ master:address owner:address key:^string data:^string = DataResponse`
Signature: `DataResponse{master:address,owner:address,key:^string,data:^string}`

## DataInput
TLB: `data_input#db9bbf11 key:^string data:^string = DataInput`
Signature: `DataInput{key:^string,data:^string}`

## DataInputTest
TLB: `data_input_test#d6061de2 key:^string data:^string = DataInputTest`
Signature: `DataInputTest{key:^string,data:^string}`

## Holder
TLB: `_ total:int257 holder:dict<int, int> = Holder`
Signature: `Holder{total:int257,holder:dict<int, int>}`

## Data
TLB: `_ key:^string data:^string = Data`
Signature: `Data{key:^string,data:^string}`

# Get Methods
Total Get Methods: 2

## get_data
Argument: index

## get_address

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