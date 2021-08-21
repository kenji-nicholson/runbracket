import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import React from "react";

const HomeLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  userSelect: "none",
}));

const NavigationBar = () => {
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <HomeLink to="/">
            <Typography
              display="inline"
              variant="h5"
              sx={{
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              RUN
            </Typography>
            <Typography
              display="inline"
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: 500,
              }}
            >
              BRACKET
            </Typography>
          </HomeLink>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavigationBar;
