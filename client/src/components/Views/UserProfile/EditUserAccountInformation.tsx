import { Grid } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import { CurrentUser, User } from "../../../app/services/auth";
import { FormTextField } from "../../Forms/FormComponents";

interface Props {
  user: CurrentUser;
  control: Control<CurrentUser, object>;
}

const EditUserAccountInformation: React.FC<Props> = (props) => {
  const { user, control } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormTextField
          name="first_name"
          label="First Name"
          control={control}
          autoComplete="fname"
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextField
          name="last_name"
          label="Last Name"
          control={control}
          autoComplete="lname"
        />
      </Grid>
      <Grid item xs={12}>
        <FormTextField
          name="display_name"
          label="Display Name"
          control={control}
        />
      </Grid>

      <Grid item xs={12}>
        <FormTextField
          name="email"
          label="Email"
          control={control}
          autoComplete="email"
        />
      </Grid>
    </Grid>
  );
};

export default EditUserAccountInformation;
