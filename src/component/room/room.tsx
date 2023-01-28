import React from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import './room.css'
import * as Events from "reconnecting-websocket/events";

export type RoomID = number

export type RoomDetail = {
    roomID: RoomID;
}

type RoomProps = {
    detail: RoomDetail
}

export const Room: React.FC<RoomProps> = props => {
    const [message, setMessage] = React.useState<string>()
    const socketRef = React.useRef<ReconnectingWebSocket>()

    React.useEffect(() => {
        const websocket = new ReconnectingWebSocket('ws://' + process.env.REACT_APP_BASE_API_ENDPOINT + '/room', "", {debug:true})
        websocket.onclose = (event: Events.CloseEvent) => {
            console.log("closed")
        }
        socketRef.current = websocket

        const onMessage = (event: MessageEvent<string>) => {
            setMessage(event.data)
        }
        websocket.addEventListener('message', onMessage)

        return () => {
            // websocket.close()
            // websocket.removeEventListener('message', onMessage)
        }
    }, [])

    return (
        <div className={"situation"}>
            <span>部屋: {props.detail.roomID}</span>
            <span>メッセージ: {message}</span>
            <button
                type="button"
                onClick={() => {
                    // #4.WebSocketでメッセージを送信する場合は、イベントハンドラ内でsendメソッドを実行
                    socketRef.current?.send(JSON.stringify({Message: '送信メッセージ'}))
                }}
            >
                送信
            </button>
        </div>
    );
}