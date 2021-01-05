import React from "react";
import {useSelector} from "react-redux";
import {selectMazeConfig} from "../../game.slice";
import Cell from "./Cell";
import {DirectionType} from "../../types";
import {gameWebSocket} from "../../ws/AppWebSocket";
import {Direction} from "../../constants";

export default function Game() {
    const mazeConfig = useSelector(selectMazeConfig)

    const gridCss = mazeConfig != null ? {
        display: 'grid',
        width: `${mazeConfig.map[0].length * 50}px`,
        height: `${mazeConfig.map[0].length * 50}px`,
        gridTemplateColumns: `repeat(${mazeConfig.map[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${mazeConfig.map.length}, 1fr)`,
        border: '1px solid black'
    } : null

    const input = (direction: DirectionType) => () => {
        gameWebSocket.move(direction)
    }

    return mazeConfig != null && gridCss != null ? (
        <div>
            <h1>Maze</h1>
            <div>
                <button onClick={input(Direction.UP)}>Up</button>
                <button onClick={input(Direction.RIGHT)}>Right</button>
                <button onClick={input(Direction.DOWN)}>Down</button>
                <button onClick={input(Direction.LEFT)}>Left</button>
            </div>
            <div style={gridCss}>
                {mazeConfig.map.map((row, y) => (
                    <React.Fragment key={y}>
                        {row.map((_, x) => (
                            <Cell key={x} position={{x, y}}/>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    ) : null
}