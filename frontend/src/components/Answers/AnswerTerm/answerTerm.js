import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const answerTerm = (props) => {
    return (
      <div className={"card"}>
          <div className={"card-header"}>
              <div className={"row"}>
                  <div className={"col-md-8"}>
                      {props.term.user.username}
                  </div>
                  <div className={"col-md-4"}>
                      <a title={"Delete"} className={"btn btn-danger"}
                         onClick={() => {props.onAnswerDelete(props.term.id, props.questionId)}}>Delete</a>
                      <Link className={"btn btn-info ml-2"}
                            onClick={() => props.onAnswerEdit(props.term.id)}
                            to={'/answers/edit'}>
                          Edit
                      </Link>
                  </div>
              </div>
          </div>
          <div className={"card-body"}>
              <p>{props.term.explanation}</p>
              <div className={"container"}>
                  <div>
                      <button onClick={() => {props.likeAnswer(props.term.id, props.questionId)}}> <FontAwesomeIcon icon={faThumbsUp}/> </button><span className={"small-icon"}>{props.term.likes}</span></div>
                  <div> <button onClick={() => {props.dislikeAnswer(props.term.id, props.questionId)}}> <FontAwesomeIcon icon={faThumbsDown}/> </button> <span className={"small-icon"}>{props.term.dislikes}</span></div>
              </div>
          </div>
      </div>
    );
}

export default answerTerm;