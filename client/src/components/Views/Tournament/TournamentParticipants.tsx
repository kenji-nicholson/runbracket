import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import { palette } from "@mui/system";
import moment from "moment";
import React from "react";
import { Tournament } from "../../../app/services/tournament";
import SectionHeader from "../../Forms/SectionHeader";
import ParticipantRow from "./ParticipantRow";

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
          <SectionHeader>Participants</SectionHeader>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableCell width="10%">Seed</TableCell>
              <TableCell width="80%">Name</TableCell>
            </TableHead>
            <TableBody>
              {tournament.participants.map((item) => {
                return (
                  <ParticipantRow
                    key={item.participant_id}
                    participant={item}
                  />
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};

export default TournamentParticipants;
