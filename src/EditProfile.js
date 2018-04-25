import React, { Component } from 'react';
import axios from "./AxiosConfig";
import './EditProfile.css'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import urlencode from "form-urlencoded";
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import testimg from './static/images/testImg.jpg';
import IconButton from 'material-ui/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Phone from 'react-phone-number-input';
import { InputLabel } from 'material-ui/Input';
import isAlpha from "validator/lib/isAlpha";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
class EditProfile extends Component {

    constructor(props){
        super(props);
        this.state = {file: '',imagePreviewUrl: '',
            password: "",  firstName:"", lastName:"",
            ccPassword: "", redirect: false, month:"",day:"",year:"",gender:"", phone:"",
            passwordES:false, firstNameES:false, lastNameES: false,
            ccPasswordES:false, monthES:false, dayES:false, yearES:false, genderES:false, phoneES:false,
            firstNameHT:"", lastNameHT: "",
            ccPasswordHT:"Use 8 or more characters with a mix of letters, numbers & symbols", monthHT:"",
            dayHT:"", yearHT:"", genderHT:"", phoneHT:"",

            address:"", city:"", state:"", country:"", zipcode:"",
            showHideAddrForm: "none" ,showHideInfoForm:"block",

            addressES:false, cityES:false, countryES:false, stateES:false, zipcodeES:false,
            addressHT:"", cityHT:"", countryHT:"", stateHT:"", zipcodeHT:"",
        };

    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleUploadImage = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    };

    getInfo(){
        axios.get("/user/getInfo")
            .then((response) =>{

                this.setState({
                    firstName : response.data.firstname,
                    lastName : response.data.lastname,
                    gender : response.data.gender,
                    day : response.data.day,
                    month : response.data.month,
                    year : response.data.year,
                    phone : response.data.phone,
                    city: response.data.city,
                    address: response.data.address,
                    state: response.data.state,
                    country:response.data.country,
                    zipcode: response.data.zipcode
                });
                console.log(this.state.month)

            }).catch((error) => {
            console.log(error)
            this.props.history.push('/')
        })
    }
    toggleInfoForm() {
        let css = (this.state.showHideInfoForm === "none") ? "block" : "none";
        this.setState({showHideAddrForm: this.state.showHideInfoForm ,showHideInfoForm:css});
    }
    nextToAddrForm(e) {
        e.preventDefault();
        let regStatus = true;
        if (isEmpty(this.state.firstName)) {
            this.setState({firstNameES: true, firstNameHT: "Enter first name"});
            regStatus = false;
        }
        else {
            this.setState({firstNameES: false, firstNameHT: ""});
        }
        if (isEmpty(this.state.lastName)) {
            this.setState({lastNameES: true, lastNameHT: "Enter last name"});
            regStatus = false;
        }
        else {
            this.setState({lastNameES: false, lastNameHT: ""});
        }

        if (isEmpty(this.state.month)) {
            this.setState({monthES: true, monthHT: "Enter month"});
            regStatus = false;
        }
        else {
            this.setState({monthES: false, monthHT: ""});
        }
        if (isEmpty(this.state.day)) {
            this.setState({dayES: true, dayHT: "Enter day"});
            regStatus = false;
        }
        else {
            this.setState({dayES: false, dayHT: ""});
        }
        if (isEmpty(this.state.year)) {
            this.setState({yearES: true, yearHT: "Enter year"});
            regStatus = false;
        }
        else {
            this.setState({yearES: false, yearHT: ""});
        }
        if (!isEmpty(this.state.password)) {

            if (this.state.password.length < 8 || isAlpha(this.state.password)) {
                this.setState({
                    passwordES: true,
                    passwordHT: "Use 8 or more characters with a mix of letters, numbers & symbols"
                });
                regStatus = false;
            }
            else {
                this.setState({passwordES: false, passwordHT: ""})
            }
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
            this.toggleInfoForm();
        }
    }

