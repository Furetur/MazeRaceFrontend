import {Button} from "antd";
import {Status, StatusType} from "../../status";
import {gameWebSocket} from "../../ws/AppWebSocket";
import {useState} from "react";
import {CloseCircleOutlined} from "@ant-design/icons";

import styles from './CreateLobby.module.css'

export default function CreateLobby() {
    const [status, setStatus] = useState<StatusType>(Status.IDLE)
    const [error, setError] = useState('')

    const createLobby = async () => {
        setStatus(Status.PENDING)
        try {
            await gameWebSocket.joinRoom(null)
            setStatus(Status.SUCCESS)
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message)
            } else {
                setError(String(e))
            }
            setStatus(Status.ERROR)
        }
    }

    return (<div className={styles.CreateLobby}>
        <Button onClick={createLobby} loading={status === Status.PENDING}>Create a lobby</Button>
        {status === Status.ERROR && <span><CloseCircleOutlined/> {error} </span>}
    </div>)
}