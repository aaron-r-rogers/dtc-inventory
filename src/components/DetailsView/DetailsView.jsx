// external imports
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

// MUI imports
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';


// internal imports
import DetailsDimensions from '../DetailsDimensions/DetailsDimensions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

function DetailsView() {

    const theme = useTheme();
    const Swal = require('sweetalert2')

    // Hooks
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    // Redux
    const details = useSelector((store) => store.details);
    const categories = useSelector((store) => store.categories);
    const designers = useSelector((store) => store.designers);
    const materials = useSelector((store) => store.materials);
    const dimensions = useSelector((store) => store.dimensions);
    const user = useSelector(store => store.user);

    // State
    const [editable, setEditable] = useState(false);

    const editedItem = {
        dimMinW: Number(dimensions.dimMinW),
        dimMinD: Number(dimensions.dimMinD),
        dimMinH: Number(dimensions.dimMinH),
        dimMaxW: Number(dimensions.dimMaxW),
        dimMaxD: Number(dimensions.dimMaxD),
        dimMaxH: Number(dimensions.dimMaxH),
        comments: details.comments,
        category: details.categoryName,
        designer: details.designerName,
        furnitureId: params.id
    }

    // this post is not working
    const furnitureMaterials = {
        furnitureId: params.id,
        material: details.material,
    }

    useEffect(() => {
        console.log('details:', details)
        dispatch({
            type: "FETCH_CATEGORIES",
        });
        dispatch({
            type: "FETCH_DESIGNERS",
        });
        dispatch({
            type: "FETCH_MATERIALS",
        });
        dispatch({
            type: 'FETCH_DETAILS',
            payload: params.id
        });
    }, [params.id, editable]);

    // this is reserved for stretch to send multiple materials
    // const handleChange = (event) => {
    //     const {
    //         target: { value }
    //     } = event;
    //     setNewMaterial(
    //       // On autofill we get a stringified value.
    //         typeof value === "string" ? value.split(",") : value
    //     );
    // };

    const submitChanges = () => {
        Swal.fire(
            'Success!',
            'This item has been updated.',
            'success'
        );
        dispatch({
            type: 'SEND_FURNITURE_EDIT',
            payload: editedItem
        });
        dispatch({
            type: 'SEND_MATERIALS_EDIT',
            payload: furnitureMaterials
        });
        setEditable(false);
    };

    const deleteItem = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'DELETE_ITEM',
                    payload: id
                });
                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
                history.push('/list');

            }
        });
    }

    return (
        <>
        <img src={`images/${details.path}`}></img>
        <Grid container spacing={2} sx={{ mx: 1 }}>

        <Grid item>
        <Typography variant="h6">Material:</Typography>
        {editable === false ?
        
        <Typography variant="body1">{details.material?.join(', ')}</Typography>
    
        :
        <div>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-material-label">Material</InputLabel>
        <Select
            labelId="multiple-material-label"
            id="multiple-material"
            // multiple
            value={details.material}
            onChange={(event) =>
                { dispatch({
                    type: 'SET_NEW_INFORMATION',
                    payload: {material: [event.target.value]}
                }); }
            }
            input={<OutlinedInput label="material" />}
            MenuProps={MenuProps}
        >
            {materials?.map((material) => (
                <MenuItem
                    key={material}
                    value={material}
                >
                {material}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        </div>}
        </Grid>

        <Grid item>
        <Typography variant="h6">Designer:</Typography>
        {editable === false ?
        <Typography variant="body1">{details.designerName}</Typography> :
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-designer">Designer</InputLabel>
        <Select
            labelId="select-designer"
            id="select-designer"
            value={details.designerName}
            onChange={(event) =>
                { dispatch({
                    type: 'SET_NEW_INFORMATION',
                    payload: {designerName: event.target.value}
                }); }
            }
            input={<OutlinedInput label="Designer" />}
        >
            {designers.map((designer) => (
            <MenuItem 
                key={designer.id} 
                value={designer.name}
            >
                {designer.name}
            </MenuItem>
            ))}
        </Select>
        </FormControl>}
        </Grid>

        <Grid item>
        <Typography variant="h6">Category:</Typography>
        {editable === false ?
            <Typography variant="body1">{details.categoryName}</Typography> :
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-category">Category</InputLabel>
        <Select
            labelId="select-category"
            id="select-category"
            value={details.categoryName}
            onChange={(event) =>
                { dispatch({
                    type: 'SET_NEW_INFORMATION',
                    payload: {categoryName: event.target.value}
                }); }
            }
            input={<OutlinedInput label="Category" />}
        >
            {categories.map((category) => (
            <MenuItem 
                key={category.id} 
                value={category.name}
            >
                {category.name}
            </MenuItem>
            ))}
        </Select>
        </FormControl>}
        </Grid>

        <Grid item>
        <Typography variant="h6">Dimensions:</Typography>
        {editable === false ?
        <Typography variant="body1">{details.dimMinW}" x {details.dimMinD}" x {details.dimMinH}"</Typography> :
        <DetailsDimensions />}
        </Grid>

        <Grid item>
        <Typography variant="h6">Comments:</Typography>
        {editable === false ?
            <Typography variant="body1">{details.comments}</Typography> :
            <TextField
                sx={{ width: 340 }} 
                multiline
                rows={4} 
                type="text"
                aria-label="Comments"
                value={details.comments}
                onChange={(event) =>
                    { dispatch({
                        type: 'SET_NEW_INFORMATION',
                        payload: {comments: event.target.value}
                    }); }
                }
            >
            </TextField>
        }
        </Grid>

        </Grid>


        {user.authLevel === 'admin' ?
        <Grid container spacing={0} 
            sx={{ my: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            {editable === false ?
            <ButtonGroup variant="contained">
                <Button onClick={() => setEditable(true)}>Edit Details</Button> 
            </ButtonGroup>
            :
            <ButtonGroup variant="contained">
                <Button onClick={submitChanges}>Submit Changes</Button>
                <Button onClick={() => setEditable(false)}>Cancel</Button>
                <Button onClick={() => deleteItem(params.id)}>Delete</Button>
            </ButtonGroup>
            }
        </Grid>
        :   <div></div>}
        </>
    );
}

export default DetailsView;