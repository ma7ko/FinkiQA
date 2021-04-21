import '../QuestionTerm/questions.css';
import React from 'react';
import QuestionTerm from '../QuestionTerm/questionTerm';
import Pagination from "../../Pagination/pagination";

const questions = (props) => {
    return (
        <div className={"container mt-5"}>
            <div className={"row"}>
                <div className={"col-md-1"}>{console.log(props.firstIndex)} {console.log(props.lastIndex)}</div>
                <div className={"col-md-9"}>
                    <div>
                {
                    props.questions.slice(props.firstIndex, props.lastIndex).map((term) => {
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
                }</div>
                    <div className={'m-5'}><Pagination paginate={props.paginate} totalPosts={props.totalPosts} postsPerPage={props.postsPerPage} currentPage={props.currentPage} mainPage={true}/></div>

                </div>
                <div className={"col-md-1"}></div>
            </div>
        </div>
    );
}

export default questions;