import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import { Tournament } from "../../../../app/services/tournament";

interface Props {
  tournament: Tournament;
}

const TournamentRow: React.FC<Props> = (props) => {
  const { push } = useHistory();
  const { tournament_name, date, tournament_id } = props.tournament;
  const handleClick = () => {
    push(`/tournaments/${tournament_id}`);
  };
  const tournament_date = date
    ? moment.utc(date).local().format("MMM Do, YYYY")
    : null;
  return (
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={tournament_name}
          secondary={tournament_date?.toString()}
        ></ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default TournamentRow;
