import axios from "axios";


class QuizService {

    static createQuiz = (payload: any) => {
        return axios.post(`http://localhost:8080/api/quiz/create`, payload);
    }

    static getQuestionsByTopic = async (topic: string) => {
        return axios.get(`http://localhost:8080/api/quiz/${topic}`);
    }

}

export default QuizService;
