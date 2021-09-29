import React from "react";
import {
  Snackbar,
  Alert as MuiAlert,
  AlertColor,
  SnackbarCloseReason,
} from "@mui/material";

interface Props {
  open: boolean;
  handleClose:
    | ((
        event: React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason
      ) => void)
    | undefined;
  reason?: string;
  severity: AlertColor;
  message: string;
}

const Alert: React.FC<Props> = ({ open, handleClose, severity, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <MuiAlert variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

export interface AlertParams {
  severity: AlertColor;
  message: string;
}
