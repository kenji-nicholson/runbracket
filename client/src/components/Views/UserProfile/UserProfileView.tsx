import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../app/services/user";
import { RootState } from "../../../app/store";
import { greyBackgroundColor } from "../../Theme/theme";
import { UserInfoContainer, UserInfoForm } from "../../Forms/userInfoStyles";
import UserProfileInformation from "./UserProfileInformation";
import UserSettings from "./UserSettings";
import { useGetTournamentsByUserIdQuery } from "../../../app/services/tournament";
import { PageSection } from "../../Forms/SectionHeader";
import TournamentSection from "./Tournaments/TournamentSection";

export const UserProfileView: React.FC = () => {
  const { push } = useHistory();

  const user = useSelector((state: RootState) => state.auth);

  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetUserQuery(id);

  const { data: tournamentData, isLoading: tournamentDataIsLoading } =
    useGetTournamentsByUserIdQuery({ user_id: parseInt(id) });

  if (isLoading) {
    return (
      <Backdrop open={isLoading && tournamentDataIsLoading}>
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
              <PageSection>
                {data && <UserProfileInformation user={data} />}
              </PageSection>
            </Grid>
            <Grid item xs={12}>
              {tournamentData && tournamentData.items.length > 0 && (
                <PageSection>
                  <TournamentSection
                    tournaments={tournamentData}
                  ></TournamentSection>
                </PageSection>
              )}
            </Grid>
            <Grid item xs={12}>
              {user.user && user.user.user_id == parseInt(id) && (
                <PageSection>
                  <UserSettings user={user.user} />
                </PageSection>
              )}
            </Grid>
          </Grid>
        </UserInfoContainer>
      </Container>
    </Box>
  );
};

export default UserProfileView;
