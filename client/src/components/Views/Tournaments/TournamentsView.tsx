import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  List,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useGetTournamentsQuery } from "../../../app/services/tournament";
import { PageSection, PageTitle } from "../../Forms/SectionHeader";
import { UserInfoContainer } from "../../Forms/userInfoStyles";
import { greyBackgroundColor } from "../../Theme/theme";
import TournamentRow from "../UserProfile/Tournaments/TournamentRow";

const TournamentsView = () => {
  const { data, isLoading } = useGetTournamentsQuery();

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
        <UserInfoContainer>
          <Helmet>
            <title>Tournaments - RunBracket</title>
          </Helmet>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PageTitle>Tournaments</PageTitle>
            </Grid>
            <Grid item xs={12}>
              <PageSection>
                <List>
                  {data &&
                    data.items.map((tournament) => {
                      return (
                        <TournamentRow
                          key={tournament.tournament_id}
                          tournament={tournament}
                        />
                      );
                    })}
                </List>
              </PageSection>
            </Grid>
          </Grid>
        </UserInfoContainer>
      </Container>
    </Box>
  );
};

export default TournamentsView;
