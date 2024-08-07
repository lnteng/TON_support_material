import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type MintChild = {
    $$type: 'MintChild';
    user: Address;
    referrer: Address | null;
}

export function storeMintChild(src: MintChild) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.referrer);
    };
}

export function loadMintChild(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _referrer = sc_0.loadMaybeAddress();
    return { $$type: 'MintChild' as const, user: _user, referrer: _referrer };
}

function loadTupleMintChild(source: TupleReader) {
    let _user = source.readAddress();
    let _referrer = source.readAddressOpt();
    return { $$type: 'MintChild' as const, user: _user, referrer: _referrer };
}

function storeTupleMintChild(source: MintChild) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeAddress(source.referrer);
    return builder.build();
}

function dictValueParserMintChild(): DictionaryValue<MintChild> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintChild(src)).endCell());
        },
        parse: (src) => {
            return loadMintChild(src.loadRef().beginParse());
        }
    }
}

export type Claim = {
    $$type: 'Claim';
    amount: bigint;
    boost: bigint;
    user: Address;
    referrer: Address | null;
}

export function storeClaim(src: Claim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2, 32);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.boost);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.referrer);
    };
}

export function loadClaim(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _boost = sc_0.loadCoins();
    let _user = sc_0.loadAddress();
    let _referrer = sc_0.loadMaybeAddress();
    return { $$type: 'Claim' as const, amount: _amount, boost: _boost, user: _user, referrer: _referrer };
}

function loadTupleClaim(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _boost = source.readBigNumber();
    let _user = source.readAddress();
    let _referrer = source.readAddressOpt();
    return { $$type: 'Claim' as const, amount: _amount, boost: _boost, user: _user, referrer: _referrer };
}

function storeTupleClaim(source: Claim) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.boost);
    builder.writeAddress(source.user);
    builder.writeAddress(source.referrer);
    return builder.build();
}

function dictValueParserClaim(): DictionaryValue<Claim> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaim(src)).endCell());
        },
        parse: (src) => {
            return loadClaim(src.loadRef().beginParse());
        }
    }
}

export type ReferralCount = {
    $$type: 'ReferralCount';
}

export function storeReferralCount(src: ReferralCount) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3, 32);
    };
}

export function loadReferralCount(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3) { throw Error('Invalid prefix'); }
    return { $$type: 'ReferralCount' as const };
}

function loadTupleReferralCount(source: TupleReader) {
    return { $$type: 'ReferralCount' as const };
}

function storeTupleReferralCount(source: ReferralCount) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserReferralCount(): DictionaryValue<ReferralCount> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReferralCount(src)).endCell());
        },
        parse: (src) => {
            return loadReferralCount(src.loadRef().beginParse());
        }
    }
}

export type Referrer = {
    $$type: 'Referrer';
    user: Address | null;
}

export function storeReferrer(src: Referrer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4, 32);
        b_0.storeAddress(src.user);
    };
}

export function loadReferrer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadMaybeAddress();
    return { $$type: 'Referrer' as const, user: _user };
}

function loadTupleReferrer(source: TupleReader) {
    let _user = source.readAddressOpt();
    return { $$type: 'Referrer' as const, user: _user };
}

function storeTupleReferrer(source: Referrer) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    return builder.build();
}

function dictValueParserReferrer(): DictionaryValue<Referrer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReferrer(src)).endCell());
        },
        parse: (src) => {
            return loadReferrer(src.loadRef().beginParse());
        }
    }
}

export type Boost = {
    $$type: 'Boost';
    amount: bigint;
}

export function storeBoost(src: Boost) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(5, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadBoost(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 5) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Boost' as const, amount: _amount };
}

function loadTupleBoost(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Boost' as const, amount: _amount };
}

function storeTupleBoost(source: Boost) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserBoost(): DictionaryValue<Boost> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBoost(src)).endCell());
        },
        parse: (src) => {
            return loadBoost(src.loadRef().beginParse());
        }
    }
}

export type OwnerWithdrawalRequest = {
    $$type: 'OwnerWithdrawalRequest';
    amount: bigint;
    tokenAddress: Address;
}

export function storeOwnerWithdrawalRequest(src: OwnerWithdrawalRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(6, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.tokenAddress);
    };
}

export function loadOwnerWithdrawalRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 6) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _tokenAddress = sc_0.loadAddress();
    return { $$type: 'OwnerWithdrawalRequest' as const, amount: _amount, tokenAddress: _tokenAddress };
}

