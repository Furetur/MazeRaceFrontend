import {DirectionType} from "./types";

export const LOBBY_WEBSOCKET_ENDPOINT = process.env.REACT_APP_LOBBY_WS_ENDPOINT as string

export const ROOM_ID_QUERY_PARAM_KEY = 'id'

export const ActionTypes = {
    READY_UPDATE: 'com.example.ReadyUpdate',
    PLAYER_INPUT: 'com.example.PlayerInput',
}

export const EventTypes = {
    JOINED_LOBBY: 'com.example.JoinedLobby',
    PLAYER_JOIN_LOBBY: 'com.example.PlayerJoinLobby',
    PLAYER_READY: 'com.example.PlayerReadyEvent',
    PLAYER_DISCONNECTED: 'com.example.PlayerDisconnected',
    STARTING_GAME: 'com.example.StartingGame',
    GAME_STATE_UPDATE: 'com.example.GameStateUpdate',
    PLAYER_WON: 'com.example.PlayerWon',
}

export const Direction: Record<DirectionType, DirectionType> = {
    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    LEFT: 'LEFT'
}
