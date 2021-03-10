import React from 'react';
import AnswerTerm from '../../Answers/AnswerTerm/answerTerm';
import AnswerForm from '../../Answers/AnswerForm/answerFrom';

const questionDetails = (props) => {
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-2"}>
                    {console.log(props.props.match.params.id)}
                </div>
                <div className={"col-md-8"}>
                    <div className={"card"}>
                        <div className={"card-header"}>{props.question.title} - {props.question.user?.username}</div>
                        <div className={"card-body"}>
                            <div className={"row"}>
                                <div className={"col-md-8"}>
                                    {props.question.description}
                                </div>
                                <div className={"col-md-4"}>
                                    {props.question.likes}
                                    {props.question.dislikes}
                                </div>
                            </div> </div>
                    </div>
                    <div className={"container"}>
                        <AnswerForm questionId={props.props.match.params.id}
                                    answer={props.answer}
                                    onAddAnswer={props.onAddAnswer} />
                    </div>
                    <div className={"container"}>
                        {props.answers.map((term) => {
                            return <AnswerTerm term={term}
                                               questionId={props.props.match.params.id}
                                               onAnswerDelete={props.onAnswerDelete}
                                               onAnswerEdit={props.onAnswerEdit}
                                               likeAnswer={props.likeAnswer}
                                               dislikeAnswer={props.dislikeAnswer}/>
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