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

export type HTLC = {
    $$type: 'HTLC';
    hashlock: bigint;
    secret: bigint;
    amount: bigint;
    timelock: bigint;
    sender: Address;
    _receiver: Address;
    redeemed: boolean;
    refunded: boolean;
}

export function storeHTLC(src: HTLC) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.hashlock, 257);
        b_0.storeInt(src.secret, 257);
        b_0.storeInt(src.amount, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.timelock, 257);
        b_1.storeAddress(src.sender);
        b_1.storeAddress(src._receiver);
        b_1.storeBit(src.redeemed);
        b_1.storeBit(src.refunded);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadHTLC(slice: Slice) {
    let sc_0 = slice;
    let _hashlock = sc_0.loadIntBig(257);
    let _secret = sc_0.loadIntBig(257);
    let _amount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _timelock = sc_1.loadIntBig(257);
    let _sender = sc_1.loadAddress();
    let __receiver = sc_1.loadAddress();
    let _redeemed = sc_1.loadBit();
    let _refunded = sc_1.loadBit();
    return { $$type: 'HTLC' as const, hashlock: _hashlock, secret: _secret, amount: _amount, timelock: _timelock, sender: _sender, _receiver: __receiver, redeemed: _redeemed, refunded: _refunded };
}

function loadTupleHTLC(source: TupleReader) {
    let _hashlock = source.readBigNumber();
    let _secret = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _timelock = source.readBigNumber();
    let _sender = source.readAddress();
    let __receiver = source.readAddress();
    let _redeemed = source.readBoolean();
    let _refunded = source.readBoolean();
    return { $$type: 'HTLC' as const, hashlock: _hashlock, secret: _secret, amount: _amount, timelock: _timelock, sender: _sender, _receiver: __receiver, redeemed: _redeemed, refunded: _refunded };
}

function storeTupleHTLC(source: HTLC) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.hashlock);
    builder.writeNumber(source.secret);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.timelock);
    builder.writeAddress(source.sender);
    builder.writeAddress(source._receiver);
    builder.writeBoolean(source.redeemed);
    builder.writeBoolean(source.refunded);
    return builder.build();
}

function dictValueParserHTLC(): DictionaryValue<HTLC> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeHTLC(src)).endCell());
        },
        parse: (src) => {
            return loadHTLC(src.loadRef().beginParse());
        }
    }
}

export type TonTransferInitiated = {
    $$type: 'TonTransferInitiated';
    __hashlock: bigint;
    __amount: bigint;
    __chainId: bigint;
    __timelock: bigint;
    __sender: Address;
    __receiver: Address;
    __targetCurrencyReceiverAddress: string;
}

export function storeTonTransferInitiated(src: TonTransferInitiated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.__hashlock, 257);
        b_0.storeInt(src.__amount, 257);
        b_0.storeInt(src.__chainId, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.__timelock, 257);
        b_1.storeAddress(src.__sender);
        b_1.storeAddress(src.__receiver);
        b_1.storeStringRefTail(src.__targetCurrencyReceiverAddress);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTonTransferInitiated(slice: Slice) {
    let sc_0 = slice;
    let ___hashlock = sc_0.loadIntBig(257);
    let ___amount = sc_0.loadIntBig(257);
    let ___chainId = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let ___timelock = sc_1.loadIntBig(257);
    let ___sender = sc_1.loadAddress();
    let ___receiver = sc_1.loadAddress();
    let ___targetCurrencyReceiverAddress = sc_1.loadStringRefTail();
    return { $$type: 'TonTransferInitiated' as const, __hashlock: ___hashlock, __amount: ___amount, __chainId: ___chainId, __timelock: ___timelock, __sender: ___sender, __receiver: ___receiver, __targetCurrencyReceiverAddress: ___targetCurrencyReceiverAddress };
}

function loadTupleTonTransferInitiated(source: TupleReader) {
    let ___hashlock = source.readBigNumber();
    let ___amount = source.readBigNumber();
    let ___chainId = source.readBigNumber();
    let ___timelock = source.readBigNumber();
    let ___sender = source.readAddress();
    let ___receiver = source.readAddress();
    let ___targetCurrencyReceiverAddress = source.readString();
    return { $$type: 'TonTransferInitiated' as const, __hashlock: ___hashlock, __amount: ___amount, __chainId: ___chainId, __timelock: ___timelock, __sender: ___sender, __receiver: ___receiver, __targetCurrencyReceiverAddress: ___targetCurrencyReceiverAddress };
}

