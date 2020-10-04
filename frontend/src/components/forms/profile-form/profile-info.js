import React, {useState} from 'react';
import {handleRequestError, makeRequest, USER_URL} from "../../parts/util/request-util";
import photo from "../../../resources/images/user_no_photo.png";
import Tooltip from "@material-ui/core/Tooltip";
import {bindActionCreators} from "redux";
import {changeUser} from "../../store/actions";
import {connect} from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import {Typography} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import {copyUser} from "../../parts/util/function-util";
import "./profile-style.css";
import Button from "@material-ui/core/Button";
import ChangePhoneDialog from "./phone-dialog";
import useToast from "../../parts/toast-notification/useToast";
import EditIcon from "@material-ui/icons/Edit";
import ChangePassword from "./password-dialog";


const mapActionsToProps = (dispatch) => {
    return {
        changeUser: bindActionCreators(changeUser, dispatch)
    }
};

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
};


export const ProfileInfo = connect(mapStateToProps, mapActionsToProps)((props) => {

    const {user, changeUser} = props;

    const [toastComponent, showToastComponent] = useToast();
    const [openPhone, showPhoneDialog] = useState(false);
    const [openPassword, showPasswordDialog] = useState(false);

    const maxSizeOfImg = 12000000;
    let avatar = user.photo === "" || user.photo === null ? photo : user.photo;
    let location = user.address !== null ? user.address.country + ", " + user.address.city : "";


    const handleChange = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();

        if (file !== undefined) {
            if (file.type.match("image.*")) {

                if (file.size > maxSizeOfImg) {
                    showToastComponent("File is to large. Max size is :" + maxSizeOfImg / 1000000 + "MB" , "error");
                    return;
                }

                if (file.name.length > 100) {
                    showToastComponent("File name is too long (maximum is 100 characters)" , "error");
                    return;
                }

                reader.readAsDataURL(file);

            } else {
                showToastComponent("Incorrect file type" , "error")
            }
        }

        reader.onload = () => {
            user.photo = reader.result;

            makeRequest("PUT", USER_URL + "/photo", {photo: user.photo})
                .then(res => changeUser(copyUser(user)))
                .catch(error => handleRequestError(error, alert))

        };

    };

    return (
        <main>
            <Paper className="profile-container">
                <header>
                    <Typography variant="h4" gutterBottom>
                        Account
                    </Typography>
                </header>
                <div className="profile-content-container">
                    <div className="left-box">
                        <div>
                            <Tooltip title="Click to change photo" arrow>
                                <img
                                    src={avatar}
                                    alt="photo"
                                    className="profile-avatar"
                                    onClick={() => {
                                        document.getElementById("hidden-input").click();
                                    }}
                                />
                            </Tooltip>
                            <input
                                type="file"
                                onChange={handleChange}
                                multiple={false}
                                size="1000"
                                accept="image/*"
                                hidden={true}
                                id="hidden-input"
                            />
                            <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            {location}
                                        </React.Fragment>
                                    }
                                    secondary="Location"
                                />
                            </ListItem>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => {
                                    showPasswordDialog(true);
                                }}>
                                Change password
                            </Button>
                        </div>
                    </div>
                    <div className="right-box">
                        <div className="info-box">
                            <Typography variant="h5" gutterBottom>
                                Info
                            </Typography>
                            <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            {user.email}
                                        </React.Fragment>
                                    }
                                    secondary="Email"
                                />
                                <ListItemText
                                    primary={
                                        <div className="phone-item-div">
                                            <React.Fragment>
                                                <div className="phone-text">
                                                    {user.phone}
                                                </div>
                                            </React.Fragment>
                                            <Button
                                                color="primary"
                                                startIcon={<EditIcon/>}
                                                onClick={() => {
                                                    showPhoneDialog(true);
                                                }}/>
                                        </div>
                                    }
                                    secondary="Contact phone"
                                />
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            {user.passport}
                                        </React.Fragment>
                                    }
                                    secondary="Passport"
                                />
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            {user.birthday}
                                        </React.Fragment>
                                    }
                                    secondary="Birthday"
                                />
                            </ListItem>
                        </div>
                    </div>
                </div>

                <ChangePhoneDialog
                    changeUser={changeUser}
                    user={user}
                    showToastComponent={showToastComponent}
                    open={openPhone}
                    onClose={() => showPhoneDialog(false)}
                />

                <ChangePassword
                    showToastComponent={showToastComponent}
                    open={openPassword}
                    onClose={() => showPasswordDialog(false)}
                />

                {toastComponent}

            </Paper>
        </main>
    )
});