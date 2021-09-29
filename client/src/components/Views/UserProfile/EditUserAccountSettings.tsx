import { Grid } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import { CurrentUser, User } from "../../../app/services/auth";
import { DarkModeSwitch } from "../../Forms/DarkModeSwitch";
import { FormDarkModeSwitch } from "../../Forms/FormComponents";

interface Props {
  control: Control<CurrentUser, object>;
}

const EditUserAccountSettings: React.FC<Props> = (props) => {
  const { control } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <FormDarkModeSwitch name="dark_mode" label="Theme" control={control} />
      </Grid>
    </Grid>
  );
};

export default EditUserAccountSettings;
