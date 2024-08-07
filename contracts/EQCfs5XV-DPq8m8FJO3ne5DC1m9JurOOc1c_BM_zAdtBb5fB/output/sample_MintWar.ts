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

export type MintEvent = {
    $$type: 'MintEvent';
    sender: Address;
    value: bigint;
    rate: bigint;
    points: bigint;
}

export function storeMintEvent(src: MintEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1428761267, 32);
        b_0.storeAddress(src.sender);
        b_0.storeUint(src.value, 256);
        b_0.storeUint(src.rate, 256);
        let b_1 = new Builder();
        b_1.storeUint(src.points, 256);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMintEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1428761267) { throw Error('Invalid prefix'); }
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadUintBig(256);
    let _rate = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _points = sc_1.loadUintBig(256);
    return { $$type: 'MintEvent' as const, sender: _sender, value: _value, rate: _rate, points: _points };
}

function loadTupleMintEvent(source: TupleReader) {
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _rate = source.readBigNumber();
    let _points = source.readBigNumber();
    return { $$type: 'MintEvent' as const, sender: _sender, value: _value, rate: _rate, points: _points };
}

function storeTupleMintEvent(source: MintEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeNumber(source.rate);
    builder.writeNumber(source.points);
    return builder.build();
}

function dictValueParserMintEvent(): DictionaryValue<MintEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintEvent(src)).endCell());
        },
        parse: (src) => {
            return loadMintEvent(src.loadRef().beginParse());
        }
    }
}

export type MintJetton = {
    $$type: 'MintJetton';
    rate: bigint;
}

export function storeMintJetton(src: MintJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(710663172, 32);
        b_0.storeUint(src.rate, 256);
    };
}

export function loadMintJetton(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 710663172) { throw Error('Invalid prefix'); }
    let _rate = sc_0.loadUintBig(256);
    return { $$type: 'MintJetton' as const, rate: _rate };
}

function loadTupleMintJetton(source: TupleReader) {
    let _rate = source.readBigNumber();
    return { $$type: 'MintJetton' as const, rate: _rate };
}

function storeTupleMintJetton(source: MintJetton) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.rate);
    return builder.build();
}

function dictValueParserMintJetton(): DictionaryValue<MintJetton> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintJetton(src)).endCell());
        },
        parse: (src) => {
            return loadMintJetton(src.loadRef().beginParse());
        }
    }
}

export type AccountState = {
    $$type: 'AccountState';
    points: bigint;
    fees: bigint;
    totalPoints: bigint;
    totalFees: bigint;
}

export function storeAccountState(src: AccountState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.points, 256);
        b_0.storeUint(src.fees, 256);
        b_0.storeUint(src.totalPoints, 256);
        let b_1 = new Builder();
        b_1.storeUint(src.totalFees, 256);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAccountState(slice: Slice) {
    let sc_0 = slice;
    let _points = sc_0.loadUintBig(256);
    let _fees = sc_0.loadUintBig(256);
    let _totalPoints = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _totalFees = sc_1.loadUintBig(256);
    return { $$type: 'AccountState' as const, points: _points, fees: _fees, totalPoints: _totalPoints, totalFees: _totalFees };
}

function loadTupleAccountState(source: TupleReader) {
    let _points = source.readBigNumber();
    let _fees = source.readBigNumber();
    let _totalPoints = source.readBigNumber();
    let _totalFees = source.readBigNumber();
    return { $$type: 'AccountState' as const, points: _points, fees: _fees, totalPoints: _totalPoints, totalFees: _totalFees };
}

function storeTupleAccountState(source: AccountState) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.points);
    builder.writeNumber(source.fees);
    builder.writeNumber(source.totalPoints);
    builder.writeNumber(source.totalFees);
    return builder.build();
}

function dictValueParserAccountState(): DictionaryValue<AccountState> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAccountState(src)).endCell());
        },
        parse: (src) => {
            return loadAccountState(src.loadRef().beginParse());
        }
    }
}

 type MintWar_init_args = {
    $$type: 'MintWar_init_args';
    admin: Address;
    mintStartAt: bigint;
    mintEndAt: bigint;
}

function initMintWar_init_args(src: MintWar_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.admin);
        b_0.storeInt(src.mintStartAt, 257);
        b_0.storeInt(src.mintEndAt, 257);
    };
}

