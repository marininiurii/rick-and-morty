import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const CardEpisodes = ({ onClick, name, episode, air_date }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 240,
        height: 128,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: "2px",
        transform: "scale(0.8)",
        boxShadow:
          "0px 2px 4px 0px #00000024, 0px 3px 4px 0px #0000001F, 0px 1px 5px 0px #00000033",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          component="div"
        >
          {name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} variant="h5" component="div">
          {air_date}
        </Typography>
        <Typography sx={{ fontSize: 16 }} variant="h5" component="div">
          {episode}
        </Typography>
      </CardContent>
    </Card>
  );
};
