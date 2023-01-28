import axios from "./axios";
import {RoomID} from "../../component/room/room";

export interface IRoomData {
    roomID: RoomID,
}

const createPlayer = (name: string) => {
    return axios.post(`/player`, {"name": name});
};

const createRoom = () => {
    return axios.post(`/room`);
};

const joinRoom = (roomID: number) => {
    return axios.post(`/room/` + roomID);
};

const checkInRoom = () => {
    return axios.get(`/room/in`);
};

const Data = {
    createPlayer,
    createRoom,
    joinRoom,
    checkInRoom,
};

export default Data;