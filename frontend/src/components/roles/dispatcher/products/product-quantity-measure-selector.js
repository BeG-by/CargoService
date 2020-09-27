import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function ProductQuantityMeasureSelector(props) {
    const {formikProps, formikFieldName, id, label} = props;
    return (
        <React.Fragment>
            <InputLabel style={{fontSize: 13}} id={id + "_label"}>
                {label}
            </InputLabel>
            <Select
                name={id}
                onChange={formikProps.handleChange}
                value={formikProps.values[formikFieldName]}
                fullWidth
            >
                <MenuItem value={"BOX"}>Box</MenuItem>
                <MenuItem value={"PIECE"}>Piece</MenuItem>
                <MenuItem value={"BARREL"}>Barrel</MenuItem>
                <MenuItem value={"BAG"}>Bag</MenuItem>
            </Select>
        </React.Fragment>

    );
}
