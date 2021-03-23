import './answerTerm.css';
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import AnswerForm from "../AnswerForm/answerFrom";

const answerTerm = (props) => {
    return (
      <div className={"card mt-4"}>
          <div className={"card-header"}>
              <div className={"row"}>
                  <div className={"col-md-8"}>
                      {props.term.user.username}
                  </div>
                  <div className={"col-md-4"}>
                      <a title={"Delete"} className={"btn btn-danger"}
                         onClick={() => {props.onAnswerDelete(props.term.id, props.questionId)}}>Delete</a>
                      <Link className={"btn btn-info ml-2"}
                            onClick={() => {props.onAnswerEdit(props.term.id); document.getElementById(`form${props.term.id}`).classList.toggle("hide"); document.getElementById(`static${props.term.id}`).classList.toggle("hide");}}
                            to={'#'}>
                          Edit
                      </Link>
                  </div>
              </div>
          </div>
          <div className={"card-body"}>
              <p id={`static${props.term.id}`}>{props.term.explanation}</p>
              <div id={`form${props.term.id}`} className={"hide"} >

                  <AnswerForm questionId={props.match?.params?.id}
                              answer={props.term}
                              onEditAnswer={props.onEditAnswer}
                              props={props.props}
                              toogleButton={() => {document.getElementById(`form${props.term.id}`).classList.toggle("hide"); document.getElementById(`static${props.term.id}`).classList.toggle("hide");}}/>

              </div>
              <div className={"container"}>
                  <div>
                       <FontAwesomeIcon onMouseOut={(e) => {e.target.classList.remove("change-color")}} onMouseOver={(e) => { console.log(e.target); e.target.classList.add("change-color")}} onClick={() => {props.likeAnswer(props.term.id, props.questionId)}} icon={faThumbsUp}/> <span className={"small-icon"}>{props.term.likes}</span></div>
                  <div>  <FontAwesomeIcon onMouseOut={(e) => {e.target.classList.remove("change-color")}} onMouseOver={(e) => { console.log(e.target); e.target.classList.add("change-color")}} onClick={() => {props.likeAnswer(props.term.id, props.questionId)}} icon={faThumbsDown}/>  <span className={"small-icon"}>{props.term.dislikes}</span></div>
              </div>
          </div>
      </div>
    );
}

export default answerTerm;