    updateProfile(e){
        e.preventDefault();
        let updateParams = {
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
        let updatePasswordParams ={
            password: this.state.password
        };
        axios.post("/user/update", urlencode(updateParams))
            .then((response) => {

                if(!isEmpty(this.state.password)) {
                    axios.post("/user/updatePassword", urlencode(updatePasswordParams))
                        .then((response) => {
                            this.props.history.push('/');
                        })
                        .catch((error) => {
                        });
                }

            })
            .catch((error) => {
            });



    }
    componentDidMount(){
        this.getInfo();
    }
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className={"parentDiv"}>
                <div className="profilePage">
                    <div className={"avatarForm"}>
                        <Avatar style={{width:"100px", height:"100px"}} src={testimg} className={classNames("avatar","bigAvatar")}/>

                    </div>
                    <div className="profileForm">

                        <div className="profileBox">
                            <input accept="image/*" className={"input"} id="icon-button-file" type="file"  onChange={this.handleUploadImage}/>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" className={"uploadButton"} component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <div className="imgPreview">
                                {$imagePreview}
                            </div>

                            <div className={"informationBoxEditProfile"} style={{display:this.state.showHideInfoForm}}>
                                <div className={"TextBox"}>
                                    <h5>Name</h5>
                                    <div className={"nameForm"}>
                                        <TextField error={this.state.firstNameES}  helperText={this.state.firstNameHT} style={{order:1,padding:"1px"}} label={"First"} value={this.state.firstName} onChange={this.handleChange('firstName')}/>
                                        <TextField error={this.state.lastNameES}  helperText={this.state.lastNameHT} style={{order:2,padding:"1px"}} label={"Last"} value={this.state.lastName} onChange={this.handleChange('lastName')}/>
                                    </div>
                                </div>

                                <div className={"TextBox"}>
                                    <h5>Password</h5>
                                    <TextField  style={{padding:"1px"}} error={this.state.passwordES} helperText={this.state.passwordHT} label={"Create new password"} type="password" fullWidth onChange={this.handleChange('password')}/>
                                    <TextField style={{padding:"1px"}} error={this.state.ccPasswordES} helperText={this.state.ccPasswordHT} label={"Confirm your new password"} type="password" fullWidth onChange={this.handleChange('ccPassword')}/>
                                </div>
                                <div className={"TextBox"}>
                                    <h5>Birthday</h5>
                                    <div className={"birthdayForm"}>
                                        <FormControl style={{textAlign:"left"}}  error={this.state.monthES}>
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
                                            <FormHelperText>{this.state.monthHT}</FormHelperText>
                                        </FormControl>
                                        <TextField  style={{width:75, order:2}} error={this.state.dayES}  helperText={this.state.dayHT} label={"Day"} value ={this.state.day} onChange={this.handleChange('day')}/>
                                        <TextField  style={{width:100,order:3}} error={this.state.yearES}  helperText={this.state.yearHT} label={"Year"}  value ={this.state.year} onChange={this.handleChange('year')}/>
                                    </div>
                                </div>
                                <div className={"TextBox"} >
                                    <h5>Gender</h5>
                                    <FormControl  style={{textAlign:"left"}} fullWidth={true} error={this.state.genderES}>
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
                                <div className={"optionBottom"}>
                                    <div style={{order:1}} >
                                        <Button style={{textTransform: 'none' ,padding:0, background:"white", boxShadow: 'none', color:"#528ff5"}} variant="raised" size='large' onClick={() => this.props.history.push('/main')}>
                                            Back to home
                                        </Button>
                                    </div>
                                    <div style={{order:2}}>
                                        <Button onClick={(e) => this.nextToAddrForm(e)} variant="raised" color="secondary" size={"large"}>
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div style={{display:this.state.showHideAddrForm}}>
                                <div className={"option"}>
                                    <h2>Provide your address</h2>
                                    <p>For your pet safety please provide your current address. We will not be verifying or checking information given by you.</p>
                                </div>

                                <div className={"informationBoxRegister"} >
                                    <div className={"TextBox"}>
                                        <h5>Address</h5>
                                        <div>
                                            <TextField fullWidth error={this.state.addressES} helperText={this.state.addressHT} value={this.state.address} label={"Address"} onChange={this.handleChange('address')}/>
                                        </div>
                                    </div>
                                    <div className={"TextBox"}>
                                        <div className={"TextBox2"}>
                                            <TextField style={{order:1}} error={this.state.cityES} helperText={this.state.cityHT} value={this.state.city} label={"City"} onChange={this.handleChange('city')}/>
                                            <TextField style={{order:2}} error={this.state.stateES} helperText={this.state.stateHT} value={this.state.state} label={"State/Province"} onChange={this.handleChange('state')}/>
                                        </div>
                                    </div>
                                    <div className={"TextBox"}>
                                        <div className={"TextBox2"}>
                                            <TextField style={{order:1}} error={this.state.countryES} helperText={this.state.countryHT} value={this.state.country} label={"Country"} onChange={this.handleChange('country')}/>
                                            <TextField style={{order:2}} error={this.state.zipcodeES} helperText={this.state.zipcodeHT} value={this.state.zipcode} label={"Zipcode"} onChange={this.handleChange('zipcode')}/>
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
                                        <Button onClick={(e) => this.updateProfile(e)} variant="raised" color="secondary" size={"large"}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default EditProfile;
