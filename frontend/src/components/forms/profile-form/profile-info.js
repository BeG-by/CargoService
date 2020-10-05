import React, {useState} from 'react';
import {handleRequestError, makeRequest, USER_URL} from "../../parts/util/request-util";
import photo from "../../../resources/images/user_no_photo.png";
import Tooltip from "@material-ui/core/Tooltip";
import {bindActionCreators} from "redux";
import {changeUser} from "../../store/actions";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
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
    let location = user.address !== null ? user.address.country + ", " + user.address.city + ", " + user.address.street + ", " + user.address.house : "";
    let role = user.roles[0][0] + user.roles[0].slice(1).toLowerCase();


    const handleChange = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();

        if (file !== undefined) {
            if (file.type.match("image.*")) {

                if (file.size > maxSizeOfImg) {
                    showToastComponent("File is to large. Max size is :" + maxSizeOfImg / 1000000 + "MB", "error");
                    return;
                }

                if (file.name.length > 100) {
                    showToastComponent("File name is too long (maximum is 100 characters)", "error");
                    return;
                }

                reader.readAsDataURL(file);

            } else {
                showToastComponent("Incorrect file type", "error")
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
                    <div className="header-text">
                        Some information may be visible to other users of the system
                    </div>
                </header>
                <div className="profile-content-container">
                    <div className="box1">
                        <div className="box2">
                            <div className="box3">
                                <div className="item-name">Photo</div>
                                <div className="notice-text">A photo helps personalize your account</div>
                            </div>
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
                            </div>
                        </div>
                        <div className="divider"/>
                    </div>
                    <div className="box">
                        <div className="box1">
                            <div className="box4">
                                <div className="item-name">Name</div>
                                <div className="content-div">
                                    <div>{user.name} {user.surname} {user.patronymic}</div>
                                </div>
                            </div>
                            <div className="divider"/>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box1">
                            <div className="box4">
                                <div className="item-name">Role</div>
                                <div className="content-div">
                                    <div>{role}</div>
                                </div>
                            </div>
                            <div className="divider"/>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box1">
                            <div className="box4">
                                <div className="item-name">Address</div>
                                <div className="content-div">
                                    <div>{location}</div>
                                </div>
                            </div>
                            <div className="divider"/>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box1">
                            <div className="box4">
                                <div className="item-name">Passport</div>
                                <div className="content-div">
                                    <div>{user.passport}</div>
                                </div>
                            </div>
                            <div className="divider"/>
                        </div>
                    </div>

                    <div className="box">
                        <div className="box1">
                            <div className="box4">
                                <div className="item-name">Date of birth</div>
                                <div className="content-div">
                                    <div>{user.birthday}</div>
                                </div>
                            </div>
                            <div className="divider"/>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box1">
                            <div className="box4">
                                <div className="item-name">Email</div>
                                <div className="content-div">
                                    <div>{user.email}</div>
                                </div>
                            </div>
                            <div className="divider"/>
                        </div>
                    </div>
                    <div className="box1 without-padding add-margin">
                        <div className="box2">
                            <div className="box3">
                                <div className="item-name">Phone</div>
                                <div className="content-div content-padding">{user.phone}</div>
                            </div>
                            <div>
                                <Tooltip title="Click to change your phone number" arrow>
                                    <Button
                                        color="primary"
                                        startIcon={<EditIcon/>}
                                        onClick={() => {
                                            showPhoneDialog(true);
                                        }}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <div className="divider-margin"/>
                    </div>
                    <div className="box1 without-padding">
                        <div className="box2">
                            <div className="box3">
                                <div className="item-name">Password</div>
                                <div className="notice-text">Here you can change your password</div>
                            </div>
                            <div>
                                <Tooltip title="Click to change your password" arrow>
                                    <Button
                                        color="primary"
                                        startIcon={<EditIcon/>}
                                        onClick={() => {
                                            showPasswordDialog(true);
                                        }}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <div className="divider-margin"/>
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