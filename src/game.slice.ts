import {RoomId, PlayerId} from "./types";
import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EventTypes} from "./constants";
import {
    JoinedLobbyPayload,
    PlayerDisconnectedPayload,
    PlayerJoinLobbyPayload,
    PlayerReadyPayload
} from "./ws/webSocketEvents";
import {RootState} from "./store";

export type PlayerState = {
    id: PlayerId,
    name: string,
    isReady: boolean,
}

export type GameState = {
    myId: PlayerId | null,
    roomId: RoomId | null,
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

// Slice

export const gameSlice = createSlice({
    name: 'lobby',
    initialState: adapter.getInitialState({
        myId: null,
        roomId: null
    }) as GameState,
    reducers: {
        joinedLobby(state: GameState, action: PayloadAction<JoinedLobbyPayload>) {
            state.myId = action.payload.myId
            state.roomId = action.payload.lobby.roomId
            adapter.upsertMany(state, action.payload.lobby.players)
        },
        playerJoinLobby(state: GameState, action: PayloadAction<PlayerJoinLobbyPayload>) {
            const playerState: PlayerState = {
                id: action.payload.playerId,
                name: action.payload.playerName,
                isReady: false,
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
        }
    }
})

export const joinedLobby = gameSlice.actions.joinedLobby
export const playerJoinLobby = gameSlice.actions.playerJoinLobby
export const playerReady = gameSlice.actions.playerReady
export const playerDisconnected = gameSlice.actions.playerDisconnected

export const actionCreatorsForEvents = {
    [EventTypes.JOINED_LOBBY]: joinedLobby,
    [EventTypes.PLAYER_JOIN_LOBBY]: playerJoinLobby,
    [EventTypes.PLAYER_READY]: playerReady,
    [EventTypes.PLAYER_DISCONNECTED]: playerDisconnected
}
