import React from 'react'
import {Room, RoomDetail} from "../room/room";
import data from "../../data/infrastructure/data";
import './top.css'

type TopState = {
    room: RoomDetail
    name: string
    playerCreated: boolean
}

class Top extends React.Component<{}, TopState> {
    constructor(props: {}) {
        super(props);

        const roomDetail: RoomDetail = {
            roomID: 2,
        }

        this.state = {
            room: roomDetail,
            name: "test user",
            playerCreated: false,
        };
    }

    componentDidMount() {
        this.createPlayer()
    }

    createPlayer() {
        if (this.state.playerCreated) return;

        data.createPlayer(this.state.name)
            .then((response) => {
                this.setState({
                    playerCreated: true,
                })
                console.log("success create player");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


    render() {
        const room = this.state.playerCreated ? <Room detail={this.state.room}></Room> : <></>

        return (
            <>
                {room}
            </>
        );
    }
}

export default Top;