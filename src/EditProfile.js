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
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Phone from 'react-phone-number-input';
import { InputLabel } from 'material-ui/Input';
class EditProfile extends Component {

    constructor(props){
        super(props);
        this.state = {file: '',imagePreviewUrl: '',
            password: "",  firstName:"jm", lastName:"sc",
            ccPassword: "", redirect: false, month:"1",day:"1",year:"2345",gender:"", phone:""
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
        }

        reader.readAsDataURL(file)
    };

    getInfo = e =>{
        e.preventDefault();

        axios.get("/user/getInfo")
            .then((response) => {
                response.data.first

            })
            .catch((error) => {
                alert("Username or Password are incorrect, Please try again.");
                window.location.reload();
            })
    }

    componentDidMount(){
        axios.get("/user/getInfo")
            .then((response) =>{

                this.setState({
                    firstName : response.data.firstname,
                    lastName : response.data.lastname,
                    gender : response.data.gender,
                    day : response.data.day,
                    month : response.data.month,
                    year : response.data.year,
                    phone : response.data.phone
                });
                console.log(this.state.month)

            }).catch((error) => {
                console.log(error)
                this.props.history.push('/')
            })

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

                            <div className={"informationBox"}>
                                <div className={"TextBox"}>
                                    <h5>Name</h5>
                                    <div className={"nameForm"}>
                                        <TextField style={{order:1,padding:"1px"}} label={"First"} value={this.state.firstName} onChange={this.handleChange('firstName')}/>
                                        <TextField style={{order:2,padding:"1px"}} label={"Last"} value={this.state.lastName} onChange={this.handleChange('lastName')}/>
                                    </div>
                                </div>

                                <div className={"TextBox"}>
                                    <h5>Password</h5>
                                    <TextField  style={{padding:"1px"}} label={"Create new password"} type="password" fullWidth onChange={this.handleChange('password')}/>
                                    <TextField style={{padding:"1px"}} label={"Confirm your new password"} type="password" fullWidth onChange={this.handleChange('ccPassword')}/>
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
                                        <TextField  style={{width:75, order:2}} label={"Day"} value ={this.state.day} onChange={this.handleChange('day')}/>
                                        <TextField  style={{width:100,order:3}} label={"Year"}  value ={this.state.year} onChange={this.handleChange('year')}/>
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
            </div>

        );
    }
}

export default EditProfile;
