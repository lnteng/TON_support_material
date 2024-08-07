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

export type NewParticipantEvent = {
    $$type: 'NewParticipantEvent';
    address: Address;
    votes: bigint;
    unfreezeTime: bigint;
}

export function storeNewParticipantEvent(src: NewParticipantEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(932337177, 32);
        b_0.storeAddress(src.address);
        b_0.storeInt(src.votes, 257);
        b_0.storeInt(src.unfreezeTime, 257);
    };
}

export function loadNewParticipantEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 932337177) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _votes = sc_0.loadIntBig(257);
    let _unfreezeTime = sc_0.loadIntBig(257);
    return { $$type: 'NewParticipantEvent' as const, address: _address, votes: _votes, unfreezeTime: _unfreezeTime };
}

function loadTupleNewParticipantEvent(source: TupleReader) {
    let _address = source.readAddress();
    let _votes = source.readBigNumber();
    let _unfreezeTime = source.readBigNumber();
    return { $$type: 'NewParticipantEvent' as const, address: _address, votes: _votes, unfreezeTime: _unfreezeTime };
}

function storeTupleNewParticipantEvent(source: NewParticipantEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.votes);
    builder.writeNumber(source.unfreezeTime);
    return builder.build();
}

function dictValueParserNewParticipantEvent(): DictionaryValue<NewParticipantEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNewParticipantEvent(src)).endCell());
        },
        parse: (src) => {
            return loadNewParticipantEvent(src.loadRef().beginParse());
        }
    }
}

export type ParticipantQuitEvent = {
    $$type: 'ParticipantQuitEvent';
    address: Address;
    votes: bigint;
    unfreezeTime: bigint;
}

export function storeParticipantQuitEvent(src: ParticipantQuitEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(974254702, 32);
        b_0.storeAddress(src.address);
        b_0.storeInt(src.votes, 257);
        b_0.storeInt(src.unfreezeTime, 257);
    };
}

export function loadParticipantQuitEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 974254702) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _votes = sc_0.loadIntBig(257);
    let _unfreezeTime = sc_0.loadIntBig(257);
    return { $$type: 'ParticipantQuitEvent' as const, address: _address, votes: _votes, unfreezeTime: _unfreezeTime };
}

function loadTupleParticipantQuitEvent(source: TupleReader) {
    let _address = source.readAddress();
    let _votes = source.readBigNumber();
    let _unfreezeTime = source.readBigNumber();
    return { $$type: 'ParticipantQuitEvent' as const, address: _address, votes: _votes, unfreezeTime: _unfreezeTime };
}

function storeTupleParticipantQuitEvent(source: ParticipantQuitEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.votes);
    builder.writeNumber(source.unfreezeTime);
    return builder.build();
}

function dictValueParserParticipantQuitEvent(): DictionaryValue<ParticipantQuitEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeParticipantQuitEvent(src)).endCell());
        },
        parse: (src) => {
            return loadParticipantQuitEvent(src.loadRef().beginParse());
        }
    }
}

export type OpenRound = {
    $$type: 'OpenRound';
    round: bigint;
}

export function storeOpenRound(src: OpenRound) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(746268676, 32);
        b_0.storeInt(src.round, 257);
    };
}

export function loadOpenRound(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 746268676) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadIntBig(257);
    return { $$type: 'OpenRound' as const, round: _round };
}

function loadTupleOpenRound(source: TupleReader) {
    let _round = source.readBigNumber();
    return { $$type: 'OpenRound' as const, round: _round };
}

function storeTupleOpenRound(source: OpenRound) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    return builder.build();
}

function dictValueParserOpenRound(): DictionaryValue<OpenRound> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOpenRound(src)).endCell());
        },
        parse: (src) => {
            return loadOpenRound(src.loadRef().beginParse());
        }
    }
}

export type Vote = {
    $$type: 'Vote';
    round: bigint;
    payload: string;
}

export function storeVote(src: Vote) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3335902498, 32);
        b_0.storeInt(src.round, 257);
        b_0.storeStringRefTail(src.payload);
    };
}

export function loadVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3335902498) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadIntBig(257);
    let _payload = sc_0.loadStringRefTail();
    return { $$type: 'Vote' as const, round: _round, payload: _payload };
}

function loadTupleVote(source: TupleReader) {
    let _round = source.readBigNumber();
    let _payload = source.readString();
    return { $$type: 'Vote' as const, round: _round, payload: _payload };
}

function storeTupleVote(source: Vote) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    builder.writeString(source.payload);
    return builder.build();
}

function dictValueParserVote(): DictionaryValue<Vote> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVote(src)).endCell());
        },
        parse: (src) => {
            return loadVote(src.loadRef().beginParse());
        }
    }
}

