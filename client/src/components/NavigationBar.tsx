import {
  Theme,
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import makeStyles from "@material-ui/styles/makeStyles";
import createStyles from "@material-ui/styles/createStyles";
import { useState, useEffect, useRef } from "react";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(["background-color", "box-shadow"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      }),
    },
    appBarScrolled: {},
    appBarNotScrolled: {
      background: "transparent",
    },
    logoFont: {
      fontWeight: 500,
    },
    logo: {
      color: theme.palette.primary.main,
      fontWeight: 500,
    },
    logo2: {
      color: theme.palette.text.primary,
      fontWeight: 500,
    },
  })
);

const NavigationBar = () => {
  const classes = useStyles();

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80,
  });

  return (
    <AppBar
      position="fixed"
      color="default"
      className={`${classes.appBar} ${
        scrollTrigger === false
          ? classes.appBarNotScrolled
          : classes.appBarScrolled
      }`}
    >
      <Toolbar>
        <Typography
          variant="h5"
          className={`${classes.logoFont} ${classes.logo2}`}
        >
          RUN
        </Typography>
        <Typography
          variant="h5"
          className={`${classes.logoFont} ${classes.logo}`}
        >
          BRACKET
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
