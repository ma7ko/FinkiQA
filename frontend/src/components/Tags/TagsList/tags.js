import React from 'react';
import TagsForm from '../TagsForm/tagsForm';
import {Link} from "react-router-dom";
import {faThumbsDown, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const tags = (props) => {
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-5"}>
                    {
                        props.tags.map((term) => {
                            return <div onMouseOver={() => {document.getElementById("tag-remove").removeAttribute("className")}} > <h3><span className={"badge badge-primary"}>{term.name}<Link id="tag-remove" className={"tag-remove-hidden"} to={"#"} onClick={() => {props.deleteTag(term.id)}}> <FontAwesomeIcon icon={faTimesCircle}/> </Link> </span></h3></div>
                        })
                    }
                </div>
                <div className={"col-md-2"}>

                </div>
                <div className={"col-md-5"}>
                    <TagsForm onAddTag={props.onAddTag}/>
                </div>
            </div>
        </div>
    );
}

export default tags;