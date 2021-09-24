import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { greyBackgroundColor } from "../../../theme";
import { UserInfoContainer, UserInfoForm } from "../../Forms/userInfoStyles";

export const UserProfileView: React.FC = () => {
  const { push } = useHistory();
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
          <title>RunBracket - Create Tournament</title>
        </Helmet>
        <CssBaseline />
        <UserInfoContainer>
          <UserInfoForm>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  marginY={3}
                  variant="h2"
                  component="h1"
                  color="primary"
                >
                  New Tournament
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                ></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                ></Paper>
              </Grid>
            </Grid>
          </UserInfoForm>
        </UserInfoContainer>
      </Container>
    </Box>
  );
};

export default UserProfileView;
