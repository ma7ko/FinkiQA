import './answerTerm.css';
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import AnswerForm from "../AnswerForm/answerFrom";

const AnswerTerm = (props) => {


    return (
      <div className={"card mt-4"}>
          <div className={"card-header header-card"}>
              <div className={"fl-cont"}>
                  <div className={"fl-item"}>
                      <div className={'mt-1'}>{props.term.user.username}</div>
                  </div>
                  <div className={"fl-item"}> { ((props.currentUser?.username === props.term.user.username) || (props.currentUser?.roles?.includes("ROLE_ADMIN"))) &&
                      <div className={'header-buttons'}>
                          <a title={"Delete"} className={"btn btn-danger"}
                             onClick={() => {props.onAnswerDelete(props.term.id, props.questionId)}}>Delete
                          </a>
                          <Link className={"btn btn-info ml-2"}
                                onClick={() => {props.onAnswerEdit(props.term.id); document.getElementById(`form${props.term.id}${props.questionId}`).classList.toggle("hide"); document.getElementById(`static${props.term.id}${props.questionId}`).classList.toggle("hide");}}
                                to={'#'}>
                              Edit
                          </Link>
                      </div>}
                  </div>
              </div>
          </div>
          <div className={"card-body"}>
              <div className={'border-bottom mb-3'}>
              <p id={`static${props.term.id}${props.questionId}`}>{props.term.explanation}</p> {console.log(props.term)}
              <div id={`form${props.term.id}${props.questionId}`} className={"hide"} >

                  <AnswerForm questionId={props.questionId}
                              numberOfRows={"4"}
                              answer={props.term}
                              onEditAnswer={props.onEditAnswer}
                              currentUser={props.currentUser}
                              props={props.props}
                              toogleButton={() => {document.getElementById(`form${props.term.id}${props.questionId}`).classList.toggle("hide"); document.getElementById(`static${props.term.id}${props.questionId}`).classList.toggle("hide");}}/>

              </div>
              </div>
              <div className={'main-fl'}>
                  <div className={'fl-ch'}>
                      {props.term.posted.split("T")[0]}
                  </div>
                  <div className={'fl-ch'}>
                          <div className={"small-icon overr2"}>
                              <div className={"items-icon overr"}>
                                  <div className={'innermost'}><FontAwesomeIcon className={props.term?.likedByUsers?.map(term1 => term1.username).includes(props.currentUser?.username) ? "change-color custom-size ic" : 'custom-size ic'} onMouseOut={(e) => {!props.term?.likedByUsers?.map(term1 => term1.username).includes(props.currentUser?.username) && e.target.classList.remove("change-color")}} onMouseOver={(e) => { console.log(e.target); e.target.classList.add("change-color")}} onClick={() => {props.likeAnswer(props.term.id, props.questionId, props.currentUser?.username)}} icon={faThumbsUp}/></div>
                                  <div className={'innermost'}>{props.term.likes}</div>
                              </div>
                              <div className={"items-icon overr"}>
                                  <div className={'innermost'}><FontAwesomeIcon className={props.term?.dislikedByUsers?.map(term1 => term1.username).includes(props.currentUser?.username) ? "change-color custom-size ic" : 'custom-size ic'} onMouseOut={(e) => {!props.term?.dislikedByUsers?.map(term1 => term1.username).includes(props.currentUser?.username) &&e.target.classList.remove("change-color")}} onMouseOver={(e) => { console.log(e.target); e.target.classList.add("change-color")}} onClick={() => {props.dislikeAnswer(props.term.id, props.questionId, props.currentUser?.username)}} icon={faThumbsDown}/></div>
                                  <div className={'innermost'}>{props.term.dislikes}</div>
                              </div>
                          </div>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default AnswerTerm;