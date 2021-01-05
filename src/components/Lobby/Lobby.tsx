import {useSelector} from "react-redux";
import {selectMe, selectPlayersIds, selectRoomId} from "../../game.slice";
import LobbyPlayer from "./LobbyPlayer";
import {gameWebSocket} from "../../ws/AppWebSocket";

export default function Lobby() {
    const me = useSelector(selectMe)
    const roomId = useSelector(selectRoomId)
    const playerIds = useSelector(selectPlayersIds)

    const ready = () => gameWebSocket.sendReady()
    const unready = () => gameWebSocket.sendUnready()

    return me != null && roomId != null ? (<div>
        <h1>Lobby {roomId}</h1>
        <h3>Players in Lobby</h3>
        You are {me.name}
        <ol>
            {playerIds.map(id => <li key={id}>
                <LobbyPlayer id={id}/>
            </li>)}
        </ol>
        {!me.isReady ? <button onClick={ready}>Ready</button> : <button onClick={unready}>Unready</button>}
    </div>) : null
}