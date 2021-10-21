import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Match, useGetTournamentQuery } from "../../../app/services/tournament";
import {
  closeDialog,
  setPermission,
  showDialogForMatch,
} from "../../../app/slices/tournamentSlice";
import { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../hooks/store";
import { PageSection } from "../../Forms/SectionHeader";
import { BackgroundBox, UserInfoContainer } from "../../Forms/userInfoStyles";
import RecordMatchDialog from "./RecordMatchDialog";
import TournamentBracket from "./TournamentBracket";
import TournamentInformation from "./TournamentInformation";
import TournamentParticipants from "./TournamentParticipants";

interface Props {}

const TournamentView: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { data: tournament, isLoading } = useGetTournamentQuery(id);
  const [selectedTab, setSelectedTab] = useState(0);
  const selectedMatch = useSelector(
    (state: RootState) => state.tournament.selectedMatch
  );
  const open = useSelector((state: RootState) => state.tournament.dialogOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const handleOpen = (match: Match) => {
    dispatch(showDialogForMatch(match));
  };

  const user = useSelector((state: RootState) => state.auth.user);

  dispatch(
    setPermission(
      Boolean(tournament && user && tournament.user_id == user.user_id)
    )
  );

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
        {selectedMatch && (
          <RecordMatchDialog
            open={open}
            onClose={handleClose}
            match={selectedMatch}
          />
        )}
      </Container>
    </BackgroundBox>
  );
};

export default TournamentView;
