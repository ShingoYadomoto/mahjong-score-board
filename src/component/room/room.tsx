import React from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import './room.css'
import data from "../../data/infrastructure/data";

export type RoomID = number

type RoomProps = {
    onLeaveRoom: () => void;
}

export const Room: React.FC<RoomProps> = props => {
    const [message, setMessage] = React.useState<string>()
    const socketRef = React.useRef<ReconnectingWebSocket>()

    React.useEffect(() => {
        const websocket = new ReconnectingWebSocket('ws://' + process.env.REACT_APP_BASE_API_HOST + '/room')
        socketRef.current = websocket

        const onMessage = (event: MessageEvent<string>) => {
            setMessage(event.data)
        }
        websocket.addEventListener('message', onMessage)

        return () => {
            websocket.close()
            websocket.removeEventListener('message', onMessage)
        }
    }, [])

    const handleLeaveRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
        data.leaveRoom()
            .then((response) => {
                props.onLeaveRoom()
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div className={"situation"}>
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

            <button type="button" onClick={handleLeaveRoom}>退室する</button>
        </div>
    );
}