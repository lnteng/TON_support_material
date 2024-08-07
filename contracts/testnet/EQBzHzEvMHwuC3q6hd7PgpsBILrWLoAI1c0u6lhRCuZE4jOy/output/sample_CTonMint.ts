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

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
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

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
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

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
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

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Cell;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.asCell();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TokenWithdraw = {
    $$type: 'TokenWithdraw';
    amount: bigint;
    jettonWalletAddress: Address;
    receiver: Address;
}

export function storeTokenWithdraw(src: TokenWithdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3793692117, 32);
        b_0.storeUint(src.amount, 256);
        b_0.storeAddress(src.jettonWalletAddress);
        b_0.storeAddress(src.receiver);
    };
}

export function loadTokenWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3793692117) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(256);
    let _jettonWalletAddress = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    return { $$type: 'TokenWithdraw' as const, amount: _amount, jettonWalletAddress: _jettonWalletAddress, receiver: _receiver };
}

function loadTupleTokenWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _jettonWalletAddress = source.readAddress();
    let _receiver = source.readAddress();
    return { $$type: 'TokenWithdraw' as const, amount: _amount, jettonWalletAddress: _jettonWalletAddress, receiver: _receiver };
}

function storeTupleTokenWithdraw(source: TokenWithdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.jettonWalletAddress);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserTokenWithdraw(): DictionaryValue<TokenWithdraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadTokenWithdraw(src.loadRef().beginParse());
        }
    }
}

export type WhiteListMint = {
    $$type: 'WhiteListMint';
    seqno: bigint;
    amount: bigint;
    receiver: Address;
    jettonWalletAddress: Address;
}

export function storeWhiteListMint(src: WhiteListMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.seqno, 32);
        b_0.storeUint(src.amount, 256);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.jettonWalletAddress);
    };
}

export function loadWhiteListMint(slice: Slice) {
    let sc_0 = slice;
    let _seqno = sc_0.loadUintBig(32);
    let _amount = sc_0.loadUintBig(256);
    let _receiver = sc_0.loadAddress();
    let _jettonWalletAddress = sc_0.loadAddress();
    return { $$type: 'WhiteListMint' as const, seqno: _seqno, amount: _amount, receiver: _receiver, jettonWalletAddress: _jettonWalletAddress };
}

function loadTupleWhiteListMint(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    let _jettonWalletAddress = source.readAddress();
    return { $$type: 'WhiteListMint' as const, seqno: _seqno, amount: _amount, receiver: _receiver, jettonWalletAddress: _jettonWalletAddress };
}

function storeTupleWhiteListMint(source: WhiteListMint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.jettonWalletAddress);
    return builder.build();
}

function dictValueParserWhiteListMint(): DictionaryValue<WhiteListMint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWhiteListMint(src)).endCell());
        },
        parse: (src) => {
            return loadWhiteListMint(src.loadRef().beginParse());
        }
    }
}

export type WhiteListMintMessage = {
    $$type: 'WhiteListMintMessage';
    signature: Cell;
    whiteListMint: WhiteListMint;
}

export function storeWhiteListMintMessage(src: WhiteListMintMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3514634201, 32);
        b_0.storeRef(src.signature);
        b_0.store(storeWhiteListMint(src.whiteListMint));
    };
}

export function loadWhiteListMintMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3514634201) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadRef();
    let _whiteListMint = loadWhiteListMint(sc_0);
    return { $$type: 'WhiteListMintMessage' as const, signature: _signature, whiteListMint: _whiteListMint };
}

function loadTupleWhiteListMintMessage(source: TupleReader) {
    let _signature = source.readCell();
    const _whiteListMint = loadTupleWhiteListMint(source.readTuple());
    return { $$type: 'WhiteListMintMessage' as const, signature: _signature, whiteListMint: _whiteListMint };
}

function storeTupleWhiteListMintMessage(source: WhiteListMintMessage) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.signature);
    builder.writeTuple(storeTupleWhiteListMint(source.whiteListMint));
    return builder.build();
}

function dictValueParserWhiteListMintMessage(): DictionaryValue<WhiteListMintMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWhiteListMintMessage(src)).endCell());
        },
        parse: (src) => {
            return loadWhiteListMintMessage(src.loadRef().beginParse());
        }
    }
}

export type PublicMintMessage = {
    $$type: 'PublicMintMessage';
    amount: bigint;
    receiver: Address;
    jettonWalletAddress: Address;
}

export function storePublicMintMessage(src: PublicMintMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(800409041, 32);
        b_0.storeUint(src.amount, 256);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.jettonWalletAddress);
    };
}

