import React from 'react';
import JoinLobby from "./components/JoinLobby/JoinLobby";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";

import styles from './App.module.css'

function App() {
    return (
        <div className="App">
            <div className={styles.joinLobbyContainer}>
                <JoinLobby/>
            </div>
            <div className={styles.lobbyContainer}>
                <Lobby/>
            </div>
            <Game/>
        </div>
    );
}

export default App;
