import axios from "./AxiosConfig";
import React, { Component } from 'react';
class Home extends Component {

    componentDidMount(){
        this.whoami();
    }
    whoami(){
        axios.get("/user/whoami")
            .then((response) =>{
                this.props.history.push('/')
            }).catch((error) => {
            console.log(error)
            this.props.history.push('/login')
        })
    }
    render() {
        return (
            <div>home</div>
        )
    }
}
export default Home;