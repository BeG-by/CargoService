import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import * as axios from "axios";
import useToast from "../toast-notification/useToast";
import {LOAD_PDF_URL} from "../util/request-util";

export const ItemLoadPage = () => {
    const [ToastComponent, showToast] = useToast();

    const loadPage = async () => {
        let URL_TO_LOAD = "https://www.tut.by";
        await axios(`${LOAD_PDF_URL}?url=` + URL_TO_LOAD);
        showToast("Preparing pdf... (tut.by)", "info");
    }

    return (
        <div>
            {ToastComponent}
            <ListItem button key={"load_page"} onClick={loadPage}>
                <ListItemIcon>{<PhotoCameraIcon color="primary"/>}</ListItemIcon>
                <ListItemText primary={"Screen page"}/>
            </ListItem>
        </div>
    )
}