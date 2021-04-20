import React from 'react';
import TagsForm from '../TagsForm/tagsForm';
import {Link} from "react-router-dom";
import {faThumbsDown, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const tags = (props) => {
    return (
        <div className={"container"}>
            <div className={"row m-5"}>
                <div className={"col-md-5"}>
                    {
                        props.tags.map((term) => {
                            return <div> <h3><span className={"badge badge-primary"}>{term.name}<span id={`${term.id}-tag-remove`} className={"tag-remove-hidden text-primary"} onClick={() => {props.deleteTag(term.id)}}> <FontAwesomeIcon onMouseOut={(e) => {e.target.classList.remove("text-light");}} onMouseOver={(e) => {console.log(e); e.target.classList.add("text-light");}} icon={faTimesCircle}/> </span> </span></h3></div>
                        })
                    }
                </div>
                <div className={"col-md-2"}>

                </div>
                <div className={"col-md-5"}>
                    <div className={"card card-container m-5 p-5 border-primary"}>
                        <TagsForm onAddTag={props.onAddTag}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default tags;