import React, {useEffect} from "react";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {List} from "material-ui";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import photo from "../../../resources/images/user_no_photo.png"
import {Typography} from "@material-ui/core";


export const UserInfoInvoice = (props) => {

    const {user} = props;

    return (
        <div>
            <Paper className="table-paper">
                <List style={{alignItems: "flex-start"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <Typography variant="h6" gutterBottom>
                                {user.name}
                            </Typography>
                            <img
                                src={user.photo !== undefined && user.photo !== null && user.photo.trim()
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
};