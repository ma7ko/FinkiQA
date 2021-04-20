import React from 'react';
import AnswerTerm from '../../Answers/AnswerTerm/answerTerm';
import AnswerForm from '../../Answers/AnswerForm/answerFrom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import '../QuestionTerm/questions.css';

const questionDetails = (props) => {
    return (
        <div className={"container"}>
            <div className={"row m-2"}>
                <div className={"col-md-2"}>
                    {console.log(props.props.match.params.id)}
                </div>
                <div className={"col-md-8"}>
                    <div className={"card"}>
                        <h5 className={"card-header"}>{props.question.title} - {props.question.user?.username}</h5>
                        <div className={"card-body"}>
                            <div className={"row"}>
                                <div className={"col-md-8"}>
                                    {props.question.description}
                                </div>


                                <div className={"col-md-4"}>
                                    <div className={"small-icon"}>
                                        <div className={"items-icon"}>
                                            <div className={'innermost'}><FontAwesomeIcon className={props.question?.likedByUsers?.map(term => term.username).includes(props.currentUser?.username) ? "change-color custom-size" : 'custom-size'} onMouseOut={(e) => {!props.question?.likedByUsers.map(term => term.username).includes(props.currentUser?.username) && e.target.classList.remove("change-color")}} onMouseOver={(e) => { console.log(e.target); e.target.classList.add("change-color")}} onClick={(e) => {props.likeQuestion(props.question.id, props.currentUser?.username)}}  icon={faThumbsUp}/></div>
                                            <div className={'innermost'}>{props.question.likes}</div>
                                        </div>
                                        <div className={"items-icon"}>
                                            <div className={'innermost'}><FontAwesomeIcon className={props.question?.dislikedByUsers?.map(term => term.username).includes(props.currentUser?.username) ? "change-color custom-size" : 'custom-size'} onMouseOut={(e) => {!props.question?.dislikedByUsers?.map(term => term.username).includes(props.currentUser?.username) && e.target.classList.remove("change-color")}} onMouseOver={(e) => { console.log(e.target); e.target.classList.add("change-color")}} onClick={(e) => {props.dislikeQuestion(props.question.id, props.currentUser?.username)}}  icon={faThumbsDown}/></div>
                                            <div className={'innermost'}>{props.question.dislikes}</div>
                                        </div>
                                    </div>
                                </div>
                            </div> </div>
                    </div>
                    <div className={"container"}>
                        <AnswerForm questionId={props.props.match.params.id}
                                    onAddAnswer={props.onAddAnswer}
                                    currentUser={props.currentUser}
                                    props={props.props}/>
                    </div>
                    <div className={"container"}>
                        {props.answers.map((term) => {
                            return <AnswerTerm term={term}
                                               questionId={props.props.match.params.id}
                                               onAnswerDelete={props.onAnswerDelete}
                                               onAnswerEdit={props.onAnswerEdit}
                                               onEditAnswer={props.onEditAnswer}
                                               onAddAnswer={props.onAddAnswer}
                                               likeAnswer={props.likeAnswer}
                                               dislikeAnswer={props.dislikeAnswer}
                                               currentUser={props.currentUser}
                                               props={props.props}/>
                        })}
                    </div>
                </div>
                <div className={"col-md-2"}>

                </div>
            </div>
        </div>
    );
}

export default questionDetails;