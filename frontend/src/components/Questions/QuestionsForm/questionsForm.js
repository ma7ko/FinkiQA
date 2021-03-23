import '../QuestionTerm/questions.css';
import React, {useEffect, Component} from 'react';
import {Link, useHistory} from 'react-router-dom';
import tags from "../../Tags/TagsList/tags";
import FinkiQAService from "../../../repository/finkiqaRepository";

class QuestionsForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeField = this.onChangeField.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);

        this.state = {
            title: "",
            description: "",
            likes: 0,
            dislikes: 0,
            username: "mirjana.mirjanovska",
            tags: [],
            currentQuestion: {}
        }
    }

    onChangeField(e) {
        this.setState({
            [e.target.name]: e.target.value.trim()
        });
    }

    getQuestion(id) {
        FinkiQAService.getQuestion(id)
            .then((data) => {
                this.setState({
                    likes: data.data.likes,
                    dislikes: data.data.dislikes,
                    username: data.data.user.username,
                    tags: data.data.tags.map((term) => {
                        return term.id.toString();
                    }),
                    currentQuestion: data.data
                });
            });
    }

    saveQuestion(title, description, likes, dislikes, username, tags) {
        FinkiQAService.addQuestion(title, description, likes, dislikes, username, tags)
            .then(() => {
                this.props.onSubmitted();
                this.props.props.history?.push('/questions')
            });
    }

    editQuestion(id, title, description, likes, dislikes, username, tags) {
        console.log(id);
        console.log(title);
        console.log(description);
        console.log(likes);
        console.log(dislikes);
        console.log(username);
        console.log(tags);
        FinkiQAService.editQuestion(id, title, description, likes, dislikes, username, tags)
            .then(() => {
                this.props.onSubmitted();
                this.props.props.history?.push('/questions');
            });
    }

    removeTag(e, id) {
        console.log(e);
        console.log(id);
        console.log(this.state.tags);
        console.log(this.state.currentQuestion?.tags);
        this.state.currentQuestion.tags = this.state.currentQuestion.tags.filter(function (value, index, arr) {
            console.log(value.id);
            return value.id.toString() !== id.toString();
        });
        console.log(this.state.currentQuestion?.tags);
        let obj = JSON.parse(`{"id": ${id}, "name": "${e.target.innerText}", "description": ${null}}`);
        console.log(obj);
    }

    addTag(e, id) {
        let selectedTag = this.props.tags.filter(function (value, index, arr) {
            console.log(value.id);
            return value.id.toString() === id.toString();
        })[0];
        let contains = this.state.currentQuestion.tags.filter(function (value, index, arr) {
            return value.id.toString() === id.toString();
        });
        console.log(contains);
        console.log(selectedTag);
        if (contains.length === 0) {
            this.state.currentQuestion.tags.push(selectedTag);
        }
        console.log(e);
        console.log(id);
        console.log(this.state.tags);
        console.log(this.state.currentQuestion.tags);
    }


    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <form onSubmit={(e) => {e.preventDefault(); (this.props.props.match?.params?.id !== "null") ?
                            this.editQuestion(this.props.props.match.params.id, this.state.currentQuestion.title, this.state.currentQuestion.description, this.state.currentQuestion.likes, this.state.currentQuestion.dislikes, this.state.currentQuestion.user.username, this.state.currentQuestion.tags.map((term) => {return term.id.toString()})) :
                            this.saveQuestion(this.state.title, this.state.description, this.state.likes, this.state.dislikes, this.state.username, this.state.tags.map((term) => {return term.id}))}}>
                            <div className="form-group">
                                <label htmlFor="title">Question Title</label>
                                <input type="text"
                                       className={"form-control"}
                                       id="title"
                                       name="title"
                                       onChange={this.onChangeField}
                                       value={this.state.currentQuestion?.title}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className={"form-control"}
                                          id="description"
                                          name="description"
                                          onChange={this.onChangeField}
                                          value={this.state.currentQuestion?.description}
                                          required></textarea>
                            </div>
                            <div>{console.log(this.props)}</div>

                            <div>
                                {
                                    this.state.currentQuestion?.tags?.map((term) => {
                                        //console.log(props.question.tags);
                                        // if (props.question !== undefined && props.question.tags !== undefined) {
                                        //     for (let ta = 0; ta < props.question.tags.length; ta++) {
                                        //         console.log(ta);
                                        //         console.log(props.question.tags[ta]);
                                        //         if (props.question.tags[ta].id === term.id) {
                                        //             console.log("They are same");
                                        //             return <Link id={`${term.id}to`} to={"#"} onClick={(e) => {removeTag(e,term);}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                        //         }
                                        //         else {
                                        //             console.log("They are not");
                                        //             return <Link className={"hide-tag-ids"} id={`${term.id}to`} to={"#"} onClick={(e) => {removeTag(e,term);}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                        //         }
                                        //     }
                                        // }
                                        return <Link id={`${term.id}to`} to={"#"} onClick={(e) => {this.removeTag(e, term.id)}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                    })
                                }
                            </div>


                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link type="button" className="btn btn-primary" to={"/questions"}>Back</Link>
                        </form>
                    </div>
                    <div className={"col-md-5"}>
                        <div className={"container"}>
                            <div className={"card"}>
                                <div className={"card-header"}>Search tags:
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                                </div>
                                <div className={"card-body"}>
                                    <p className={"hide-tag-ids"} id={"tags"}></p>
                                    {
                                        this.props?.tags?.map((term) => {
                                            // if (props.question !== undefined && props.question.tags !== undefined) {
                                            //     for (let ta = 0; ta < props.question.tags.length; ta++) {
                                            //         console.log(ta);
                                            //         console.log(props.question.tags[ta]);
                                            //         if (props.question.tags[ta].id !== term.id) {
                                            //             return <Link id={`${term.id}from`} to={"#"} onClick={(e) => {addTag(e,term);}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                            //         }
                                            //         else {
                                            //             return <Link className={"hide-tag-ids"} id={`${term.id}from`} to={"#"} onClick={(e) => {addTag(e,term);}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                            //         }
                                            //     }
                                            // }
                                            return <Link id={`${term.id}from`} to={"#"} onClick={(e) => {this.addTag(e, term.id)}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.props.match?.params?.id !== "null") {
            this.getQuestion(this.props.props.match.params.id);
        }
    }

}

export default QuestionsForm;