function loadTupleOwnerWithdrawalRequest(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _tokenAddress = source.readAddress();
    return { $$type: 'OwnerWithdrawalRequest' as const, amount: _amount, tokenAddress: _tokenAddress };
}

function storeTupleOwnerWithdrawalRequest(source: OwnerWithdrawalRequest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.tokenAddress);
    return builder.build();
}

function dictValueParserOwnerWithdrawalRequest(): DictionaryValue<OwnerWithdrawalRequest> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnerWithdrawalRequest(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerWithdrawalRequest(src.loadRef().beginParse());
        }
    }
}

export type OwnerWithdrawalTonRequest = {
    $$type: 'OwnerWithdrawalTonRequest';
}

export function storeOwnerWithdrawalTonRequest(src: OwnerWithdrawalTonRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(7, 32);
    };
}

export function loadOwnerWithdrawalTonRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 7) { throw Error('Invalid prefix'); }
    return { $$type: 'OwnerWithdrawalTonRequest' as const };
}

function loadTupleOwnerWithdrawalTonRequest(source: TupleReader) {
    return { $$type: 'OwnerWithdrawalTonRequest' as const };
}

function storeTupleOwnerWithdrawalTonRequest(source: OwnerWithdrawalTonRequest) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserOwnerWithdrawalTonRequest(): DictionaryValue<OwnerWithdrawalTonRequest> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnerWithdrawalTonRequest(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerWithdrawalTonRequest(src.loadRef().beginParse());
        }
    }
}

export type TokenConfig = {
    $$type: 'TokenConfig';
    tokenAddress: Address;
    claimAmount: bigint;
    referralReward: bigint;
    boostReward: bigint;
}

export function storeTokenConfig(src: TokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(8, 32);
        b_0.storeAddress(src.tokenAddress);
        b_0.storeCoins(src.claimAmount);
        b_0.storeCoins(src.referralReward);
        b_0.storeCoins(src.boostReward);
    };
}

export function loadTokenConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 8) { throw Error('Invalid prefix'); }
    let _tokenAddress = sc_0.loadAddress();
    let _claimAmount = sc_0.loadCoins();
    let _referralReward = sc_0.loadCoins();
    let _boostReward = sc_0.loadCoins();
    return { $$type: 'TokenConfig' as const, tokenAddress: _tokenAddress, claimAmount: _claimAmount, referralReward: _referralReward, boostReward: _boostReward };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _tokenAddress = source.readAddress();
    let _claimAmount = source.readBigNumber();
    let _referralReward = source.readBigNumber();
    let _boostReward = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, tokenAddress: _tokenAddress, claimAmount: _claimAmount, referralReward: _referralReward, boostReward: _boostReward };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.tokenAddress);
    builder.writeNumber(source.claimAmount);
    builder.writeNumber(source.referralReward);
    builder.writeNumber(source.boostReward);
    return builder.build();
}

function dictValueParserTokenConfig(): DictionaryValue<TokenConfig> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenConfig(src)).endCell());
        },
        parse: (src) => {
            return loadTokenConfig(src.loadRef().beginParse());
        }
    }
}

export type CustomMessage = {
    $$type: 'CustomMessage';
    to: Address;
    payload: Cell | null;
}

export function storeCustomMessage(src: CustomMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(9, 32);
        b_0.storeAddress(src.to);
        if (src.payload !== null && src.payload !== undefined) { b_0.storeBit(true).storeRef(src.payload); } else { b_0.storeBit(false); }
    };
}

export function loadCustomMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 9) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'CustomMessage' as const, to: _to, payload: _payload };
}

function loadTupleCustomMessage(source: TupleReader) {
    let _to = source.readAddress();
    let _payload = source.readCellOpt();
    return { $$type: 'CustomMessage' as const, to: _to, payload: _payload };
}

function storeTupleCustomMessage(source: CustomMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeCell(source.payload);
    return builder.build();
}

function dictValueParserCustomMessage(): DictionaryValue<CustomMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCustomMessage(src)).endCell());
        },
        parse: (src) => {
            return loadCustomMessage(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forwardPayload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _responseDestination = sc_0.loadMaybeAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type ChildState = {
    $$type: 'ChildState';
    interval: bigint;
    lastClaimTime: bigint;
    referralsCount: bigint;
    boost: bigint;
}

export function storeChildState(src: ChildState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.interval, 32);
        b_0.storeUint(src.lastClaimTime, 64);
        b_0.storeUint(src.referralsCount, 32);
        b_0.storeUint(src.boost, 32);
    };
}

