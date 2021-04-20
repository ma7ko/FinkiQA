import './questions.css';
import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp, faThumbsDown, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {toHtml} from "@fortawesome/fontawesome-svg-core";

const questionTerm = (props) => {
    return(
        <div className="card questionTerm">
            <div className="card-header text-center header-card">
                <div className={"row"}>
                    <div className={"col-md-9"}>
                        <ul className="nav nav-pills card-header-pills tags">
                            {
                                props.term.tags.map((tag) => {
                                    return (
                                        <li className="nav-item">
                                            <h3><span className={"badge badge-info mr-2 ml-2 text-light"}>{tag.name}</span></h3>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={"col-md-3"}> { ((props.currentUser?.username === props.term.user.username) || (props.currentUser?.roles?.includes("ROLE_ADMIN"))) &&
                            <div id={`${props.term.user.username}funct`}> <a title={"Delete"} className={"btn btn-danger"}
                                       onClick={() => {props.onDelete(props.term.id)}}>Delete</a>
                                        <Link className={"btn btn-info ml-2"}
                                        to={`/questions/form/${props.term.id}`}>
                                            Edit
                                        </Link></div> }

                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className={"row"}>
                    <div className={"col-md-9"}>
                        <h5 className="card-title">{props.term.title} - {props.term.user.username}</h5>
                        <p className="card-text">{props.term.description}</p>
                    </div>
                    <div className={"col-md-3"}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                <p className={"reviews-header text-center"}>Reviews</p>
                            </div>
                            <div className={"card-body"}>
                                <div className={"small-icon"}>
                                    <div className={"items-icon"}>
                                        <div className={'innermost'}><FontAwesomeIcon className={props.term?.likedByUsers?.map(term1 => term1.username).includes(props.currentUser?.username) ? "change-color custom-size" : 'custom-size'} onMouseOut={(e) => {!props.term?.likedByUsers?.map(term1 => term1.username).includes(props.currentUser?.username) && e.target.classList.remove("change-color")}} onMouseOver={(e) => { console.log(e.target); e.target.classList.add("change-color")}} onClick={() => {props.likeQuestion(props.term.id, props.currentUser?.username)}}  icon={faThumbsUp}/></div>
                                        <div className={'innermost'}>{props.term.likes}</div>
                                    </div>
                                    <div className={"items-icon"}>
                                        <div className={'innermost'}><FontAwesomeIcon className={props.term?.dislikedByUsers?.map(term1 => term1.username).includes(props.currentUser?.username) ? "change-color custom-size" : 'custom-size'} onMouseOut={(e) => {!props.term?.dislikedByUsers?.map(term1 => term1.username).includes(props.currentUser?.username) && e.target.classList.remove("change-color")}} onMouseOver={(e) => { console.log(e.target); e.target.classList.add("change-color")}} onClick={() => {props.dislikeQuestion(props.term.id, props.currentUser?.username)}}  icon={faThumbsDown}/></div>
                                        <div className={'innermost'}>{props.term.dislikes}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div> { props.currentUser?.username &&
                    <Link onClick={() => {props.showQuestionDetails(props.term.id)}}
                      to={`/questions/${props.term.id}/details`}
                      className="btn btn-primary">See more</Link> }
                </div>
                <div> { !props.currentUser?.username &&
                <Link to={'/login'}
                      className="btn btn-primary">See more</Link> }
                </div>
            </div>
        </div>
    );
}

export default questionTerm;