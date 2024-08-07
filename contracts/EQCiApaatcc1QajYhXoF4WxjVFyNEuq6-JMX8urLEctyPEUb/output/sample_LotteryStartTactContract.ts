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

 type LotteryStartTactContract_init_args = {
    $$type: 'LotteryStartTactContract_init_args';
    owner: Address;
    transno: bigint;
}

function initLotteryStartTactContract_init_args(src: LotteryStartTactContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.transno, 257);
    };
}

async function LotteryStartTactContract_init(owner: Address, transno: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initLotteryStartTactContract_init_args({ $$type: 'LotteryStartTactContract_init_args', owner, transno })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const LotteryStartTactContract_errors: { [key: number]: { message: string } } = {
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

const LotteryStartTactContract_types: ABIType[] = [
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

const LotteryStartTactContract_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
]

const LotteryStartTactContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"JoinInfo"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DrawInfo"}},
    {"receiver":"internal","message":{"kind":"text","text":"recharge"}},
    {"receiver":"internal","message":{"kind":"text","text":"recycle"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class LotteryStartTactContract implements Contract {
    
    static async init(owner: Address, transno: bigint) {
        return await LotteryStartTactContract_init(owner, transno);
    }
    
    static async fromInit(owner: Address, transno: bigint) {
        const init = await LotteryStartTactContract_init(owner, transno);
        const address = contractAddress(0, init);
        return new LotteryStartTactContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new LotteryStartTactContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  LotteryStartTactContract_types,
        getters: LotteryStartTactContract_getters,
        receivers: LotteryStartTactContract_receivers,
        errors: LotteryStartTactContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JoinInfo | DrawInfo | 'recharge' | 'recycle' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JoinInfo') {
            body = beginCell().store(storeJoinInfo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DrawInfo') {
            body = beginCell().store(storeDrawInfo(message)).endCell();
        }
        if (message === 'recharge') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'recycle') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
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
    
}