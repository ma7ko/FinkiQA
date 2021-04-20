import React, { Component } from "react";
import AuthService from "../../repository/auth";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: [AuthService.getCurrentUser()]
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <div>{console.log(this.props)}</div>
                        <div>{console.log(this.state.currentUser)}</div>
                        <strong>{this.props.currentUser?.username}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Id:</strong>{" "}
                    {this.props.currentUser?.id}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {this.props.currentUser?.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {this.props.currentUser?.roles &&
                    this.props.currentUser?.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        );
    }
}