import { styled } from "@mui/material/styles";
import { Avatar, Box, Button } from "@mui/material";
import { greyBackgroundColor } from "../Theme/theme";

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

export const BackgroundBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  overflow: "auto",
  flexGrow: 1,
  backgroundColor: greyBackgroundColor(theme),
}));
