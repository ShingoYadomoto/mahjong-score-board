import React from 'react'
import data from "../../data/infrastructure/data";
import './toRoom.css'
import {RoomID} from "../room/room";

type ToRoomProps = {
    onSuccessToRoom: () => void;
}

enum ErrorCode {
    create = 1,
    join   = 2,
}


export const ToRoom: React.FC<ToRoomProps> = props => {
    const [roomID, setRoomID] = React.useState<RoomID>(0);
    const [errorMsg, setErrorMsg] = React.useState("");

    const handleChangeRoomID = (event: React.ChangeEvent<HTMLInputElement>) => {
        const roomID: RoomID = +event.target.value
        setRoomID(roomID);
    };

    const handleCreateRoom = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        data.createRoom()
            .then((response) => {
                props.onSuccessToRoom()
            })
            .catch((e: Error) => {
                onError(ErrorCode.create);
                console.log(e);
            });
    };

    const handleJoinRoom = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        data.joinRoom(roomID)
            .then((response) => {
                props.onSuccessToRoom()
            })
            .catch((e: Error) => {
                onError(ErrorCode.join);
                console.log(e);
            });
    };

    const onError = (err: ErrorCode) => {
        switch(err){
            case ErrorCode.create:
                setErrorMsg("部屋の作成に失敗しました。");
                return
            case ErrorCode.join:
                setErrorMsg("部屋が存在しません。");
                return
            default:   return <></>;
        }
    };

    return (
        <>
            <div>{errorMsg}</div>
            <form onSubmit={handleCreateRoom}>
                <input type="submit" value="部屋を作成する" />
            </form>
            <form onSubmit={handleJoinRoom}>
                <label>
                    RoomID:<input type="text" value={roomID} onChange={handleChangeRoomID} />
                </label>
                <input type="submit" value="部屋に入室する" />
            </form>
        </>
    );
}