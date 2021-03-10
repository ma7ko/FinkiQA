import '../QuestionTerm/questions.css';
import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import tags from "../../Tags/TagsList/tags";

const QuestionsForm = (props) => {
    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        title: props.question != null ? props.question.title : "",
        description: props.question != null ? props.question.description : "",
        likes: 0,
        dislikes: 0,
        username: "mirjana.mirjanovska",
        tags: []
    })

    let tags = [];

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const title = formData.title != null ? formData.title : props.question.title;
        const description = formData.description != null ? formData.description : props.question.description;
        const likes = props.question !== undefined ? props.question.likes : formData.likes;
        const dislikes = props.question !== undefined ? props.question.dislikes : formData.dislikes;
        const username = formData.username;
        const selectedTags = document.getElementById("tags").innerHTML.split(" ");
        console.log(selectedTags);
        console.log(formData);
        if (props.question.title === undefined) {
            props.onAddQuestion(title, description, likes, dislikes, username, selectedTags);
        } else if (props.question.title !== undefined){
            props.onEditQuestion(props.question.id, title, description, likes, dislikes, username, selectedTags);
        }
        history.push("/questions");
    }

    useEffect(() => {
        if (props.question.title !== undefined) {
            console.log("The current question: ");
            console.log(props.question);
            document.getElementById('title').setAttribute("value", props.question.title);
            document.getElementById('description').innerHTML = props.question.description;
        }
    })

    let addTag = (e,term) => {
        let arr = document.getElementById("tags").innerHTML.split(" ");
        console.log(document.getElementById("tags").innerHTML);
        console.log(arr);
        console.log("adding tag...");
        if (!arr.includes(term.id.toString())) {
            if (document.getElementById("tags").innerHTML !== "") {
                document.getElementById("tags").innerHTML += (" " + term.id);
            } else {
                document.getElementById("tags").innerHTML += (term.id);
            }
            document.getElementById(`${term.id}from`).classList.add("hide-tag-ids");
            document.getElementById(`${term.id}to`).classList.remove("hide-tag-ids");
            console.log(document.getElementById("tags"));
            console.log(formData);
            tags = document.getElementById("tags").innerHTML.split(" ");
        }
    }

    let removeTag = (e,term) => {
        let arr = document.getElementById("tags").innerHTML.split(" ");
        console.log(document.getElementById("tags").innerHTML);
        console.log(arr);
        if (arr.includes(term.id.toString())) {
            let newArr = [];
            for (let el=0; el<arr.length;  el++) {
                if (arr[el] !== term.id.toString()) {
                    newArr.push(arr[el]);
                }
            }
            console.log(document.getElementById("tags").innerHTML);
            document.getElementById("tags").innerHTML = newArr;
            document.getElementById(`${term.id}from`).classList.remove("hide-tag-ids");
            document.getElementById(`${term.id}to`).classList.add("hide-tag-ids");
            console.log(document.getElementById("tags"));
            console.log(formData);
            console.log("removing tag...");
            tags = document.getElementById("tags").innerHTML.split(" ");
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <form onSubmit={onFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Question Title</label>
                            <input type="text"
                                   className={"form-control"}
                                   id="title"
                                   name="title"
                                   onChange={handleChange}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className={"form-control"}
                                   id="description"
                                   name="description"
                                   onChange={handleChange}
                                      required></textarea>
                        </div>

                        <div>
                            {
                                props.tags.map((term) => {
                                    console.log(props.question.tags);
                                    if (props.question !== undefined && props.question.tags !== undefined) {
                                        for (let ta = 0; ta < props.question.tags.length; ta++) {
                                            console.log(ta);
                                            console.log(props.question.tags[ta]);
                                            if (props.question.tags[ta].id === term.id) {
                                                console.log("They are same");
                                                return <Link id={`${term.id}to`} to={"#"} onClick={(e) => {removeTag(e,term);}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                            }
                                            else {
                                                console.log("They are not");
                                                return <Link className={"hide-tag-ids"} id={`${term.id}to`} to={"#"} onClick={(e) => {removeTag(e,term);}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                            }
                                        }
                                    }
                                })
                            }
                        </div>


                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link type="button" className="btn btn-primary" to={"/products"}>Back</Link>
                    </form>
                </div>
                <div className={"col-md-5"}>
                    <div className={"container"}>
                        <div className={"card"}>
                            <div className={"card-header"}>Search tags:
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                            </div>
                            <div className={"card-body"}>
                                <p className={"hide-tag-ids"} id={"tags"}></p>
                                {
                                    props.tags.map((term) => {
                                        if (props.question !== undefined && props.question.tags !== undefined) {
                                            for (let ta = 0; ta < props.question.tags.length; ta++) {
                                                console.log(ta);
                                                console.log(props.question.tags[ta]);
                                                if (props.question.tags[ta].id !== term.id) {
                                                    return <Link id={`${term.id}from`} to={"#"} onClick={(e) => {addTag(e,term);}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                                }
                                                else {
                                                    return <Link className={"hide-tag-ids"} id={`${term.id}from`} to={"#"} onClick={(e) => {addTag(e,term);}}> <h3><span id="tag" className={"badge badge-primary"}>{term.name}</span></h3> </Link>
                                                }
                                            }
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default QuestionsForm;