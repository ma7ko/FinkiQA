import React from 'react';
import {useHistory} from "react-router-dom";

const TagsForm = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: ""
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
        const name = formData.name;
        props.onAddTag(name);
        history.push("/tags");
    }


    return (
        <form onSubmit={onFormSubmit}>

            <div className="form-group">
                <label htmlFor="name">Tag name</label>
                <input type="text"
                       className={"form-control"}
                       id="name"
                       name="name"
                       onChange={handleChange}
                       required/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default TagsForm;