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

    // State
    const [editable, setEditable] = useState(false);
    const [newDesigner, setNewDesigner] = useState(details.designerName);
    const [newComments, setNewComments] = useState(details.comments);
    const [newCategory, setNewCategory] = useState(details.categoryName);
    const [newMaterial, setNewMaterial] = useState([details.material]);

    const editedItem = {
        dimMinW: Number(dimensions.dimMinW),
        dimMinD: Number(dimensions.dimMinD),
        dimMinH: Number(dimensions.dimMinH),
        dimMaxW: Number(dimensions.dimMaxW),
        dimMaxD: Number(dimensions.dimMaxD),
        dimMaxH: Number(dimensions.dimMaxH),
        comments: newComments,
        category: newCategory,
        designer: newDesigner,
        furnitureId: params.id
    }

    const furnitureMaterials = {
        furnitureId: params.id,
        material: newMaterial,
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
        dispatch({
            type: 'FETCH_DETAILS',
            payload: params.id
        });
        setNewDesigner(details.designerName);
        setNewComments(details.comments);
        setNewCategory(details.categoryName);
        setNewMaterial(details.material);
    }, [params.id, editable]);

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewMaterial(
          // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const submitChanges = () => {
        console.log('editedItem is:', editedItem);
        dispatch({
            type: 'SEND_FURNITURE_EDIT',
            payload: editedItem
        });
        dispatch({
            type: 'SEND_MATERIALS_EDIT',
            payload: furnitureMaterials
        });
    }

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
        <br></br>
        <p>Material:</p>
        {editable === false ?
        <p>{details.material?.join(', ')}</p> :
        
        <div>
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
                >
                {material}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        </div>}
        <p>Designer:</p>
        {editable === false ?
        <p>{details.designerName}</p> :
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
        </FormControl>}
        <p>Category:</p>
        {editable === false ?
            <p>{details.categoryName}</p> :
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
        </FormControl>}
        <p>Dimensions:</p>
        {editable === false ?
        <p>{details.dimMinW}" x {details.dimMinD}" x {details.dimMinH}"</p> :
        <DetailsDimensions />}
        <p>Comments:</p>
        {editable === false ?
            <p>{details.comments}</p> :
            <textarea rows="4" cols="50" 
                type="text"
                aria-label="Comments"
                value={newComments}
                onChange={(event) =>
                    { setNewComments(event.target.value) }
                }>
            </textarea>
        }
        <button onClick={() => setEditable(true)}>Edit Details</button>
        <button onClick={submitChanges}>Submit Changes</button>
        <button onClick={() => setEditable(false)}>Cancel</button>
        <button onClick={() => deleteItem(params.id)}>Delete</button>
        </>
    );
}

export default DetailsView;