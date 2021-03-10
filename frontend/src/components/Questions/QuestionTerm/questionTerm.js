import './questions.css';
import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp, faThumbsDown, faTimesCircle} from '@fortawesome/free-solid-svg-icons'

const questionTerm = (props) => {
    return(
        <div className="card questionTerm">
            <div className="card-header text-center">
                <div className={"row"}>
                    <div className={"col-md-9"}>
                        <ul className="nav nav-pills card-header-pills">
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
                    <div className={"col-md-3"}>
                        <a title={"Delete"} className={"btn btn-danger"}
                           onClick={() => {props.onDelete(props.term.id)}}>Delete</a>
                        <Link className={"btn btn-info ml-2"}
                              onClick={() => props.onEdit(props.term.id)}
                              to={'/questions/add'}>
                            Edit
                        </Link>
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
                                <p className={"reviews-header"}>Reviews</p>
                            </div>
                            <div className={"card-body"}>
                                <div><button onClick={() => {props.likeQuestion(props.term.id)}} ><FontAwesomeIcon icon={faThumbsUp}/> </button> <span className={"small-icon"}>{props.term.likes}</span></div>
                                <div><button onClick={() => {props.dislikeQuestion(props.term.id)}} ><FontAwesomeIcon icon={faThumbsDown}/> </button> <span className={"small-icon"}>{props.term.dislikes}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link onClick={() => {props.showQuestionDetails(props.term.id)}}
                      to={`/questions/${props.term.id}/details`}
                      className="btn btn-primary">See more</Link>
            </div>
        </div>
    );
}

export default questionTerm;