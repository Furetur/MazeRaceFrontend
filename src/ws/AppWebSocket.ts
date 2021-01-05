import {makeReadyUpdate} from "./webSocketActions";
import {RoomId} from "../types";
import { LOBBY_WEBSOCKET_ENDPOINT, ROOM_ID_QUERY_PARAM_KEY} from "../constants";
import { WebSocketEvent} from "./webSocketEvents";
import {PayloadAction} from "@reduxjs/toolkit";
import {actionCreatorsForEvents} from "../game.slice";
import {store} from "../store";

const getEndpoint = (roomId: RoomId | null): string => roomId == null ? LOBBY_WEBSOCKET_ENDPOINT : `${LOBBY_WEBSOCKET_ENDPOINT}?${ROOM_ID_QUERY_PARAM_KEY}=${roomId}`

const transformEventIntoReduxAction = (event: WebSocketEvent): PayloadAction<any> => {
    const {type, ...payload} = event
    // @ts-ignore
    return actionCreatorsForEvents[type](payload)
}

class AppWebSocket {
    websocket: WebSocket | null = null

    private onopen = () => console.log('Connected to', this.websocket?.url)
    private onclose = (closeEvent: CloseEvent) => console.log('Disconnected from', this.websocket?.url, closeEvent)
    private onerror = (event: Event) => console.log('Websocket error', this.websocket?.url, event)

    private onmessage = (event: MessageEvent) => {
        const wsEvent = JSON.parse(event.data) as WebSocketEvent
        console.log('Received message', wsEvent)
        const action = transformEventIntoReduxAction(wsEvent)
        console.log('Transformed into action', action)
        store.dispatch(action)
    }

    connect(roomId: RoomId | null) {
        if (this.websocket != null) throw new Error('Already connected')
        this.websocket = new WebSocket(getEndpoint(roomId))
        this.websocket.addEventListener('open', this.onopen)
        this.websocket.addEventListener('close', this.onclose)
        this.websocket.addEventListener('error', this.onerror)
        this.websocket.addEventListener('message', this.onmessage)
    }

    send(message: Object) {
        if (this.websocket == null) throw new Error('Websocket was null')
        console.log('Sending', message)
        this.websocket.send(JSON.stringify(message))
    }

    sendReady() {
        this.send(makeReadyUpdate(true))
    }

    sendUnready() {
        this.send(makeReadyUpdate(false))
    }
}

export const gameWebSocket = new AppWebSocket()
