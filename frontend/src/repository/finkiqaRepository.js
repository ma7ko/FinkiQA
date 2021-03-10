import axios from '../custom-axios/axios';

const FinkiQAService = {
    fetchQuestions: () => {
        return axios.get("/questions");
    },
    fetchTags: () => {
        return axios.get("/tags");
    },
    addQuestion: (title, description, likes, dislikes, username, tags) => {
        return axios.post("/questions/add", {
            "title": title,
            "description": description,
            "likes": likes,
            "dislikes": dislikes,
            "username": username,
            "tags": tags
        });
    },
    editQuestion: (id, title, description, likes, dislikes, username, tags) => {
        return axios.put(`/questions/${id}/edit`, {
            "title": title,
            "description": description,
            "likes": likes,
            "dislikes": dislikes,
            "username": username,
            "tags": tags
        });
    },
    deleteQuestion: (id) => {
        return axios.delete(`/questions/${id}/delete`);
    },
    getQuestion: (id) => {
        return axios.get(`questions/${id}`);
    },
    addTag: (name) => {
        return axios.post("/tags/add", {
            "name": name
        });
    },
    deleteAnswer: (id) => {
        return axios.delete(`/answers/${id}/delete`);
    },
    addAnswer: (explanation, likes, dislikes, questionId, userId) => {
        return axios.post("/answers/add", {
            "explanation": explanation,
            "likes": likes,
            "dislikes": dislikes,
            "questionId": questionId,
            "userId": userId
        });
    },
    getAnswersByQuestionId: (id) => {
        return axios.get(`/questions/${id}/answers`);
    },
    getTagsByQuestionId: (id) => {
        return axios.get(`/questions/${id}/tags`);
    },
    getAnswerById: (id) => {
        return axios.get(`/answers/${id}`)
    },
    deleteTag: (id) => {
        return axios.delete(`/tags/${id}/delete`);
    },
    likeAnswer: (id) => {
        return axios.get(`/answers/${id}/like`);
    },
    dislikeAnswer: (id) => {
        return axios.get(`/answers/${id}/dislike`);
    },
    likeQuestion: (id) => {
        return axios.get(`/questions/${id}/like`);
    },
    dislikeQuestion: (id) => {
        return axios.get(`/questions/${id}/dislike`);
    }
}

export default FinkiQAService;