function storeTupleTonTransferInitiated(source: TonTransferInitiated) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.__hashlock);
    builder.writeNumber(source.__amount);
    builder.writeNumber(source.__chainId);
    builder.writeNumber(source.__timelock);
    builder.writeAddress(source.__sender);
    builder.writeAddress(source.__receiver);
    builder.writeString(source.__targetCurrencyReceiverAddress);
    return builder.build();
}

function dictValueParserTonTransferInitiated(): DictionaryValue<TonTransferInitiated> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTonTransferInitiated(src)).endCell());
        },
        parse: (src) => {
            return loadTonTransferInitiated(src.loadRef().beginParse());
        }
    }
}

export type Create = {
    $$type: 'Create';
    data: TonTransferInitiated;
}

export function storeCreate(src: Create) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2910597223, 32);
        b_0.store(storeTonTransferInitiated(src.data));
    };
}

export function loadCreate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2910597223) { throw Error('Invalid prefix'); }
    let _data = loadTonTransferInitiated(sc_0);
    return { $$type: 'Create' as const, data: _data };
}

function loadTupleCreate(source: TupleReader) {
    const _data = loadTupleTonTransferInitiated(source.readTuple());
    return { $$type: 'Create' as const, data: _data };
}

function storeTupleCreate(source: Create) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleTonTransferInitiated(source.data));
    return builder.build();
}

function dictValueParserCreate(): DictionaryValue<Create> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreate(src)).endCell());
        },
        parse: (src) => {
            return loadCreate(src.loadRef().beginParse());
        }
    }
}

export type TonTransferClaimed = {
    $$type: 'TonTransferClaimed';
    __hashlock: bigint;
    __receiver: Address;
    __amount: bigint;
}

export function storeTonTransferClaimed(src: TonTransferClaimed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.__hashlock, 257);
        b_0.storeAddress(src.__receiver);
        b_0.storeInt(src.__amount, 257);
    };
}

export function loadTonTransferClaimed(slice: Slice) {
    let sc_0 = slice;
    let ___hashlock = sc_0.loadIntBig(257);
    let ___receiver = sc_0.loadAddress();
    let ___amount = sc_0.loadIntBig(257);
    return { $$type: 'TonTransferClaimed' as const, __hashlock: ___hashlock, __receiver: ___receiver, __amount: ___amount };
}

function loadTupleTonTransferClaimed(source: TupleReader) {
    let ___hashlock = source.readBigNumber();
    let ___receiver = source.readAddress();
    let ___amount = source.readBigNumber();
    return { $$type: 'TonTransferClaimed' as const, __hashlock: ___hashlock, __receiver: ___receiver, __amount: ___amount };
}

function storeTupleTonTransferClaimed(source: TonTransferClaimed) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.__hashlock);
    builder.writeAddress(source.__receiver);
    builder.writeNumber(source.__amount);
    return builder.build();
}

function dictValueParserTonTransferClaimed(): DictionaryValue<TonTransferClaimed> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTonTransferClaimed(src)).endCell());
        },
        parse: (src) => {
            return loadTonTransferClaimed(src.loadRef().beginParse());
        }
    }
}

export type Redeem = {
    $$type: 'Redeem';
    data: TonTransferClaimed;
}

export function storeRedeem(src: Redeem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(96756980, 32);
        b_0.store(storeTonTransferClaimed(src.data));
    };
}

export function loadRedeem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 96756980) { throw Error('Invalid prefix'); }
    let _data = loadTonTransferClaimed(sc_0);
    return { $$type: 'Redeem' as const, data: _data };
}

function loadTupleRedeem(source: TupleReader) {
    const _data = loadTupleTonTransferClaimed(source.readTuple());
    return { $$type: 'Redeem' as const, data: _data };
}

function storeTupleRedeem(source: Redeem) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleTonTransferClaimed(source.data));
    return builder.build();
}

function dictValueParserRedeem(): DictionaryValue<Redeem> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRedeem(src)).endCell());
        },
        parse: (src) => {
            return loadRedeem(src.loadRef().beginParse());
        }
    }
}

