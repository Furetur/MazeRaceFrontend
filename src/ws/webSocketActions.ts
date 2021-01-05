import {ActionTypes} from "../constants";
import {DirectionType} from "../types";

export type ReadyUpdate = {
    type: typeof ActionTypes.READY_UPDATE,
    isReady: boolean,
}

export type PlayerInput = {
    type: typeof ActionTypes.PLAYER_INPUT,
    direction: DirectionType
}

export const makeReadyUpdate = (isReady: boolean): ReadyUpdate => (
    {
        type: ActionTypes.READY_UPDATE,
        isReady
    }
)

export const makePlayerInput = (direction: DirectionType): PlayerInput => ({
    type: ActionTypes.PLAYER_INPUT,
    direction,
})

