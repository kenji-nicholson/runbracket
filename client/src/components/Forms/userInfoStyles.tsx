import { styled } from "@mui/material/styles";
import { Avatar, Button } from "@mui/material";

export const UserInfoContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 20,
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
