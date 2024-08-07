# TACT Compilation Report
Contract: CTonMint
BOC Size: 2414 bytes

# Types
Total Types: 23

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

## JettonData
TLB: `_ total_supply:int257 mintable:bool owner:address content:^cell wallet_code:^cell = JettonData`
Signature: `JettonData{total_supply:int257,mintable:bool,owner:address,content:^cell,wallet_code:^cell}`

## JettonWalletData
TLB: `_ balance:int257 owner:address master:address code:^cell = JettonWalletData`
Signature: `JettonWalletData{balance:int257,owner:address,master:address,code:^cell}`

## TokenTransfer
TLB: `token_transfer#0f8a7ea5 query_id:uint64 amount:coins sender:address response_destination:Maybe address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = TokenTransfer`
Signature: `TokenTransfer{query_id:uint64,amount:coins,sender:address,response_destination:Maybe address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## TokenTransferInternal
TLB: `token_transfer_internal#178d4519 query_id:uint64 amount:coins from:address response_destination:Maybe address forward_ton_amount:coins forward_payload:remainder<slice> = TokenTransferInternal`
Signature: `TokenTransferInternal{query_id:uint64,amount:coins,from:address,response_destination:Maybe address,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## TokenNotification
TLB: `token_notification#7362d09c query_id:uint64 amount:coins from:address forward_payload:remainder<slice> = TokenNotification`
Signature: `TokenNotification{query_id:uint64,amount:coins,from:address,forward_payload:remainder<slice>}`

## TokenBurn
TLB: `token_burn#595f07bc query_id:uint64 amount:coins response_destination:Maybe address custom_payload:Maybe ^cell = TokenBurn`
Signature: `TokenBurn{query_id:uint64,amount:coins,response_destination:Maybe address,custom_payload:Maybe ^cell}`

## TokenBurnNotification
TLB: `token_burn_notification#7bdd97de query_id:uint64 amount:coins sender:address response_destination:Maybe address = TokenBurnNotification`
Signature: `TokenBurnNotification{query_id:uint64,amount:coins,sender:address,response_destination:Maybe address}`

## TokenExcesses
TLB: `token_excesses#d53276db query_id:uint64 = TokenExcesses`
Signature: `TokenExcesses{query_id:uint64}`

## TokenUpdateContent
TLB: `token_update_content#af1ca26a content:^cell = TokenUpdateContent`
Signature: `TokenUpdateContent{content:^cell}`

## ProvideWalletAddress
TLB: `provide_wallet_address#2c76b973 query_id:uint64 owner_address:address include_address:bool = ProvideWalletAddress`
Signature: `ProvideWalletAddress{query_id:uint64,owner_address:address,include_address:bool}`

## TakeWalletAddress
TLB: `take_wallet_address#d1735400 query_id:uint64 wallet_address:address owner_address:remainder<slice> = TakeWalletAddress`
Signature: `TakeWalletAddress{query_id:uint64,wallet_address:address,owner_address:remainder<slice>}`

## TokenWithdraw
TLB: `token_withdraw#e21f25d5 amount:uint256 jettonWalletAddress:address receiver:address = TokenWithdraw`
Signature: `TokenWithdraw{amount:uint256,jettonWalletAddress:address,receiver:address}`

## WhiteListMint
TLB: `_ seqno:uint32 amount:uint256 receiver:address jettonWalletAddress:address = WhiteListMint`
Signature: `WhiteListMint{seqno:uint32,amount:uint256,receiver:address,jettonWalletAddress:address}`

## WhiteListMintMessage
TLB: `white_list_mint_message#d17d0fd9 signature:^slice whiteListMint:WhiteListMint{seqno:uint32,amount:uint256,receiver:address,jettonWalletAddress:address} = WhiteListMintMessage`
Signature: `WhiteListMintMessage{signature:^slice,whiteListMint:WhiteListMint{seqno:uint32,amount:uint256,receiver:address,jettonWalletAddress:address}}`

## PublicMintMessage
TLB: `public_mint_message#2fb545d1 amount:uint256 receiver:address jettonWalletAddress:address = PublicMintMessage`
Signature: `PublicMintMessage{amount:uint256,receiver:address,jettonWalletAddress:address}`

## UpdateWlSignKey
TLB: `update_wl_sign_key#f23e801c pKey:uint256 = UpdateWlSignKey`
Signature: `UpdateWlSignKey{pKey:uint256}`

## MintInfo
TLB: `_ owner:address wlSignKey:uint256 totalWlMintAmount:uint256 totalPublicMintAmount:uint256 totalMintAmount:uint256 wlMintMinAmount:uint32 wlMintMaxAmount:uint32 publicMintMinAmount:uint32 wlMintTonPrice:int257 publicMintTonPrice:int257 = MintInfo`
Signature: `MintInfo{owner:address,wlSignKey:uint256,totalWlMintAmount:uint256,totalPublicMintAmount:uint256,totalMintAmount:uint256,wlMintMinAmount:uint32,wlMintMaxAmount:uint32,publicMintMinAmount:uint32,wlMintTonPrice:int257,publicMintTonPrice:int257}`

# Get Methods
Total Get Methods: 3

## mintInfo

## whitelistAmountByAddress
Argument: userAddr

## publicAmountByAddress
Argument: userAddr

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
13458: wrong receiver
14534: Not owner
16059: Invalid value
18445: wrong seqno
41419: Max total amount limit
42659: Max amount limit
46826: Only owner can update public key
47896: Min amount limit
48401: Invalid signature
59445: Only owner can claim fee