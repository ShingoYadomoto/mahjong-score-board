import React from 'react'
import {Room, RoomID} from "../room/room";
import data, {Field, Player, IRoomDetail} from "../../data/infrastructure/data";
import './top.css'
import {ToRoom} from "../toRoom/toRoom";
import {NewPlayer, PlayerID} from "../newPlayer/newPlayer";

type TopState = {
    room    : IRoomDetail | undefined
    playerID: PlayerID | undefined
}

class Top extends React.Component<{}, TopState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            room     : undefined,
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
                    room : response.data,
                });
            })
            .catch((e: Error) => {
                this.setState({
                    room : undefined,
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
        const newRoom   = !this.state.playerID || this.state.room ? <></> : <ToRoom onSuccessToRoom={() => this.checkInRoom()}></ToRoom>
        const room      = this.state.room ? <Room Room={this.state.room} onLeaveRoom={() => this.checkInRoom()}></Room> : <></>

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