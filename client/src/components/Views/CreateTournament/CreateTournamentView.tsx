import { Container } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";

export const CreateTournamentView: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>RunBracket - Create Tournament</title>
      </Helmet>
    </Container>
  );
};

export default CreateTournamentView;