export type TonTransferRefunded = {
    $$type: 'TonTransferRefunded';
    __hashlock: bigint;
    __receiver: Address;
    __amount: bigint;
}

export function storeTonTransferRefunded(src: TonTransferRefunded) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.__hashlock, 257);
        b_0.storeAddress(src.__receiver);
        b_0.storeInt(src.__amount, 257);
    };
}

export function loadTonTransferRefunded(slice: Slice) {
    let sc_0 = slice;
    let ___hashlock = sc_0.loadIntBig(257);
    let ___receiver = sc_0.loadAddress();
    let ___amount = sc_0.loadIntBig(257);
    return { $$type: 'TonTransferRefunded' as const, __hashlock: ___hashlock, __receiver: ___receiver, __amount: ___amount };
}

function loadTupleTonTransferRefunded(source: TupleReader) {
    let ___hashlock = source.readBigNumber();
    let ___receiver = source.readAddress();
    let ___amount = source.readBigNumber();
    return { $$type: 'TonTransferRefunded' as const, __hashlock: ___hashlock, __receiver: ___receiver, __amount: ___amount };
}

function storeTupleTonTransferRefunded(source: TonTransferRefunded) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.__hashlock);
    builder.writeAddress(source.__receiver);
    builder.writeNumber(source.__amount);
    return builder.build();
}

function dictValueParserTonTransferRefunded(): DictionaryValue<TonTransferRefunded> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTonTransferRefunded(src)).endCell());
        },
        parse: (src) => {
            return loadTonTransferRefunded(src.loadRef().beginParse());
        }
    }
}

export type Refund = {
    $$type: 'Refund';
    data: TonTransferRefunded;
}

export function storeRefund(src: Refund) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1029328183, 32);
        b_0.store(storeTonTransferRefunded(src.data));
    };
}

export function loadRefund(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1029328183) { throw Error('Invalid prefix'); }
    let _data = loadTonTransferRefunded(sc_0);
    return { $$type: 'Refund' as const, data: _data };
}

function loadTupleRefund(source: TupleReader) {
    const _data = loadTupleTonTransferRefunded(source.readTuple());
    return { $$type: 'Refund' as const, data: _data };
}

function storeTupleRefund(source: Refund) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleTonTransferRefunded(source.data));
    return builder.build();
}

function dictValueParserRefund(): DictionaryValue<Refund> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRefund(src)).endCell());
        },
        parse: (src) => {
            return loadRefund(src.loadRef().beginParse());
        }
    }
}

 type HashedTimeLockTON_init_args = {
    $$type: 'HashedTimeLockTON_init_args';
}

