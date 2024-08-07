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

export type DataResponse = {
    $$type: 'DataResponse';
    master: Address;
    owner: Address;
    key: string;
    data: string;
}

export function storeDataResponse(src: DataResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.master);
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.key);
        b_0.storeStringRefTail(src.data);
    };
}

export function loadDataResponse(slice: Slice) {
    let sc_0 = slice;
    let _master = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _key = sc_0.loadStringRefTail();
    let _data = sc_0.loadStringRefTail();
    return { $$type: 'DataResponse' as const, master: _master, owner: _owner, key: _key, data: _data };
}

function loadTupleDataResponse(source: TupleReader) {
    let _master = source.readAddress();
    let _owner = source.readAddress();
    let _key = source.readString();
    let _data = source.readString();
    return { $$type: 'DataResponse' as const, master: _master, owner: _owner, key: _key, data: _data };
}

function storeTupleDataResponse(source: DataResponse) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.master);
    builder.writeAddress(source.owner);
    builder.writeString(source.key);
    builder.writeString(source.data);
    return builder.build();
}

function dictValueParserDataResponse(): DictionaryValue<DataResponse> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDataResponse(src)).endCell());
        },
        parse: (src) => {
            return loadDataResponse(src.loadRef().beginParse());
        }
    }
}

export type DataInput = {
    $$type: 'DataInput';
    key: string;
    data: string;
}

export function storeDataInput(src: DataInput) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3684417297, 32);
        b_0.storeStringRefTail(src.key);
        b_0.storeStringRefTail(src.data);
    };
}

export function loadDataInput(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3684417297) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadStringRefTail();
    let _data = sc_0.loadStringRefTail();
    return { $$type: 'DataInput' as const, key: _key, data: _data };
}

function loadTupleDataInput(source: TupleReader) {
    let _key = source.readString();
    let _data = source.readString();
    return { $$type: 'DataInput' as const, key: _key, data: _data };
}

function storeTupleDataInput(source: DataInput) {
    let builder = new TupleBuilder();
    builder.writeString(source.key);
    builder.writeString(source.data);
    return builder.build();
}

function dictValueParserDataInput(): DictionaryValue<DataInput> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDataInput(src)).endCell());
        },
        parse: (src) => {
            return loadDataInput(src.loadRef().beginParse());
        }
    }
}

export type DataInputTest = {
    $$type: 'DataInputTest';
    key: string;
    data: string;
}

export function storeDataInputTest(src: DataInputTest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3590725090, 32);
        b_0.storeStringRefTail(src.key);
        b_0.storeStringRefTail(src.data);
    };
}

export function loadDataInputTest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3590725090) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadStringRefTail();
    let _data = sc_0.loadStringRefTail();
    return { $$type: 'DataInputTest' as const, key: _key, data: _data };
}

function loadTupleDataInputTest(source: TupleReader) {
    let _key = source.readString();
    let _data = source.readString();
    return { $$type: 'DataInputTest' as const, key: _key, data: _data };
}

function storeTupleDataInputTest(source: DataInputTest) {
    let builder = new TupleBuilder();
    builder.writeString(source.key);
    builder.writeString(source.data);
    return builder.build();
}

function dictValueParserDataInputTest(): DictionaryValue<DataInputTest> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDataInputTest(src)).endCell());
        },
        parse: (src) => {
            return loadDataInputTest(src.loadRef().beginParse());
        }
    }
}

export type Holder = {
    $$type: 'Holder';
    total: bigint;
    holder: Dictionary<bigint, bigint>;
}

export function storeHolder(src: Holder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total, 257);
        b_0.storeDict(src.holder, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    };
}

export function loadHolder(slice: Slice) {
    let sc_0 = slice;
    let _total = sc_0.loadIntBig(257);
    let _holder = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'Holder' as const, total: _total, holder: _holder };
}

function loadTupleHolder(source: TupleReader) {
    let _total = source.readBigNumber();
    let _holder = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'Holder' as const, total: _total, holder: _holder };
}

function storeTupleHolder(source: Holder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total);
    builder.writeCell(source.holder.size > 0 ? beginCell().storeDictDirect(source.holder, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserHolder(): DictionaryValue<Holder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeHolder(src)).endCell());
        },
        parse: (src) => {
            return loadHolder(src.loadRef().beginParse());
        }
    }
}

