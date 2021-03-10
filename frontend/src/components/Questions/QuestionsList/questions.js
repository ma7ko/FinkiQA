import '../QuestionTerm/questions.css';
import React from 'react';
import QuestionTerm from '../QuestionTerm/questionTerm';

const questions = (props) => {
    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                {
                    props.questions.map((term) => {
                        return (
                            <QuestionTerm className={"questionTerm"} term={term}
                                          onDelete={props.onDelete}
                                          onEdit={props.onEdit}
                                          showQuestionDetails={props.showQuestionDetails}
                                          likeQuestion={props.likeQuestion}
                                          dislikeQuestion={props.dislikeQuestion}/>
                        );
                    })
                }

            </div>
        </div>
    );
}

export default questions;