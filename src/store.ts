import {configureStore} from "@reduxjs/toolkit";
import {gameSlice, GameState} from "./game.slice";

export type RootState = {
    game: GameState
}

export const store = configureStore({
    reducer: {
        game: gameSlice.reducer
    }
})
