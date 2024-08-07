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

 type Main_init_args = {
    $$type: 'Main_init_args';
}

function initMain_init_args(src: Main_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Main_init() {
    const __code = Cell.fromBase64('te6ccgECEgEAA3YAART/APSkE/S88sgLAQIBYgIDApLQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4IIwyPhDAcx/AcoAye1UDgQCAVgICQFqAZIwf+BwIddJwh+VMCDXCx/eghDbm78Ruo6X0x8BghDbm78RuvLggdQB0AHUAdASbBLgMHAFAu74QW8kECNfA/hD+ChAAwTbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHBwgEAGyAGCEHY3J4VYyx/IWM8WyQHMyRA2QFUEEEYQRds8fxEGAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAcAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAlbu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSAIBSAoLABGwr7tRNDSAAGACASAMDQJLrM2AkGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eAW2eGMAODwB1rN3Ghq0uDM5nReXqLayGLuqoiGatzeaI7GZNJi4sRqlqhkxNbcruDmgu6YkN7WZIzsrqiOcKqaYq0EABNO1E0NQB+GPSADCRbeD4KNcLCoMJuvLgids8EAGQ+EP4KFrbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEQACbQDmA9D0BDBtAYEUJAGAEPQPb6Hy4IcBgRQkIgKAEPQXyAHI9ADJAcxwAcoAVSAEWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWM8WyQHMyQ==');
    const __system = Cell.fromBase64('te6cckECJAEABbQAAQHAAQIBIBMCAQW+PNwDART/APSkE/S88sgLBAIBYgsFAgFYGwYCAUgaBwIBIAkIAHWs3caGrS4MzmdF5eotrIYu6qiIZq3N5ojsZk0mLixGqWqGTE1tyu4OaC7piQ3tZkjOyuqI5wqppirQQAJLrM2AkGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eAW2eGMARCgGQ+EP4KFrbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEAKS0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wds88uCCMMj4QwHMfwHKAMntVBEMAWoBkjB/4HAh10nCH5UwINcLH96CENubvxG6jpfTHwGCENubvxG68uCB1AHQAdQB0BJsEuAwcA0C7vhBbyQQI18D+EP4KEADBNs8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcHCAQAbIAYIQdjcnhVjLH8hYzxbJAczJEDZAVQQQRhBF2zx/EA4ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzADmA9D0BDBtAYEUJAGAEPQPb6Hy4IcBgRQkIgKAEPQXyAHI9ADJAcxwAcoAVSAEWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWM8WyQHMyQE07UTQ1AH4Y9IAMJFt4Pgo1wsKgwm68uCJ2zwSAAJtAQW8oSQUART/APSkE/S88sgLFQIBYh4WAgEgHBcCASAbGAIBSBoZAHWybuNDVpcGZzOi8vUW1SRndiVFNKcHU1WFQ3OUVmUEJOZlI1OXF1ejM5TVJiMmZ3MUZ6V2ROVVBwRYIAARsK+7UTQ0gABgAJW7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnCdl05as07LczoOlm2UZuikgCEb9+Ntnm2eNiJCEdACz4QW8kECNfAyOCAMRSAscF8vRUcyEjA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCISAfALjI+EMBzH8BygBVMFBDINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQA88WyVjMyFjPFskBzMntVACYAZIwf+BwIddJwh+VMCDXCx/eghB2NyeFuo4u0x8BghB2NyeFuvLggdQB0DEx+EFvJBAjXwNTQMcFs5ojggDEUgLHBfL0kTDif+AwcAHI7UTQ1AH4Y9IAAY5M+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AHUAdAUQzBsFOD4KNcLCoMJuvLgiSIBlPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdBDMAPRWNs8IwAEiwhrnxVy');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMain_init_args({ $$type: 'Main_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Main_errors: { [key: number]: { message: string } } = {
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

const Main_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"DataResponse","header":null,"fields":[{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"key","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Data","header":1983326085,"fields":[{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DataInput","header":3684417297,"fields":[{"name":"key","type":{"kind":"simple","type":"string","optional":false}},{"name":"data","type":{"kind":"simple","type":"string","optional":false}}]},
]

const Main_getters: ABIGetter[] = [
    {"name":"getInitAddress","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"key","type":{"kind":"simple","type":"string","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Main_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DataInput"}},
]

export class Main implements Contract {
    
    static async init() {
        return await Main_init();
    }
    
    static async fromInit() {
        const init = await Main_init();
        const address = contractAddress(0, init);
        return new Main(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Main(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Main_types,
        getters: Main_getters,
        receivers: Main_receivers,
        errors: Main_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DataInput) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DataInput') {
            body = beginCell().store(storeDataInput(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetInitAddress(provider: ContractProvider, owner: Address, key: string) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        builder.writeString(key);
        let source = (await provider.get('getInitAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}