export type FinalizeRound = {
    $$type: 'FinalizeRound';
    round: bigint;
}

export function storeFinalizeRound(src: FinalizeRound) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2302895222, 32);
        b_0.storeInt(src.round, 257);
    };
}

export function loadFinalizeRound(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2302895222) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadIntBig(257);
    return { $$type: 'FinalizeRound' as const, round: _round };
}

function loadTupleFinalizeRound(source: TupleReader) {
    let _round = source.readBigNumber();
    return { $$type: 'FinalizeRound' as const, round: _round };
}

function storeTupleFinalizeRound(source: FinalizeRound) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    return builder.build();
}

function dictValueParserFinalizeRound(): DictionaryValue<FinalizeRound> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFinalizeRound(src)).endCell());
        },
        parse: (src) => {
            return loadFinalizeRound(src.loadRef().beginParse());
        }
    }
}

export type PayloadVotes = {
    $$type: 'PayloadVotes';
    payload: string;
    votes: bigint;
    guarded: boolean;
}

export function storePayloadVotes(src: PayloadVotes) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.payload);
        b_0.storeInt(src.votes, 257);
        b_0.storeBit(src.guarded);
    };
}

export function loadPayloadVotes(slice: Slice) {
    let sc_0 = slice;
    let _payload = sc_0.loadStringRefTail();
    let _votes = sc_0.loadIntBig(257);
    let _guarded = sc_0.loadBit();
    return { $$type: 'PayloadVotes' as const, payload: _payload, votes: _votes, guarded: _guarded };
}

function loadTuplePayloadVotes(source: TupleReader) {
    let _payload = source.readString();
    let _votes = source.readBigNumber();
    let _guarded = source.readBoolean();
    return { $$type: 'PayloadVotes' as const, payload: _payload, votes: _votes, guarded: _guarded };
}

function storeTuplePayloadVotes(source: PayloadVotes) {
    let builder = new TupleBuilder();
    builder.writeString(source.payload);
    builder.writeNumber(source.votes);
    builder.writeBoolean(source.guarded);
    return builder.build();
}

function dictValueParserPayloadVotes(): DictionaryValue<PayloadVotes> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePayloadVotes(src)).endCell());
        },
        parse: (src) => {
            return loadPayloadVotes(src.loadRef().beginParse());
        }
    }
}

export type RoundParticipantInfo = {
    $$type: 'RoundParticipantInfo';
    address: Address;
    votes: bigint;
    payloadHash: bigint;
    guard: boolean;
}

export function storeRoundParticipantInfo(src: RoundParticipantInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeInt(src.votes, 257);
        b_0.storeInt(src.payloadHash, 257);
        b_0.storeBit(src.guard);
    };
}

export function loadRoundParticipantInfo(slice: Slice) {
    let sc_0 = slice;
    let _address = sc_0.loadAddress();
    let _votes = sc_0.loadIntBig(257);
    let _payloadHash = sc_0.loadIntBig(257);
    let _guard = sc_0.loadBit();
    return { $$type: 'RoundParticipantInfo' as const, address: _address, votes: _votes, payloadHash: _payloadHash, guard: _guard };
}

function loadTupleRoundParticipantInfo(source: TupleReader) {
    let _address = source.readAddress();
    let _votes = source.readBigNumber();
    let _payloadHash = source.readBigNumber();
    let _guard = source.readBoolean();
    return { $$type: 'RoundParticipantInfo' as const, address: _address, votes: _votes, payloadHash: _payloadHash, guard: _guard };
}

function storeTupleRoundParticipantInfo(source: RoundParticipantInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.votes);
    builder.writeNumber(source.payloadHash);
    builder.writeBoolean(source.guard);
    return builder.build();
}

function dictValueParserRoundParticipantInfo(): DictionaryValue<RoundParticipantInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRoundParticipantInfo(src)).endCell());
        },
        parse: (src) => {
            return loadRoundParticipantInfo(src.loadRef().beginParse());
        }
    }
}

export type InternalRoundOpened = {
    $$type: 'InternalRoundOpened';
    round: bigint;
}

export function storeInternalRoundOpened(src: InternalRoundOpened) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2289982627, 32);
        b_0.storeInt(src.round, 257);
    };
}

export function loadInternalRoundOpened(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2289982627) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadIntBig(257);
    return { $$type: 'InternalRoundOpened' as const, round: _round };
}

function loadTupleInternalRoundOpened(source: TupleReader) {
    let _round = source.readBigNumber();
    return { $$type: 'InternalRoundOpened' as const, round: _round };
}

