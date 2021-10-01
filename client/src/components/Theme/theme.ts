import { createTheme, Theme } from "@mui/material/styles";

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#3b2483",
    },
    secondary: {
      main: "#f57c00",
    },
    mode: "light",
  },
});

export const darkTheme: Theme = createTheme({
  palette: {
    primary: {
      main: "#f57c00",
    },
    secondary: {
      main: "#3b2483",
    },
    mode: "dark",
  },
});

export const greyBackgroundColor = (theme: Theme) => {
  return theme.palette.mode === "light"
    ? theme.palette.grey[100]
    : theme.palette.grey[900];
};

export default theme;
