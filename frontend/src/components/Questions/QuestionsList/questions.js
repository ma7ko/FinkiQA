import '../QuestionTerm/questions.css';
import React from 'react';
import QuestionTerm from '../QuestionTerm/questionTerm';

const questions = (props) => {
    return (
        <div className={"container mt-5"}>
            <div className={"row"}>
                <div className={"col-md-1"}></div>
                <div className={"col-md-9"}>
                {
                    props.questions.map((term) => {
                        return (
                            <QuestionTerm className={"questionTerm"} term={term}
                                          onDelete={props.onDelete}
                                          onEdit={props.onEdit}
                                          showQuestionDetails={props.showQuestionDetails}
                                          likeQuestion={props.likeQuestion}
                                          dislikeQuestion={props.dislikeQuestion}
                                          currentUser={props.currentUser}/>
                        );
                    })
                }

                </div>
                <div className={"col-md-1"}></div>
            </div>
        </div>
    );
}

export default questions;