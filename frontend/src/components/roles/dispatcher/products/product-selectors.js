import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export function ProductCurrencySelector(props) {
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
                <MenuItem value={"BYN"}>BYN</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"EURO"}>EURO</MenuItem>
                <MenuItem value={"RUB"}>RUB</MenuItem>
            </Select>
        </React.Fragment>
    );
}

export function ProductQuantityMeasureSelector(props) {
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

export function ProductMassMeasureSelector(props) {
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
                <MenuItem value={"KG"}>Kilogram</MenuItem>
                <MenuItem value={"TON"}>Ton</MenuItem>
            </Select>
        </React.Fragment>
    );
}
