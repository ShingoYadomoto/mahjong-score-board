import React from 'react'
import data from "../../data/infrastructure/data";
import './toRoom.css'
import {RoomID} from "../room/room";

type ToRoomProps = {
    onSuccessToRoom: () => void;
    onFailCreateRoom: () => void;
    onFailJoinRoom: () => void;
}

export const ToRoom: React.FC<ToRoomProps> = props => {
    const [roomID, setRoomID] = React.useState<RoomID>(0);

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
                props.onFailCreateRoom()
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
                props.onFailJoinRoom()
                console.log(e);
            });
    };

    return (
        <>
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