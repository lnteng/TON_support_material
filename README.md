# Enhancing The Open Network: Definition and Automated Detection of Smart Contract Defects

## Supplementary Materials for TONScanner

The supplementary materials for TONScanner include the following directories and files:

- `TONScanner` - the executable file of TONScanner. The usage is described below.
- `blogs/` - blogs sourced from official documentation, official blogs, and the TON research community.
  - `blogs.txt` - 82 related blogs filtered by "func secure" and "func develop".
  - `tips.txt` - 1327 possible safety tips from blogs.
- `contracts/` - on-chain contract source code obtained from [ton-verifier](https://verifier.ton.org/), including `FunC` and `Tact` contracts on mainnet and testnet.
  - `uniqueFunCompilerSettings.txt` - list of compilation commands for `FunC` contracts.
  - `uniqueTactCompilerSettings.txt` - list of compilation commands for `Tact` contracts.
- `repo/` - smart contract source code obtained from GitHub, including `FunC` and `Tact` contracts.
  - `uniqueFunCompilerSettings.txt` - list of compilation commands for `FunC` contracts.
  - `uniqueTactCompilerSettings.txt` - list of compilation commands for `Tact` contracts.
- `results/` - results of TONScanner.
  - `raw/` - raw results of TONScanner.
    - `contracts/` - raw results of on-chain contracts.
      - `func/` - from [compiler settings](contracts/uniqueFunCompilerSettings.txt)
      - `tact/` - from [compiler settings](contracts/uniqueTactCompilerSettings.txt)
    - `repo/` - raw results of GitHub contracts.
      - `func/` - from [compiler settings](repo/uniqueFunCompilerSettings.txt)
      - `tact/` - from [compiler settings](repo/uniqueTactCompilerSettings.txt)
  - `samples/` - sampling results of defects and their labels from the raw results to quantify the false positive rate.
    - `func/` - sample from [contracts func](results/raw/contracts/func) and [repo func](results/raw/repo/func)
    - `tact/` - sample from [contracts tact](results/raw/contracts/tact) and [repo tact](results/raw/repo/tact)
- `samples/` - results of manual audits of sampled contracts to quantify the false negative rate.
  - `func/` - source code and labels of [sampled `FunC` contracts](samples/funcSampledCompilerSettings.txt).
  - `tact/` - source code and labels of [sampled `Tact` contracts](samples/tactSampledCompilerSettings.txt).
  - `funcSampledCompilerSettings.txt` - list of sampled `FunC` contracts.
  - `tactSampledCompilerSettings.txt` - list of sampled `Tact` contracts.

> The defect labels are marked in the source code as comments (e.g., ";; DEFECT: LackEndParse").

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

- `-s, --source` - Specifies the path to the `FunC` source code.
- `-o, --output` - Specifies the output directory where the detection results will be redirected to a file.
- `-c, --cfg` - Visualizes the control flow graph (CFG) of the functions, used for debugging.
- `-f, --functions` - Specifies the functions for which the CFG should be output, used in conjunction with `-c`.


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
This output shows the function where the defect is detected, the type of defect, and the specific location in the source code where the defect occurs.

- **Function:** `get_public_key`
  - **Defect Type:** LackEndParse
  - **Location:** `./contracts/EQCTSH2DwiH4hAWFYECzhbncxH2hqRetH1G4_XKQRQylqY1g/bridge-wallet-v2.fc:139:13`
  - **Warning:** Lack of end_parse.
    ```
              .skip_bits(32 + 64)
              ^
    ```

In order to analyze the `Tact` contract, you first need to use the `Tact` compiler to compile the `Tact` contract into a `FunC` contract(already prepared), and then test the generated `FunC` contract.

```
$ ./TONScanner -s ./contracts/stdlib.fc	./contracts/stdlib_ex.fc	./contracts/EQC1Mk8fuSBxFdCR4VrENamI5Z4r-u5a88Od1phnSv-2xHd1/output/verifier_Registry.code.fc
```