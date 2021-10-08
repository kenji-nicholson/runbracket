import { Grid, Typography } from "@mui/material";
import { palette } from "@mui/system";
import moment from "moment";
import React from "react";
import { Tournament } from "../../../app/services/tournament";

interface Props {
  tournament: Tournament;
}

const TournamentParticipants: React.FC<Props> = (props) => {
  const { tournament } = props;

  const tournament_date = tournament.date
    ? moment.utc(tournament.date).local().format("MMM Do, YYYY")
    : null;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{tournament.tournament_name}</Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
            }}
          >
            Participants
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default TournamentParticipants;
