import React from "react";
import Button from "@material-ui/core/Button";
import ExploreIcon from '@material-ui/icons/Explore';

export default function Locate(props) {
    const {onClick} = props;

    const handleLocationFound = (position) => {
        onClick(position.coords.latitude, position.coords.longitude);
    }

    const handleLocationNotFount = (err) => {
        alert("Cannot get your location");
        console.err(err);
    }

    const handleLocateClick = () => {
        navigator.geolocation.getCurrentPosition(handleLocationFound, handleLocationNotFount);
    }

    return (
        <Button onClick={handleLocateClick}>
            <ExploreIcon/>
        </Button>
    )
}