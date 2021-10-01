import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { CurrentUser, User } from "../../../app/services/auth";
import { useUpdateUserMutation } from "../../../app/services/user";
import { setUser } from "../../../app/slices/authSlice";
import { useAppDispatch } from "../../../hooks/store";
import Alert, {
  AlertParams,
  DefaultErrorAlert,
  DefaultSuccessAlert,
} from "../../Alert";
import SectionHeader from "../../Forms/SectionHeader";
import EditUserAccountInformation from "./EditUserAccountInformation";
import EditUserAccountSettings from "./EditUserAccountSettings";

interface Props {
  user: CurrentUser;
}

const UserSettings: React.FC<Props> = (props) => {
  const { user } = props;
  const validationSchema = object().shape({
    first_name: string().required("First name is required."),
    last_name: string().required("Last name is required."),
    display_name: string().required("Field is required."),
    email: string()
      .required("Email address is required.")
      .email("Not a valid email."),
  });

  const { handleSubmit, control } = useForm<CurrentUser>({
    resolver: yupResolver(validationSchema),
    defaultValues: user,
  });

  const [updateUser] = useUpdateUserMutation();

  const [open, setOpen] = useState<boolean>(false);

  const [alert, setAlert] = useState<AlertParams>(DefaultErrorAlert);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  const onSubmit = async (data: CurrentUser) => {
    try {
      const response = await updateUser(data).unwrap();
      dispatch(setUser({ user: response }));
      setAlert(DefaultSuccessAlert);
      setOpen(true);
    } catch (err) {
      console.log(err);
      setAlert(DefaultErrorAlert);
      setOpen(true);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionHeader>Account Information</SectionHeader>
          <EditUserAccountInformation user={user} control={control} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <SectionHeader>Settings</SectionHeader>
          <EditUserAccountSettings control={control} />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item marginLeft="auto" xs={2} marginTop={1}>
          <Button type="submit" variant="contained" fullWidth>
            SAVE CHANGES
          </Button>
        </Grid>
      </Grid>
      <Alert
        message={alert.message}
        open={open}
        severity={alert.severity}
        handleClose={handleClose}
      ></Alert>
    </form>
  );
};

export default UserSettings;
