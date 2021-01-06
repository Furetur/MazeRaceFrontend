import {PlayerId} from "../../../types";
import {useSelector} from "react-redux";
import {selectMyId, selectPlayerById} from "../../../game.slice";
import {RootState} from "../../../store";
import {List, Space, Typography} from "antd";
import {CheckCircleTwoTone, CloseCircleOutlined, HomeTwoTone} from "@ant-design/icons";

type Props = {
    id: PlayerId
}

export default function LobbyPlayer({id}: Props) {
    const myId = useSelector(selectMyId)
    const player = useSelector(state => selectPlayerById(state as RootState, id))

    return player != null ? (
        <List.Item extra={<ReadyIcon isReady={player.isReady}/>}>
            <List.Item.Meta
                title={player.id === myId ?
                    <Typography.Text strong>
                        <Space>
                            <HomeTwoTone size={4}/>{player.name}
                        </Space>
                    </Typography.Text> :
                    <Typography.Text>{player.name}</Typography.Text>}/>
        </List.Item>
    ) : null
}

function ReadyIcon({isReady}: { isReady: boolean }) {
return isReady ? (<span>
<CheckCircleTwoTone/> Ready
</span>) :
(
    <span>
            <CloseCircleOutlined/> Not ready
        </span>
)
}