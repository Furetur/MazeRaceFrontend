import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectMazeConfig} from "../../game.slice";
import Cell from "./Cell/Cell";
import {DirectionType} from "../../types";
import {gameWebSocket} from "../../ws/AppWebSocket";
import {Direction} from "../../constants";
import Controls from "./Controls/Controls";
import {Card} from "antd";

import styles from './Game.module.css'

export default function Game() {
    const mazeConfig = useSelector(selectMazeConfig)

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                gameWebSocket.move(Direction.UP)
            } else if (e.key === 'ArrowRight') {
                gameWebSocket.move(Direction.RIGHT)
            } else if (e.key === 'ArrowDown') {
                gameWebSocket.move(Direction.DOWN)
            } else if (e.key === 'ArrowLeft') {
                gameWebSocket.move(Direction.LEFT)
            }
        }
        document.addEventListener('keydown', listener)
        return () => document.removeEventListener('keydown', listener)
    }, [])

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
        <Card className={styles.Game}>
            <div style={gridCss}>
                {mazeConfig.map.map((row, y) => (
                    <React.Fragment key={y}>
                        {row.map((_, x) => (
                            <Cell key={x} position={{x, y}}/>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.controlsContainer}>
                <Controls input={input} />
            </div>
        </Card>
    ) : null
}