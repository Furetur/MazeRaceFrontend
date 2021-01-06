import CreateLobby from "./CreateLobby";
import JoinLobbyById from "./JoinLobbyById";
import {Card, Divider} from "antd";

export default function JoinLobby() {
    return (
        <Card>
            <CreateLobby />
            <Divider plain>or</Divider>
            <JoinLobbyById />
        </Card>
    )
}