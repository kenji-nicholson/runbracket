import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Alert from "../Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {
  UserInfoAvatar,
  UserInfoContainer,
  UserInfoForm,
  UserInfoSubmit,
} from "../../userInfoStyles";
import Container from "@material-ui/core/Container";
import { useRegisterMutation } from "../../app/services/register";
import { useHistory } from "react-router";
import type { RegisterRequest } from "../../app/services/register";
import { Helmet } from "react-helmet";

export const RegisterView: React.FC = () => {
  const { push } = useHistory();

  const [registerState, setRegisterState] = useState<RegisterRequest>({
    first_name: "",
    last_name: "",
    display_name: "",
    email: "",
    password: "",
  });

  const [register] = useRegisterMutation();
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setRegisterState((prevState) => ({
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
        <title>RunBracket - Register</title>
      </Helmet>
      <CssBaseline />
      <UserInfoContainer>
        <UserInfoAvatar>
          <LockOutlinedIcon />
        </UserInfoAvatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <UserInfoForm>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="display_name"
                label="Display Name"
                name="display_name"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
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
                const response = await register(registerState).unwrap();
                console.log(response);
                push("/");
              } catch (err) {
                console.log(err);
                setOpen(true);
              }
            }}
          >
            Sign Up
          </UserInfoSubmit>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  push("/login");
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Alert
            open={open}
            handleClose={handleClose}
            severity="error"
            message="Oops! Please check the input above for errors."
          ></Alert>
        </UserInfoForm>
      </UserInfoContainer>
    </Container>
  );
};

export default RegisterView;
