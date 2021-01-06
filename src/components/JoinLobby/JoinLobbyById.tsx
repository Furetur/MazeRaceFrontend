import {ChangeEvent, useState} from "react";
import {gameWebSocket} from "../../ws/AppWebSocket";
import {Status, StatusType} from "../../status";
import {Button, Form, Input} from "antd";

import styles from './JoinLobbyById.module.css'

export default function JoinLobbyById() {
    const [status, setStatus] = useState<StatusType>(Status.IDLE)
    const [error, setError] = useState('')

    const joinLobby = async (roomId: number) => {
        setStatus(Status.PENDING)
        setError('')
        try {
            await gameWebSocket.joinRoom(roomId)
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

    const onFinish = (values: { roomId: string }) => {
        const {roomId} = values
        const parsedRoomId = parseInt(roomId)
        if (!Number.isNaN(parsedRoomId)) {
            joinLobby(parsedRoomId)
        } else {
            alert('Lobby number must be a number')
        }
    }

    const checkInput = (value: string) => {
        const numberRegex = /^[0-9]+$/
        return numberRegex.test(value)
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (checkInput(value)) {
            setStatus(Status.SUCCESS)
            setError('')
        } else {
            setStatus(Status.ERROR)
            setError('Must be a number')
        }
    }

    const validateStatus = ({
        [Status.IDLE]: null,
        [Status.ERROR]: 'error',
        [Status.PENDING]: 'validating',
        [Status.SUCCESS]: 'success',
    })[status] as 'error' | 'validating' | 'success' | undefined

    return (
        <div>
            <Form layout="inline" onFinish={onFinish} className={styles.form}>
                <Form.Item name="roomId" validateStatus={validateStatus}
                           extra={status === Status.ERROR ? <span className={styles.error}>{error}</span> : undefined}>
                    <Input onChange={onChange} placeholder="Lobby number" autoComplete="off"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={status === Status.PENDING}>Join lobby</Button>
                </Form.Item>
            </Form>
        </div>


    )
}