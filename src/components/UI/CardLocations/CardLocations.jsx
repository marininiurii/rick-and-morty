import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const CardLocations = ({ onClick, name, type }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 240,
        height: 128,
        marginTop: 1,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
        textAlign: "center",
        transform: "scale(0.9)",
        borderRadius: "4px",
        boxShadow:
          "0px 2px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 4px 0px rgba(0, 0, 0, 0.12),0px 1px 5px 0px rgba(0, 0, 0, 0.2)",
        background: "rgb(250, 250, 250)",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold" }}
          variant="h5"
          component="div"
          gutterBottom
        >
          {name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} variant="h5" component="div">
          {type}
        </Typography>
      </CardContent>
    </Card>
  );
};
