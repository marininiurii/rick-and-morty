import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const CardEpisodes = ({ onClick, name, episode, air_date }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 270,
        maxWidth: "100%",
        height: 128,
        marginTop: 2,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: "2px",
        transform: "scale(0.95)",
        borderRadius: "4px",
        boxShadow:
          "0px 2px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 4px 0px rgba(0, 0, 0, 0.12),0px 1px 5px 0px rgba(0, 0, 0, 0.2)",
        background: "rgb(250, 250, 250)",
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
