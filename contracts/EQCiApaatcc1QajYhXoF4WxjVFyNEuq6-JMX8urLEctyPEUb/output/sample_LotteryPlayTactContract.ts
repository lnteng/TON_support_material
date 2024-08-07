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

export type JoinInfo = {
    $$type: 'JoinInfo';
    seqno: bigint;
}

export function storeJoinInfo(src: JoinInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3212914821, 32);
        b_0.storeUint(src.seqno, 128);
    };
}

export function loadJoinInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3212914821) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(128);
    return { $$type: 'JoinInfo' as const, seqno: _seqno };
}

function loadTupleJoinInfo(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'JoinInfo' as const, seqno: _seqno };
}

function storeTupleJoinInfo(source: JoinInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserJoinInfo(): DictionaryValue<JoinInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJoinInfo(src)).endCell());
        },
        parse: (src) => {
            return loadJoinInfo(src.loadRef().beginParse());
        }
    }
}

export type JoinChildInfo = {
    $$type: 'JoinChildInfo';
    seqno: bigint;
    address: Address;
}

export function storeJoinChildInfo(src: JoinChildInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3838157125, 32);
        b_0.storeUint(src.seqno, 128);
        b_0.storeAddress(src.address);
    };
}

export function loadJoinChildInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3838157125) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(128);
    let _address = sc_0.loadAddress();
    return { $$type: 'JoinChildInfo' as const, seqno: _seqno, address: _address };
}

function loadTupleJoinChildInfo(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'JoinChildInfo' as const, seqno: _seqno, address: _address };
}

function storeTupleJoinChildInfo(source: JoinChildInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserJoinChildInfo(): DictionaryValue<JoinChildInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJoinChildInfo(src)).endCell());
        },
        parse: (src) => {
            return loadJoinChildInfo(src.loadRef().beginParse());
        }
    }
}

export type DrawInfo = {
    $$type: 'DrawInfo';
    seqno: bigint;
}

export function storeDrawInfo(src: DrawInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3477676095, 32);
        b_0.storeUint(src.seqno, 128);
    };
}

export function loadDrawInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3477676095) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(128);
    return { $$type: 'DrawInfo' as const, seqno: _seqno };
}

function loadTupleDrawInfo(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'DrawInfo' as const, seqno: _seqno };
}

function storeTupleDrawInfo(source: DrawInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserDrawInfo(): DictionaryValue<DrawInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDrawInfo(src)).endCell());
        },
        parse: (src) => {
            return loadDrawInfo(src.loadRef().beginParse());
        }
    }
}

export type DrawChildInfo = {
    $$type: 'DrawChildInfo';
    seqno: bigint;
    address: Address;
}

export function storeDrawChildInfo(src: DrawChildInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2784733286, 32);
        b_0.storeUint(src.seqno, 128);
        b_0.storeAddress(src.address);
    };
}

export function loadDrawChildInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2784733286) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(128);
    let _address = sc_0.loadAddress();
    return { $$type: 'DrawChildInfo' as const, seqno: _seqno, address: _address };
}

function loadTupleDrawChildInfo(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'DrawChildInfo' as const, seqno: _seqno, address: _address };
}

function storeTupleDrawChildInfo(source: DrawChildInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserDrawChildInfo(): DictionaryValue<DrawChildInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDrawChildInfo(src)).endCell());
        },
        parse: (src) => {
            return loadDrawChildInfo(src.loadRef().beginParse());
        }
    }
}

export type TakeInfo = {
    $$type: 'TakeInfo';
    receiver: Address;
}

export function storeTakeInfo(src: TakeInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2795601735, 32);
        b_0.storeAddress(src.receiver);
    };
}

export function loadTakeInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2795601735) { throw Error('Invalid prefix'); }
    let _receiver = sc_0.loadAddress();
    return { $$type: 'TakeInfo' as const, receiver: _receiver };
}

