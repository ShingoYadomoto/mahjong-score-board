import axios from "./axios";

type PaiDetail = {
    index: number;
    isFolou: boolean;
    isBonus: boolean;
}

export interface IQuestionData {
    paiList: PaiDetail[],
    page: number,
}

export interface IAnswerRequest {
    userAnswer: PaiDetail,
}

export interface IAnswerData {
    page: number,
    isCorrect: boolean,
    correctAnswer: PaiDetail[],
    comment: string,
}

const createPlayer = (name: string) => {
    return axios.post(`/player`, {"name": name});
};

// const getAnswer = (id: QuestionID, data: IAnswerRequest) => {
//     return axios.get<IAnswerData>(`/answer`, { params: { question_id: id, answer: JSON.stringify(data) } });
// };

const Data = {
    createPlayer,
};

export default Data;