function storeTupleInternalRoundOpened(source: InternalRoundOpened) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    return builder.build();
}

function dictValueParserInternalRoundOpened(): DictionaryValue<InternalRoundOpened> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInternalRoundOpened(src)).endCell());
        },
        parse: (src) => {
            return loadInternalRoundOpened(src.loadRef().beginParse());
        }
    }
}

export type InternalVote = {
    $$type: 'InternalVote';
    round: bigint;
    payload: string;
    participant: Address;
    guard: boolean;
    votes: bigint;
}

export function storeInternalVote(src: InternalVote) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2008725369, 32);
        b_0.storeInt(src.round, 257);
        b_0.storeStringRefTail(src.payload);
        b_0.storeAddress(src.participant);
        b_0.storeBit(src.guard);
        b_0.storeCoins(src.votes);
    };
}

export function loadInternalVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2008725369) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadIntBig(257);
    let _payload = sc_0.loadStringRefTail();
    let _participant = sc_0.loadAddress();
    let _guard = sc_0.loadBit();
    let _votes = sc_0.loadCoins();
    return { $$type: 'InternalVote' as const, round: _round, payload: _payload, participant: _participant, guard: _guard, votes: _votes };
}

function loadTupleInternalVote(source: TupleReader) {
    let _round = source.readBigNumber();
    let _payload = source.readString();
    let _participant = source.readAddress();
    let _guard = source.readBoolean();
    let _votes = source.readBigNumber();
    return { $$type: 'InternalVote' as const, round: _round, payload: _payload, participant: _participant, guard: _guard, votes: _votes };
}

function storeTupleInternalVote(source: InternalVote) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    builder.writeString(source.payload);
    builder.writeAddress(source.participant);
    builder.writeBoolean(source.guard);
    builder.writeNumber(source.votes);
    return builder.build();
}

function dictValueParserInternalVote(): DictionaryValue<InternalVote> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInternalVote(src)).endCell());
        },
        parse: (src) => {
            return loadInternalVote(src.loadRef().beginParse());
        }
    }
}

export type InternalFinalize = {
    $$type: 'InternalFinalize';
    minVotes: bigint;
}

export function storeInternalFinalize(src: InternalFinalize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4124677558, 32);
        b_0.storeInt(src.minVotes, 257);
    };
}

export function loadInternalFinalize(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4124677558) { throw Error('Invalid prefix'); }
    let _minVotes = sc_0.loadIntBig(257);
    return { $$type: 'InternalFinalize' as const, minVotes: _minVotes };
}

function loadTupleInternalFinalize(source: TupleReader) {
    let _minVotes = source.readBigNumber();
    return { $$type: 'InternalFinalize' as const, minVotes: _minVotes };
}

function storeTupleInternalFinalize(source: InternalFinalize) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.minVotes);
    return builder.build();
}

function dictValueParserInternalFinalize(): DictionaryValue<InternalFinalize> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInternalFinalize(src)).endCell());
        },
        parse: (src) => {
            return loadInternalFinalize(src.loadRef().beginParse());
        }
    }
}

export type InternalFinalized = {
    $$type: 'InternalFinalized';
    round: bigint;
    winnerPayload: string | null;
    winnerVotes: bigint | null;
    winnerGuarded: boolean;
    goodParticipants: Dictionary<bigint, Address>;
    goodParticipantsCount: bigint;
    goodParticipantsVotes: Dictionary<Address, bigint>;
    badParticipants: Dictionary<bigint, Address>;
    badParticipantsCount: bigint;
    badParticipantsVotes: Dictionary<Address, bigint>;
}