function loadTupleTakeInfo(source: TupleReader) {
    let _receiver = source.readAddress();
    return { $$type: 'TakeInfo' as const, receiver: _receiver };
}

function storeTupleTakeInfo(source: TakeInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserTakeInfo(): DictionaryValue<TakeInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTakeInfo(src)).endCell());
        },
        parse: (src) => {
            return loadTakeInfo(src.loadRef().beginParse());
        }
    }
}

export type PlayerInfo = {
    $$type: 'PlayerInfo';
    address: Address;
    amount: bigint;
}

export function storePlayerInfo(src: PlayerInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeUint(src.amount, 128);
    };
}

export function loadPlayerInfo(slice: Slice) {
    let sc_0 = slice;
    let _address = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(128);
    return { $$type: 'PlayerInfo' as const, address: _address, amount: _amount };
}

function loadTuplePlayerInfo(source: TupleReader) {
    let _address = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'PlayerInfo' as const, address: _address, amount: _amount };
}

function storeTuplePlayerInfo(source: PlayerInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserPlayerInfo(): DictionaryValue<PlayerInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePlayerInfo(src)).endCell());
        },
        parse: (src) => {
            return loadPlayerInfo(src.loadRef().beginParse());
        }
    }
}

 type LotteryPlayTactContract_init_args = {
    $$type: 'LotteryPlayTactContract_init_args';
    owner: Address;
    father: Address;
    seqno: bigint;
}

function initLotteryPlayTactContract_init_args(src: LotteryPlayTactContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.father);
        b_0.storeInt(src.seqno, 257);
    };
}

