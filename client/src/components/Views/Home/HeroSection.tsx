import {
  Button,
  Container,
  Grid,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import createStyles from "@material-ui/styles/createStyles";
import { findByLabelText } from "@testing-library/react";
import React from "react";
import background from "./background.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroContainer: {
      height: "100vh",
      backgroundPositionY: "100%",
      backgroundImage: `linear-gradient(rgb(255, 255, 255, .5) 0%, ${theme.palette.primary.main} 100%), url(${background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      align: "center",
      width: "100%",
      objectFit: "cover",
      borderRadius: "0",
    },
    h1Text: {
      fontWeight: 400,
      color: theme.palette.primary.contrastText,
    },
  })
);

interface Props {}

export const HeroSection: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      alignContent="center"
      justifyContent="center"
      direction="column"
      className={classes.heroContainer}
    >
      <Grid item>
        <Typography
          className={classes.h1Text}
          component="h1"
          variant="h1"
          gutterBottom
        >
          Run it back.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5"></Typography>
      </Grid>
    </Grid>
  );
};
