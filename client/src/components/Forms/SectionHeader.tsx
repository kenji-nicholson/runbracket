import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface SectionHeaderProps {
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  return (
    <Typography
      variant="h6"
      component="h2"
      color="primary"
      gutterBottom
      paddingBottom={2}
    >
      {props.children}
    </Typography>
  );
};

export const PageSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
}));

export const PageTitle: React.FC<SectionHeaderProps> = (props) => {
  return (
    <Typography marginY={3} variant="h2" component="h1" color="primary">
      {props.children}
    </Typography>
  );
};

export default SectionHeader;
