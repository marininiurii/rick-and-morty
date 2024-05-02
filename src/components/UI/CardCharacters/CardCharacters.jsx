import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const CardCharacters = ({
  onClick,
  image,
  name,
  species,
  gender,
  status,
  id,
}) => {
  return (
    <Card
      onClick={onClick}
      gender={gender}
      status={status}
      id={id}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 260,
        height: 264,
        cursor: "pointer",
        boxShadow:
          "0px 2px 4px 0px #00000024, 0px 3px 4px 0px #0000001F, 0px 1px 5px 0px #00000033",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardMedia
          sx={{ height: 0, paddingTop: "65%", objectFit: "cover" }}
          component="svg"
          image={image}
          alt="character"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ fontSize: 26, weight: 500 }}
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            color="text.secondary"
            sx={{ fontSize: 18, weight: 400 }}
          >
            {species}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
