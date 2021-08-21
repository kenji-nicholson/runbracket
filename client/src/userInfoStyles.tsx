import { styled } from "@material-ui/core/styles";
import { Avatar, Button } from "@material-ui/core";

export const UserInfoContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const UserInfoAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

export const UserInfoForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

export const UserInfoSubmit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
