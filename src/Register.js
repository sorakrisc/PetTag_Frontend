import React, { Component } from 'react';
import axios from "./AxiosConfig";
import './Login.css'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import urlencode from "form-urlencoded";
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Phone from 'react-phone-number-input'

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {email:"",password: "",  firstName:"", lastName:"",
            ccPassword: "", redirect: false, month:"",day:"",year:"",gender:"", phone:""}
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    register(e){
        e.preventDefault();

        const regParams = {
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstName,
            lastname: this.state.lastName,

            gender: this.state.gender,
            dateOfBirth: this.state.year+'/'+this.state.month+'/'+this.state.day,
            phone: this.state.phone

        };


        axios.post("/user/register", urlencode(regParams))
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                alert("Username or Password are incorrect, Please try again.");
                // window.location.reload();
            })
    }

    render() {

        return (
            <div className={"parentDiv"}>
                <div className="regForm">
                    <div className="loginBox">

                        <div className={"option"}>
                            <h1>Create your account</h1>
                        </div>

                        <div className={"informationBox"}>
                            <div className={"TextBox"}>
                                <h5>Name</h5>
                                <div className={"nameForm"}>
                                    <TextField style={{order:1,padding:"1px"}} label={"First"} onChange={this.handleChange('firstName')}/>
                                    <TextField style={{order:2,padding:"1px"}} label={"Last"} onChange={this.handleChange('lastName')}/>
                                </div>
                            </div>

                            <div className={"TextBox"} >
                                <h5>Email</h5>
                                <TextField  style={{padding:"1px"}} label={"Enter your email"} fullWidth onChange={this.handleChange('email')}/>
                            </div>

                            <div className={"TextBox"}>
                                <h5>Password</h5>
                                <TextField  style={{padding:"1px"}} label={"Create a password"} type="password" fullWidth onChange={this.handleChange('password')}/>
                                <TextField style={{padding:"1px"}} label={"Confirm your password"} type="password" fullWidth onChange={this.handleChange('ccPassword')}/>
                            </div>
                            <div className={"TextBox2"}>
                                <h5>Birthday</h5>
                                <div className={"birthdayForm"}>
                                    <FormControl style={{textAlign:"left"}}>
                                        <InputLabel htmlFor="month-simple">Month</InputLabel>
                                        <Select
                                            style={{width:125,order:1}}
                                            value={this.state.month}
                                            onChange={this.handleChange('month')}
                                            inputProps={{
                                                name: 'age',
                                                id: 'month-simple',
                                            }}
                                        >
                                            <MenuItem value={"01"}>January</MenuItem>
                                            <MenuItem value={"02"}>February</MenuItem>
                                            <MenuItem value={"03"}>March</MenuItem>
                                            <MenuItem value={"04"}>April</MenuItem>
                                            <MenuItem value={"05"}>May</MenuItem>
                                            <MenuItem value={"06"}>June</MenuItem>
                                            <MenuItem value={"07"}>July</MenuItem>
                                            <MenuItem value={"08"}>August</MenuItem>
                                            <MenuItem value={"09"}>September</MenuItem>
                                            <MenuItem value={"10"}>October</MenuItem>
                                            <MenuItem value={"11"}>November</MenuItem>
                                            <MenuItem value={"12"}>December</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField  style={{width:75, order:2}} label={"Day"} onChange={this.handleChange('day')}/>
                                    <TextField  style={{width:100,order:3}} label={"Year"}  onChange={this.handleChange('year')}/>
                                </div>
                            </div>
                            <div className={"TextBox"} >
                                <h5>Gender</h5>
                                <FormControl  style={{textAlign:"left"}} fullWidth={true}>
                                    <InputLabel htmlFor="gender-simple" >I am...</InputLabel>
                                    <Select

                                        value={this.state.gender}
                                        onChange={this.handleChange('gender')}
                                        inputProps={{
                                            name: 'gender',
                                            id: 'gender-simple',
                                        }}

                                    >
                                        <MenuItem value={"MALE"}>Male</MenuItem>
                                        <MenuItem value={"FEMALE"}>Female</MenuItem>
                                        <MenuItem value={"OTHER"}>Other</MenuItem>
                                        <MenuItem value={"null"}>Rather not say</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={"TextBox"}>
                                <h5>Mobile phone {this.state.phone}</h5>
                                <Phone style={{fontSize:"14px"}}
                                    value={ this.state.phone }
                                    onChange={ phone => this.setState({ phone })} />
                            </div>

                        </div>
                        <div >
                            <div style={{float:'left'}} >
                                <Button style={{textTransform: 'none' ,padding:0, background:"white", boxShadow: 'none', color:"#528ff5"}} variant="raised" size='large' onClick={() => this.props.history.push('/')}>
                                    Got an account?
                                </Button>
                                {/*<Button component={Link} to="/open-collective">Got an account?</Button>*/}
                            </div>
                            <div style={{float:'right'}}>
                                <Button onClick={(e) => this.register(e)} variant="raised" color="secondary" size={"large"}>
                                    Next
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
