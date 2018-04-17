import React, { Component } from 'react';
import axios from "./AxiosConfig";
import './Login.css'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import urlencode from "form-urlencoded";
import { Redirect} from "react-router-dom";

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {userName:"", email:"", password: "",
                      ccPassword: "", redirect: false}
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);

    }
    updateInputValue(evt){
        this.setState({userName: evt.target.value});
    }

    updatePasswordValue(evt){
        this.setState({password: evt.target.value});
    }

    login(e){
        e.preventDefault();

        const loginParams = {
            username: this.state.userName,
            password: this.state.password
        };


        axios.post("/login", urlencode(loginParams))
            .then((response) => {
                if (response.data.role === "admin"){
                    this.setState({isAdmin: true})
                }
                else{

                    this.props.history.push('/Schedule');
                }
            })
            .catch((error) => {
                alert("Username or Password are incorrect, Please try again.");
                window.location.reload();
            })
    }

    render() {
        return (
            <div className={"parentDiv"}>
                <div className="loginForm">
                    <div className="loginBox">

                        <div className={"option"}>
                            <h1> Pet Tag </h1>
                        </div>

                        <div className={"informationBox"}>


                            <div className={"TextBox"} >
                                <TextField label={"Username or email"} type="username" fullWidth
                                           onChange={this.updateInputValue}/>
                            </div>

                            <div className={"TextBox"}>
                                <TextField label={"Enter your password"} type="password" fullWidth
                                           onChange={this.updatePasswordValue}/>
                            </div>


                        </div>
                        <div >
                            <div style={{float:'left'}}>
                                <Button style={{textTransform: 'none' ,padding:0, background:"white", boxShadow: 'none', color:"#528ff5"}} variant="raised" size='medium' onClick={() => this.props.history.push('/register')}>
                                    Create account
                                </Button>
                            </div>
                            <div style={{float:'right'}}>
                                <Button onClick={(e) => this.login(e)} variant="raised" color="secondary" size={"large"}>
                                    Sign in
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Login;
