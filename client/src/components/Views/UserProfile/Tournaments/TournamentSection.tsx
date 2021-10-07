import { List } from "@mui/material";
import React from "react";
import { User } from "../../../../app/services/auth";
import PaginatedData from "../../../../app/services/pagination";
import {
  Tournament,
  Tournaments,
  useGetTournamentsByUserIdQuery,
} from "../../../../app/services/tournament";
import SectionHeader from "../../../Forms/SectionHeader";
import TournamentRow from "./TournamentRow";

interface Props {
  tournaments: PaginatedData<Tournament>;
}

const TournamentSection: React.FC<Props> = (props) => {
  const { tournaments } = props;
  console.log(tournaments);
  return (
    <>
      <SectionHeader>Hosted Tournaments</SectionHeader>
      <List>
        {tournaments.items.map((tournament, index) => {
          return (
            <TournamentRow
              key={tournament.tournament_id}
              tournament={tournament}
            ></TournamentRow>
          );
        })}
      </List>
    </>
  );
};

export default TournamentSection;
