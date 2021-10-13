import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@mui/system";
import moment from "moment";
import React from "react";
import {
  RenderSeedProps,
  Seed,
  SeedItem,
  SeedTeam,
  SeedTime,
} from "react-brackets";
import { Match, Participant } from "../../../app/services/tournament";
import { greyBackgroundColor } from "../../Theme/theme";

interface SeedProps extends RenderSeedProps {
  seed: Match;
}

const BracketSeed: React.FC<SeedProps> = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
}) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <BracketSeedItem match={seed}></BracketSeedItem>
      {seed.date && (
        <SeedTime mobileBreakpoint={breakpoint}>
          {moment.utc(seed.date).local().format("MMM Do, YYYY h:mm a")}
        </SeedTime>
      )}
    </Seed>
  );
};

interface BracketSeedParticipantProps {
  participant: Participant | null;
  score: number | null;
  is_winner: boolean;
}

const WinnerTypography = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "3px",
}));

const BracketSeedParticipant: React.FC<BracketSeedParticipantProps> = (
  props
) => {
  const { participant, score, is_winner } = props;
  return (
    <Grid alignItems="center" container width={150}>
      <Grid item xs={9}>
        <Typography paddingLeft={1} variant="body2">
          {participant ? participant.participant_name : ""}
        </Typography>
      </Grid>
      <Divider orientation="vertical" flexItem sx={{ marginRight: "-1px" }} />
      <Grid item xs={3} textAlign="center">
        {is_winner ? (
          <WinnerTypography variant="body2">
            {score ? score : 0}
          </WinnerTypography>
        ) : (
          <Typography variant="body2">{score ? score : 0}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

interface BracketSeedItemProps {
  match: Match;
}

const BracketSeedItem: React.FC<BracketSeedItemProps> = (props) => {
  const { match } = props;
  return (
    <Paper variant="outlined" sx={{ background: greyBackgroundColor }}>
      <BracketSeedParticipant
        participant={match.participant_a}
        is_winner={Boolean(
          match.winner_id &&
            match.participant_a &&
            match.winner_id === match.participant_a.participant_id
        )}
        score={match.participant_a_score}
      />
      <Divider />
      <BracketSeedParticipant
        participant={match.participant_b}
        is_winner={Boolean(
          match.winner_id &&
            match.participant_b &&
            match.winner_id === match.participant_b.participant_id
        )}
        score={match.participant_b_score}
      />
    </Paper>
  );
};

export default BracketSeed;
