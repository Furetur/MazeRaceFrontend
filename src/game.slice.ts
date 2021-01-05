import {RoomId, PlayerId, MazeConfig, Position} from "./types";
import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EventTypes} from "./constants";
import {
    GameStateUpdatePayload,
    JoinedLobbyPayload,
    PlayerDisconnectedPayload,
    PlayerJoinLobbyPayload,
    PlayerReadyPayload, PlayerWonPayload, StartingGamePayload
} from "./ws/webSocketEvents";
import {RootState} from "./store";

export type PlayerState = {
    id: PlayerId,
    name: string,
    isReady: boolean,
    position: Position | null,
}

export type GameState = {
    myId: PlayerId | null,
    roomId: RoomId | null,
    mazeConfig: MazeConfig | null,
    ids: PlayerId[],
    entities: {
        [id: number]: PlayerState
    }
}


const adapter = createEntityAdapter<PlayerState>()

// Selectors

const selectSlice = (state: RootState): GameState => state.game

export const selectMyId: (state: RootState) => PlayerId | null = createSelector(
    selectSlice,
    (state: GameState) => state.myId
)

export const selectRoomId: (state: RootState) => RoomId | null = createSelector(
    selectSlice,
    (state: GameState) => state.roomId
)

// @ts-ignore
export const selectPlayersIds: (state: RootState) => PlayerId[] = adapter.getSelectors(selectSlice).selectIds

export const selectPlayerById: (state: RootState, id: PlayerId) => PlayerState | undefined = adapter.getSelectors(selectSlice).selectById

export const selectMe = (state: RootState): PlayerState | undefined => {
    const myId = selectMyId(state)
    return myId != null ? selectPlayerById(state, myId) : undefined
}

export const selectMazeConfig: (state: RootState) => MazeConfig | null = createSelector(
    selectSlice,
    state => state.mazeConfig
)

export const selectPlayersOnPosition =  (state: RootState, position: Position): PlayerState[] => {
    const playerStates = adapter.getSelectors(selectSlice).selectAll(state)
    return playerStates.filter(playerState => playerState.position?.x === position.x && playerState.position.y === position.y)
}

// Slice

export const gameSlice = createSlice({
    name: 'lobby',
    initialState: adapter.getInitialState({
        myId: null,
        roomId: null,
        mazeConfig: null,
    }) as GameState,
    reducers: {
        joinedLobby(state: GameState, action: PayloadAction<JoinedLobbyPayload>) {
            state.myId = action.payload.myId
            state.roomId = action.payload.lobby.roomId
            const playerStates: PlayerState[] = action.payload.lobby.players.map(player => ({
                ...player,
                position: null
            }))
            adapter.upsertMany(state, playerStates)
        },
        playerJoinLobby(state: GameState, action: PayloadAction<PlayerJoinLobbyPayload>) {
            const playerState: PlayerState = {
                id: action.payload.playerId,
                name: action.payload.playerName,
                isReady: false,
                position: null,
            }
            adapter.upsertOne(state, playerState)
        },
        playerReady(state: GameState, action: PayloadAction<PlayerReadyPayload>) {
            const player = state.entities[action.payload.playerId]
            if (player != null) {
                player.isReady = action.payload.isReady
            }
        },
        playerDisconnected(state: GameState, action: PayloadAction<PlayerDisconnectedPayload>) {
            adapter.removeOne(state, action.payload.disconnectedPlayerId)
        },
        startingGame(state: GameState, action: PayloadAction<StartingGamePayload>) {
            state.mazeConfig = action.payload.mazeConfig
            for (const playerId of state.ids) {
                const player = state.entities[playerId]
                if (player != null) {
                    player.position = {
                        ...action.payload.mazeConfig.start
                    }
                }
            }
        },
        gameStateUpdate(state: GameState, action: PayloadAction<GameStateUpdatePayload>) {
            for (const incomingPlayerState of action.payload.playerStates) {
                const player = state.entities[incomingPlayerState.id]
                if (player != null) {
                    player.position = {
                        ...incomingPlayerState.position
                    }
                }
            }
        },
        playerWon(_, action: PayloadAction<PlayerWonPayload>) {
            alert(`Player with id ${action.payload.winner} won`)
        }
    }
})

export const joinedLobby = gameSlice.actions.joinedLobby
export const playerJoinLobby = gameSlice.actions.playerJoinLobby
export const playerReady = gameSlice.actions.playerReady
export const playerDisconnected = gameSlice.actions.playerDisconnected
export const startingGame = gameSlice.actions.startingGame
export const gameStateUpdate = gameSlice.actions.gameStateUpdate
export const playerWon = gameSlice.actions.playerWon

export const actionCreatorsForEvents = {
    [EventTypes.JOINED_LOBBY]: joinedLobby,
    [EventTypes.PLAYER_JOIN_LOBBY]: playerJoinLobby,
    [EventTypes.PLAYER_READY]: playerReady,
    [EventTypes.PLAYER_DISCONNECTED]: playerDisconnected,
    [EventTypes.STARTING_GAME]: startingGame,
    [EventTypes.GAME_STATE_UPDATE]: gameStateUpdate,
    [EventTypes.PLAYER_WON]: playerWon
}
