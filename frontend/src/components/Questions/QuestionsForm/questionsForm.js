import '../QuestionTerm/questions.css';
import React, {useEffect, Component} from 'react';
import {Link, useHistory} from 'react-router-dom';
import tags from "../../Tags/TagsList/tags";
import FinkiQAService from "../../../repository/finkiqaRepository";
import {faCarCrash, faPaperPlane, faTags} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from "../../Pagination/pagination";

class QuestionsForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeField = this.onChangeField.bind(this);
        this.onChangeSearchField = this.onChangeSearchField.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.setCurrentPageSearch = this.setCurrentPageSearch.bind(this);

        this.state = {
            title: "",
            description: "",
            likes: 0,
            dislikes: 0,
            username: this.props.currentUser.username,
            tags: [],
            currentQuestion: {},
            searchedTags: [],
            currentPage: 1,
            indexOfLastPost: 5,
            indexOfFirstPost: 0,
            postsPerPage: 5,
            currentPageSearch: 1,
            indexOfLastPostSearch: 5,
            indexOfFirstPostSearch: 0,
            postsPerPageSearch: 5
        }
    }

    setCurrentPageSearch(page) {
        this.setState({
            currentPageSearch: page,
            indexOfLastPostSearch: page * this.state.postsPerPageSearch,
            indexOfFirstPostSearch: page * this.state.postsPerPageSearch - this.state.postsPerPageSearch,
        });
        console.log(page * this.state.postsPerPage);
        console.log(this.state.indexOfLastPost);
    }

    setCurrentPage(page) {
        this.setState({
            currentPage: page,
            indexOfLastPost: page * this.state.postsPerPage,
            indexOfFirstPost: page * this.state.postsPerPage - this.state.postsPerPage,
        });
        console.log(page * this.state.postsPerPage);
        console.log(this.state.indexOfLastPost);
    }

    onChangeField(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(e.target.value.trim());
        this.setState({
            [e.target.name]: e.target.value.trim()
        });
    }

    onChangeSearchField(e) {
        if (e.target.value.trim().length > 0) {
            FinkiQAService.findTagsContaining(e.target.value.trim())
                .then((data) => {
                    console.log(data);
                    this.setState({
                        searchedTags: data.data,
                        indexOfLastPostSearch: 5,
                        indexOfFirstPostSearch: 0
                    });
                });
        }
        else {
            this.setState({
                searchedTags: []
            });
        }
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
                console.log(this.state);
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
        if (this.state.currentQuestion.tags) {
            this.state.currentQuestion.tags = this.state.currentQuestion.tags.filter(function (value, index, arr) {
                console.log(value.id);
                return value.id.toString() !== id.toString();
            });
            console.log(this.state.currentQuestion?.tags);
            if (this.state.currentQuestion?.tags?.length % 5 === 0 && this.state.currentQuestion?.tags?.length > 0) {
                this.setCurrentPage(this.state.currentPage-1);
            }
        } else {
            this.state.tags = this.state.tags.filter(function (value, index, arr) {
                console.log(value.id);
                return value.id.toString() !== id.toString();
            });
            if (this.state.tags?.length % 5 === 0 && this.state.tags?.length > 0) {
                this.setCurrentPage(this.state.currentPage-1);
            }
        }

        let obj = JSON.parse(`{"id": ${id}, "name": "${e.target.innerText}", "description": ${null}}`);
        console.log(obj);
    }

    addTag(e, id) {
        let selectedTag = this.props.tags.filter(function (value, index, arr) {
            console.log(value.id);
            return value.id.toString() === id.toString();
        })[0];
        let contains = 0
        console.log(this.state.currentQuestion);
        if (this.state.currentQuestion.tags) {
            contains = this.state.currentQuestion.tags.filter(function (value, index, arr) {
                return value.id.toString() === id.toString();
            });
            if (contains.length === 0) {
                this.state.currentQuestion.tags.push(selectedTag);
            }
        } else {
            contains = this.state.tags.filter(function (value, index, arr) {
                return value.id.toString() === id.toString();
            });
            console.log(contains);
            if (contains.length === 0) {
                this.state.tags.push(selectedTag);
            }
        }
        console.log(contains);
        console.log(selectedTag);
        console.log(e);
        console.log(id);
        console.log(this.state.tags);
        console.log(this.state.currentQuestion.tags);
    }


    render() {
        return(
            <div className="container">
                <div className="row m-5">
                    <div className="col-md-4">
                        <form onSubmit={(e) => {e.preventDefault(); (this.props.props.match?.params?.id !== "null") ?
                            this.editQuestion(this.props.props.match.params.id, this.state.title === '' ? this.state.currentQuestion?.title : this.state.title, this.state.description === '' ? this.state.currentQuestion?.description : this.state.description, this.state.currentQuestion.likes, this.state.currentQuestion.dislikes, this.state.currentQuestion.user.username, this.state.currentQuestion.tags.map((term) => {return term.id.toString()})) :
                            this.saveQuestion(this.state.title, this.state.description, this.state.likes, this.state.dislikes, this.state.username, this.state.tags.map((term) => {return term.id}))}}>
                            <div className="form-group">
                                <label htmlFor="title">Question Title</label>
                                <input type="text"
                                       className={"form-control"}
                                       id="title"
                                       name="title"
                                       onChange={this.onChangeField}
                                       defaultValue={this.state.currentQuestion?.title}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea rows={"5"}
                                          cols={"80"}
                                    className={"form-control"}
                                          id="description"
                                          name="description"
                                          onChange={this.onChangeField}
                                          defaultValue={this.state.currentQuestion?.description}
                                          required></textarea>
                            </div>
                            <div>{console.log(this.props)}</div>



                            <button type="submit" className="btn btn-success mt-2 mr-2">Submit</button>
                            <Link type="button" className="btn btn-secondary ml-2 mt-2" to={"/questions"}>Back</Link>
                        </form>
                    </div>

                    <div className={"col-md-4 mt-4"}>
                        <div className={"container"}>
                            <div className={"card tags-card"}>
                                <div className={"card-header"}>Selected tags:
                                </div>
                                <div className={"card-body"}>
                                    {console.log(this.state.currentQuestion?.tags?.length)}
                                    {console.log(this.state.tags?.length)}

                                        {(this.state.currentQuestion?.tags?.length === 0 || (this.state.currentQuestion?.tags === undefined && this.state.tags?.length === 0)) && <div className={'text-center not-found boxes'}> <FontAwesomeIcon size='3x' icon={faTags}/>  <p className={'mt-2'}>You do not have any selected tags yet</p></div> }


                                    <div>{this.state.currentQuestion?.tags !== undefined &&
                                        <div className={'boxes'}>
                                        {
                                            this.state.currentQuestion?.tags?.slice(this.state.indexOfFirstPost,this.state.indexOfLastPost).map((term) => {
                                                return <Link id={`${term.id}to`} to={"#"} onClick={(e) => {this.removeTag(e, term.id)}}> <h3><span id="tag" className={"badge badge-info"}>{term.name}</span></h3> </Link>
                                        })
                                        }
                                        </div>}
                                        {this.state.currentQuestion?.tags !== undefined && this.state.currentQuestion?.tags?.length > 5 && <div><Pagination mainPage={false} totalPosts={this.state.currentQuestion?.tags?.length} postsPerPage={this.state.postsPerPage} currentPage={this.state.currentPage} paginate={this.setCurrentPage}/></div>}
                                    </div>
                                    <div> {this.state.currentQuestion?.tags === undefined &&
                                        <div className={'boxes'}>
                                        {
                                            this.state.tags?.slice(this.state.indexOfFirstPost,this.state.indexOfLastPost).map((term) => {
                                                return <Link id={`${term.id}to`} to={"#"} onClick={(e) => {this.removeTag(e, term.id)}}> <h3><span id="tag" className={"badge badge-info"}>{term.name}</span></h3> </Link>
                                            })
                                        }
                                        </div> }
                                        {this.state.tags?.length > 5 && <div><Pagination mainPage={false} totalPosts={this.state.tags?.length} postsPerPage={this.state.postsPerPage} currentPage={this.state.currentPage} paginate={this.setCurrentPage}/></div>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"col-md-4 mt-4"}>
                        <div className={"container"}>
                            <div className={"card tags-card"}>
                                <div className={"card-header"}>Search tags:
                                    <input id="search-input"
                                        className="form-control mr-sm-2 p-4 mt-2"
                                           type="search"
                                           placeholder="Search"
                                           aria-label="Search"
                                           onChange={this.onChangeSearchField}/>
                                </div>
                                <div className={"card-body"}>
                                    <p className={"hide-tag-ids"} id={"tags"}></p>


                                        {
                                            this.state?.searchedTags?.length === 0 && (document.getElementById("search-input")?.value.length > 0) && <div className={"text-center not-found"}>
                                                <FontAwesomeIcon size='3x' icon={faCarCrash}/>
                                                <p className={"m-2"}>The tag you searched for is not found</p>
                                            </div>
                                        }

                                    <div>
                                        {console.log(document.getElementById("search-input")?.value)}
                                        {console.log( this.state?.searchedTags?.length === 0)}
                                        { this.state?.searchedTags?.length === 0 && <div className={'boxes-search'}> {   this.state?.searchedTags?.length === 0 && (document.getElementById("search-input")?.value.length === 0 || document.getElementById("search-input")?.value === undefined) &&
                                        this.props?.tags?.slice(this.state.indexOfFirstPostSearch,this.state.indexOfLastPostSearch).map((term) => {
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
                                            return <Link id={`${term.id}from`} to={"#"} onClick={(e) => {this.addTag(e, term.id)}}> <h3><span id="tag" className={"badge badge-info"}>{term.name}</span></h3> </Link>
                                        })
                                    } </div>}
                                        { this.state?.searchedTags?.length === 0 && (document.getElementById("search-input")?.value.length === 0 || document.getElementById("search-input")?.value === undefined) && this.props.tags?.length > 5 && <div className={'m-4 fixed'}><Pagination mainPage={false} totalPosts={this.props.tags?.length} postsPerPage={this.state.postsPerPageSearch} currentPage={this.state.currentPageSearch} paginate={this.setCurrentPageSearch}/></div>}

                                    </div>
                                    <div> {this.state?.searchedTags?.length > 0  && <div className={'boxes-search'}> {
                                        this.state?.searchedTags?.slice(this.state.indexOfFirstPostSearch,this.state.indexOfLastPostSearch).map((term) => {
                                        return <Link id={`${term.id}from`} to={"#"} onClick={(e) => {this.addTag(e, term.id)}}> <h3><span id="tag" className={"badge badge-info"}>{term.name}</span></h3> </Link>
                                        }) } </div>}

                                        {this.state?.searchedTags?.length !== 0 && this.state?.searchedTags?.length > 5 && <div className={'m-4 fixed'}><Pagination mainPage={false} totalPosts={this.state.searchedTags?.length} postsPerPage={this.state.postsPerPageSearch} currentPage={this.state.currentPageSearch} paginate={this.setCurrentPageSearch}/></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        console.log(this.state);
        if (this.props.props.match?.params?.id !== "null") {
            this.getQuestion(this.props.props.match.params.id);
        }
    }

}

export default QuestionsForm;