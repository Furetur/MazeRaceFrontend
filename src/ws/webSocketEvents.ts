import {EventTypes} from "../constants";
import {MazeConfig, PlayerId, Position, RoomId} from "../types";

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

export type StartingGamePayload = {
    mazeConfig: MazeConfig
}

export type StartingGame = AbstractWebSocketEvent<typeof EventTypes.STARTING_GAME, StartingGamePayload>

export type GameStateUpdatePayload = {
    playerStates: {id: PlayerId, position: Position}[]
}

export type GameStateUpdate = AbstractWebSocketEvent<typeof EventTypes.GAME_STATE_UPDATE, GameStateUpdatePayload>

export type PlayerWonPayload = {
    winner: PlayerId,
}

export type PlayerWon = AbstractWebSocketEvent<typeof EventTypes.PLAYER_WON, PlayerWonPayload>

export type WebSocketEvent = JoinedLobby |  PlayerJoinLobby | PlayerReady | PlayerDisconnected
