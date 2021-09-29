import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../app/services/user";
import { RootState } from "../../../app/store";
import { greyBackgroundColor } from "../../../theme";
import { UserInfoContainer, UserInfoForm } from "../../Forms/userInfoStyles";
import UserProfileInformation from "./UserProfileInformation";
import UserSettings from "./UserSettings";

export const UserProfileView: React.FC = () => {
  const { push } = useHistory();

  const user = useSelector((state: RootState) => state.auth);

  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetUserQuery(id);

  if (isLoading) {
    return (
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: greyBackgroundColor,
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container>
        <Helmet>
          <title>{data ? data.display_name : "User"} - RunBracket</title>
        </Helmet>
        <CssBaseline />
        <UserInfoContainer>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {data && <UserProfileInformation user={data} />}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {user.user && <UserSettings user={user.user} />}
              </Paper>
            </Grid>
          </Grid>
        </UserInfoContainer>
      </Container>
    </Box>
  );
};

export default UserProfileView;
