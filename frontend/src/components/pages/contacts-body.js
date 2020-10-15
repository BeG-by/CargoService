import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import WebIcon from '@material-ui/icons/Web';


export const ContactsBody = () => {
    return (
        <main className="main-body-info">
            <Paper className="block" style={{paddingTop: 30, paddingBottom: 50, margin: "auto"}}>
                <Typography variant="button" display="block" gutterBottom
                            style={{fontSize: 26, marginLeft: 15, marginTop: 15, textDecoration: "underline"}}
                            className="table-title"
                >
                    <LibraryBooksIcon/>
                    Developer contacts
                </Typography>

                <h2 style={{color: "#3f51b5"}}><CallIcon/> Phones:</h2>
                <Typography>+375 33 38 76 163</Typography>
                <Typography>+375 29 15 71 703</Typography>

                <h2 style={{color: "#3f51b5"}}><EmailIcon/> E-mail:</h2>
                <Typography>Careers: careers@itechart-group.com</Typography>
                <Typography>Partnership: pr@itechart-group.com</Typography>

                <h2 style={{color: "#3f51b5"}}><WebIcon/> Web-site:</h2>
                <Typography>www.itechart.by</Typography>
            </Paper>
        </main>
    )
};


export default ContactsBody;