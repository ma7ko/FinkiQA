import React, {Component, useState} from 'react';
import AnswerTerm from '../../Answers/AnswerTerm/answerTerm';
import AnswerForm from '../../Answers/AnswerForm/answerFrom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFeatherAlt, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import '../QuestionTerm/questions.css';
import Pagination from "../../Pagination/pagination";

class QuestionDetails extends Component {

    constructor(props) {
        super(props);
        this.setCurrentPage = this.setCurrentPage.bind(this);

        this.state = {
            currentPage: 1,
            indexOfLastPost: 2,
            indexOfFirstPost: 0,
            postsPerPage: 2,
        }
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


    render() {

        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <div className={"card mt-4"}>
                            <h5 className={"card-header"}>{this.props.question.title} - {this.props.question.user?.username}</h5>
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"col-md-8"}>
                                        {this.props.question.description}
                                    </div>


                                    <div className={"col-md-4"}>
                                        <div className={"small-icon"}>
                                            <div className={"items-icon"}>
                                                <div className={'innermost'}><FontAwesomeIcon
                                                    className={this.props.question?.likedByUsers?.map(term => term.username).includes(this.props.currentUser?.username) ? "change-color custom-size" : 'custom-size'}
                                                    onMouseOut={(e) => {
                                                        !this.props.question?.likedByUsers.map(term => term.username).includes(this.props.currentUser?.username) && e.target.classList.remove("change-color")
                                                    }} onMouseOver={(e) => {
                                                    console.log(e.target);
                                                    e.target.classList.add("change-color")
                                                }} onClick={(e) => {
                                                    this.props.likeQuestion(this.props.question.id, this.props.currentUser?.username)
                                                }} icon={faThumbsUp}/></div>
                                                <div className={'innermost'}>{this.props.question.likes}</div>
                                            </div>
                                            <div className={"items-icon"}>
                                                <div className={'innermost'}><FontAwesomeIcon
                                                    className={this.props.question?.dislikedByUsers?.map(term => term.username).includes(this.props.currentUser?.username) ? "change-color custom-size" : 'custom-size'}
                                                    onMouseOut={(e) => {
                                                        !this.props.question?.dislikedByUsers?.map(term => term.username).includes(this.props.currentUser?.username) && e.target.classList.remove("change-color")
                                                    }} onMouseOver={(e) => {
                                                    console.log(e.target);
                                                    e.target.classList.add("change-color")
                                                }} onClick={(e) => {
                                                    this.props.dislikeQuestion(this.props.question.id, this.props.currentUser?.username)
                                                }} icon={faThumbsDown}/></div>
                                                <div className={'innermost'}>{this.props.question.dislikes}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col-md-12 mt-4'}>
                                <div className={"container mt-4"}>
                                    <AnswerForm questionId={this.props.props.match.params.id}
                                                numberOfRows={"7"}
                                                onAddAnswer={this.props.onAddAnswer}
                                                currentUser={this.props.currentUser}
                                                props={this.props.props}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-6"}>
                        <div className={'mt-4'}>
                            <div className={'small-icon'}>
                                <h4>Answers</h4>
                                <div><Pagination mainPage={false} totalPosts={this.props.answers?.length} postsPerPage={this.state.postsPerPage} currentPage={this.state.currentPage} paginate={this.setCurrentPage}/></div>
                            </div>
                        </div>
                            <div className={"container box-fix"}>
                            {console.log(this.props.answers.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost))}
                            {console.log(this.props.answers)}
                            
                            {this.props.answers.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost).map((term) => {
                                return <AnswerTerm key={`${term.id}${term.question.id}`}
                                                    term={term}
                                                   questionId={this.props.props.match.params.id}
                                                   onAnswerDelete={this.props.onAnswerDelete}
                                                   onAnswerEdit={this.props.onAnswerEdit}
                                                   onEditAnswer={this.props.onEditAnswer}
                                                   onAddAnswer={this.props.onAddAnswer}
                                                   likeAnswer={this.props.likeAnswer}
                                                   dislikeAnswer={this.props.dislikeAnswer}
                                                   currentUser={this.props.currentUser}
                                                   props={this.props.props}/>
                            })}
                            
                                {this.props.answers?.length === 0 && <div className={'not-found text-center'}><FontAwesomeIcon size={'4x'} icon={faFeatherAlt}/> <p className={'text-center'}>No answers yet</p></div>}
                        </div>
                        {console.log(this.props.answers)}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
    }


}

export default QuestionDetails;