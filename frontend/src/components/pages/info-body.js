import React from "react";
import Paper from "@material-ui/core/Paper";
import StarRateIcon from '@material-ui/icons/StarRate';
import ListItem from "@material-ui/core/ListItem";
import {List} from "material-ui";

export const InfoBody = () => {

    return (
        <main>
            <Paper className="table-paper main-table-paper">
                <div style={{textAlign: "center"}}>
                    <h1>The solution for managing a transport company</h1>
                    <h3 style={{color: "#3f51b5"}}>Orders from customers, management of your fleet and personnel</h3>
                    <h3 style={{color: "#3f51b5"}}>Control over the work in real time</h3>
                    <h3 style={{color: "#3f51b5"}}>The application is suitable for both transport companies and private
                        carriers</h3>
                </div>

                <List className="info-content">
                    <div className="info-content-column">
                        <ListItem className="info-content-row" style={{paddingLeft: 30, alignItems: "flex-start"}}>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> Start organizing logistic after registration
                                in system.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> Use interactive, sorted, filtering tables and
                                info windows.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> Add warehouses, autos, dispatchers, drivers
                                and managers.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> Accept incoming order offers from third-party
                                customers.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> Assign each driver to a specific car.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> The dispatcher can check the client and
                                select managers.</h4>
                        </ListItem>

                        <ListItem className="info-content-row" style={{paddingLeft: 30, alignItems: "flex-start"}}>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> The route of each car is displayed on the
                                map.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> The manager gets the opportunity to track
                                cargo online.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> The driver has all the information about the
                                order and route.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> The right electronic access to all cargo
                                documents.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> Ability to generate reports and charts for
                                the owner.</h4>
                            <h4><StarRateIcon style={{color: "#3f51b5"}}/> Inner system controller sends birthday mails
                                automatically.</h4>
                        </ListItem>
                    </div>
                </List>
            </Paper>
        </main>
    )
};

export default InfoBody;