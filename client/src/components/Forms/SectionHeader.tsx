import { Typography } from "@material-ui/core";
import React from "react";

interface SectionHeaderProps {
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      paddingBottom={2}
    >
      {props.children}
    </Typography>
  );
};

export default SectionHeader;
