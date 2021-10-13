import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { Participant } from "../../../app/services/tournament";

interface Props {
  participant: Participant;
}

const ParticipantRow: React.FC<Props> = (props) => {
  const { participant } = props;
  return (
    <>
      <TableRow>
        <TableCell>
          <Typography>{participant.seed}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{participant.participant_name}</Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ParticipantRow;
