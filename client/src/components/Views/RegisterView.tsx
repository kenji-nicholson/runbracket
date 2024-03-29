import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Alert from "../Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {
  UserInfoAvatar,
  UserInfoContainer,
  UserInfoForm,
  UserInfoSubmit,
} from "../Forms/userInfoStyles";
import Container from "@mui/material/Container";
import { useAddUserMutation } from "../../app/services/user";
import { useHistory } from "react-router";
import type { RegisterRequest } from "../../app/services/user";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";
import { FormTextField } from "../Forms/FormComponents";

export const RegisterView: React.FC = () => {
  const validationSchema = object().shape({
    first_name: string().required("First name is required."),
    last_name: string().required("Last name is required."),
    display_name: string().required("Field is required."),
    email: string()
      .required("Email address is required.")
      .email("Not a valid email."),
    password: string().required("Password is required."),
  });

  const { push } = useHistory();

  const { handleSubmit, control } = useForm<RegisterRequest>({
    resolver: yupResolver(validationSchema),
  });

  const [signUp] = useAddUserMutation();

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const response = await signUp(data).unwrap();
      console.log(response);
      push("/");
    } catch (err) {
      console.log(err);
      setOpen(true);
    }
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
        <UserInfoForm onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                name="first_name"
                label="First Name"
                control={control}
                autoComplete="fname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                name="last_name"
                label="Last Name"
                control={control}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="display_name"
                label="Display Name"
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextField
                name="email"
                label="Email"
                control={control}
                autoComplete="email"
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
            message="Oops! There was a problem."
          ></Alert>
        </UserInfoForm>
      </UserInfoContainer>
    </Container>
  );
};

export default RegisterView;
