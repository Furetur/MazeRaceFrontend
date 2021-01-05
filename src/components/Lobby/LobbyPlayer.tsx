import {PlayerId} from "../../types";
import {useSelector} from "react-redux";
import {selectPlayerById} from "../../game.slice";
import {RootState} from "../../store";

type Props = {
    id: PlayerId
}

export default function LobbyPlayer({id}: Props) {
    const player = useSelector(state => selectPlayerById(state as RootState, id))
    return player != null ? (
        <div>
            <div>Name: {player.name}</div>
            <div>Ready: {player.isReady.toString()}</div>
        </div>
    ) : null
}