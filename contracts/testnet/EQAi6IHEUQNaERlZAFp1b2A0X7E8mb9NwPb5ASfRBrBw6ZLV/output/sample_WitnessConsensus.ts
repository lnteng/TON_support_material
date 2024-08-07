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

 type WitnessConsensus_init_args = {
    $$type: 'WitnessConsensus_init_args';
    owner: Address;
}

function initWitnessConsensus_init_args(src: WitnessConsensus_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function WitnessConsensus_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initWitnessConsensus_init_args({ $$type: 'WitnessConsensus_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const WitnessConsensus_errors: { [key: number]: { message: string } } = {
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

const WitnessConsensus_types: ABIType[] = [
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

const WitnessConsensus_getters: ABIGetter[] = [
    {"name":"openedRound","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"isParticipant","arguments":[{"name":"participant","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"participantStake","arguments":[{"name":"participant","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"pendingReward","arguments":[{"name":"participant","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"checkGuardAddress","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"votingRoundAddress","arguments":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

const WitnessConsensus_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"top up rewards"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetRoundReward"}},
    {"receiver":"internal","message":{"kind":"text","text":"participate"}},
    {"receiver":"internal","message":{"kind":"text","text":"claim reward"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PromoteToGuard"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RevokeGuard"}},
    {"receiver":"internal","message":{"kind":"text","text":"quit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"FinalizeRound"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalFinalized"}},
    {"receiver":"internal","message":{"kind":"typed","type":"OpenRound"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalRoundOpened"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Vote"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
]

export class WitnessConsensus implements Contract {
    
    static async init(owner: Address) {
        return await WitnessConsensus_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await WitnessConsensus_init(owner);
        const address = contractAddress(0, init);
        return new WitnessConsensus(address, init);
    }
    
    static fromAddress(address: Address) {
        return new WitnessConsensus(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  WitnessConsensus_types,
        getters: WitnessConsensus_getters,
        receivers: WitnessConsensus_receivers,
        errors: WitnessConsensus_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'top up rewards' | SetRoundReward | 'participate' | 'claim reward' | PromoteToGuard | RevokeGuard | 'quit' | FinalizeRound | InternalFinalized | OpenRound | InternalRoundOpened | Vote | Deploy | ChangeOwner | 'Resume' | 'Stop') {
        
        let body: Cell | null = null;
        if (message === 'top up rewards') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetRoundReward') {
            body = beginCell().store(storeSetRoundReward(message)).endCell();
        }
        if (message === 'participate') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'claim reward') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PromoteToGuard') {
            body = beginCell().store(storePromoteToGuard(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RevokeGuard') {
            body = beginCell().store(storeRevokeGuard(message)).endCell();
        }
        if (message === 'quit') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FinalizeRound') {
            body = beginCell().store(storeFinalizeRound(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalFinalized') {
            body = beginCell().store(storeInternalFinalized(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OpenRound') {
            body = beginCell().store(storeOpenRound(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalRoundOpened') {
            body = beginCell().store(storeInternalRoundOpened(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Vote') {
            body = beginCell().store(storeVote(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message === 'Resume') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Stop') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOpenedRound(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('openedRound', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getIsParticipant(provider: ContractProvider, participant: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(participant);
        let source = (await provider.get('isParticipant', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getParticipantStake(provider: ContractProvider, participant: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(participant);
        let source = (await provider.get('participantStake', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getPendingReward(provider: ContractProvider, participant: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(participant);
        let source = (await provider.get('pendingReward', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getCheckGuardAddress(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('checkGuardAddress', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getVotingRoundAddress(provider: ContractProvider, round: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(round);
        let source = (await provider.get('votingRoundAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}