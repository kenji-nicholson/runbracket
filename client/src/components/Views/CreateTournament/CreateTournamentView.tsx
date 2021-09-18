import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, CssBaseline, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { array, boolean, object, string } from "yup";
import {
  Tournament,
  useTournamentMutation,
} from "../../../app/services/tournament";
import { greyBackgroundColor } from "../../../theme";
import { UserInfoContainer, UserInfoForm } from "../../Forms/userInfoStyles";
import TournamentInformation from "./TournamentInformation";
import TournamentParticipants from "./TournamentParticipants";

export const CreateTournamentView: React.FC = () => {
  const validationSchema = object().shape({
    tournament_name: string().required("Name is required."),
    tournament_description: string().required("Description is required."),
    is_seeded: boolean().required(),
    participants: array()
      .of(
        object().shape({
          participant_name: string().required(),
        })
      )
      .required(),
  });

  const { push } = useHistory();

  const { handleSubmit, control } = useForm<Tournament>({
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
      const response = await createTournament(data).unwrap();
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
                  <TournamentParticipants control={control} />
                </Paper>
              </Grid>
            </Grid>
          </UserInfoForm>
        </UserInfoContainer>
      </Container>
    </Box>
  );
};

export default CreateTournamentView;
