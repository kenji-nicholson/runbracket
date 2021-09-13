import { yupResolver } from "@hookform/resolvers/yup";
import { Container, CssBaseline, List } from "@material-ui/core";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { array, boolean, object, string } from "yup";
import {
  Tournament,
  useTournamentMutation,
} from "../../../app/services/tournament";

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
    <Container>
      <Helmet>
        <title>RunBracket - Create Tournament</title>
      </Helmet>
      <CssBaseline />
      <form></form>
    </Container>
  );
};

export default CreateTournamentView;
