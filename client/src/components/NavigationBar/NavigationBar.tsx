import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { AvatarSize, stringAvatar } from "../Avatar/Avatar";
import { useAppDispatch } from "../../hooks/store";
import { logOut } from "../../app/slices/authSlice";

const HomeLink = styled(Link)(({}) => ({
  textDecoration: "none",
  userSelect: "none",
}));

const NavigationBar = () => {
  const { push } = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loginSection =
    user.user != null ? (
      <Grid container alignItems="center">
        <Grid item>
          <IconButton onClick={handleMenu}>
            <Avatar
              {...stringAvatar(user.user.display_name, AvatarSize.Small)}
            />
          </IconButton>
          <Menu
            id="menu-navbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>My Profile</MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logOut());
                push("/");
              }}
            >
              Log-out
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item>
          <Typography>{user.user.display_name}</Typography>
        </Grid>
      </Grid>
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

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
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
    </>
  );
};

export default NavigationBar;