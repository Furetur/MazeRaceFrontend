import {makePlayerInput, makeReadyUpdate} from "./webSocketActions";
import {DirectionType, RoomId} from "../types";
import {EventTypes, LOBBY_WEBSOCKET_ENDPOINT, ROOM_ID_QUERY_PARAM_KEY} from "../constants";
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

    joinRoom(roomId: RoomId | null): Promise<null> {
        if (this.websocket != null) {
            this.clearWebsocket()
        }
        return new Promise(((resolve, reject) => {
            this.websocket = new WebSocket(getEndpoint(roomId))
            this.setAllListeners(this.websocket)
            const removeListeners = () => {
                this.websocket?.removeEventListener('close', onClose)
                this.websocket?.removeEventListener('error', onError)
                this.websocket?.removeEventListener('message', onMessage)
            }
            // if received message EventTypes.JOINED_LOBBY then the promise will be resolved
            const onMessage = (event: MessageEvent) => {
                const wsEvent = JSON.parse(event.data) as WebSocketEvent
                if (wsEvent.type === EventTypes.JOINED_LOBBY) {
                    resolve(null)
                    removeListeners()
                }
            }
            // onClose will reject the promise
            const onClose = (event: CloseEvent) => {
                reject(new Error(event.reason))
                removeListeners()
            }
            // onError will reject the promise
            const onError = (event: Event) => {
                reject(new Error(event.type))
                removeListeners()
            }
            this.websocket.addEventListener('close', onClose)
            this.websocket.addEventListener('error', onError)
            this.websocket.addEventListener('message', onMessage)
        }))
    }

    private clearWebsocket() {
        this.websocket?.removeEventListener('open', this.onopen)
        this.websocket?.removeEventListener('close', this.onclose)
        this.websocket?.removeEventListener('error', this.onerror)
        this.websocket?.removeEventListener('message', this.onmessage)
        this.websocket = null
    }

    private setAllListeners(ws: WebSocket) {
        ws.addEventListener('open', this.onopen)
        ws.addEventListener('close', this.onclose)
        ws.addEventListener('error', this.onerror)
        ws.addEventListener('message', this.onmessage)
    }

    send(message: Object) {
        if (this.websocket == null) throw new Error('Websocket was null')
        console.log('Sending', message)
        this.websocket.send(JSON.stringify(message))
    }

    sendReady(isReady: boolean) {
        this.send(makeReadyUpdate(isReady))
    }

    move(direction: DirectionType) {
        this.send(makePlayerInput(direction))
    }
}

export const gameWebSocket = new AppWebSocket()
