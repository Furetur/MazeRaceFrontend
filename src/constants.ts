const WEBSOCKET_HOST = 'ws://localhost:8080/'

export const LOBBY_WEBSOCKET_ENDPOINT = `${WEBSOCKET_HOST}ws/lobby`

export const ROOM_ID_QUERY_PARAM_KEY = 'id'

export const ActionTypes = {
    READY_UPDATE: 'com.example.ReadyUpdate',
}

export const EventTypes = {
    JOINED_LOBBY: 'com.example.JoinedLobby',
    PLAYER_JOIN_LOBBY: 'com.example.PlayerJoinLobby',
    PLAYER_READY: 'com.example.PlayerReadyEvent',
    PLAYER_DISCONNECTED: 'com.example.PlayerDisconnected'
}