export type Data = {
    $$type: 'Data';
    key: string;
    data: string;
}

export function storeData(src: Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.key);
        b_0.storeStringRefTail(src.data);
    };
}

export function loadData(slice: Slice) {
    let sc_0 = slice;
    let _key = sc_0.loadStringRefTail();
    let _data = sc_0.loadStringRefTail();
    return { $$type: 'Data' as const, key: _key, data: _data };
}

function loadTupleData(source: TupleReader) {
    let _key = source.readString();
    let _data = source.readString();
    return { $$type: 'Data' as const, key: _key, data: _data };
}

function storeTupleData(source: Data) {
    let builder = new TupleBuilder();
    builder.writeString(source.key);
    builder.writeString(source.data);
    return builder.build();
}

function dictValueParserData(): DictionaryValue<Data> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeData(src)).endCell());
        },
        parse: (src) => {
            return loadData(src.loadRef().beginParse());
        }
    }
}

 type DataSaver_init_args = {
    $$type: 'DataSaver_init_args';
}

function initDataSaver_init_args(src: DataSaver_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function DataSaver_init() {
    const __code = Cell.fromBase64('te6ccgECFQEAA7MAART/APSkE/S88sgLAQIBYgIDArrQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCyPhDAcx/AcoAVTBQNIEBAc8A9AD0AAHI9ADJAczJ7VQOBAIBIAkKArABkjB/4HAh10nCH5UwINcLH94gghDbm78Ruo6YMNMfAYIQ25u/Ebry4IHUAdAB1AHQEmwS4IIQ1gYd4rqOl9MfAYIQ1gYd4rry4IHUAdAB1AHQEmwS4DBwBQYC2vhBbyQQI18DBqQFgQEBU2cgbpUwWfRaMJRBM/QU4iSBAQsoWfQLb6GSMG3fIG6SMG2d0IEBAdcA9ARZbBJvAuJu4w8DAYEBAQLIWchYzxbJWMzIWM8WyQHMyVJAIG6VMFn0WjCUQTP0FeIQI38IBwHg+EFvJBAjXwMGpAWBAQFTZyBulTBZ9FowlEEz9BTiJIEBCyhZ9AtvoZIwbd8gbpIwbZ3QgQEB1wD0BFlsEm8C4m6SNgPjDQMBgQEBAshZyFjPFslYzMhYzxbJAczJUkAgbpUwWfRaMJRBM/QV4hAjfwgAyCSBAQsoWfQLb6GSMG3fIG6SMG2d0IEBAdcA9ARZbBJvAuIgbvLQgG8igQEBVHKAIW6VW1n0WjCYyAHPAEEz9ELiAaSBAQsCyFkCgQEBzwD0AMkQNkGAIG6VMFn0WTCUQTP0E+IAem2BAQFwU4EhbpVbWfRaMJjIAc8AQTP0QuJxAQGBAQsCyFkCgQEBzwD0AMkQNkGAIG6VMFn0WTCUQTP0E+ICASALDAIBIBESAhW7SJ2zxVA9s8bEKA4NAhG6WH2zzbPGxCgODwBSgQEBIgJZ9A1voZIwbd8gbpIwbZ3Q1AHQAdQB0BJsEm8C4iBu8tCAbyIBXu1E0NQB+GPSAAGOFIEBAdcA9AT0BNQB0PQEMBRDMGwU4DD4KNcLCoMJuvLgids8EABi+EFvJBAjXwOBAQsjAln0C2+hkjBt3yBukjBtndCBAQHXAPQEWWwSbwLiIG7y0IBvIgAIcG1tbQCVu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAgFIExQAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtYVMzbnRRTmREOXA2Q3dOUm1kMlNzY1hOczVSRG9HeXQxS3RHYXFvd01mOGSCA=');
    const __system = Cell.fromBase64('te6cckECFwEAA70AAQHAAQEFoITNAgEU/wD0pBP0vPLICwMCAWIPBAIBIAoFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtYVMzbnRRTmREOXA2Q3dOUm1kMlNzY1hOczVSRG9HeXQxS3RHYXFvd01mOGSCAAEbCvu1E0NIAAYACVu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAgEgDQsCEbpYfbPNs8bEKBUMAGL4QW8kECNfA4EBCyMCWfQLb6GSMG3fIG6SMG2d0IEBAdcA9ARZbBJvAuIgbvLQgG8iAhW7SJ2zxVA9s8bEKBUOAFKBAQEiAln0DW+hkjBt3yBukjBtndDUAdAB1AHQEmwSbwLiIG7y0IBvIgK60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLggsj4QwHMfwHKAFUwUDSBAQHPAPQA9AAByPQAyQHMye1UFRACsAGSMH/gcCHXScIflTAg1wsf3iCCENubvxG6jpgw0x8BghDbm78RuvLggdQB0AHUAdASbBLgghDWBh3iuo6X0x8BghDWBh3iuvLggdQB0AHUAdASbBLgMHASEQHg+EFvJBAjXwMGpAWBAQFTZyBulTBZ9FowlEEz9BTiJIEBCyhZ9AtvoZIwbd8gbpIwbZ3QgQEB1wD0BFlsEm8C4m6SNgPjDQMBgQEBAshZyFjPFslYzMhYzxbJAczJUkAgbpUwWfRaMJRBM/QV4hAjfxQC2vhBbyQQI18DBqQFgQEBU2cgbpUwWfRaMJRBM/QU4iSBAQsoWfQLb6GSMG3fIG6SMG2d0IEBAdcA9ARZbBJvAuJu4w8DAYEBAQLIWchYzxbJWMzIWM8WyQHMyVJAIG6VMFn0WjCUQTP0FeIQI38UEwDIJIEBCyhZ9AtvoZIwbd8gbpIwbZ3QgQEB1wD0BFlsEm8C4iBu8tCAbyKBAQFUcoAhbpVbWfRaMJjIAc8AQTP0QuIBpIEBCwLIWQKBAQHPAPQAyRA2QYAgbpUwWfRZMJRBM/QT4gB6bYEBAXBTgSFulVtZ9FowmMgBzwBBM/RC4nEBAYEBCwLIWQKBAQHPAPQAyRA2QYAgbpUwWfRZMJRBM/QT4gFe7UTQ1AH4Y9IAAY4UgQEB1wD0BPQE1AHQ9AQwFEMwbBTgMPgo1wsKgwm68uCJ2zwWAAhwbW1tGG6/Zw==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDataSaver_init_args({ $$type: 'DataSaver_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const DataSaver_errors: { [key: number]: { message: string } } = {
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

const DataSaver_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"DataResponse","header":null,"fields":[{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"key","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DataInput","header":3684417297,"fields":[{"name":"key","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DataInputTest","header":3590725090,"fields":[{"name":"key","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Holder","header":null,"fields":[{"name":"total","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"holder","type":{"kind":"dict","key":"int","value":"int"}}]},
    {"name":"Data","header":null,"fields":[{"name":"key","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
]

const DataSaver_getters: ABIGetter[] = [
    {"name":"get_data","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Data","optional":false}},
    {"name":"get_address","arguments":[],"returnType":{"kind":"simple","type":"Holder","optional":false}},
]

const DataSaver_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DataInput"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DataInputTest"}},
]

export class DataSaver implements Contract {
    
    static async init() {
        return await DataSaver_init();
    }
    
    static async fromInit() {
        const init = await DataSaver_init();
        const address = contractAddress(0, init);
        return new DataSaver(address, init);
    }
    
    static fromAddress(address: Address) {
        return new DataSaver(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  DataSaver_types,
        getters: DataSaver_getters,
        receivers: DataSaver_receivers,
        errors: DataSaver_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DataInput | DataInputTest) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DataInput') {
            body = beginCell().store(storeDataInput(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DataInputTest') {
            body = beginCell().store(storeDataInputTest(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetData(provider: ContractProvider, index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        let source = (await provider.get('get_data', builder.build())).stack;
        const result = loadTupleData(source);
        return result;
    }
    
    async getGetAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_address', builder.build())).stack;
        const result = loadTupleHolder(source);
        return result;
    }
    
}