import { Grid } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import { Tournament } from "../../../app/services/tournament";
import { FormTextField } from "../../Forms/FormComponents";
import SectionHeader from "../../Forms/SectionHeader";

interface Props {
  control: Control<Tournament, object>;
}

const TournamentInformation: React.FC<Props> = (props) => {
  const { control } = props;
  return (
    <>
      <SectionHeader>Tournament Information</SectionHeader>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormTextField
            name="tournament_name"
            label="Name"
            control={control}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            rows="3"
            name="tournament_description"
            label="Description"
            control={control}
            multiline
            required
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TournamentInformation;
