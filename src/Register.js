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
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Phone from 'react-phone-number-input'
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isAlpha from 'validator/lib/isAlpha';
class Login extends Component {

    constructor(props){
        super(props);
        this.state = {email:"",password: "",  firstName:"", lastName:"",
            ccPassword: "", redirect: false, month:"",day:"",year:"",gender:"", phone:"",
            emailES:false, passwordES:false, firstNameES:false, lastNameES: false,
            ccPasswordES:false, monthES:false, dayES:false, yearES:false, genderES:false, phoneES:false,
            emailHT:"Make sure people could contact you with this email", passwordHT:"", firstNameHT:"", lastNameHT: "",
            ccPasswordHT:"Use 8 or more characters with a mix of letters, numbers & symbols", monthHT:"",
            dayHT:"", yearHT:"", genderHT:"", phoneHT:"",

            showHideInfoForm:"block", showHideAddrForm:"none",
            address:"", city:"", country:"", state:"", zipcode:"",
            addressES:false, cityES:false, countryES:false, stateES:false, zipcodeES:false,
            addressHT:"", cityHT:"", countryHT:"", stateHT:"", zipcodeHT:"",

        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    toggleInfoForm() {
        let css = (this.state.showHideInfoForm === "none") ? "block" : "none";

        this.setState({showHideAddrForm: this.state.showHideInfoForm ,showHideInfoForm:css});
    }
    registerPost(){
        const regParams = {
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstName,
            lastname: this.state.lastName,

            gender: this.state.gender,
            dateOfBirth: this.state.year+'/'+this.state.month+'/'+this.state.day,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zipcode: this.state.zipcode

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
    register(e){
        e.preventDefault();
        let regStatus = true;
        if(isEmpty(this.state.address)){
            this.setState({addressES: true, addressHT: "Enter address"});
            regStatus = false;
        }
        else{
            this.setState({addressES: false, addressHT: ""});
        }

        if(isEmpty(this.state.city)){
            this.setState({cityES: true, cityHT: "Enter city"});
            regStatus = false;
        }
        else{
            this.setState({cityES: false, cityHT: ""});
        }
        if(isEmpty(this.state.state)){
            this.setState({stateES: true, stateHT: "Enter state"});
            regStatus = false;
        }
        else{
            this.setState({stateES: false, stateHT: ""});
        }
        if(isEmpty(this.state.country)){
            this.setState({countryES: true, countryHT: "Enter country"});
            regStatus = false;
        }
        else{
            this.setState({countryES: false, countryHT: ""});
        }
        if(isEmpty(this.state.zipcode)){
            this.setState({zipcodeES: true, zipcodeHT: "Enter zipcode"});
            regStatus = false;
        }
        else{
            this.setState({zipcodeES: false, zipcodeHT: ""});
        }
        if(isEmpty(this.state.zipcode)){
            this.setState({zipcodeES: true, zipcodeHT: "Enter zipcode"});
            regStatus = false;
        }
        else{
            this.setState({zipcodeES: false, zipcodeHT: ""});
        }
        if(regStatus){
            this.registerPost();
        }
    }
    async isValidEmail(){
        await axios.post("/user/register/isValidEmail", urlencode({email:this.state.email}))
            .then((response) => {
                this.setState({isValidEmail:true});
            })
            .catch((error) => {
                this.setState({isValidEmail:false});
                console.log(error)
            });
        console.log(this.state.isValidEmail);
        return this.state.isValidEmail;
    }
    async nextToAddrForm(e){
        e.preventDefault();
        let regStatus = true;
        if(isEmpty(this.state.firstName)){
            this.setState({firstNameES: true, firstNameHT: "Enter first name"});
            regStatus = false;
        }
        else{
            this.setState({firstNameES: false, firstNameHT: ""});
        }
        if(isEmpty(this.state.lastName)){
            this.setState({lastNameES: true, lastNameHT: "Enter last name"});
            regStatus = false;
        }
        else{
            this.setState({lastNameES: false, lastNameHT: ""});
        }
        if(!isEmail(this.state.email) || isEmpty(this.state.email)){
            this.setState({emailES: true, emailHT: "Enter email"});
            regStatus = false;
        }
        else{
            this.setState({emailES: false, emailHT: ""});
        }
        if(isEmpty(this.state.month)){
            this.setState({monthES: true, monthHT:"Enter month"});
            regStatus = false;
        }
        else{
            this.setState({monthES: false, monthHT: ""});
        }
        if(isEmpty(this.state.day)){
            this.setState({dayES: true, dayHT:"Enter day"});
            regStatus = false;
        }
        else{
            this.setState({dayES: false, dayHT: ""});
        }
        if(isEmpty(this.state.year)){
            this.setState({yearES: true, yearHT:"Enter year"});
            regStatus = false;
        }
        else{
            this.setState({yearES: false, yearHT: ""});
        }
        if(this.state.password.length<8 || isAlpha(this.state.password) ){
            this.setState({passwordES:true, passwordHT:"Use 8 or more characters with a mix of letters, numbers & symbols"});
            regStatus = false;
        }
        else{
            this.setState({passwordES:false, passwordHT:""})
        }
        if(isEmpty(this.state.password)){
            this.setState({ccPasswordES:true, ccPasswordHT:"Use 8 or more characters with a mix of letters, numbers & symbols"});
            regStatus = false;
        }
        else{
            this.setState({ccPasswordES:false, ccPasswordHT:""})
        }
        if(this.state.password !== this.state.ccPassword){
            this.setState({ccPasswordES: true, ccPasswordHT:"Those passwords didn't match. Try again." });
            regStatus = false;
        }
        else{
            this.setState({ccPasswordES: false, ccPasswordHT: "Use 8 or more characters with a mix of letters, numbers & symbols"});
        }
        if(isEmpty(this.state.gender)){
            this.setState({genderES:true, genderHT:"Enter gender"});
            regStatus=false;
        }
        else{
            this.setState({genderES:false, genderHT:""});
        }
        if(isEmpty(this.state.phone)){
            this.setState({phoneES:true, phoneHT:"Enter phone"});
            regStatus=false;
        }
        else{
            this.setState({phoneES:false, phoneHT:""});
        }
        if(regStatus){
            let isInvalidEmail =  await !this.isValidEmail(this.state.email);
            console.log("isInvalidEmaiil:"+ isInvalidEmail);
            if(isInvalidEmail){
                this.setState({emailES:true, emailHT:"That username is taken. Try another."});
                regStatus=false;
            }
            else{
                this.setState({emailES: false, emailHT: ""});
            }
            if(regStatus) {
                this.toggleInfoForm();
            }
        }
    }

    render() {

        return (
            <div className={"parentDiv"}>
                <div className="regForm">
                    <div className="loginBox" style={{display:this.state.showHideInfoForm}}>

                        <div className={"option"}>
                            <h2>Create your account</h2>
                        </div>

                        <div className={"informationBoxRegister"} >
                            <div className={"TextBox"}>
                                <h5>Name</h5>
                                <div className={"nameForm"}>
                                    <TextField error={this.state.firstNameES}  helperText={this.state.firstNameHT} style={{order:1}} label={"First"} onChange={this.handleChange('firstName')}/>
                                    <TextField error={this.state.lastNameES} helperText={this.state.lastNameHT} style={{order:2}} label={"Last"} onChange={this.handleChange('lastName')}/>
                                </div>
                            </div>

                            <div className={"TextBox"} >
                                <h5>Email</h5>
                                <TextField  style={{padding:1}} error={this.state.emailES} helperText={this.state.emailHT}  label={"Enter your email"} fullWidth onChange={this.handleChange('email')}/>
                            </div>

                            <div className={"TextBox"}>
                                <h5>Password</h5>
                                <TextField style={{padding:1}} error={this.state.passwordES} helperText={this.state.passwordHT}  label={"Create a password"} type="password" fullWidth onChange={this.handleChange('password')}/>
                                <TextField style={{padding:1}} error={this.state.ccPasswordES} helperText={this.state.ccPasswordHT} label={"Confirm your password"} type="password" fullWidth onChange={this.handleChange('ccPassword')}/>
                            </div>
                            <div className={"TextBox"}>
                                <h5>Birthday</h5>
                                <div className={"birthdayForm"}>
                                    <FormControl style={{textAlign:"left"}} error={this.state.monthES}>
                                        <InputLabel htmlFor="month-simple">Month</InputLabel>
                                        <Select
                                            style={{width:125}}
                                            value={this.state.month}
                                            onChange={this.handleChange('month')}
                                            inputProps={{
                                                name: 'age',
                                                id: 'month-simple',
                                            }}
                                        >
                                            <MenuItem value={"1"}>January</MenuItem>
                                            <MenuItem value={"2"}>February</MenuItem>
                                            <MenuItem value={"3"}>March</MenuItem>
                                            <MenuItem value={"4"}>April</MenuItem>
                                            <MenuItem value={"5"}>May</MenuItem>
                                            <MenuItem value={"6"}>June</MenuItem>
                                            <MenuItem value={"7"}>July</MenuItem>
                                            <MenuItem value={"8"}>August</MenuItem>
                                            <MenuItem value={"9"}>September</MenuItem>
                                            <MenuItem value={"10"}>October</MenuItem>
                                            <MenuItem value={"11"}>November</MenuItem>
                                            <MenuItem value={"12"}>December</MenuItem>
                                        </Select>
                                        <FormHelperText>{this.state.monthHT}</FormHelperText>
                                    </FormControl>

                                    <TextField  style={{width:75, order:2, padding:2}} error={this.state.dayES}  helperText={this.state.dayHT} label={"Day"} onChange={this.handleChange('day')}/>
                                    <TextField  style={{width:100,order:3,padding:2}} error={this.state.yearES}  helperText={this.state.yearHT} label={"Year"}  onChange={this.handleChange('year')}/>
                                </div>
                            </div>
                            <div className={"TextBox"} >
                                <h5>Gender</h5>
                                <FormControl  style={{padding:1,textAlign:"left"}} fullWidth={true} error={this.state.genderES}>
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
                                    <FormHelperText>{this.state.genderHT}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className={"TextBox"}>
                                <h5>Mobile phone {this.state.phone}</h5>
                                <Phone style={{fontSize:"14px"}}
                                    value={ this.state.phone }
                                    onChange={ phone => this.setState({ phone })}
                                    indicateInvalid={this.state.phoneES}
                                    error={this.state.phoneHT}
                                    placeholder="Start typing a phone number"
                                />
                            </div>

                        </div>
                        <div className={"optionBottom"}>
                            <div style={{order:1}} >
                                <Button style={{textTransform: 'none' ,padding:0, background:"white", boxShadow: 'none', color:"#528ff5"}} variant="raised" size='large' onClick={() => this.props.history.push('/')}>
                                    Got an account?
                                </Button>
                            </div>
                            <div style={{order:2}}>
                                <Button onClick={(e) => this.nextToAddrForm(e)} variant="raised" color="secondary" size={"large"}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={"loginBox"} style={{display:this.state.showHideAddrForm}}>
                        <div className={"option"}>
                            <h2>Provide your address</h2>
                            <p>For your pet safety please provide your current address. We will not be verifying or checking information given by you.</p>
                        </div>

                        <div className={"informationBoxRegister"} >
                            <div className={"TextBox"}>
                                <h5>Address</h5>
                                <div>
                                    <TextField fullWidth error={this.state.addressES} helperText={this.state.addressHT} label={"Address"} onChange={this.handleChange('address')}/>
                                </div>
                            </div>
                            <div className={"TextBox"}>
                                <div className={"TextBox2"}>
                                    <TextField style={{order:1}} error={this.state.cityES} helperText={this.state.cityHT} label={"City"} onChange={this.handleChange('city')}/>
                                    <TextField style={{order:2}} error={this.state.stateES} helperText={this.state.stateHT} label={"State/Province"} onChange={this.handleChange('state')}/>
                                </div>
                            </div>
                            <div className={"TextBox"}>
                                <div className={"TextBox2"}>
                                    <TextField style={{order:1}} error={this.state.countryES} helperText={this.state.countryHT} label={"Country"} onChange={this.handleChange('country')}/>
                                    <TextField style={{order:2}} error={this.state.zipcodeES} helperText={this.state.zipcodeHT} label={"Zipcode"} onChange={this.handleChange('zipcode')}/>
                                </div>
                            </div>
                        </div>

                        <div className={"optionBottom"}>
                            <div style={{order:1}} >
                                <Button style={{width:36, textTransform: 'none' ,padding:0, background:"white", boxShadow: 'none', color:"#528ff5"}} variant="raised"  onClick={() => this.toggleInfoForm()}>
                                    Back
                                </Button>
                            </div>
                            <div style={{order:2}}>
                                <Button onClick={(e) => this.register(e)} variant="raised" color="secondary" size={"large"}>
                                    Signup
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
