import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { STYLES } from "./constants";

export const CardLocations = ({ onClick, name, type }) => {
  return (
    <Card onClick={onClick} sx={STYLES.card}>
      <CardContent>
        <Typography sx={STYLES.typographyName} variant="h5" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography sx={STYLES.typographyType} variant="h5" component="div">
          {type}
        </Typography>
      </CardContent>
    </Card>
  );
};
