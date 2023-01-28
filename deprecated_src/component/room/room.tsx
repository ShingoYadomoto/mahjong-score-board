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

    const handleClickButton = (msg: string) => {
        if (msg === "流局") {
            data.next()
                .then((response) => {
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }

        // socketRef.current?.send(JSON.stringify({Message: msg}))
    };

    return (
        <div className={"situation"}>
            <div>メッセージ: {message}</div>
            <button type="button" onClick={() => handleClickButton("ロン")}>ロン</button>
            <button type="button" onClick={() => handleClickButton("ツモ")}>ツモ</button>
            <button type="button" onClick={() => handleClickButton("流局")}>流局</button>

            <button type="button" onClick={handleLeaveRoom}>退室する</button>
        </div>
    );
}