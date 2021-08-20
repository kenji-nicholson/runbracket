import { Button, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import React from "react";
import background from "./background.png"

const useStyles = makeStyles((theme: Theme) => createStyles({
    heroContainer: {
        height: "100vh",
        backgroundPositionY: "100%",
        backgroundImage: `linear-gradient(rgb(255, 255, 255, .5) 0%, ${theme.palette.primary.main} 100%), url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        objectFit: "cover",
        borderRadius: "0"
    }
    

}))

interface Props {}

export const HeroSection: React.FC<Props> = () => {
    const classes = useStyles();
  return (
    <Paper className={classes.heroContainer}>
        <Typography>Create Your Bracket Today</Typography>
        <Button >
            GET STARTED
        </Button>
    </Paper>
  );
};

