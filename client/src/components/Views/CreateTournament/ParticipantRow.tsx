import { Grid, IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { Control } from "react-hook-form";
import { Tournament } from "../../../app/services/tournament";
import { FormTextField } from "../../Forms/FormComponents";

interface Props {
  index: number;
  control: Control<Tournament, object>;
  remove: (index?: number | number[] | undefined) => void;
}

const ParticipantRow: React.FC<Props> = (props) => {
  const { control, remove, index } = props;
  return (
    <>
      <Grid container>
        <Grid item>
          <Typography>{index}</Typography>
        </Grid>
        <Grid item>
          <FormTextField
            name={`participants.${index}.participant_name`}
            label="Name"
            control={control}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={() => remove(index)}>
            <Close />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default ParticipantRow;
