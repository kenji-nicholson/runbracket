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
} from "../Forms/userInfoStyles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../hooks/store";
import { setCredentials } from "../../app/slices/authSlice";
import { useLoginMutation } from "../../app/services/auth";
import type { LoginRequest } from "../../app/services/auth";
import { Helmet } from "react-helmet";
import Alert from "../Alert";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormTextField } from "../Forms/FormComponents";

interface Props {}

export const LoginView: React.FC<Props> = () => {
  const validationSchema = object().shape({
    email: string().required("Email is required.").email("Not a valid email."),
    password: string().required("Password is required."),
  });

  const { handleSubmit, control } = useForm<LoginRequest>({
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const [open, setOpen] = useState<boolean>(false);

  const [login] = useLoginMutation();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = async (data: LoginRequest) => {
    try {
      const user = await login(data).unwrap();
      dispatch(setCredentials(user));
      push("/");
    } catch (err) {
      console.log(err);
      setOpen(true);
    }
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
        <UserInfoForm onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormTextField
                name="email"
                label="Email"
                control={control}
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="password"
                label="Password"
                control={control}
                autoComplete="current-password"
                type="password"
              />
            </Grid>
          </Grid>
          <UserInfoSubmit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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
