import classNames from 'classnames'
import {Position} from "../../../types";
import {useSelector} from "react-redux";
import {selectMazeConfig, selectMe, selectPlayersOnPosition} from "../../../game.slice";

// @ts-ignore
import styles from './Cell.module.css';
import {RootState} from "../../../store";

type Props = {
    position: Position
}

const selectCellStatus = (state: RootState, position: Position): 'both' | 'me' | 'enemy' | 'empty' => {
    const me = selectMe(state)
    if (me == null) {
        return 'empty'
    }
    const cellPlayers = selectPlayersOnPosition(state, position)
    if (cellPlayers.length >= 2) {
        return 'both'
    } else if (cellPlayers.length === 1 && cellPlayers.includes(me)) {
        return 'me'
    } else if (cellPlayers.length === 1) {
        return 'enemy'
    } else {
        return 'empty'
    }

}

export default function Cell({position}: Props) {
    const mazeConfig = useSelector(selectMazeConfig)
    // @ts-ignore
    const cellStatus = useSelector(state => selectCellStatus(state, position))
    const cell = mazeConfig?.map[position.y][position.x]


    const classes = classNames(
        styles.Cell,
        {
            [styles.empty]: cellStatus === 'empty',
            [styles.enemy]: cellStatus === 'enemy',
            [styles.me]: cellStatus === 'me',
            [styles.both]: cellStatus === 'both',
            [styles.wall]: cell === 'WALL',
            [styles.finish]: position.x === mazeConfig?.finish.x && position.y === mazeConfig?.finish.y
        }
    )

    return (
        <div className={classes}>
            {cell == null ? '?' : ''}
        </div>
    )
}
