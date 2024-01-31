import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard(props) {
    const {data} = props
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={data.image.secure_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.name}
          {data.color}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Borrar</Button>
        <Button size="small">Editar</Button>
      </CardActions>
    </Card>
  );
}