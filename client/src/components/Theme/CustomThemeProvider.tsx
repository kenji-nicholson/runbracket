import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import theme, { darkTheme } from "./theme";

interface Props {
  children?: React.ReactNode;
}

const CustomThemeProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const user = useSelector((state: RootState) => state.auth);
  const darkMode = user.user ? user.user.dark_mode : false;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
