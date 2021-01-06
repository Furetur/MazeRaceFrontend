import {useSelector} from "react-redux";
import {selectMe, selectPlayersIds, selectRoomId} from "../../game.slice";
import LobbyPlayer from "./LobbyPlayer/LobbyPlayer";
import {gameWebSocket} from "../../ws/AppWebSocket";
import {Card, Descriptions, List, Space, Switch} from "antd";

import {Typography} from "antd";

import styles from './Lobby.module.css'

const {Text} = Typography

export default function Lobby() {
    const me = useSelector(selectMe)
    const roomId = useSelector(selectRoomId)
    const playerIds = useSelector(selectPlayersIds)

    const onChange = (checked: boolean, _: Event) => {
        gameWebSocket.sendReady(checked)
    }

    return me != null && roomId != null ? (<div>
        <Card title="Lobby">
            <Space direction="vertical" size="middle">
                <Descriptions column={1}>
                    <Descriptions.Item label="Lobby number">{roomId}</Descriptions.Item>
                    <Descriptions.Item label="Sharable link">
                        <Text copyable>http:/link.com</Text>
                    </Descriptions.Item>
                </Descriptions>
                <List itemLayout="horizontal" dataSource={playerIds} renderItem={id => <LobbyPlayer key={id} id={id}/>}/>
                <Space direction="horizontal" align="end" className={styles.switchContainer}>
                    <label>
                        <Switch onChange={onChange}/>
                        <span className={styles.readySwitchText}>Ready</span>
                    </label>
                </Space>
            </Space>
        </Card>
    </div>) : null
}
