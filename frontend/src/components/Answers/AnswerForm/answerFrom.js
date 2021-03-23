import './answerForm.css';
import React, {Component} from 'react';
import {Link, useHistory} from "react-router-dom";
import FinkiQAService from "../../../repository/finkiqaRepository";

class AnswerForm extends Component {

    constructor(props) {
        super(props);

        this.onChangeField = this.onChangeField.bind(this);
        this.state = {
            explanation: "",
            likes: 0,
            dislikes: 0,
            questionId: this.props.questionId,
            username: "mirjana.mirjanovska",
            answers: []
        }
    }

    onChangeField(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveAnswer = (explanation, likes, dislikes, questionId, username) => {
        this.props.onAddAnswer(explanation, likes, dislikes, questionId, username);
    }

    editAnswer = (id, explanation, likes, dislikes, questionId, username) => {
        console.log(id);
        console.log(explanation)
        console.log(likes)
        console.log(dislikes)
        console.log(this.props.questionId);
        console.log(questionId)
        console.log(username)
        this.props.onEditAnswer(id, explanation, likes, dislikes, questionId, username);
        this.props.toogleButton();
    }

    getAnswersFromQuestionId = (id) => {
        this.getQuestion(id);
        FinkiQAService.getAnswersByQuestionId(id)
            .then((data) => {
                this.setState({
                    answers: data.data
                });

            });
    }

    render() {
        return (
            <div className={"container mt-4"}>
                <div className="row">
                    <div className="col-md-5">
                        <form onSubmit={(e) => {e.preventDefault(); (this.props.answer !== undefined) ?
                            this.editAnswer(this.props.answer.id, this.state.explanation, this.state.likes, this.state.dislikes, this.state.questionId, this.state.username) :
                            this.saveAnswer(this.state.explanation, this.state.likes, this.state.dislikes, this.props.questionId, this.state.username) }}>

                            <div className="form-group">
                                <label htmlFor="explanation">Description</label>
                                <textarea className={"form-control answer-text-box"}
                                          id="explanation"
                                          name="explanation"
                                          onChange={this.onChangeField}
                                          value={this.state.explanation}
                                          required></textarea>
                            </div>

                            <div>
                                {console.log(this.props)}
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link type="button" className="btn btn-primary" to={"/questions"}>Back</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.answer !== undefined) {
            this.state.explanation = this.props.answer.explanation;
            this.state.likes = this.props.answer.likes;
            this.state.dislikes = this.props.answer.dislikes;
            console.log(this.props.answer.question.id);
            this.state.questionId = this.props.answer.question.id;
        }
    }
}

export default AnswerForm;