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
class EditProfile extends Component {

    constructor(props){
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};

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
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default EditProfile;
