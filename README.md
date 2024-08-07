# Enhancing The Open Network: Definition and Automated Detection of Smart Contract Defects

Supplementary materials for TONScanner, including:

- `TONScanner` - the executable file of TONScanner. The usage is described below.
- `blogs/` - the blogs are sourced from official documentations, official blogs, and TON research community.
        - `blogs.txt` - 82 related blogs filtered by "func secure" and "func develop".
        - `tips.txt` - 1327 possible safety tips from blogs. 
- `contracts/` - the on-chain contract source code obtained from [ton verifier](https://verifier.ton.org/), including `FunC` and `Tact` contracts on mainnet and testnet.
        - `uniqueFunCompilerSettings.txt` - list of compilation commands for `FunC` contracts.
        - `uniqueTactCompilerSettings.txt` - list of compilation commands for `Tact` contracts.
- `repo/` -  the on-chain contract source code obtained from [ton verifier](https://verifier.ton.org/), including `FunC` and `Tact` contracts on mainnet and testnet.
        - `uniqueFunCompilerSettings.txt` - list of compilation commands for `FunC` contracts.
        - `uniqueTactCompilerSettings.txt` - list of compilation commands for `Tact` contracts.
- `results/` - the smart contract source code obtained from github, including `FunC` and `Tact` contracts.
- `samples/`

## Usage
```
$ ./TONScanner -h

SYNOPSIS
        ./TONScanner -s <source_code_directory>... [-o [<output_directory>]] [-c <cfg_dot_directory>] [-f <function_name>...]

OPTIONS
        -s, --source    funC source code directory
        -o, --output    output directory
        -c, --cfg       visualize cfg
        -f, --functions specified functions
```


## Example
``` 
$ ./TONScanner -s ./contracts/EQCTSH2DwiH4hAWFYECzhbncxH2hqRetH1G4_XKQRQylqY1g/bridge-wallet-v2.fc ./contracts/EQCTSH2DwiH4hAWFYECzhbncxH2hqRetH1G4_XKQRQylqY1g/imports/stdlib.fc

get_public_key: LackEndParse
./contracts/EQCTSH2DwiH4hAWFYECzhbncxH2hqRetH1G4_XKQRQylqY1g/bridge-wallet-v2.fc:139:13: warning: Lack of end_parse.
              .skip_bits(32 + 64)
              ^
recv_internal: LackEndParse
./contracts/EQCTSH2DwiH4hAWFYECzhbncxH2hqRetH1G4_XKQRQylqY1g/bridge-wallet-v2.fc:16:19: warning: Lack of end_parse.
      var flags = cs~load_uint(4); ;; int_msg_info$0 ihr_disabled:Bool bounce:Bool bounced:Bool
                    ^
recv_external & get_public_key: InconsistentData
./contracts/EQCTSH2DwiH4hAWFYECzhbncxH2hqRetH1G4_XKQRQylqY1g/bridge-wallet-v2.fc:138:13: warning: Cell of get_data and set_data are inconsistent.
              .begin_parse()
              ^
./contracts/EQCTSH2DwiH4hAWFYECzhbncxH2hqRetH1G4_XKQRQylqY1g/bridge-wallet-v2.fc:107:13: warning: Cell of get_data and set_data are inconsistent.
              .store_uint(stored_subwallet, 32)
              ^
```

In order to analyze the `Tact` contract, you first need to use the `Tact` compiler to compile the `Tact` contract into a `FunC` contract(already prepared), and then test the generated `FunC` contract.

```
$ ./TONScanner -s ./contracts/stdlib.fc	./contracts/stdlib_ex.fc	./contracts/EQC1Mk8fuSBxFdCR4VrENamI5Z4r-u5a88Od1phnSv-2xHd1/output/verifier_Registry.code.fc

```