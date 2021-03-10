import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";

const AnswerForm = (props) => {
    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        explanation: "",
        likes: 0,
        dislikes: 0,
        questionId: props.questionId,
        username: "mirjana.mirjanovska"
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const explanation = formData.explanation;
        const likes = formData.likes;
        const dislikes = formData.dislikes;
        const questionId = formData.questionId;
        const username = formData.username;
        props.onAddAnswer(explanation, likes, dislikes, questionId, username);
        history.push(`/questions/${questionId}/details`);
    }

    useEffect(() => {
        if (props.answer.explanation !== undefined) {
            document.getElementById('explanation').innerHTML = props.answer.explanation;
        }
    })

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <form onSubmit={onFormSubmit}>

                        <div className="form-group">
                            <label htmlFor="explanation">Description</label>
                            <textarea className={"form-control"}
                                      id="explanation"
                                      name="explanation"
                                      onChange={handleChange}
                                      required></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link type="button" className="btn btn-primary" to={"/products"}>Back</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AnswerForm;