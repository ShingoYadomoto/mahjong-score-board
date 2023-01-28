import React from 'react'
import {Room, RoomID} from "../room/room";
import data from "../../data/infrastructure/data";
import './top.css'
import {ToRoom} from "../toRoom/toRoom";
import {NewPlayer, PlayerID} from "../newPlayer/newPlayer";

type TopState = {
    roomID  : RoomID   | undefined
    playerID: PlayerID | undefined
}

class Top extends React.Component<{}, TopState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            roomID   : undefined,
            playerID : undefined,
        };
    }

    componentDidMount() {
        this.checkInRoom()
    }

    checkInRoom() {
        data.getRoom()
            .then((response) => {
                this.setState({
                    roomID : response.data.roomID,
                });
            })
            .catch((e: Error) => {
                this.setState({
                    roomID : undefined,
                });
            });

        data.getPlayer()
            .then((response) => {
                this.setState({
                    playerID : response.data.playerID,
                });
            })
            .catch((e: Error) => {
                this.setState({
                    playerID : undefined,
                });
            });
    }

    render() {
        const newPlayer = this.state.playerID ? <></> : <NewPlayer onSuccessNewPlayer={() => this.checkInRoom()}></NewPlayer>
        const newRoom   = !this.state.playerID || this.state.roomID ? <></> : <ToRoom onSuccessToRoom={() => this.checkInRoom()}></ToRoom>
        const room      = this.state.roomID ? <Room RoomID={this.state.roomID} onLeaveRoom={() => this.checkInRoom()}></Room> : <></>

        return (
            <>
                {newPlayer}
                {newRoom}
                {room}
            </>
        );
    }
}

export default Top;