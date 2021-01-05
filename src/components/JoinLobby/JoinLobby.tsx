import {useState} from "react";
import {gameWebSocket} from "../../ws/AppWebSocket";

export default function JoinLobby() {
    const [roomId, setRoomId] = useState('')

    const joinLobby = () => {
        const parsedRoomId = parseInt(roomId)
        gameWebSocket.connect(Number.isNaN(parsedRoomId) ? null : parsedRoomId)
    }

    return (<div>
        <input type="text" value={roomId} onChange={event => setRoomId(event.target.value)}/>
        <button onClick={joinLobby}>Join Lobby</button>
    </div>)
}