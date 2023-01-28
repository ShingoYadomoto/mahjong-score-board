import axios from "./axios";
import {PlayerID} from "../../component/newPlayer/newPlayer";
import {RoomID} from "../../component/room/room";

export interface ICreatePlayerData {
    playerID: PlayerID,
}

export interface ICreateRoomData {
    roomID: RoomID,
}

export enum FanType {
    ton = 1,
    nan = 2,
    sha = 3,
    pei = 4,
}

export type Field = {
    fan    : FanType
    stack  : number
    deposit: number
}

export type Player = {
    id      : PlayerID
    fan     : FanType
    point   : number
    isRiichi: boolean
}

export interface IRoomDetail {
    roomID : RoomID
    version: string
    field  : Field
    players: Player[]
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

const getRoom = () => {
    return axios.get<IRoomDetail>(`/room`);
};

const joinRoom = (roomID: RoomID) => {
    return axios.post(`/rooms/` + roomID + `/in`);
};

const leaveRoom = (roomID: RoomID) => {
    return axios.post(`/rooms/` + roomID + `/out`);
};


const Data = {
    createPlayer,
    getPlayer,
    createRoom,
    getRoom,
    joinRoom,
    leaveRoom,
};

export default Data;