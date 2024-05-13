import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { STYLES } from "./constants";

export const LoadingComponent = () => {
  return (
    <Box sx={STYLES.box}>
      <CircularProgress />
    </Box>
  );
};
