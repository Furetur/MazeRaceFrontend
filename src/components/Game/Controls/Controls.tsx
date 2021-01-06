import {Button} from "antd";
import {DirectionType} from "../../../types";
import {Direction} from "../../../constants";

import styles from './Controls.module.css'

type Props = {
    input: (direction: DirectionType) => () => void;
}
export default function Controls({input}: Props) {
    return (
        <div className={styles.Controls}>
            <Button className={styles.up} onClick={input(Direction.UP)}>↑</Button>
            <Button className={styles.right} onClick={input(Direction.RIGHT)}>→</Button>
            <Button className={styles.down} onClick={input(Direction.DOWN)}>↓</Button>
            <Button className={styles.left} onClick={input(Direction.LEFT)}>←</Button>
        </div>
    )
}