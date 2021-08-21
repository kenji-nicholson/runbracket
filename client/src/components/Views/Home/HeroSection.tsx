import { Grid, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React from "react";
import background from "./background.png";

const HeroGrid = styled(Grid)(({ theme }) => ({
  height: "100vh",
  backgroundPosition: "center",
  backgroundImage: `linear-gradient(rgb(255, 255, 255, .5) 0%, ${theme.palette.primary.main} 100%), url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  width: "100%",
  objectFit: "cover",
  borderRadius: "0",
}));

interface Props {}

export const HeroSection: React.FC<Props> = () => {
  return (
    <HeroGrid
      container
      spacing={0}
      alignContent="center"
      justifyContent="center"
      direction="column"
    >
      <Grid item>
        <Typography
          component="h1"
          variant="h1"
          gutterBottom
          sx={{ fontWeight: 400, color: "primary.contrastText" }}
        >
          Run it back.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5"></Typography>
      </Grid>
    </HeroGrid>
  );
};
