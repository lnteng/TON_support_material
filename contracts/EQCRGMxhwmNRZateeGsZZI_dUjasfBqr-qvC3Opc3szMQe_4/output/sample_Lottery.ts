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
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
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

export type Feed = {
    $$type: 'Feed';
    query_id: bigint;
}

export function storeFeed(src: Feed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3040223792, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadFeed(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3040223792) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Feed' as const, query_id: _query_id };
}

function loadTupleFeed(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Feed' as const, query_id: _query_id };
}

function storeTupleFeed(source: Feed) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserFeed(): DictionaryValue<Feed> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFeed(src)).endCell());
        },
        parse: (src) => {
            return loadFeed(src.loadRef().beginParse());
        }
    }
}

export type ChangeFee = {
    $$type: 'ChangeFee';
    feePercent: bigint;
}

export function storeChangeFee(src: ChangeFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1904630945, 32);
        b_0.storeUint(src.feePercent, 8);
    };
}

export function loadChangeFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1904630945) { throw Error('Invalid prefix'); }
    let _feePercent = sc_0.loadUintBig(8);
    return { $$type: 'ChangeFee' as const, feePercent: _feePercent };
}

function loadTupleChangeFee(source: TupleReader) {
    let _feePercent = source.readBigNumber();
    return { $$type: 'ChangeFee' as const, feePercent: _feePercent };
}

function storeTupleChangeFee(source: ChangeFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.feePercent);
    return builder.build();
}

function dictValueParserChangeFee(): DictionaryValue<ChangeFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeFee(src)).endCell());
        },
        parse: (src) => {
            return loadChangeFee(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
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

export type Swap = {
    $$type: 'Swap';
    query_id: bigint;
    amount: bigint;
    swap_step: SwapStep;
    swap_params: Cell;
}

export function storeSwap(src: Swap) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3926267997, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.store(storeSwapStep(src.swap_step));
        b_0.storeRef(src.swap_params);
    };
}

export function loadSwap(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3926267997) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _swap_step = loadSwapStep(sc_0);
    let _swap_params = sc_0.loadRef();
    return { $$type: 'Swap' as const, query_id: _query_id, amount: _amount, swap_step: _swap_step, swap_params: _swap_params };
}

function loadTupleSwap(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    const _swap_step = loadTupleSwapStep(source.readTuple());
    let _swap_params = source.readCell();
    return { $$type: 'Swap' as const, query_id: _query_id, amount: _amount, swap_step: _swap_step, swap_params: _swap_params };
}

function storeTupleSwap(source: Swap) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTupleSwapStep(source.swap_step));
    builder.writeCell(source.swap_params);
    return builder.build();
}

function dictValueParserSwap(): DictionaryValue<Swap> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSwap(src)).endCell());
        },
        parse: (src) => {
            return loadSwap(src.loadRef().beginParse());
        }
    }
}

export type SwapStep = {
    $$type: 'SwapStep';
    pool_addr: Address;
    params: SwapStepParams;
}

export function storeSwapStep(src: SwapStep) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.pool_addr);
        b_0.store(storeSwapStepParams(src.params));
    };
}

export function loadSwapStep(slice: Slice) {
    let sc_0 = slice;
    let _pool_addr = sc_0.loadAddress();
    let _params = loadSwapStepParams(sc_0);
    return { $$type: 'SwapStep' as const, pool_addr: _pool_addr, params: _params };
}

function loadTupleSwapStep(source: TupleReader) {
    let _pool_addr = source.readAddress();
    const _params = loadTupleSwapStepParams(source.readTuple());
    return { $$type: 'SwapStep' as const, pool_addr: _pool_addr, params: _params };
}

function storeTupleSwapStep(source: SwapStep) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pool_addr);
    builder.writeTuple(storeTupleSwapStepParams(source.params));
    return builder.build();
}

function dictValueParserSwapStep(): DictionaryValue<SwapStep> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSwapStep(src)).endCell());
        },
        parse: (src) => {
            return loadSwapStep(src.loadRef().beginParse());
        }
    }
}

export type SwapStepParams = {
    $$type: 'SwapStepParams';
    kind: boolean;
    limit: bigint;
    next: Cell | null;
}

export function storeSwapStepParams(src: SwapStepParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.kind);
        b_0.storeCoins(src.limit);
        if (src.next !== null && src.next !== undefined) { b_0.storeBit(true).storeRef(src.next); } else { b_0.storeBit(false); }
    };
}

export function loadSwapStepParams(slice: Slice) {
    let sc_0 = slice;
    let _kind = sc_0.loadBit();
    let _limit = sc_0.loadCoins();
    let _next = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SwapStepParams' as const, kind: _kind, limit: _limit, next: _next };
}

function loadTupleSwapStepParams(source: TupleReader) {
    let _kind = source.readBoolean();
    let _limit = source.readBigNumber();
    let _next = source.readCellOpt();
    return { $$type: 'SwapStepParams' as const, kind: _kind, limit: _limit, next: _next };
}

function storeTupleSwapStepParams(source: SwapStepParams) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.kind);
    builder.writeNumber(source.limit);
    builder.writeCell(source.next);
    return builder.build();
}

