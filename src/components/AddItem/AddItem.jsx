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
        <h2>Add an Item:</h2>
        <div>
            <h3>Image Upload</h3>
            <form  onSubmit={onSubmitHandler} >
                <br></br>
                <input type="file" onChange={fileChangeHandler}/>
                <button type="submit">Submit</button>
            </form> 
        </div>
        <br></br>
        <p>Material:</p>
        <div>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-material-label">Material</InputLabel>
        <Select
            labelId="demo-multiple-material-label"
            id="demo-multiple-material"
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
        </div>
        <p>Designer:</p>
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
        <p>Category:</p>
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
        <p>Dimensions:</p>
        <AddDimensions />
        <p>Comments:</p>
        <textarea rows="4" cols="50" 
            type="text"
            aria-label="Comments"
            value={newComments}
            onChange={(event) =>
                { setNewComments(event.target.value) }
            }>
        </textarea>

        <button onClick={submitItem}>Add Item</button>
        {/* <button onClick={history.push("/list")}>Cancel</button> */}
        </>
    );
}

export default AddItem;