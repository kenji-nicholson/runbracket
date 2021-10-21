import { Edit } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
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
import { useSelector } from "react-redux";
import {
  Match,
  Participant,
  StatusEnum,
} from "../../../app/services/tournament";
import { showDialogForMatch } from "../../../app/slices/tournamentSlice";
import { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../hooks/store";
import { greyBackgroundColor } from "../../Theme/theme";

interface SeedProps extends RenderSeedProps {
  seed: Match;
}

interface BracketSeedItemProps {
  match: Match;
}

interface BracketSeedParticipantProps {
  participant: Participant | null;
}

interface BracketSeedScoreProps {
  score: number;
  is_winner: boolean;
}

const BracketSeed: React.FC<SeedProps> = ({ seed, breakpoint }) => {
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

const WinnerTypography = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "3px",
}));

const BracketSeedParticipant: React.FC<BracketSeedParticipantProps> = (
  props
) => {
  const { participant } = props;
  return (
    <Typography paddingLeft={1} variant="body2">
      {participant ? participant.participant_name : "--"}
    </Typography>
  );
};

const BracketSeedScore: React.FC<BracketSeedScoreProps> = (props) => {
  const { is_winner, score } = props;
  return is_winner ? (
    <WinnerTypography variant="body2">{score}</WinnerTypography>
  ) : (
    <Typography variant="body2">{score}</Typography>
  );
};

const BracketSeedItem: React.FC<BracketSeedItemProps> = (props) => {
  const { match } = props;

  const dispatch = useAppDispatch();

  const hasPermission =
    useSelector((state: RootState) => state.tournament.hasPermission) &&
    match.status != StatusEnum.COMPLETED &&
    match.participant_a &&
    match.participant_b;

  const handleClick = () => {
    dispatch(showDialogForMatch(match));
  };
  return (
    <Paper variant="outlined" sx={{ background: greyBackgroundColor }}>
      <Grid container width={150}>
        <Grid item xs={9}>
          <>
            <BracketSeedParticipant participant={match.participant_a} />
            <Divider />
            <BracketSeedParticipant participant={match.participant_b} />
          </>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ marginRight: "-1px" }} />
        <Grid item xs={3} textAlign="center">
          {hasPermission ? (
            <IconButton onClick={handleClick}>
              <Edit></Edit>
            </IconButton>
          ) : (
            <>
              <BracketSeedScore
                is_winner={IsWinner(match, match.participant_a)}
                score={match.participant_a_score}
              />
              <Divider />
              <BracketSeedScore
                is_winner={IsWinner(match, match.participant_b)}
                score={match.participant_b_score}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

const IsWinner = (match: Match, participant: Participant) => {
  return Boolean(
    match.winner_id &&
      participant &&
      match.winner_id === participant.participant_id
  );
};

export default BracketSeed;
