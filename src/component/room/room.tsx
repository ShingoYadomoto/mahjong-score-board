import React from 'react'
import './room.css'
import data, {IRoomDetail} from "../../data/infrastructure/data";

export type RoomID = number

type RoomProps = {
    Room       : IRoomDetail
    onLeaveRoom: () => void;
}

export const Room: React.FC<RoomProps> = props => {
    const handleLeaveRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
        data.leaveRoom(props.Room.roomID)
            .then((response) => {
                props.onLeaveRoom()
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleClickButton = (msg: string) => {
    };

    return (
        <div className={"situation"}>
            <button type="button" onClick={() => handleClickButton("ロン")}>ロン</button>
            <button type="button" onClick={() => handleClickButton("ツモ")}>ツモ</button>
            <button type="button" onClick={() => handleClickButton("流局")}>流局</button>

            <button type="button" onClick={handleLeaveRoom}>退室する</button>
        </div>
    );
}