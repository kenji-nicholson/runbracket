import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import React from "react";
import { useHistory } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const HomeLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  userSelect: "none",
}));

const NavigationBar = () => {
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const user = useSelector((state: RootState) => state.auth);

  const loginSection =
    user.user != null ? (
      <Typography>{user.user.display_name}</Typography>
    ) : (
      <>
        <Button
          color="secondary"
          variant="contained"
          sx={{ marginRight: 1 }}
          onClick={() => push("/login")}
        >
          Login
        </Button>
        <Button color="secondary" onClick={() => push("/register")}>
          Sign-up
        </Button>
      </>
    );

  const { push } = useHistory();
  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item>
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
            </Grid>
            <Grid item></Grid>
            <Grid item alignSelf="center">
              {loginSection}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavigationBar;