async function MintWar_init(admin: Address, mintStartAt: bigint, mintEndAt: bigint) {
    const __code = Cell.fromBase64('te6ccgECJQEABn4AART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFts88uCCIQQFAgEgDxACku2i7fsBkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCSW3/gIIIQKlvcBLqOlTDTHwGCECpb3AS68uCB0/8BMds8f+DAAOMAMH8GBwCSyPhDAcx/AcoAVWBQdiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhSBAQHPABKBAQHPAAHIy/8Sy/8T9AD0AMkBzMntVAL0ggCc8CHCAJYhggGGoLuRcOLy9IIA19v4QW8kE18DghAL68IAvvL0gRrE+CMovvL0gXGa+CMnufL0gQEL+EIjWYMHQTP0Cm+hlAHXATCSW23iIG6OIzCBAQv4QvhBbyQTXwMQNIMHIW6VW1n0WTCYyAHPAUEz9EHi4w4ICQGeIPkBgvAaY+1uujnBG6JUBUfOtfebb+CrKaEFW7DtfVPkq1CJrLqOpjCCAOg1+EJSgMcF8vT4J28QghAF9eEAoVJwcHFDMG1tbds8f9sx4A0AVoEBC/hC+EFvJBNfAwMgbvLQgBOgEDQSgwchbpVbWfRZMJjIAc8BQTP0QeICSPhBbyQTXwMUoHCCAYag+ERul/gl+BV/+GTeIaH4EaAiueMPWgoLAfz4QW8kE18DggGGoKgiqQRRVaCBAQv4QiVZgwdBM/QKb6GUAdcBMJJbbeIgbo4dMIEBC/hCJxA2gwchbpVbWfRZMJjIAc8BQTP0QeKOJIEBC/hCAiBu8tCAKKAQNhKDByFulVtZ9FkwmMgBzwFBM/RB4uL4QvhBbyQTXwNANxQMALz4QvhBbyQTXwNVAnDIVTCCEFUpKrNQBcsfUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbL/8v/AcjL/8kBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wATAKLIVTCCEFUpKrNQBcsfUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbL/8v/AcjL/8kBzMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIBESAgEgGBkCASATFAJNuYXyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPFUG2zxscYIRcCEbWiG2ebZ42OMCEVAhG0pNtnm2eNjjAhFgACIQACIwBCgQELIwKDB0Ez9ApvoZQB1wEwkltt4iBukjBw4CBu8tCAAgFYGhsCAUgdHgJNsVNINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8VQbbPGxxgIRwAlbL0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIABSgQELIwKDB0Ez9ApvoZQB1wEwkltt4iBukjBw4CBu8tCAggGGoKgkqQQAEbCvu1E0NIAAYAIBWB8gAHSpu40NWlwZnM6Ly9RbVJ0VGZlNDRpU1hKWmVVYzFwQll5Yk5ieHFGb1FFcHBVYmdWaXNLRkpvRG9jgAkyrriDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPFUG2zxsdCEiAaztRNDUAfhj0gABjj76QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdDT/9P/9AT0BDAQRxBGEEVsF+D4KNcLCoMJuvLgiSMAjiKBAQsigwdBM/QKb6GUAdcBMJJbbeIgbpIwcN6BAQtUQxODB0Ez9ApvoZQB1wEwkltt4iBukjBw3gEgbvLQgAEgbvLQgFNUAWL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wBVIAPRWNs8JAAMbW1wUgIT');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMintWar_init_args({ $$type: 'MintWar_init_args', admin, mintStartAt, mintEndAt })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MintWar_errors: { [key: number]: { message: string } } = {
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
    6852: { message: `Mint not start` },
    29082: { message: `Mint ended` },
    40176: { message: `Invalid rate` },
    55259: { message: `Insufficient fee` },
    59445: { message: `Only owner can claim fee` },
}

const MintWar_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"MintEvent","header":1428761267,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"rate","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"points","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"MintJetton","header":710663172,"fields":[{"name":"rate","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"AccountState","header":null,"fields":[{"name":"points","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"fees","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"totalPoints","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"totalFees","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
]

const MintWar_getters: ABIGetter[] = [
    {"name":"get_points_by_address","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_shares_by_address","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_totalPoints","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_all_accounts","arguments":[],"returnType":{"kind":"dict","key":"address","value":"uint","valueFormat":256}},
    {"name":"get_account_state","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"AccountState","optional":false}},
]

const MintWar_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"any"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintJetton"}},
    {"receiver":"internal","message":{"kind":"text","text":"ClaimFee"}},
]

export class MintWar implements Contract {
    
    static async init(admin: Address, mintStartAt: bigint, mintEndAt: bigint) {
        return await MintWar_init(admin, mintStartAt, mintEndAt);
    }
    
    static async fromInit(admin: Address, mintStartAt: bigint, mintEndAt: bigint) {
        const init = await MintWar_init(admin, mintStartAt, mintEndAt);
        const address = contractAddress(0, init);
        return new MintWar(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MintWar(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MintWar_types,
        getters: MintWar_getters,
        receivers: MintWar_receivers,
        errors: MintWar_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Slice | MintJetton | 'ClaimFee') {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintJetton') {
            body = beginCell().store(storeMintJetton(message)).endCell();
        }
        if (message === 'ClaimFee') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetPointsByAddress(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('get_points_by_address', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetSharesByAddress(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('get_shares_by_address', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetTotalPoints(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_totalPoints', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetAllAccounts(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_all_accounts', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigUint(256), source.readCellOpt());
        return result;
    }
    
    async getGetAccountState(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('get_account_state', builder.build())).stack;
        const result = loadTupleAccountState(source);
        return result;
    }
    
}