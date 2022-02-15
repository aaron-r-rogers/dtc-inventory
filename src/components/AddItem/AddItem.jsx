// external imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

// MUI imports
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// internal imports
import AddDimensions from '../AddDimensions/AddDimensions';

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

function getStyles(material, newMaterial, theme) {
    return {
        fontWeight:
            newMaterial.indexOf(material) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium
    };
}

function AddItem() {

    const theme = useTheme();
    const Swal = require('sweetalert2')

    // Hooks
    const dispatch = useDispatch();
    const history = useHistory();

    // Redux store
    const categories = useSelector((store) => store.categories);
    const designers = useSelector((store) => store.designers);
    const materials = useSelector((store) => store.materials);
    const imagePath = useSelector((store) => store.imagePath);
    const newDimensions = useSelector((store) => store.newItemDimensionsReducer);

    // State
    const [newDesigner, setNewDesigner] = useState('');
    const [newComments, setNewComments] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newMaterial, setNewMaterial] = useState('');
    const [fileData, setFileData] = useState();

    const fileChangeHandler = (evt) => {
        setFileData(evt.target.files[0])
    }

    const onSubmitHandler = (evt) => {
        evt.preventDefault();

        Swal.fire(
            'Upload success!',
            'Complete the form to commit to database.',
            'success'
        );

        const data = new FormData();

        data.append('image', fileData)

        dispatch({
            type:'UPLOAD',
            payload: data
        })
    }

    const newItem = {
        dimMinW: Number(newDimensions.dimMinW),
        dimMinD: Number(newDimensions.dimMinD),
        dimMinH: Number(newDimensions.dimMinH),
        dimMaxW: Number(newDimensions.dimMaxW),
        dimMaxD: Number(newDimensions.dimMaxD),
        dimMaxH: Number(newDimensions.dimMaxH),
        comments: newComments,
        category: newCategory,
        designer: newDesigner,
        path: imagePath,
        material: newMaterial
    }

    useEffect(() => {
        dispatch({
            type: "FETCH_CATEGORIES",
        });
        dispatch({
            type: "FETCH_DESIGNERS",
        });
        dispatch({
            type: "FETCH_MATERIALS",
        });
    }, []);

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewMaterial(
          // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const submitItem = () => {
        dispatch({
            type: 'SEND_NEW_ITEM',
            payload: newItem
        });
        Swal.fire(
            'Success!',
            'The item has been added.',
            'success'
        );
        history.push('/list');
    }

    return (
        <>
        <Typography gutterBottom variant="h4" align="center">Add an Item</Typography>
        <Grid container 
            sx={{ my: 3 }}
            justifyContent="center"
        >
        <Typography gutterBottom variant="h6">Image Upload</Typography>
            <form  onSubmit={onSubmitHandler} >
                <Button variant="outlined" type="input" onChange={fileChangeHandler}><input type="file" /></Button>
                <Button variant="contained" type="submit">Upload</Button>
            </form> 
        </Grid>

        <Grid container spacing={0} 
            sx={{ my: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >

        <Grid item>
        <Typography variant="h6">Material</Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-material-label">Material</InputLabel>
        <Select
            labelId="multiple-material-label"
            id="multiple-material"
            //multiple
            value={newMaterial}
            required
            onChange={handleChange}
            input={<OutlinedInput label="material" />}
            MenuProps={MenuProps}
        >
            {materials.map((material) => (
                <MenuItem
                    key={material}
                    value={material}
                    style={getStyles(material, newMaterial, theme)}
                >
                {material}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        </Grid>

        <Grid item>
        <Typography variant="h6">Designer</Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-designer">Designer</InputLabel>
        <Select
            labelId="select-designer"
            id="select-designer"
            value={newDesigner}
            onChange={(event) =>
                { setNewDesigner(event.target.value) }
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
        </FormControl>
        </Grid>

        <Grid item>
        <Typography variant="h6">Category</Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-category">Category</InputLabel>
        <Select
            labelId="select-category"
            id="select-category"
            required
            value={newCategory}
            onChange={(event) =>
                { setNewCategory(event.target.value) }
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
        </FormControl>
        </Grid>

        </Grid>
        
        <Grid container spacing={0} 
            sx={{ my: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center">
        <Typography variant="h6">Dimensions</Typography>
        <AddDimensions />
        </Grid>

        <Grid container spacing={0} 
            sx={{ my: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center">
        <Typography variant="h6">Comments</Typography>
        <TextField
            sx={{ width: 400 }}
            multiline 
            minRows="4" 
            type="text"
            aria-label="Comments"
            value={newComments}
            onChange={(event) =>
                { setNewComments(event.target.value) }
            }>
        </TextField>
        </Grid>

        <Grid container spacing={0} 
            sx={{ my: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center">
        <Button 
            sx={{ width: 150 }}
            variant="contained" 
            onClick={submitItem}
        >
            Add Item
        </Button>
        </Grid>


        {/* <button onClick={history.push("/list")}>Cancel</button> */}
        </>
    );
}

export default AddItem;