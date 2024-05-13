import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { STYLES } from "./constants";

export const CardCharacters = ({ onClick, image, name, species, gender, status, id }) => {
  return (
    <Card onClick={onClick} gender={gender} status={status} id={id} sx={STYLES.card}>
      <CardActionArea sx={STYLES.cardActionArea}>
        <CardMedia sx={STYLES.cardMedia} component="svg" image={image} alt="character" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={STYLES.typographyHead}
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            color="text.secondary"
            sx={STYLES.typographyBody}
          >
            {species}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