export function loadPublicMintMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 800409041) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(256);
    let _receiver = sc_0.loadAddress();
    let _jettonWalletAddress = sc_0.loadAddress();
    return { $$type: 'PublicMintMessage' as const, amount: _amount, receiver: _receiver, jettonWalletAddress: _jettonWalletAddress };
}

function loadTuplePublicMintMessage(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    let _jettonWalletAddress = source.readAddress();
    return { $$type: 'PublicMintMessage' as const, amount: _amount, receiver: _receiver, jettonWalletAddress: _jettonWalletAddress };
}

function storeTuplePublicMintMessage(source: PublicMintMessage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.jettonWalletAddress);
    return builder.build();
}

function dictValueParserPublicMintMessage(): DictionaryValue<PublicMintMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePublicMintMessage(src)).endCell());
        },
        parse: (src) => {
            return loadPublicMintMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateWlSignKey = {
    $$type: 'UpdateWlSignKey';
    pKey: bigint;
}

export function storeUpdateWlSignKey(src: UpdateWlSignKey) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4064182300, 32);
        b_0.storeUint(src.pKey, 256);
    };
}

export function loadUpdateWlSignKey(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4064182300) { throw Error('Invalid prefix'); }
    let _pKey = sc_0.loadUintBig(256);
    return { $$type: 'UpdateWlSignKey' as const, pKey: _pKey };
}

function loadTupleUpdateWlSignKey(source: TupleReader) {
    let _pKey = source.readBigNumber();
    return { $$type: 'UpdateWlSignKey' as const, pKey: _pKey };
}

function storeTupleUpdateWlSignKey(source: UpdateWlSignKey) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.pKey);
    return builder.build();
}

function dictValueParserUpdateWlSignKey(): DictionaryValue<UpdateWlSignKey> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateWlSignKey(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateWlSignKey(src.loadRef().beginParse());
        }
    }
}

export type MintInfo = {
    $$type: 'MintInfo';
    owner: Address;
    wlSignKey: bigint;
    totalWlMintAmount: bigint;
    totalPublicMintAmount: bigint;
    totalMintAmount: bigint;
    wlMintMinAmount: bigint;
    wlMintMaxAmount: bigint;
    publicMintMinAmount: bigint;
    wlMintTonPrice: bigint;
    publicMintTonPrice: bigint;
}

export function storeMintInfo(src: MintInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.wlSignKey, 256);
        b_0.storeUint(src.totalWlMintAmount, 256);
        let b_1 = new Builder();
        b_1.storeUint(src.totalPublicMintAmount, 256);
        b_1.storeUint(src.totalMintAmount, 256);
        b_1.storeUint(src.wlMintMinAmount, 32);
        b_1.storeUint(src.wlMintMaxAmount, 32);
        b_1.storeUint(src.publicMintMinAmount, 32);
        b_1.storeInt(src.wlMintTonPrice, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.publicMintTonPrice, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMintInfo(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _wlSignKey = sc_0.loadUintBig(256);
    let _totalWlMintAmount = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _totalPublicMintAmount = sc_1.loadUintBig(256);
    let _totalMintAmount = sc_1.loadUintBig(256);
    let _wlMintMinAmount = sc_1.loadUintBig(32);
    let _wlMintMaxAmount = sc_1.loadUintBig(32);
    let _publicMintMinAmount = sc_1.loadUintBig(32);
    let _wlMintTonPrice = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _publicMintTonPrice = sc_2.loadIntBig(257);
    return { $$type: 'MintInfo' as const, owner: _owner, wlSignKey: _wlSignKey, totalWlMintAmount: _totalWlMintAmount, totalPublicMintAmount: _totalPublicMintAmount, totalMintAmount: _totalMintAmount, wlMintMinAmount: _wlMintMinAmount, wlMintMaxAmount: _wlMintMaxAmount, publicMintMinAmount: _publicMintMinAmount, wlMintTonPrice: _wlMintTonPrice, publicMintTonPrice: _publicMintTonPrice };
}

function loadTupleMintInfo(source: TupleReader) {
    let _owner = source.readAddress();
    let _wlSignKey = source.readBigNumber();
    let _totalWlMintAmount = source.readBigNumber();
    let _totalPublicMintAmount = source.readBigNumber();
    let _totalMintAmount = source.readBigNumber();
    let _wlMintMinAmount = source.readBigNumber();
    let _wlMintMaxAmount = source.readBigNumber();
    let _publicMintMinAmount = source.readBigNumber();
    let _wlMintTonPrice = source.readBigNumber();
    let _publicMintTonPrice = source.readBigNumber();
    return { $$type: 'MintInfo' as const, owner: _owner, wlSignKey: _wlSignKey, totalWlMintAmount: _totalWlMintAmount, totalPublicMintAmount: _totalPublicMintAmount, totalMintAmount: _totalMintAmount, wlMintMinAmount: _wlMintMinAmount, wlMintMaxAmount: _wlMintMaxAmount, publicMintMinAmount: _publicMintMinAmount, wlMintTonPrice: _wlMintTonPrice, publicMintTonPrice: _publicMintTonPrice };
}

function storeTupleMintInfo(source: MintInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.wlSignKey);
    builder.writeNumber(source.totalWlMintAmount);
    builder.writeNumber(source.totalPublicMintAmount);
    builder.writeNumber(source.totalMintAmount);
    builder.writeNumber(source.wlMintMinAmount);
    builder.writeNumber(source.wlMintMaxAmount);
    builder.writeNumber(source.publicMintMinAmount);
    builder.writeNumber(source.wlMintTonPrice);
    builder.writeNumber(source.publicMintTonPrice);
    return builder.build();
}

