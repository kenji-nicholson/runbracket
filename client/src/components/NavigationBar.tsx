import {
  AppBar,
  Theme,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
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
    appBarScrolled: {
    },
    appBarNotScrolled: {
      backgroundColor: "transparent",
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
        <Typography >RunBracket</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
