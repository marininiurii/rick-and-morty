import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import s from './Card.module.css'

export const CardComponent = ({image, name, species, gender, status}) => {
  return (
    <Card className={s.card} gender={gender} status={status} sx={{ maxWidth: 240}}>
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
}