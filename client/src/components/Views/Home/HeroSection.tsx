import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useHistory } from "react-router-dom";
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
  const { push } = useHistory();
  return (
    <HeroGrid
      container
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <Typography
          component="h1"
          variant="h1"
          align="center"
          sx={{ fontWeight: 400, color: "primary.contrastText" }}
        >
          Run it back.
        </Typography>
      </Grid>
      <Grid item sx={{ color: "primary.contrastText" }}>
        <Typography align="center" variant="h5" paragraph>
          With a special twist on the classic tournament structure, claim your
          spot at the top.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            push("/tournaments/new");
          }}
        >
          Create Tournament
        </Button>
      </Grid>
    </HeroGrid>
  );
};
