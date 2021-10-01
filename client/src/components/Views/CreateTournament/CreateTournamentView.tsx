import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "../../Alert";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { array, boolean, object, string } from "yup";
import {
  Tournament,
  useTournamentMutation,
} from "../../../app/services/tournament";
import { RootState } from "../../../app/store";
import { greyBackgroundColor } from "../../Theme/theme";
import { UserInfoContainer, UserInfoForm } from "../../Forms/userInfoStyles";
import TournamentInformation from "./TournamentInformation";
import TournamentParticipants from "./TournamentParticipants";
import cloneDeep from "lodash/cloneDeep";

export const CreateTournamentView: React.FC = () => {
  const validationSchema = object().shape({
    tournament_name: string().required("Name is required."),
    tournament_description: string().required("Description is required."),
    is_seeded: boolean().required(),
    participants: array()
      .of(
        object().shape({
          participant_name: string().required("Participant name is required."),
        })
      )
      .required(),
  });

  const user = useSelector((state: RootState) => state.auth);

  const { push } = useHistory();

  const { handleSubmit, control, watch } = useForm<Tournament>({
    resolver: yupResolver(validationSchema),
  });

  const [createTournament] = useTournamentMutation();

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = async (data: Tournament) => {
    try {
      const tournament = {
        ...cloneDeep(data),
        user_id: user.user ? user.user.user_id : null,
      };
      const response = await createTournament(tournament).unwrap();
      console.log(response);
      push("/");
    } catch (err) {
      console.log(err);
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: greyBackgroundColor,
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container>
        <Helmet>
          <title>RunBracket - Create Tournament</title>
        </Helmet>
        <CssBaseline />
        <UserInfoContainer>
          <UserInfoForm onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  marginY={3}
                  variant="h2"
                  component="h1"
                  color="primary"
                >
                  New Tournament
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TournamentInformation control={control} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TournamentParticipants control={control} watch={watch} />
                </Paper>
              </Grid>
              <Grid item marginLeft="auto" xs={3} marginTop={1}>
                <Button type="submit" variant="contained" fullWidth>
                  CREATE TOURNAMENT
                </Button>
              </Grid>
            </Grid>
            <Alert
              open={open}
              handleClose={handleClose}
              severity="error"
              message="Oops! There was a problem."
            />
          </UserInfoForm>
        </UserInfoContainer>
      </Container>
    </Box>
  );
};

export default CreateTournamentView;
