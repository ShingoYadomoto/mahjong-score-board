import React from 'react'
import {Room, RoomDetail} from "../room/room";
import './top.css'

type TopState = {
    room: RoomDetail
}

class Top extends React.Component<{}, TopState> {
    constructor(props: {}) {
        super(props);

        const roomDetail: RoomDetail = {
            roomID: 2,
        }

        this.state = {
            room: roomDetail,
        };
    }

    render() {
        return (
            <Room detail={this.state.room}></Room>
        );
    }
}

export default Top;