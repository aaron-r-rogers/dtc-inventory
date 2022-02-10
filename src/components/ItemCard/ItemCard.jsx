// MUI imports
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function ItemCard({item}) {

    const handleDetailsClick = () =>{
        history.push(`/details/${id}`);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                max height="300"
                image={`images/${item.path}`}
            />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.designerName}
            </Typography>
            <Typography variant="h6" color="text.secondary">
                {item.material}
            </Typography>
        </CardContent>
        <CardActions>
            <Button 
                size="medium"
                onClick={handleDetailsClick}
            >
                    Details
            </Button>
        </CardActions>
        </Card>
    )
} // end GifCard

export default ItemCard