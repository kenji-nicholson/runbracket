import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {
  UserInfoAvatar,
  UserInfoContainer,
  UserInfoForm,
  UserInfoSubmit,
} from "../../userInfoStyles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../hooks/store";
import { setCredentials } from "../../app/slices/authSlice";
import { useLoginMutation } from "../../app/services/auth";
import type { LoginRequest } from "../../app/services/auth";
import { Helmet } from "react-helmet";
import Alert from "../Alert";

interface Props {}

export const LoginView: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const [loginCredentials, setLoginCredentials] = useState<LoginRequest>({
    email: "",
    password: "",
    //rememberMe: false,
  });
  const [open, setOpen] = useState<boolean>(false);

  const [login] = useLoginMutation();

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
      <Helmet>
        <title>RunBracket - Login</title>
      </Helmet>
      <CssBaseline />
      <UserInfoContainer>
        <UserInfoAvatar>
          <LockOutlinedIcon />
        </UserInfoAvatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <UserInfoForm>
          <Grid container spacing={1}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <UserInfoSubmit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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
          </UserInfoSubmit>
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
          <Alert
            open={open}
            handleClose={handleClose}
            severity="error"
            message="Incorrect username or password."
          />
        </UserInfoForm>
      </UserInfoContainer>
    </Container>
  );
};

export default LoginView;