export function storeInternalFinalized(src: InternalFinalized) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2800852515, 32);
        b_0.storeInt(src.round, 257);
        if (src.winnerPayload !== null && src.winnerPayload !== undefined) { b_0.storeBit(true).storeStringRefTail(src.winnerPayload); } else { b_0.storeBit(false); }
        if (src.winnerVotes !== null && src.winnerVotes !== undefined) { b_0.storeBit(true).storeInt(src.winnerVotes, 257); } else { b_0.storeBit(false); }
        b_0.storeBit(src.winnerGuarded);
        b_0.storeDict(src.goodParticipants, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeInt(src.goodParticipantsCount, 257);
        b_0.storeDict(src.goodParticipantsVotes, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        let b_1 = new Builder();
        b_1.storeDict(src.badParticipants, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_1.storeInt(src.badParticipantsCount, 257);
        b_1.storeDict(src.badParticipantsVotes, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadInternalFinalized(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2800852515) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadIntBig(257);
    let _winnerPayload = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    let _winnerVotes = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _winnerGuarded = sc_0.loadBit();
    let _goodParticipants = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _goodParticipantsCount = sc_0.loadIntBig(257);
    let _goodParticipantsVotes = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _badParticipants = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_1);
    let _badParticipantsCount = sc_1.loadIntBig(257);
    let _badParticipantsVotes = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_1);
    return { $$type: 'InternalFinalized' as const, round: _round, winnerPayload: _winnerPayload, winnerVotes: _winnerVotes, winnerGuarded: _winnerGuarded, goodParticipants: _goodParticipants, goodParticipantsCount: _goodParticipantsCount, goodParticipantsVotes: _goodParticipantsVotes, badParticipants: _badParticipants, badParticipantsCount: _badParticipantsCount, badParticipantsVotes: _badParticipantsVotes };
}

function loadTupleInternalFinalized(source: TupleReader) {
    let _round = source.readBigNumber();
    let _winnerPayload = source.readStringOpt();
    let _winnerVotes = source.readBigNumberOpt();
    let _winnerGuarded = source.readBoolean();
    let _goodParticipants = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _goodParticipantsCount = source.readBigNumber();
    let _goodParticipantsVotes = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _badParticipants = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _badParticipantsCount = source.readBigNumber();
    let _badParticipantsVotes = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'InternalFinalized' as const, round: _round, winnerPayload: _winnerPayload, winnerVotes: _winnerVotes, winnerGuarded: _winnerGuarded, goodParticipants: _goodParticipants, goodParticipantsCount: _goodParticipantsCount, goodParticipantsVotes: _goodParticipantsVotes, badParticipants: _badParticipants, badParticipantsCount: _badParticipantsCount, badParticipantsVotes: _badParticipantsVotes };
}

function storeTupleInternalFinalized(source: InternalFinalized) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    builder.writeString(source.winnerPayload);
    builder.writeNumber(source.winnerVotes);
    builder.writeBoolean(source.winnerGuarded);
    builder.writeCell(source.goodParticipants.size > 0 ? beginCell().storeDictDirect(source.goodParticipants, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.goodParticipantsCount);
    builder.writeCell(source.goodParticipantsVotes.size > 0 ? beginCell().storeDictDirect(source.goodParticipantsVotes, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.badParticipants.size > 0 ? beginCell().storeDictDirect(source.badParticipants, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.badParticipantsCount);
    builder.writeCell(source.badParticipantsVotes.size > 0 ? beginCell().storeDictDirect(source.badParticipantsVotes, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserInternalFinalized(): DictionaryValue<InternalFinalized> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInternalFinalized(src)).endCell());
        },
        parse: (src) => {
            return loadInternalFinalized(src.loadRef().beginParse());
        }
    }
}

export type PromoteToGuard = {
    $$type: 'PromoteToGuard';
    address: Address;
}

export function storePromoteToGuard(src: PromoteToGuard) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1194924511, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadPromoteToGuard(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1194924511) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'PromoteToGuard' as const, address: _address };
}

function loadTuplePromoteToGuard(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'PromoteToGuard' as const, address: _address };
}

function storeTuplePromoteToGuard(source: PromoteToGuard) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserPromoteToGuard(): DictionaryValue<PromoteToGuard> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePromoteToGuard(src)).endCell());
        },
        parse: (src) => {
            return loadPromoteToGuard(src.loadRef().beginParse());
        }
    }
}

export type RevokeGuard = {
    $$type: 'RevokeGuard';
    address: Address;
}

export function storeRevokeGuard(src: RevokeGuard) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2479156566, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadRevokeGuard(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2479156566) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'RevokeGuard' as const, address: _address };
}

function loadTupleRevokeGuard(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'RevokeGuard' as const, address: _address };
}

function storeTupleRevokeGuard(source: RevokeGuard) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserRevokeGuard(): DictionaryValue<RevokeGuard> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRevokeGuard(src)).endCell());
        },
        parse: (src) => {
            return loadRevokeGuard(src.loadRef().beginParse());
        }
    }
}

export type SetRoundReward = {
    $$type: 'SetRoundReward';
    amount: bigint;
}

export function storeSetRoundReward(src: SetRoundReward) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1359229940, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadSetRoundReward(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1359229940) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'SetRoundReward' as const, amount: _amount };
}

function loadTupleSetRoundReward(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'SetRoundReward' as const, amount: _amount };
}

function storeTupleSetRoundReward(source: SetRoundReward) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserSetRoundReward(): DictionaryValue<SetRoundReward> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetRoundReward(src)).endCell());
        },
        parse: (src) => {
            return loadSetRoundReward(src.loadRef().beginParse());
        }
    }
}

 type VotingRound_init_args = {
    $$type: 'VotingRound_init_args';
    parent: Address;
    round: bigint;
}

