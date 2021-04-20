import axios from '../custom-axios/axios';
import authHeader from "./auth-header";

const FinkiQAService = {
    fetchQuestions: () => {
        return axios.get("/questions", { headers: authHeader() });
    },
    fetchTags: () => {
        return axios.get("/tags", { headers: authHeader() });
    },
    addQuestion: (title, description, likes, dislikes, username, tags) => {
        return axios.post("/questions/add", {
            "title": title,
            "description": description,
            "likes": likes,
            "dislikes": dislikes,
            "userId": username,
            "tags": tags
        }, { headers: authHeader() });
    },
    editQuestion: (id, title, description, likes, dislikes, username, tags) => {
        return axios.put(`/questions/${id}/edit`, {
            "title": title,
            "description": description,
            "likes": likes,
            "dislikes": dislikes,
            "userId": username,
            "tags": tags
        }, { headers: authHeader() });
    },
    deleteQuestion: (id) => {
        return axios.delete(`/questions/${id}/delete`, { headers: authHeader() });
    },
    getQuestion: (id) => {
        return axios.get(`questions/${id}`, { headers: authHeader() });
    },
    addTag: (name) => {
        return axios.post("/tags/add", {
            "name": name
        }, { headers: authHeader() });
    },
    deleteAnswer: (id) => {
        return axios.delete(`/answers/${id}/delete`, { headers: authHeader() });
    },
    addAnswer: (explanation, likes, dislikes, questionId, userId) => {
        return axios.post("/answers/add", {
            "explanation": explanation,
            "likes": likes,
            "dislikes": dislikes,
            "questionId": questionId,
            "userId": userId
        }, { headers: authHeader() });
    },
    editAnswer: (id, explanation, likes, dislikes, questionId, userId) => {
        return axios.put(`/answers/${id}/edit`, {
            "explanation": explanation,
            "likes": likes,
            "dislikes": dislikes,
            "questionId": questionId,
            "userId": userId
        }, { headers: authHeader() });
    },
    getAnswersByQuestionId: (id) => {
        return axios.get(`/questions/${id}/answers`, { headers: authHeader() });
    },
    getTagsByQuestionId: (id) => {
        return axios.get(`/questions/${id}/tags`, { headers: authHeader() });
    },
    getAnswerById: (id) => {
        return axios.get(`/answers/${id}`, { headers: authHeader() })
    },
    deleteTag: (id) => {
        return axios.delete(`/tags/${id}/delete`, { headers: authHeader() });
    },
    likeAnswer: (id, userId) => {
        return axios.get(`/answers/${id}/like-by/${userId}`, { headers: authHeader() });
    },
    dislikeAnswer: (id, userId) => {
        return axios.get(`/answers/${id}/dislike-by/${userId}`, { headers: authHeader() });
    },
    likeQuestion: (id, userId) => {
        return axios.get(`/questions/${id}/like-by/${userId}`, { headers: authHeader() });
    },
    dislikeQuestion: (id, userId) => {
        return axios.get(`/questions/${id}/dislike-by/${userId}`, { headers: authHeader() });
    },
    findTagsContaining: (pattern) => {
        return axios.get(`/questions/find-tags-containing/${pattern}`,{ headers: authHeader() });
    }
}

export default FinkiQAService;