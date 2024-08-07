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

export type AcceptFee = {
    $$type: 'AcceptFee';
    cashback: Address;
}

export function storeAcceptFee(src: AcceptFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4139864225, 32);
        b_0.storeAddress(src.cashback);
    };
}

export function loadAcceptFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4139864225) { throw Error('Invalid prefix'); }
    let _cashback = sc_0.loadAddress();
    return { $$type: 'AcceptFee' as const, cashback: _cashback };
}

function loadTupleAcceptFee(source: TupleReader) {
    let _cashback = source.readAddress();
    return { $$type: 'AcceptFee' as const, cashback: _cashback };
}

function storeTupleAcceptFee(source: AcceptFee) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserAcceptFee(): DictionaryValue<AcceptFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAcceptFee(src)).endCell());
        },
        parse: (src) => {
            return loadAcceptFee(src.loadRef().beginParse());
        }
    }
}

export type WhitelistMetadata = {
    $$type: 'WhitelistMetadata';
    owner: Address;
    enrollFee: bigint;
}

export function storeWhitelistMetadata(src: WhitelistMetadata) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1511253418, 32);
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.enrollFee, 257);
    };
}

export function loadWhitelistMetadata(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1511253418) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _enrollFee = sc_0.loadIntBig(257);
    return { $$type: 'WhitelistMetadata' as const, owner: _owner, enrollFee: _enrollFee };
}

function loadTupleWhitelistMetadata(source: TupleReader) {
    let _owner = source.readAddress();
    let _enrollFee = source.readBigNumber();
    return { $$type: 'WhitelistMetadata' as const, owner: _owner, enrollFee: _enrollFee };
}

function storeTupleWhitelistMetadata(source: WhitelistMetadata) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.enrollFee);
    return builder.build();
}

function dictValueParserWhitelistMetadata(): DictionaryValue<WhitelistMetadata> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWhitelistMetadata(src)).endCell());
        },
        parse: (src) => {
            return loadWhitelistMetadata(src.loadRef().beginParse());
        }
    }
}

export type WhitelistEntryDetails = {
    $$type: 'WhitelistEntryDetails';
    addr: Address;
    accepted: boolean;
}

export function storeWhitelistEntryDetails(src: WhitelistEntryDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2342737195, 32);
        b_0.storeAddress(src.addr);
        b_0.storeBit(src.accepted);
    };
}

export function loadWhitelistEntryDetails(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2342737195) { throw Error('Invalid prefix'); }
    let _addr = sc_0.loadAddress();
    let _accepted = sc_0.loadBit();
    return { $$type: 'WhitelistEntryDetails' as const, addr: _addr, accepted: _accepted };
}

function loadTupleWhitelistEntryDetails(source: TupleReader) {
    let _addr = source.readAddress();
    let _accepted = source.readBoolean();
    return { $$type: 'WhitelistEntryDetails' as const, addr: _addr, accepted: _accepted };
}

function storeTupleWhitelistEntryDetails(source: WhitelistEntryDetails) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.addr);
    builder.writeBoolean(source.accepted);
    return builder.build();
}

function dictValueParserWhitelistEntryDetails(): DictionaryValue<WhitelistEntryDetails> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWhitelistEntryDetails(src)).endCell());
        },
        parse: (src) => {
            return loadWhitelistEntryDetails(src.loadRef().beginParse());
        }
    }
}

 type Whitelist_init_args = {
    $$type: 'Whitelist_init_args';
    id: bigint;
    enrollFee: bigint;
}

function initWhitelist_init_args(src: Whitelist_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeInt(src.enrollFee, 257);
    };
}

async function Whitelist_init(id: bigint, enrollFee: bigint) {
    const __code = Cell.fromBase64('te6ccgECHwEABTcAART/APSkE/S88sgLAQIBYgIDAuDQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCyPhDAcx/AcoAVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEssfAfoCye1UGgQCASAMDQLs7aLt+wGSMH/gcCHXScIflTAg1wsf3iDAACLXScEhsJJbf+AgghD2wVChuo7HMNMfAYIQ9sFQobry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMX/4QW8kE18DI6GCCTEtAKFwECNtbW3bPH/gIAoFAs6CEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAjq35AYLw7Z+xcMXYRDNAzrJLg+AYWLhtrV+RBscm8cTZfTgLO0K6joXbPH/bMeCRMOJwBgcBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8CgTygXlC+EFvJBNfAyKCCTEtAKCCCJiWgKC+8vT4Q/go+ELbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiIIJMS0AiEA0cgJ/BgVERNs8+Cj4QhkICgkAFAAAAABhY2NlcHQBasgBghD2wVChWMsfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFslwgEB/BANtbds8CgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wALAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgFYDg8CASASEwIRtKO7Z5tnjYYwGhACEbTWe2ebZ42GUBoRAAIiAARTIAIBIBQVAgFIHR4CAVgWFwC5t3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQTggZzq084r86ShYDrC3EyPZQAk2vB5BrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtniqBbZ42GMAaGAIRrshtnm2eNhjAGhsBkPhD+ChY2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBkA2gLQ9AQwbQGCAMwTAYAQ9A9vofLghwGCAMwTIgKAEPQXyAHI9ADJAcxwAcoAQANZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBoO1E0NQB+GPSAAGOKPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0x/6AFUgbBPg+CjXCwqDCbry4ImBAQHXAIEBAdcAWQLRAds8HAACIQAG+EJZABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWVrS0VNVW90QWVBVFhDWWZZdVNWYjZ5dEdSazFWRXV6a21FVFRiaGZncURGgg');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initWhitelist_init_args({ $$type: 'Whitelist_init_args', id, enrollFee })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Whitelist_errors: { [key: number]: { message: string } } = {
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
    31042: { message: `Not enough money to enroll` },
    49469: { message: `Access denied` },
}

const Whitelist_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AcceptFee","header":4139864225,"fields":[{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WhitelistMetadata","header":1511253418,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"enrollFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"WhitelistEntryDetails","header":2342737195,"fields":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"accepted","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const Whitelist_getters: ABIGetter[] = [
    {"name":"id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"metadata","arguments":[],"returnType":{"kind":"simple","type":"WhitelistMetadata","optional":false}},
    {"name":"entryAddress","arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Whitelist_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AcceptFee"}},
    {"receiver":"internal","message":{"kind":"text","text":"enroll"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Whitelist implements Contract {
    
    static async init(id: bigint, enrollFee: bigint) {
        return await Whitelist_init(id, enrollFee);
    }
    
    static async fromInit(id: bigint, enrollFee: bigint) {
        const init = await Whitelist_init(id, enrollFee);
        const address = contractAddress(0, init);
        return new Whitelist(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Whitelist(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Whitelist_types,
        getters: Whitelist_getters,
        receivers: Whitelist_receivers,
        errors: Whitelist_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | AcceptFee | 'enroll' | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AcceptFee') {
            body = beginCell().store(storeAcceptFee(message)).endCell();
        }
        if (message === 'enroll') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
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
    
    async getMetadata(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('metadata', builder.build())).stack;
        const result = loadTupleWhitelistMetadata(source);
        return result;
    }
    
    async getEntryAddress(provider: ContractProvider, addr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(addr);
        let source = (await provider.get('entryAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}