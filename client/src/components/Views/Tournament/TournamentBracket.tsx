import { Divider, Grid, Typography } from "@mui/material";
import { palette } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Match, Tournament } from "../../../app/services/tournament";
import SectionHeader from "../../Forms/SectionHeader";
import { Bracket, RoundProps } from "react-brackets";
import BracketSeed from "./BracketSeed";
import { useForceUpdate } from "../../../hooks/store";

interface Props {
  tournament: Tournament;
}

const TournamentBracket: React.FC<Props> = (props) => {
  const { tournament } = props;

  const [currentTournament, setCurrentTournament] = useState<RoundProps[]>([]);

  useEffect(() => {
    let sorted = tournament.matches
      ? [...tournament.matches].sort(function (a, b) {
          return (a.match_id ?? 0) - (b.match_id ?? 0);
        })
      : [];
    let result =
      sorted.length > 0
        ? sorted.reduce<RoundProps[]>((r, match) => {
            var temp = r.find(
              (o: RoundProps) => o.title == match.round.toString()
            );
            if (!temp)
              r.push((temp = { title: match.round.toString(), seeds: [] }));
            temp.seeds.push(match);
            return r;
          }, [] as RoundProps[])
        : ([] as RoundProps[]);
    setCurrentTournament(
      result.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      })
    );
  }, [tournament]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader>Bracket</SectionHeader>
        </Grid>
        <Grid item xs={12}>
          {currentTournament.length === 0 ? (
            <Typography>No bracket available.</Typography>
          ) : (
            <Bracket
              rounds={currentTournament}
              roundTitleComponent={(
                title: React.ReactNode,
                roundIndex: number
              ) => {
                return (
                  <Typography alignSelf="center" variant="body1">
                    {`Round ${title}`}
                  </Typography>
                );
              }}
              renderSeedComponent={BracketSeed}
            ></Bracket>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default TournamentBracket;