function dictValueParserSwapStepParams(): DictionaryValue<SwapStepParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSwapStepParams(src)).endCell());
        },
        parse: (src) => {
            return loadSwapStepParams(src.loadRef().beginParse());
        }
    }
}

export type SwapParams = {
    $$type: 'SwapParams';
    deadline: bigint;
    recipient_addr: Address | null;
    referral_addr: Address | null;
    fulfill_payload: Cell | null;
    reject_payload: Cell | null;
}

export function storeSwapParams(src: SwapParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.deadline, 32);
        b_0.storeAddress(src.recipient_addr);
        b_0.storeAddress(src.referral_addr);
        if (src.fulfill_payload !== null && src.fulfill_payload !== undefined) { b_0.storeBit(true).storeRef(src.fulfill_payload); } else { b_0.storeBit(false); }
        if (src.reject_payload !== null && src.reject_payload !== undefined) { b_0.storeBit(true).storeRef(src.reject_payload); } else { b_0.storeBit(false); }
    };
}

export function loadSwapParams(slice: Slice) {
    let sc_0 = slice;
    let _deadline = sc_0.loadUintBig(32);
    let _recipient_addr = sc_0.loadMaybeAddress();
    let _referral_addr = sc_0.loadMaybeAddress();
    let _fulfill_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _reject_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SwapParams' as const, deadline: _deadline, recipient_addr: _recipient_addr, referral_addr: _referral_addr, fulfill_payload: _fulfill_payload, reject_payload: _reject_payload };
}

function loadTupleSwapParams(source: TupleReader) {
    let _deadline = source.readBigNumber();
    let _recipient_addr = source.readAddressOpt();
    let _referral_addr = source.readAddressOpt();
    let _fulfill_payload = source.readCellOpt();
    let _reject_payload = source.readCellOpt();
    return { $$type: 'SwapParams' as const, deadline: _deadline, recipient_addr: _recipient_addr, referral_addr: _referral_addr, fulfill_payload: _fulfill_payload, reject_payload: _reject_payload };
}

function storeTupleSwapParams(source: SwapParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.deadline);
    builder.writeAddress(source.recipient_addr);
    builder.writeAddress(source.referral_addr);
    builder.writeCell(source.fulfill_payload);
    builder.writeCell(source.reject_payload);
    return builder.build();
}

function dictValueParserSwapParams(): DictionaryValue<SwapParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSwapParams(src)).endCell());
        },
        parse: (src) => {
            return loadSwapParams(src.loadRef().beginParse());
        }
    }
}

export type FeedEvent = {
    $$type: 'FeedEvent';
    feeder: Address;
    feed_amount: bigint;
    win_amount: bigint;
}

export function storeFeedEvent(src: FeedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(6878770, 32);
        b_0.storeAddress(src.feeder);
        b_0.storeCoins(src.feed_amount);
        b_0.storeCoins(src.win_amount);
    };
}

export function loadFeedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 6878770) { throw Error('Invalid prefix'); }
    let _feeder = sc_0.loadAddress();
    let _feed_amount = sc_0.loadCoins();
    let _win_amount = sc_0.loadCoins();
    return { $$type: 'FeedEvent' as const, feeder: _feeder, feed_amount: _feed_amount, win_amount: _win_amount };
}

function loadTupleFeedEvent(source: TupleReader) {
    let _feeder = source.readAddress();
    let _feed_amount = source.readBigNumber();
    let _win_amount = source.readBigNumber();
    return { $$type: 'FeedEvent' as const, feeder: _feeder, feed_amount: _feed_amount, win_amount: _win_amount };
}

function storeTupleFeedEvent(source: FeedEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.feeder);
    builder.writeNumber(source.feed_amount);
    builder.writeNumber(source.win_amount);
    return builder.build();
}

function dictValueParserFeedEvent(): DictionaryValue<FeedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFeedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadFeedEvent(src.loadRef().beginParse());
        }
    }
}

 type Lottery_init_args = {
    $$type: 'Lottery_init_args';
    id: bigint;
    poolAddr: Address;
    tonVaultAddr: Address;
    jettonVaultAddr: Address;
    feePercent: bigint;
}