function initVotingRound_init_args(src: VotingRound_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeInt(src.round, 257);
    };
}

async function VotingRound_init(parent: Address, round: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initVotingRound_init_args({ $$type: 'VotingRound_init_args', parent, round })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const VotingRound_errors: { [key: number]: { message: string } } = {
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
    2768: { message: `only opened rounds can be finalized` },
    5655: { message: `only passed rounds can be finalized` },
    5681: { message: `not a guard` },
    17999: { message: `guard must vote for candidate` },
    18736: { message: `wrong round` },
    20445: { message: `parent only` },
    23980: { message: `already voted` },
    25476: { message: `unfreeze not passed yet` },
    29552: { message: `invalid round` },
    34495: { message: `invalid payload hash by counter` },
    36401: { message: `unfreeze not found` },
    37813: { message: `min votes not exceeded` },
    38183: { message: `invalid payload votes by hash` },
    39981: { message: `too much` },
    40368: { message: `Contract stopped` },
    42431: { message: `min stake` },
    46604: { message: `round was finalized` },
    47963: { message: `bad sender` },
    48360: { message: `not a participant` },
    48930: { message: `min votes required` },
    53296: { message: `Contract not stopped` },
    53872: { message: `unfreeze passed` },
    56100: { message: `already opened` },
    57037: { message: `no rewards` },
    57851: { message: `already finalized` },
}

const VotingRound_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NewParticipantEvent","header":932337177,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"votes","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unfreezeTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ParticipantQuitEvent","header":974254702,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"votes","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"unfreezeTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"OpenRound","header":746268676,"fields":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Vote","header":3335902498,"fields":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"payload","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"FinalizeRound","header":2302895222,"fields":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PayloadVotes","header":null,"fields":[{"name":"payload","type":{"kind":"simple","type":"string","optional":false}},{"name":"votes","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"guarded","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"RoundParticipantInfo","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"votes","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"payloadHash","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"guard","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"InternalRoundOpened","header":2289982627,"fields":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"InternalVote","header":2008725369,"fields":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"payload","type":{"kind":"simple","type":"string","optional":false}},{"name":"participant","type":{"kind":"simple","type":"address","optional":false}},{"name":"guard","type":{"kind":"simple","type":"bool","optional":false}},{"name":"votes","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InternalFinalize","header":4124677558,"fields":[{"name":"minVotes","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"InternalFinalized","header":2800852515,"fields":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"winnerPayload","type":{"kind":"simple","type":"string","optional":true}},{"name":"winnerVotes","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"winnerGuarded","type":{"kind":"simple","type":"bool","optional":false}},{"name":"goodParticipants","type":{"kind":"dict","key":"int","value":"address"}},{"name":"goodParticipantsCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"goodParticipantsVotes","type":{"kind":"dict","key":"address","value":"int"}},{"name":"badParticipants","type":{"kind":"dict","key":"int","value":"address"}},{"name":"badParticipantsCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"badParticipantsVotes","type":{"kind":"dict","key":"address","value":"int"}}]},
    {"name":"PromoteToGuard","header":1194924511,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RevokeGuard","header":2479156566,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetRoundReward","header":1359229940,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const VotingRound_getters: ABIGetter[] = [
    {"name":"participantsCount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"winnerPayload","arguments":[],"returnType":{"kind":"simple","type":"string","optional":true}},
    {"name":"winnerVotes","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"winnerGuarded","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

const VotingRound_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"check opened round"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalVote"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalFinalize"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class VotingRound implements Contract {
    
    static async init(parent: Address, round: bigint) {
        return await VotingRound_init(parent, round);
    }
    
    static async fromInit(parent: Address, round: bigint) {
        const init = await VotingRound_init(parent, round);
        const address = contractAddress(0, init);
        return new VotingRound(address, init);
    }
    
    static fromAddress(address: Address) {
        return new VotingRound(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  VotingRound_types,
        getters: VotingRound_getters,
        receivers: VotingRound_receivers,
        errors: VotingRound_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'check opened round' | InternalVote | InternalFinalize | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'check opened round') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalVote') {
            body = beginCell().store(storeInternalVote(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalFinalize') {
            body = beginCell().store(storeInternalFinalize(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getParticipantsCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('participantsCount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getWinnerPayload(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('winnerPayload', builder.build())).stack;
        let result = source.readStringOpt();
        return result;
    }
    
    async getWinnerVotes(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('winnerVotes', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getWinnerGuarded(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('winnerGuarded', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}