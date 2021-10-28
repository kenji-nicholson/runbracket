import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { palette } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Participant, Tournament } from "../../../app/services/tournament";
import SectionHeader from "../../Forms/SectionHeader";
import ParticipantRow from "./ParticipantRow";

interface Props {
  tournament: Tournament;
}

const TournamentParticipants: React.FC<Props> = (props) => {
  const { tournament } = props;
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (tournament.participants) {
      setParticipants(
        tournament.participants.sort(function (a, b) {
          return (a.seed ?? 0) - (b.seed ?? 0);
        })
      );
    }
  }, [tournament]);

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
              <TableRow>
                <TableCell width="10%">Seed</TableCell>
                <TableCell width="80%">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((item) => {
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
