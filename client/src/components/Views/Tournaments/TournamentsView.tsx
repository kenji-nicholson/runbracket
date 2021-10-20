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
import useQuery from "../../../hooks/routing";
import { PageSection, PageTitle } from "../../Forms/SectionHeader";
import { UserInfoContainer } from "../../Forms/userInfoStyles";
import { PaginationLink } from "../../Pagination/PaginationLink";
import { greyBackgroundColor } from "../../Theme/theme";
import TournamentRow from "../UserProfile/Tournaments/TournamentRow";

const TournamentsView = () => {
  let query = useQuery();
  const page = query.get("page") || "1";
  const { data, isLoading } = useGetTournamentsQuery({ page: parseInt(page) });

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
          <Grid container spacing={3} paddingBottom={1}>
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
          <PaginationLink
            baseLink="/tournaments"
            count={data?._meta.total_pages}
          ></PaginationLink>
        </UserInfoContainer>
      </Container>
    </Box>
  );
};

export default TournamentsView;
