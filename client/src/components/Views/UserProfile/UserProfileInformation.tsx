import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { User } from "../../../app/services/auth";
import { AvatarSize, stringAvatar } from "../../Avatar/Avatar";
import SectionHeader from "../../Forms/SectionHeader";

interface Props {
  user: User;
}

const UserProfileInformation: React.FC<Props> = (props) => {
  const { user } = props;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={1}>
          <Avatar {...stringAvatar(user.display_name, AvatarSize.Large)} />
        </Grid>
        <Grid item sm={11}>
          <Typography variant="h5" component="h1">
            {user.display_name}
          </Typography>
          <Typography variant="body1">
            {user.first_name + " " + user.last_name}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfileInformation;
