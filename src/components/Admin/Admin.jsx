// External imports
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'

// Internal imports
import Users from '../Users/Users';

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
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (
        <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
        </Box>
        )}
    </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

function Admin() {

    const theme = useTheme();
    const dispatch = useDispatch();
    const Swal = require('sweetalert2');

    const categories = useSelector((store) => store.categories);
    const designers = useSelector((store) => store.designers);
    const materials = useSelector((store) => store.materials);

    const [newDesigner, setNewDesigner] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newMaterial, setNewMaterial] = useState('');
    const [valueToAdd, setValueToAdd] = useState('');

    const [value, setValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

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
        dispatch({
            type: "FETCH_MATERIALS",
        });
        setNewMaterial('');
    };

    const handleDeleteDesigner = () => {
        console.log('in handleDeleteDesigner')
        dispatch({
            type: "DELETE_DESIGNER",
            payload: newDesigner
        });
        dispatch({
            type: "FETCH_DESIGNERS",
        });
        setNewDesigner('');
    };

    const handleDeleteCategory = () => {
        console.log('in handleDeleteCategory')
        dispatch({
            type: "DELETE_CATEGORY",
            payload: newCategory
        });
        dispatch({
            type: "FETCH_CATEGORIES",
        });
        setNewCategory('');
    };
    
    const handleAddMaterial = () => {
        Swal.fire(
            'Success!',
            'You added a material.',
            'success'
        );
        console.log('in handleAddMaterial')
        dispatch({
            type: "ADD_MATERIAL",
            payload: valueToAdd
        });
        dispatch({
            type: "FETCH_MATERIALS",
        });
        setValueToAdd('');
    };
    
    
    const handleAddDesigner = () => {
        console.log('in handleAddDesigner')
        Swal.fire(
            'Success!',
            'You added a designer.',
            'success'
        );
        dispatch({
            type: "ADD_DESIGNER",
            payload: valueToAdd
        });
        dispatch({
            type: "FETCH_DESIGNERS",
        });
        setValueToAdd('');
    };
    
    const handleAddCategory = () => {
        console.log('in handleAddCategory');
        Swal.fire(
            'Success!',
            'You added a category.',
            'success'
        );
        dispatch({
            type: "ADD_CATEGORY",
            payload: valueToAdd
        });
        dispatch({
            type: "FETCH_CATEGORIES",
        });
        setValueToAdd('');
    };

    return (
    <>
    <Grid container spacing={0} 
            sx={{ my: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
    >
        <Typography variant="h4">ADMIN</Typography>
    </Grid>

    <Box sx={{ width: "100%" }}>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleTabChange}
            aria-label="basic tabs example"
        >
            <Tab label="Add" {...a11yProps(0)} />
            <Tab label="Delete" {...a11yProps(1)} />
            <Tab label="Users" {...a11yProps(2)} />
        </Tabs>
    </Box>

    <TabPanel value={value} index={1}>
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
        DELETE
    </Typography>
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
        </TabPanel>
    
    <TabPanel value={value} index={0}>
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
    </TabPanel>

    <TabPanel component={`span`} value={value} index={2}>
        <Users />
    </TabPanel>

    </Box>
    </>
    );
}

export default Admin;