import { List, Pagination } from "@mui/material";
import React from "react";
import { User } from "../../../../app/services/auth";
import PaginatedData from "../../../../app/services/pagination";
import { Tournament } from "../../../../app/services/tournament";
import SectionHeader from "../../../Forms/SectionHeader";
import TournamentRow from "./TournamentRow";

interface Props {
  tournaments: PaginatedData<Tournament>;
  page: number;
  count: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const TournamentSection: React.FC<Props> = (props) => {
  const { tournaments, page, count, setPage } = props;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
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
      <Pagination page={page} onChange={handleChange} count={count} />
    </>
  );
};

export default TournamentSection;
