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

// const getQuestion = (excludeID: QuestionID[]) => {
//     return axios.get<IQuestionData>(`/question`, { params: { exclude_id: JSON.stringify(excludeID) } });
// };
//
// const getAnswer = (id: QuestionID, data: IAnswerRequest) => {
//     return axios.get<IAnswerData>(`/answer`, { params: { question_id: id, answer: JSON.stringify(data) } });
// };

const Data = {
    // getQuestion,
    // getAnswer,
};

export default Data;