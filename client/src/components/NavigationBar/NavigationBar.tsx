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
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
  const open = Boolean(anchorEl);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loginSection =
    user.user != null ? (
      <Grid container alignItems="center">
        <Grid item>
          <IconButton
            id="user-button"
            aria-controls="menu-navbar"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenu}
            size="large"
          >
            <Avatar
              {...stringAvatar(user.user.display_name, AvatarSize.Small)}
            />
          </IconButton>
          <Menu
            id="menu-navbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "user-button",
            }}
          >
            <MenuItem
              onClick={() => {
                push({
                  pathname: `/users/${user.user?.user_id}`,
                  state: { detail: user.user },
                });
                handleClose();
              }}
            >
              My Profile
            </MenuItem>
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
              <Grid container alignItems="center" spacing={3}>
                <Grid item>
                  <HomeLink to="/">
                    <Typography
                      display="inline"
                      variant="h4"
                      sx={{
                        color: "text.primary",
                        fontWeight: 500,
                        fontFamily: "Righteous",
                      }}
                    >
                      run
                    </Typography>
                    <Typography
                      display="inline"
                      variant="h4"
                      sx={{
                        color: "primary.main",
                        fontWeight: 500,
                        fontFamily: "Righteous",
                      }}
                    >
                      bracket
                    </Typography>
                  </HomeLink>
                </Grid>
                <Grid item>
                  <Button color="primary" onClick={() => push("/tournaments")}>
                    Tournaments
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Grid item>{loginSection}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavigationBar;
