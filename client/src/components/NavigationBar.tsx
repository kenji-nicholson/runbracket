import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import React from "react";

const NavigationBar = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>
          PP3 
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
