import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./CardLocations.module.css";

export const CardLocations = ({ dimension, type }) => {
  return (
    <Card
      className={styles.wrap}
      sx={{
        minWidth: 240,
        minHeight: 128,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: "2px",
        transform: "scale(0.8)",
        boxShadow:
          "0px 2px 4px 0px #00000024, 0px 3px 4px 0px #0000001F, 0px 1px 5px 0px #00000033",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 20, fontWeight: "bold" }} gutterBottom>
          {dimension}
        </Typography>
        <Typography sx={{ fontSize: 14 }} variant="h5" component="div">
          {type}
        </Typography>
      </CardContent>
    </Card>
  );
};