function dictValueParserMintInfo(): DictionaryValue<MintInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintInfo(src)).endCell());
        },
        parse: (src) => {
            return loadMintInfo(src.loadRef().beginParse());
        }
    }
}

 type CTonMint_init_args = {
    $$type: 'CTonMint_init_args';
    owner: Address;
    wlSignKey: bigint;
}

function initCTonMint_init_args(src: CTonMint_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.wlSignKey, 257);
    };
}

async function CTonMint_init(owner: Address, wlSignKey: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initCTonMint_init_args({ $$type: 'CTonMint_init_args', owner, wlSignKey })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const CTonMint_errors: { [key: number]: { message: string } } = {
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
    13458: { message: `wrong receiver` },
    14534: { message: `Not owner` },
    16059: { message: `Invalid value` },
    18445: { message: `wrong seqno` },
    41419: { message: `Max total amount limit` },
    42659: { message: `Max amount limit` },
    46826: { message: `Only owner can update public key` },
    47896: { message: `Min amount limit` },
    48401: { message: `Invalid signature` },
    59445: { message: `Only owner can claim fee` },
}

const CTonMint_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenWithdraw","header":3793692117,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"jettonWalletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WhiteListMint","header":null,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWalletAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WhiteListMintMessage","header":3514634201,"fields":[{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"whiteListMint","type":{"kind":"simple","type":"WhiteListMint","optional":false}}]},
    {"name":"PublicMintMessage","header":800409041,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWalletAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateWlSignKey","header":4064182300,"fields":[{"name":"pKey","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"MintInfo","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"wlSignKey","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"totalWlMintAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"totalPublicMintAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"totalMintAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"wlMintMinAmount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"wlMintMaxAmount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"publicMintMinAmount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"wlMintTonPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"publicMintTonPrice","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const CTonMint_getters: ABIGetter[] = [
    {"name":"mintInfo","arguments":[],"returnType":{"kind":"simple","type":"MintInfo","optional":false}},
    {"name":"whitelistAmountByAddress","arguments":[{"name":"userAddr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"publicAmountByAddress","arguments":[{"name":"userAddr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const CTonMint_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateWlSignKey"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WhiteListMintMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PublicMintMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenWithdraw"}},
    {"receiver":"internal","message":{"kind":"text","text":"ClaimFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class CTonMint implements Contract {
    
    static async init(owner: Address, wlSignKey: bigint) {
        return await CTonMint_init(owner, wlSignKey);
    }
    
    static async fromInit(owner: Address, wlSignKey: bigint) {
        const init = await CTonMint_init(owner, wlSignKey);
        const address = contractAddress(0, init);
        return new CTonMint(address, init);
    }
    
    static fromAddress(address: Address) {
        return new CTonMint(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  CTonMint_types,
        getters: CTonMint_getters,
        receivers: CTonMint_receivers,
        errors: CTonMint_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateWlSignKey | WhiteListMintMessage | PublicMintMessage | TokenWithdraw | 'ClaimFee' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateWlSignKey') {
            body = beginCell().store(storeUpdateWlSignKey(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WhiteListMintMessage') {
            body = beginCell().store(storeWhiteListMintMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PublicMintMessage') {
            body = beginCell().store(storePublicMintMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenWithdraw') {
            body = beginCell().store(storeTokenWithdraw(message)).endCell();
        }
        if (message === 'ClaimFee') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getMintInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('mintInfo', builder.build())).stack;
        const result = loadTupleMintInfo(source);
        return result;
    }
    
    async getWhitelistAmountByAddress(provider: ContractProvider, userAddr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(userAddr);
        let source = (await provider.get('whitelistAmountByAddress', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getPublicAmountByAddress(provider: ContractProvider, userAddr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(userAddr);
        let source = (await provider.get('publicAmountByAddress', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}