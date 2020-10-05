import React from 'react';
import ProfilePhotoForm from './profile-photo-form';
import {handleRequestError, makeRequest, USER_URL} from "../../parts/util/request-util";
import photo from "../../../resources/images/user_no_photo.png";
import {DialogWindow} from "../../parts/dialogs/dialog";
import Tooltip from "@material-ui/core/Tooltip";
import {bindActionCreators} from "redux";
import {changePhoto} from "../../store/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {List} from "material-ui";
import ListItem from "@material-ui/core/ListItem";
import {Typography} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photoDialog: false,
            photoForm: null,
            file: {},
            user: {
                id: 0,
                name: "",
                birthday: "",
                email: "",
                phone: "",
                role: "",
                photo: "",
            },
            updatedUser: {}
        }
        this.handleClose = this.handleClose.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.getFile = this.getFile.bind(this);
        this.uploadPhotoDialog = this.uploadPhotoDialog.bind(this);
    }

    componentDidMount() {
        let cleanupFunction = false;
        this.fetchUser(cleanupFunction)
            .catch((err) => {
                this.setState({
                    user: {
                        id: 0,
                        name: "",
                        birthday: "",
                        email: "",
                        phone: "",
                        role: "",
                        photo: ""
                    }
                });
                handleRequestError(err, alert); // TODO toast notification
            });
        return () => cleanupFunction = true;
    }

    async fetchUser(cleanupFunction = false) {
        const id = this.props.userId;
        let selected = await makeRequest("GET", USER_URL + "/" + id);
        if (!cleanupFunction) {
            this.setState({
                updatedUser: selected.data,
                user: {
                    id: selected.data.id,
                    name: selected.data.name + " " + selected.data.surname,
                    birthday: selected.data.birthday,
                    email: selected.data.email,
                    phone: selected.data.phone,
                    photo: selected.data.photo,
                    role: selected.data.roles[0],
                }
            });
        }
        this.props.changePhoto(this.state.updatedUser);
    }

    getFile(file) {
        this.setState({file: file})
    }

    saveFile() {
        const endpoint = USER_URL + "/photo";
        makeRequest("PUT", endpoint, {"photo": this.state.file.base64});
        this.setState({photoDialog: false});
        this.fetchUser();
    }

    handleClose() {
        this.setState({photoDialog: false, file: {}});
    }

    uploadPhotoDialog() {
        this.setState({
            photoForm: <ProfilePhotoForm
                onClose={this.handleClose}
                onSubmit={this.saveFile}
                onDone={this.getFile}/>,
            photoDialog: true
        })
    }

    render() {
        return (
            <div>
                <Paper>
                    <List style={{alignItems: "flex-start"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                <Typography variant="h6" gutterBottom>
                                    {this.state.user.name}
                                </Typography>
                                <Tooltip title="Click to change photo" arrow>
                                    <img
                                        src={(this.state.file.base64 !== null
                                            && this.state.file.base64 !== undefined
                                            && this.state.file.base64.trim())
                                            ? this.state.file.base64
                                            : (this.state.user.photo !== null
                                                && this.state.user.photo !== undefined
                                                && this.state.user.photo.trim())
                                                ? this.state.user.photo
                                                : photo}
                                        width={100}
                                        height={100}
                                        alt="photo"
                                        onClick={this.uploadPhotoDialog}
                                    />
                                </Tooltip>
                            </ListItem>
                            <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            {this.state.user.birthday}
                                        </React.Fragment>
                                    }
                                    secondary="Birthday"
                                />
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            {this.state.user.email}
                                        </React.Fragment>
                                    }
                                    secondary="E-mail"
                                />
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            {this.state.user.phone}
                                        </React.Fragment>
                                    }
                                    secondary="Contact phone"
                                />
                            </ListItem>
                        </div>
                    </List>
                </Paper>

                <DialogWindow
                    dialogTitle="Photo upload"
                    handleClose={this.handleClose}
                    openDialog={this.state.photoDialog}
                    form={this.state.photoForm}
                />
            </div>
        )
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        changePhoto: bindActionCreators(changePhoto, dispatch)
    }
};

export default withRouter(connect(null, mapActionsToProps)(ProfileInfo));