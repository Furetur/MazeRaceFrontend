import {EventTypes} from "../constants";
import {PlayerId, RoomId} from "../types";

type AbstractWebSocketEvent<Type extends string, Payload> = { type: Type } & Payload

export type JoinedLobbyPayload = {
    myId: PlayerId,
    lobby: {
        roomId: RoomId,
        players: {id: PlayerId, name: string, isReady: boolean}[]
    }
}

export type JoinedLobby = AbstractWebSocketEvent<typeof EventTypes.JOINED_LOBBY, JoinedLobbyPayload>

export type PlayerJoinLobbyPayload = {
    playerId: PlayerId,
    playerName: string,
}

export type PlayerJoinLobby = AbstractWebSocketEvent<typeof EventTypes.PLAYER_JOIN_LOBBY, PlayerJoinLobbyPayload>

export type PlayerReadyPayload = {
    playerId: PlayerId,
    isReady: boolean,
}

export type PlayerReady = AbstractWebSocketEvent<typeof EventTypes.PLAYER_READY, PlayerReadyPayload>

export type PlayerDisconnectedPayload = {
    disconnectedPlayerId: PlayerId
}

export type PlayerDisconnected = AbstractWebSocketEvent<typeof EventTypes.PLAYER_DISCONNECTED, PlayerDisconnectedPayload>

export type WebSocketEvent = JoinedLobby |  PlayerJoinLobby | PlayerReady | PlayerDisconnected
