import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI imports
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


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

function Admin() {

    const theme = useTheme();
    const dispatch = useDispatch();

    const categories = useSelector((store) => store.categories);
    const designers = useSelector((store) => store.designers);
    const materials = useSelector((store) => store.materials);

    const [newDesigner, setNewDesigner] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newMaterial, setNewMaterial] = useState('');
    const [valueToAdd, setValueToAdd] = useState('');

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

    const handleDeleteMaterial = () => {
        console.log('in handleDeleteMaterial')
        dispatch({
            type: "DELETE_MATERIAL",
            payload: newMaterial
        });
    };

    const handleDeleteDesigner = () => {
        console.log('in handleDeleteDesigner')
        dispatch({
            type: "DELETE_DESIGNER",
            payload: newDesigner
        });
    };

    const handleDeleteCategory = () => {
        console.log('in handleDeleteCategory')
        dispatch({
            type: "DELETE_CATEGORY",
            payload: newCategory
        });
    };
    
    const handleAddMaterial = () => {
        console.log('in handleAddMaterial')
        dispatch({
            type: "ADD_MATERIAL",
            payload: valueToAdd
        });
    };
    
    const handleAddDesigner = () => {
        console.log('in handleAddDesigner')
        dispatch({
            type: "ADD_DESIGNER",
            payload: valueToAdd
        });
    };
    
    const handleAddCategory = () => {
        console.log('in handleAddCategory')
        dispatch({
            type: "ADD_CATEGORY",
            payload: valueToAdd
        });
    };

    return (
    <>
    <Typography 
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold" }}
    >
        DELETE
    </Typography>

    <Grid container spacing={0} 
            sx={{ my: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
    >
    <Typography variant="h6">Material</Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-material-label">Material</InputLabel>
        <Select
            labelId="multiple-material-label"
            id="multiple-material"
            // multiple
            value={newMaterial}
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
        <Button variant="contained" onClick={handleDeleteMaterial}>Delete Material</Button>
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
        <Button variant="contained" onClick={handleDeleteDesigner}>Delete Designer</Button>
        <Typography variant="h6">Category</Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-category">Category</InputLabel>
        <Select
            labelId="select-category"
            id="select-category"
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
        <Button variant="contained" onClick={handleDeleteCategory}>Delete Category</Button>
        </Grid>
    
    <Grid container spacing={0} 
            sx={{ my: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
    >
    <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold" }}
    >
        ADD
    </Typography>
    <Box noValidate autoComplete="off">
        <FormControl sx={{ width: '25ch', mb: 1 }}>
        <TextField
            label="Value to add"
            id="value-to-add"
            value={valueToAdd}
            variant="outlined"
            onChange={(event) => 
                { setValueToAdd(event.target.value) }   
            }
        />
        </FormControl>
    </Box>
    <ButtonGroup variant="contained" size="small">
    <Button onClick={handleAddMaterial}>Add Material</Button>
    <Button onClick={handleAddDesigner}>Add Designer</Button>
    <Button onClick={handleAddCategory}>Add Category</Button>
    </ButtonGroup>
    </Grid>
    </>
    );
}

export default Admin;