function initHashedTimeLockTON_init_args(src: HashedTimeLockTON_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function HashedTimeLockTON_init() {
    const __code = Cell.fromBase64('te6ccgECFwEABMcAART/APSkE/S88sgLAQIBYgIDApjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABAfQAye1UDwQCAVgLDASuAZIwf+BwIddJwh+VMCDXCx/eIIIQrXwwZ7qPKDDTHwGCEK18MGe68uCB2zxsF18H+EFvJBNfA/gof1hxECNtbW3bPH/gIIIQBcRk9LrjAiCCED1aTTe6BQkGBwDAgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1DDQEEcQRhBFAZAw0x8BghAFxGT0uvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFUgbBMyf1hxECNtbW3bPH8JAvyOyDDTHwGCED1aTTe68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAVSBsEzJ/WHEQI21tbds8f+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAJCAE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwJAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAoAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCAecNDgIBSBUWAJSr0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopAI8q3bbPAHbPDEgbpIwbZkgbvLQgG8obwjiIG6SMG3eDxABPO1E0NQB+GPSAAGU9AQBMeAw+CjXCwqDCbry4InbPBEDsmbbPI6egQEBVEETWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwji4DFwVHAAUwDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFMREhQTAAJtAUaBAQEiAln0DW+hkjBt3yBukjBtjofQ2zxsGG8I4m6zkX/gcBQAYMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcHBvCADEgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDSADAQWBBXEFYAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtZHQyUm1GTGRUb1JndGg0ZHFmRXA4djJkbkM1N2o0ZkVMaHRZTDhSTURYQ3eCA=');
    const __system = Cell.fromBase64('te6cckECGQEABNEAAQHAAQEFoRvRAgEU/wD0pBP0vPLICwMCAWIPBAIBWAgFAgFIBwYAdbJu40NWlwZnM6Ly9RbWR0MlJtRkxkVG9SZ3RoNGRxZkVwOHYyZG5DNTdqNGZFTGh0WUw4Uk1EWEN3ggABGwr7tRNDSAAGACAecOCQI8q3bbPAHbPDEgbpIwbZkgbvLQgG8obwjiIG6SMG3eFwoDsmbbPI6egQEBVEETWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwji4DFwVHAAUwDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFMRDA0LAGDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHBwbwgBRoEBASICWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjibrORf+BwDQDEgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDSADAQWBBXEFYAlKvRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnCdl05as07LczoOlm2UZuikApjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABAfQAye1UFxAErgGSMH/gcCHXScIflTAg1wsf3iCCEK18MGe6jygw0x8BghCtfDBnuvLggds8bBdfB/hBbyQTXwP4KH9YcRAjbW1t2zx/4CCCEAXEZPS64wIgghA9Wk03uhYUExEC/I7IMNMfAYIQPVpNN7ry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBVIGwTMn9YcRAjbW1t2zx/4IIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcBQSATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPBQBkDDTHwGCEAXEZPS68uCBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAVSBsEzJ/WHEQI21tbds8fxQByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAFQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzADAgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1DDQEEcQRhBFATztRNDUAfhj0gABlPQEATHgMPgo1wsKgwm68uCJ2zwYAAJtdogMSw==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initHashedTimeLockTON_init_args({ $$type: 'HashedTimeLockTON_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const HashedTimeLockTON_errors: { [key: number]: { message: string } } = {
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
    4670: { message: `Funds Not Sent` },
    11493: { message: `Contract Already Exists` },
    13236: { message: `Contract does not exist` },
    21683: { message: `Not Future Timelock` },
    38239: { message: `Not Passed Timelock` },
    46887: { message: `Already Redeemed` },
    49162: { message: `Already Refunded` },
    50918: { message: `Hashlock Not Match` },
}

const HashedTimeLockTON_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"HTLC","header":null,"fields":[{"name":"hashlock","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"secret","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"timelock","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"_receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"redeemed","type":{"kind":"simple","type":"bool","optional":false}},{"name":"refunded","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TonTransferInitiated","header":null,"fields":[{"name":"__hashlock","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"__amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"__chainId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"__timelock","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"__sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"__receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"__targetCurrencyReceiverAddress","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Create","header":2910597223,"fields":[{"name":"data","type":{"kind":"simple","type":"TonTransferInitiated","optional":false}}]},
    {"name":"TonTransferClaimed","header":null,"fields":[{"name":"__hashlock","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"__receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"__amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Redeem","header":96756980,"fields":[{"name":"data","type":{"kind":"simple","type":"TonTransferClaimed","optional":false}}]},
    {"name":"TonTransferRefunded","header":null,"fields":[{"name":"__hashlock","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"__receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"__amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Refund","header":1029328183,"fields":[{"name":"data","type":{"kind":"simple","type":"TonTransferRefunded","optional":false}}]},
]

const HashedTimeLockTON_getters: ABIGetter[] = [
    {"name":"getHTLCDetails","arguments":[{"name":"hashlock","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"HTLC","optional":true}},
]

const HashedTimeLockTON_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Create"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Redeem"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Refund"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class HashedTimeLockTON implements Contract {
    
    static async init() {
        return await HashedTimeLockTON_init();
    }
    
    static async fromInit() {
        const init = await HashedTimeLockTON_init();
        const address = contractAddress(0, init);
        return new HashedTimeLockTON(address, init);
    }
    
    static fromAddress(address: Address) {
        return new HashedTimeLockTON(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  HashedTimeLockTON_types,
        getters: HashedTimeLockTON_getters,
        receivers: HashedTimeLockTON_receivers,
        errors: HashedTimeLockTON_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Create | Redeem | Refund | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Create') {
            body = beginCell().store(storeCreate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Redeem') {
            body = beginCell().store(storeRedeem(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Refund') {
            body = beginCell().store(storeRefund(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetHtlcDetails(provider: ContractProvider, hashlock: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(hashlock);
        let source = (await provider.get('getHTLCDetails', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleHTLC(result_p) : null;
        return result;
    }
    
}