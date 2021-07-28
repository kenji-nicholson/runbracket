import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Snackbar } from "@material-ui/core";
import Alert from "./Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import { useAppDispatch } from "../hooks/store";
import { setCredentials } from "../app/slices/authSlice";
import { useLoginMutation } from "../app/services/auth";
import type { LoginRequest } from "../app/services/auth";

interface Props {}

export const LoginView: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const [loginCredentials, setLoginCredentials] = useState<LoginRequest>({
    email: "",
    password: "",
    //rememberMe: false,
  });
  const [open, setOpen] = useState<boolean>(false);

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLoginCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {/* 
          <FormControlLabel
            control={
              <Checkbox
              name="rememberMe"
              value="remember"
              color="primary"
              onChange={handleChange}
              />
            }
            label="Remember me"
            />
          */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async (event) => {
              event.preventDefault();
              try {
                const user = await login(loginCredentials).unwrap();
                dispatch(setCredentials(user));
                push("/");
              } catch (err) {
                console.log(err);
                setOpen(true);
              }
            }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* 
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
              */}
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  push("/register");
                }}
              >
                {"Don't have an account? Click here to register."}
              </Link>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Incorrect username or password.
            </Alert>
          </Snackbar>
        </form>
      </div>
    </Container>
  );
};

export default LoginView;
