import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export default function ProductOwnerTypeSelector(props) {
  const { formikProps, formikFieldName, id, label, disabled } = props;
  return (
    <React.Fragment>
      <InputLabel style={{ fontSize: 13 }} id={id + "_label"}>
        {label}
      </InputLabel>
      <Select
        disabled={disabled}
        name={id}
        onChange={formikProps.handleChange}
        value={formikProps.values[formikFieldName]}
        fullWidth
      >
        <MenuItem value={"SP"}>Sole proprietorship</MenuItem>
        <MenuItem value={"JP"}>Juridical person</MenuItem>
      </Select>
    </React.Fragment>
  );
}