export function loadChildState(slice: Slice) {
    let sc_0 = slice;
    let _interval = sc_0.loadUintBig(32);
    let _lastClaimTime = sc_0.loadUintBig(64);
    let _referralsCount = sc_0.loadUintBig(32);
    let _boost = sc_0.loadUintBig(32);
    return { $$type: 'ChildState' as const, interval: _interval, lastClaimTime: _lastClaimTime, referralsCount: _referralsCount, boost: _boost };
}

function loadTupleChildState(source: TupleReader) {
    let _interval = source.readBigNumber();
    let _lastClaimTime = source.readBigNumber();
    let _referralsCount = source.readBigNumber();
    let _boost = source.readBigNumber();
    return { $$type: 'ChildState' as const, interval: _interval, lastClaimTime: _lastClaimTime, referralsCount: _referralsCount, boost: _boost };
}

function storeTupleChildState(source: ChildState) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.interval);
    builder.writeNumber(source.lastClaimTime);
    builder.writeNumber(source.referralsCount);
    builder.writeNumber(source.boost);
    return builder.build();
}

function dictValueParserChildState(): DictionaryValue<ChildState> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChildState(src)).endCell());
        },
        parse: (src) => {
            return loadChildState(src.loadRef().beginParse());
        }
    }
}

 type ClaimMaster_init_args = {
    $$type: 'ClaimMaster_init_args';
    owner: Address;
    master: Address;
    interval: bigint;
    randomSecure: bigint;
}

function initClaimMaster_init_args(src: ClaimMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeInt(src.interval, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.randomSecure, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function ClaimMaster_init(owner: Address, master: Address, interval: bigint, randomSecure: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initClaimMaster_init_args({ $$type: 'ClaimMaster_init_args', owner, master, interval, randomSecure })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ClaimMaster_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const ClaimMaster_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MintChild","header":1,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Claim","header":2,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"boost","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"ReferralCount","header":3,"fields":[]},
    {"name":"Referrer","header":4,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Boost","header":5,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"OwnerWithdrawalRequest","header":6,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OwnerWithdrawalTonRequest","header":7,"fields":[]},
    {"name":"TokenConfig","header":8,"fields":[{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"referralReward","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"boostReward","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CustomMessage","header":9,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":true}}]},
    {"name":"ChildState","header":null,"fields":[{"name":"interval","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastClaimTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"referralsCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"boost","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const ClaimMaster_getters: ABIGetter[] = [
    {"name":"interval","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"tokenAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"queryId","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_user_address","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"claimAmount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"referralReward","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"boostReward","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const ClaimMaster_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CustomMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintChild"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Claim"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenConfig"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"OwnerWithdrawalTonRequest"}},
    {"receiver":"internal","message":{"kind":"typed","type":"OwnerWithdrawalRequest"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class ClaimMaster implements Contract {
    
    static async init(owner: Address, master: Address, interval: bigint, randomSecure: bigint) {
        return await ClaimMaster_init(owner, master, interval, randomSecure);
    }
    
    static async fromInit(owner: Address, master: Address, interval: bigint, randomSecure: bigint) {
        const init = await ClaimMaster_init(owner, master, interval, randomSecure);
        const address = contractAddress(0, init);
        return new ClaimMaster(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ClaimMaster(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ClaimMaster_types,
        getters: ClaimMaster_getters,
        receivers: ClaimMaster_receivers,
        errors: ClaimMaster_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ChangeOwner | CustomMessage | TokenNotification | MintChild | Claim | TokenConfig | null | TokenExcesses | OwnerWithdrawalTonRequest | OwnerWithdrawalRequest | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CustomMessage') {
            body = beginCell().store(storeCustomMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintChild') {
            body = beginCell().store(storeMintChild(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Claim') {
            body = beginCell().store(storeClaim(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenConfig') {
            body = beginCell().store(storeTokenConfig(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
            body = beginCell().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OwnerWithdrawalTonRequest') {
            body = beginCell().store(storeOwnerWithdrawalTonRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OwnerWithdrawalRequest') {
            body = beginCell().store(storeOwnerWithdrawalRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getInterval(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('interval', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTokenAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tokenAddress', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getQueryId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('queryId', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetUserAddress(provider: ContractProvider, user: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(user);
        let source = (await provider.get('get_user_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getClaimAmount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('claimAmount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getReferralReward(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('referralReward', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBoostReward(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('boostReward', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}