import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { STYLES } from "./constants";

export const CardEpisodes = ({ onClick, name, episode, air_date }) => {
  return (
    <Card onClick={onClick} sx={STYLES.card}>
      <CardContent sx={STYLES.cardContent}>
        <Typography sx={STYLES.typographyHead} component="div">
          {name}
        </Typography>
        <Typography sx={STYLES.typographyDate} variant="h5" component="div">
          {air_date}
        </Typography>
        <Typography sx={STYLES.typographyEpisode} variant="h5" component="div">
          {episode}
        </Typography>
      </CardContent>
    </Card>
  );
};
