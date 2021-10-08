import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useGetTournamentsByUserIdQuery } from "../../../app/services/tournament";
import { useGetUserQuery } from "../../../app/services/user";
import { RootState } from "../../../app/store";
import { PageSection } from "../../Forms/SectionHeader";
import { UserInfoContainer } from "../../Forms/userInfoStyles";
import { greyBackgroundColor } from "../../Theme/theme";
import TournamentSection from "./Tournaments/TournamentSection";
import UserProfileInformation from "./UserProfileInformation";
import UserSettings from "./UserSettings";

export const UserProfileView: React.FC = () => {
  const { push } = useHistory();

  const user = useSelector((state: RootState) => state.auth);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, tab: number) => {
    setSelectedTab(tab);
  };

  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetUserQuery(id);

  const { data: tournamentData, isLoading: tournamentDataIsLoading } =
    useGetTournamentsByUserIdQuery({ user_id: parseInt(id) });

  const isCurrentUser = user.user && user.user.user_id == parseInt(id);
  const hasTournaments = tournamentData && tournamentData.items.length > 0;
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
              <>
                <Tabs value={selectedTab} onChange={handleChange}>
                  <Tab label="Tournaments" />
                  {isCurrentUser && <Tab label="Settings" />}
                </Tabs>
                <PageSection>
                  {selectedTab === 0 &&
                    (hasTournaments ? (
                      <TournamentSection
                        tournaments={tournamentData}
                      ></TournamentSection>
                    ) : (
                      <Typography>No tournaments created yet.</Typography>
                    ))}
                  {user.user && selectedTab === 1 && (
                    <UserSettings user={user.user} />
                  )}
                </PageSection>
              </>
            </Grid>
          </Grid>
        </UserInfoContainer>
      </Container>
    </Box>
  );
};

export default UserProfileView;
