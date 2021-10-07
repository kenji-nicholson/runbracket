import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import moment from "moment";
import React from "react";
import { Tournament } from "../../../../app/services/tournament";

interface Props {
  tournament: Tournament;
}

const TournamentRow: React.FC<Props> = (props) => {
  const { tournament_name, date } = props.tournament;
  console.log(date);
  const tournament_date = date
    ? moment.utc(date).local().format("MMM Do, YYYY")
    : null;
  return (
    <ListItem>
      <ListItemText
        primary={tournament_name}
        secondary={tournament_date?.toString()}
      ></ListItemText>
    </ListItem>
  );
};

export default TournamentRow;
