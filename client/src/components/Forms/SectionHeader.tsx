import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface SectionHeaderProps {
  children?: React.ReactNode;
}

const SectionHeaderTypography = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === "dark"
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
}));

export const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  return (
    <SectionHeaderTypography variant="h6" gutterBottom paddingBottom={2}>
      {props.children}
    </SectionHeaderTypography>
  );
};

export default SectionHeader;
