import axios from "./axios";
import {PlayerID} from "../../component/newPlayer/newPlayer";
import {RoomID} from "../../component/room/room";

export interface ICreatePlayerData {
    playerID: PlayerID,
}

export interface ICreateRoomData {
    roomID: RoomID,
}

const createPlayer = (name: string) => {
    return axios.post<ICreatePlayerData>(`/players`, {"name": name});
};

const getPlayer = () => {
    return axios.get<ICreatePlayerData>(`/player`);
};

const createRoom = () => {
    return axios.post<ICreateRoomData>(`/rooms`);
};

const joinRoom = (roomID: number) => {
    return axios.post(`/rooms/` + roomID + `/in`);
};

const leaveRoom = (roomID: number) => {
    return axios.post(`/rooms/` + roomID + `/out`);
};

const getRoom = () => {
    return axios.get<ICreateRoomData>(`/room`);
};

const Data = {
    createPlayer,
    getPlayer,
    createRoom,
    joinRoom,
    leaveRoom,
    getRoom,
};

export default Data;