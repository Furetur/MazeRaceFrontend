import React from 'react';
import JoinLobby from "./components/JoinLobby/JoinLobby";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";

function App() {
    return (
        <div className="App">
            <JoinLobby/>
            <Lobby/>
            <Game/>
        </div>
    );
}

export default App;
