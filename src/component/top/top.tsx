import React from 'react'
import {Room} from "../room/room";
import data from "../../data/infrastructure/data";
import './top.css'
import {ToRoom} from "../toRoom/toRoom";
import {NewPlayer} from "../newPlayer/newPlayer";

type TopState = {
    playerCreated   : boolean
    inRoom          : boolean
}

class Top extends React.Component<{}, TopState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            playerCreated   : false,
            inRoom          : false,
        };
    }

    componentDidMount() {
        this.checkInRoom()
    }

    checkInRoom() {
        data.checkInRoom()
            .then((response) => {
                this.setState({
                    playerCreated : true,
                    inRoom        : true,
                });
            })
            .catch((e: Error) => {
                this.setState({
                    inRoom : false,
                });
            });
    }

    onCreatePlayer() {
        this.setState({
            playerCreated: true,
        });
    }

    render() {
        const newPlayer = this.state.playerCreated ? <></> : <NewPlayer onSuccessNewPlayer={() => this.onCreatePlayer()}></NewPlayer>
        const newRoom   = !this.state.playerCreated || this.state.inRoom ? <></> : <ToRoom onSuccessToRoom={() => this.checkInRoom()}></ToRoom>
        const room      = this.state.inRoom ? <Room onLeaveRoom={() => this.checkInRoom()}></Room> : <></>

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