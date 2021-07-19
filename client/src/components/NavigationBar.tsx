import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { AcUnitOutlined } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}));

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          This is the header.
        </Typography>
        <AcUnitOutlined />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
