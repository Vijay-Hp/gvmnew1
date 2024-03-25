import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { styled } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginRight: theme.spacing(1),
    color: "#fff",
  },
  colon: {
    margin: `0 ${theme.spacing(1)}px`,
  },
}));

const CustomTextField = styled(TextField)(() => {});
const CustomTextFieldWrapper = styled(TextField)(() => ({
  "& .container": {
    display: "flex",
    alignItems: "center",
  },
  "& .label": {
    color: "#fff",
  },
  "& .colon": {},
}));

const LabeledTextBox = ({ label, ...props }) => {
  const classes = useStyles();

  return (
    <CustomTextFieldWrapper>
      <div className={"container"}>
        <span className={"label"}>{label}</span>
        <span className={"colon"}>:</span>
        <CustomTextField
          {...props}
          variant="outlined"
          color="secondary"
          style={{ height: 36 }}
        />
      </div>
    </CustomTextFieldWrapper>
  );
};

export default LabeledTextBox;
