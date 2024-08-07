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

export type Data = {
    $$type: 'Data';
    data: string;
}

export function storeData(src: Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1983326085, 32);
        b_0.storeStringRefTail(src.data);
    };
}

export function loadData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1983326085) { throw Error('Invalid prefix'); }
    let _data = sc_0.loadStringRefTail();
    return { $$type: 'Data' as const, data: _data };
}

function loadTupleData(source: TupleReader) {
    let _data = source.readString();
    return { $$type: 'Data' as const, data: _data };
}

function storeTupleData(source: Data) {
    let builder = new TupleBuilder();
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

 type Saver_init_args = {
    $$type: 'Saver_init_args';
    master: Address;
    owner: Address;
    key: string;
}

function initSaver_init_args(src: Saver_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.master);
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.key);
    };
}

async function Saver_init(master: Address, owner: Address, key: string) {
    const __code = Cell.fromBase64('te6ccgECEAEAAoEAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCCAQFAgEgBgcAmAGSMH/gcCHXScIflTAg1wsf3oIQdjcnhbqOLtMfAYIQdjcnhbry4IHUAdAxMfhBbyQQI18DU0DHBbOaI4IAxFICxwXy9JEw4n/gMHAAuMj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFADzxbJWMzIWM8WyQHMye1UAhG/fjbZ5tnjYiQICQIBIAwNAcjtRNDUAfhj0gABjkz6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQAdQB0BRDMGwU4Pgo1wsKgwm68uCJCgAs+EFvJBAjXwMjggDEUgLHBfL0VHMhIwGU+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0EMwA9FY2zwLAASLCACVu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAgFIDg8AEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtUkZ3YlRTSnB1NVhUNzlFZlBCTmZSNTlxdXozOU1SYjJmdzFGeldkTlVQcEWCA=');
    const __system = Cell.fromBase64('te6cckECEgEAAosAAQHAAQEFoChJAgEU/wD0pBP0vPLICwMCAWIMBAIBIAoFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtUkZ3YlRTSnB1NVhUNzlFZlBCTmZSNTlxdXozOU1SYjJmdzFGeldkTlVQcEWCAAEbCvu1E0NIAAYACVu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAhG/fjbZ5tnjYiQPCwAs+EFvJBAjXwMjggDEUgLHBfL0VHMhIwN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLggg8ODQC4yPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUAPPFslYzMhYzxbJAczJ7VQAmAGSMH/gcCHXScIflTAg1wsf3oIQdjcnhbqOLtMfAYIQdjcnhbry4IHUAdAxMfhBbyQQI18DU0DHBbOaI4IAxFICxwXy9JEw4n/gMHAByO1E0NQB+GPSAAGOTPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQFEMwbBTg+CjXCwqDCbry4IkQAZT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQQzAD0VjbPBEABIsIG91sow==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSaver_init_args({ $$type: 'Saver_init_args', master, owner, key })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Saver_errors: { [key: number]: { message: string } } = {
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
    50258: { message: `ERR: Invalid sender` },
}

const Saver_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"DataResponse","header":null,"fields":[{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"key","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Data","header":1983326085,"fields":[{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DataInput","header":3684417297,"fields":[{"name":"key","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
]

const Saver_getters: ABIGetter[] = [
    {"name":"get_contract_data","arguments":[],"returnType":{"kind":"simple","type":"DataResponse","optional":false}},
]

const Saver_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Data"}},
]

export class Saver implements Contract {
    
    static async init(master: Address, owner: Address, key: string) {
        return await Saver_init(master, owner, key);
    }
    
    static async fromInit(master: Address, owner: Address, key: string) {
        const init = await Saver_init(master, owner, key);
        const address = contractAddress(0, init);
        return new Saver(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Saver(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Saver_types,
        getters: Saver_getters,
        receivers: Saver_receivers,
        errors: Saver_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Data) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Data') {
            body = beginCell().store(storeData(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetContractData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_contract_data', builder.build())).stack;
        const result = loadTupleDataResponse(source);
        return result;
    }
    
}