function initLottery_init_args(src: Lottery_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.poolAddr);
        b_0.storeAddress(src.tonVaultAddr);
        let b_1 = new Builder();
        b_1.storeAddress(src.jettonVaultAddr);
        b_1.storeInt(src.feePercent, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function Lottery_init(id: bigint, poolAddr: Address, tonVaultAddr: Address, jettonVaultAddr: Address, feePercent: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('te6cckECLAEACOgAAQHAAQEFofENAgEU/wD0pBP0vPLICwMCAWISBAIBIBAFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtVlZCdkw2VEhvUVVqQm5vbUtzOWFLeUFQamhWMWF3UzVOU0Jjc0dVQWRlcEKCAAEbCvu1E0NIAAYAIBIAsKAJW3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJACASAODAIRs2Q2zzbPGyBgJw0AAicCEbGp9s82zxsgYCcPAAIgAhG+FD7Z5tnjZAwnEQACIQOa0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRfbPPLggsj4QwHMfwHKAFVw2zzJ7VQnFRMBylB4yx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshYFACiINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiEssHWPoCyQHMA/YBkjB/4HAh10nCH5UwINcLH94gghBzYtCcuo7UMNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFQTAxAjbBQoggCUsAPHBRLy9CPAAFFCoASWXwMy+EIC4w5/4CCCELU2IjC64wIeGhYC9CCCEHGGXKG6jh8w0x8BghBxhlyhuvLggdMHATEygV74+EJSUMcF8vR/4CCCEA9HTQO6jjsw0x8BghAPR00DuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxggCQDfhCFscFFfL0f+AgghDVMnbbuuMCGRcBZoIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcBgBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8IwAoMNMfAYIQ1TJ227ry4IHTPwExMH8BKjDTHwGCELU2IjC68uCB0z8BMds8fxsBtPhBbyQTXwP4J28QIaEgghAdzWUAuZmCEB3NZQABoaGRMOJwIYIQC+vCAKEhcAFtLFUgyPhCINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyXBtbVgDbRwB+MhVQFBFyx9YIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIhbrOVfwHKAMyUcDLKAOIhbrOVfwHKAMyUcDLKAOLJEGgdAbTIVWCCEOoGGF1QCMsfFss/UAT6AkE0UEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZBM1AjygAB+gIhbrOVfwHKAMyUcDLKAOLMySlQM39VMG1t2zwjAtDSADHUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMSOAZKkEpwxSILYIgGSpBKdQcCX4RG6X+CX4FX/4ZN4hofgRoKQBu46XI4BkqQSAVSahUhCoURaoJ26zkl8F4w3jDiAfAJgycMhVIIIIaPYyUATLH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIB+gLJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsABPgnIG7y0ICCCvrwgHNwbXCI0CtROVE7UTxVIMhVYNs8yRRDMG1t2zxRUaFQM8hVIIIIaPYyUATLH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIB+gLJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAJCBu8tCAJiUjIQNq+CdvEPhBbyQTXwOhghAdzWUAoXNwbXCI0CkQSVE9UT4DyFVg2zzJEDRBMBUUQzBtbds8AaEiJSMAHAAAAABQYXlvdXQgZmVlAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ACQAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAyIIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYAMAAAAABQYXlvdXQgZnJvbSBwdW1wIHBpZwI47UTQ1AH4Y9IAAY6E2zxsGOD4KNcLCoMJuvLgiSooAfSBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAMBAlECQQIwXRVQPbPCkAEG1w+EIQVlAzAcrTH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0CsAsvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHTB/oAMBBIEEcQRhBFLCvOQA==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initLottery_init_args({ $$type: 'Lottery_init_args', id, poolAddr, tonVaultAddr, jettonVaultAddr, feePercent })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Lottery_errors: { [key: number]: { message: string } } = {
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
    24312: { message: `Only owner is allowed to change fee` },
    36877: { message: `Only owner is allowed to change owner` },
    38064: { message: `Wrong jetton source` },
}

const Lottery_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Feed","header":3040223792,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ChangeFee","header":1904630945,"fields":[{"name":"feePercent","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"ChangeOwner","header":256331011,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Swap","header":3926267997,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"swap_step","type":{"kind":"simple","type":"SwapStep","optional":false}},{"name":"swap_params","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SwapStep","header":null,"fields":[{"name":"pool_addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"params","type":{"kind":"simple","type":"SwapStepParams","optional":false}}]},
    {"name":"SwapStepParams","header":null,"fields":[{"name":"kind","type":{"kind":"simple","type":"bool","optional":false}},{"name":"limit","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"next","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"SwapParams","header":null,"fields":[{"name":"deadline","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"recipient_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"referral_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"fulfill_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"reject_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"FeedEvent","header":6878770,"fields":[{"name":"feeder","type":{"kind":"simple","type":"address","optional":false}},{"name":"feed_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"win_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const Lottery_getters: ABIGetter[] = [
    {"name":"id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getTotalAmount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Lottery_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Feed"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Lottery implements Contract {
    
    static async init(id: bigint, poolAddr: Address, tonVaultAddr: Address, jettonVaultAddr: Address, feePercent: bigint) {
        return await Lottery_init(id, poolAddr, tonVaultAddr, jettonVaultAddr, feePercent);
    }
    
    static async fromInit(id: bigint, poolAddr: Address, tonVaultAddr: Address, jettonVaultAddr: Address, feePercent: bigint) {
        const init = await Lottery_init(id, poolAddr, tonVaultAddr, jettonVaultAddr, feePercent);
        const address = contractAddress(0, init);
        return new Lottery(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Lottery(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Lottery_types,
        getters: Lottery_getters,
        receivers: Lottery_receivers,
        errors: Lottery_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TokenNotification | Feed | ChangeFee | ChangeOwner | TokenExcesses | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Feed') {
            body = beginCell().store(storeFeed(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeFee') {
            body = beginCell().store(storeChangeFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
            body = beginCell().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetTotalAmount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getTotalAmount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}