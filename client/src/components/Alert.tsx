import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/core/Alert';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
