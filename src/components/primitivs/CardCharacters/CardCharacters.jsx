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
        maxWidth: 240,
        boxShadow:
          "0px 2px 4px 0px #00000024, 0px 3px 4px 0px #0000001F, 0px 1px 5px 0px #00000033",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="svg"
          width="240"
          height="168"
          image={image}
          alt="Rick"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {species}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
