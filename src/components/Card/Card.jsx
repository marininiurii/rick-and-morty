import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export const CardComponent = () => {
  return (
    <Card sx={{ maxWidth: 240}}>
      <CardActionArea>
        <CardMedia
          component="svg"
          width="240"
          height="168"
          image="./Rick.svg"
          alt="Rick"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Rick Sanchez
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Human
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}