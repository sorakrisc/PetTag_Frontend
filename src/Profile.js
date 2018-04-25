import axios from "./AxiosConfig";
import React, { Component } from 'react';

class Profile extends Component {

    componentDidMount(){
        this.whoami();
    }
    whoami(){
        axios.get("/user/whoami")
            .then((response) =>{
            }).catch((error) => {
            this.props.history.push('/login')
        })
    }
    render() {
        return (
            <div>Profile</div>
        )
    }
}
export default Profile;