import React from 'react'
import {Room} from "../room/room";
import data from "../../data/infrastructure/data";
import './top.css'
import {ToRoom} from "../toRoom/toRoom";
import {NewPlayer} from "../newPlayer/newPlayer";

type TopState = {
    playerCreated   : boolean
    inRoom          : boolean
    failedCreateRoom: boolean
    failedJoinRoom  : boolean
}

class Top extends React.Component<{}, TopState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            playerCreated   : false,
            inRoom          : false,
            failedCreateRoom: false,
            failedJoinRoom  : false,
        };
    }

    componentDidMount() {
        this.checkInRoom()
    }

    checkInRoom() {
        data.checkInRoom()
            .then((response) => {
                this.setState({
                    playerCreated   : true,
                    inRoom          : true,
                    failedCreateRoom: false,
                    failedJoinRoom  : false,
                });
                console.log("In Room")
            })
            .catch((e: Error) => {
                console.log("Not In Room")
                console.log(e);
            });
    }

    onCreatePlayer() {
        this.setState({
            playerCreated: true,
        });
    }

    onFailCreateRoom() {
        this.setState({
            failedCreateRoom: true,
        });
    }

    onFailJoinRoom() {
        this.setState({
            failedJoinRoom: true,
        });
    }

    render() {
        const newPlayer = this.state.playerCreated ? <></> : <NewPlayer onSuccessNewPlayer={() => this.onCreatePlayer()}></NewPlayer>
        const newRoom   = !this.state.playerCreated || this.state.inRoom ? <></> : <ToRoom onSuccessToRoom={() => this.checkInRoom()} onFailCreateRoom={() => this.onFailCreateRoom()} onFailJoinRoom={() => this.onFailJoinRoom()}></ToRoom>
        const room      = this.state.inRoom ? <Room></Room> : <></>

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