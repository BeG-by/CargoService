import React, {useEffect} from "react";
import {USER_URL, makeRequest , handleRequestError} from "../../parts/util/request-util";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {List} from "material-ui";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import photo from "../../../resources/images/user_no_photo.png"
import {Typography} from "@material-ui/core";

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const UserInfo = connect(mapStateToProps)((props) => {
    const userRole = props.role;
    const [user, setUser] = React.useState({
        id: 0,
        name: "",
        birthday: "",
        email: "",
        phone: "",
        role: "",
        photo: "",
    });


    async function fetchUser(cleanupFunction) {
        const id = props.userId;
        let selected = await makeRequest("GET", USER_URL + "/" + id);
        if (!cleanupFunction) setUser({
            id: selected.data.id,
            name: selected.data.name + " " + selected.data.surname,
            birthday: selected.data.birthday,
            email: selected.data.email,
            phone: selected.data.phone,
            photo: selected.data.photo,
            role: selected.data.roles[0],
        });
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchUser(cleanupFunction)
            .catch((err) => {
                setUser({
                    id: 0,
                    name: "",
                    birthday: "",
                    email: "",
                    phone: "",
                    role: "",
                    photo: ""
                });
                handleRequestError(err, alert); // TODO toast notification
            });
        return () => cleanupFunction = true;
    }, []);

    return (
        <div>
            <Paper>
                <List style={{alignItems: "flex-start"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <Typography variant="h6" gutterBottom>
                                {user.name}
                            </Typography>
                            <img
                                src={user.photo !== undefined && user.photo !== null  && user.photo.trim()
                                    ? user.photo
                                    : photo}
                                width={100}
                                height={100}
                                alt="avatar"/>
                        </ListItem>
                        <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        {user.birthday}
                                    </React.Fragment>
                                }
                                secondary="Birthday"
                            />
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        {user.email}
                                    </React.Fragment>
                                }
                                secondary="E-mail"
                            />
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        {user.phone}
                                    </React.Fragment>
                                }
                                secondary="Contact phone"
                            />
                        </ListItem>
                    </div>
                </List>
            </Paper>
            <br/>
        </div>
    );
});