async function LotteryPlayTactContract_init(owner: Address, father: Address, seqno: bigint) {
    const __code = Cell.fromBase64('te6ccgECOgEACR0AART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVF9s88uCCNgQFAgEgHR4E2gGSMH/gcCHXScIflTAg1wsf3iCCEOTFoUW6jrUw0x8BghDkxaFFuvLggdN/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgghCl+6hmuuMCIIIQpqF/R7rjAoIQlGqYtroGBwgJAMjI+EMBzH8BygBVcFCHINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTy3/0AMsHgQEBzwASygAByMt/yQHMye1UAfL4QW8kE18DggDBPfhCK8cF8vSCAOxrIYIQBfXhAL7y9IE6/SNus/L0gXJuIm6z8vRRIchZghDkxaFFUAPLH8t/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAjCgFkMNMfAYIQpfuoZrry4IHTf/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBINApAw0x8BghCmoX9HuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxggDBPfhCUqDHBfL0cIEAgn+IFEMwbW3bPH8ZGwFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAaAsKO3TKIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAAYEBAQLIWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLf8kkEDYBIG6VMFn0WjCUQTP0FeICpPgnbxATFOMNCwwAFgAAAABqb2luaW5nA0wxiMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHCAQn+IFEMwbW3bPBgYGwO8ggDBPfhCKscF8vTIWYIQpfuoZlADyx/LfwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIY8HI8AA4w9EQ+MNfw4PEANeMWwiiMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AH9tcCCBAIJ/iCtVMBRDMG1t2zwREhsEdDD4J28Q2zz4J28QgGSpBPgnbxD4QW8kE18DoYIQBfXhAKEBoSDBAZIwcN5yf4gUQzBtbds8cIEAgn8TFBsVA1KIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcIEAgn+IK1UwFEMwbW3bPBgYGwAqAAAAAG5vYm9keSBqb2luZWQgeWV0AEIAAAAAc2VydmljZSBjaGFyZ2UsIG5vYm9keSBqb2luZWQByGwhcYBk+ERul/gl+BV/+GTeIaH4EaD4J28QAaiAZKkEcFMAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IghmlMjuZNTBbmRcOKK6GwifwGlQTMWABoAAAAAd2luIGJvbnVzAhqIK1UwFEMwbW3bPEFDFxsAljElgQEBIln0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTf1lsEm8C4iBu8tCAbyIToAGkEgAkAAAAAHNlcnZpY2UgY2hhcmdlACoAAAAASXQncyBhbHJlYWR5IG92ZXIAIAAAAAB0YWtlIHN1Y2Nlc3MBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8GwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAcAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgFuHyACASAjJAIRsfB2zzbPGyBgNiECEbBMNs82zxsgYDYiAQggeds8KwACJgIBICUmAgEgLC0CASAnKACVt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQAhGxzPbPNs8bIGA2KQIRsbA2zzbPGyBgNioAAiMCKPgnbxDBAY6EIHnbPOD4J28Qeds8KysA2iDBASHCTbHy0IbIIsEAmIAtAcsHAqMC3n9wbwAEjhsEeqkMIMAAUjCws5twM6YwFG+MBKQEA5Ew4gTkAbOXAoAub4wCpN6OEAN6qQymMBNvjAOkIsAAEDTmMyKlA5pTEm+BAcsHAqUC5GwhydACASAuLwIBIDM0AgEgMDEAdbJu40NWlwZnM6Ly9RbWZSVjFuM1J3WnU2aWlmbnNZM2pweEhrR05NTHk3dzFraXI0SEJveGhhYWNNggABGtX3aiaGkAAMACEawQbZ5tnjZAwDYyAAIhAhGzZXbPNs8bIGA2NQIRsUj2zzbPGyBgNjcA9CPAAI4ucCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiOAkgQEBJFn0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTf1lsEm8C4iBu8tCAbyIwAejtRNDUAfhj0gABjlz6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB03/0BNMHgQEB1wDSANQB0NN/MBgXFhUUQzBsGOD4KNcLCoMJuvLgiTgAAiQBmPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFUgA9FY2zw5AAxtcFMAcAE=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initLotteryPlayTactContract_init_args({ $$type: 'LotteryPlayTactContract_init_args', owner, father, seqno })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const LotteryPlayTactContract_errors: { [key: number]: { message: string } } = {
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
    15101: { message: `seqno can not empty` },
    29294: { message: `address can not empty` },
    49469: { message: `Access denied` },
    60523: { message: `the value must be greater than 0.1` },
}

const LotteryPlayTactContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JoinInfo","header":3212914821,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
    {"name":"JoinChildInfo","header":3838157125,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DrawInfo","header":3477676095,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
    {"name":"DrawChildInfo","header":2784733286,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TakeInfo","header":2795601735,"fields":[{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PlayerInfo","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
]

const LotteryPlayTactContract_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"father","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"playerList","arguments":[],"returnType":{"kind":"dict","key":"int","value":"PlayerInfo","valueFormat":"ref"}},
    {"name":"playerQuantity","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"finished","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"winner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"tonQuantity","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
]

const LotteryPlayTactContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"JoinChildInfo"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DrawChildInfo"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TakeInfo"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class LotteryPlayTactContract implements Contract {
    
    static async init(owner: Address, father: Address, seqno: bigint) {
        return await LotteryPlayTactContract_init(owner, father, seqno);
    }
    
    static async fromInit(owner: Address, father: Address, seqno: bigint) {
        const init = await LotteryPlayTactContract_init(owner, father, seqno);
        const address = contractAddress(0, init);
        return new LotteryPlayTactContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new LotteryPlayTactContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  LotteryPlayTactContract_types,
        getters: LotteryPlayTactContract_getters,
        receivers: LotteryPlayTactContract_receivers,
        errors: LotteryPlayTactContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JoinChildInfo | DrawChildInfo | TakeInfo | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JoinChildInfo') {
            body = beginCell().store(storeJoinChildInfo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DrawChildInfo') {
            body = beginCell().store(storeDrawChildInfo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TakeInfo') {
            body = beginCell().store(storeTakeInfo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getFather(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('father', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getPlayerList(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('playerList', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPlayerInfo(), source.readCellOpt());
        return result;
    }
    
    async getPlayerQuantity(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('playerQuantity', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getFinished(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('finished', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getWinner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('winner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getTonQuantity(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tonQuantity', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
}