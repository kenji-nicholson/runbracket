import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTournamentQuery } from "../../../app/services/tournament";
import { PageSection } from "../../Forms/SectionHeader";
import { BackgroundBox, UserInfoContainer } from "../../Forms/userInfoStyles";
import TournamentBracket from "./TournamentBracket";
import TournamentInformation from "./TournamentInformation";
import TournamentParticipants from "./TournamentParticipants";

interface Props {}

const TournamentView: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { data: tournament, isLoading } = useGetTournamentQuery(id);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, tab: number) => {
    setSelectedTab(tab);
  };

  if (isLoading) {
    return (
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <BackgroundBox>
      <Container>
        <UserInfoContainer>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {tournament && (
                <PageSection>
                  <TournamentInformation tournament={tournament} />
                </PageSection>
              )}
            </Grid>
            <Grid item xs={12}>
              {tournament && (
                <>
                  <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="Bracket" />
                    <Tab label="Participants" />
                  </Tabs>
                  <PageSection>
                    {selectedTab === 0 && (
                      <TournamentBracket tournament={tournament} />
                    )}
                    {selectedTab === 1 && (
                      <TournamentParticipants tournament={tournament} />
                    )}
                  </PageSection>
                </>
              )}
            </Grid>
          </Grid>
        </UserInfoContainer>
      </Container>
    </BackgroundBox>
  );
};

export default TournamentView;
