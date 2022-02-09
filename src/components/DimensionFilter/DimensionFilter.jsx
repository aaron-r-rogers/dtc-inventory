//external imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

//MUI imports
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

function DimensionFilter () {
    const dispatch = useDispatch();

    const [maxW, setMaxW] = useState(9999);
    const [maxD, setMaxD] = useState(9999);
    const [maxH, setMaxH] = useState(9999);

    const dimensions = {
        dimMinW: maxW,
        dimMinD: maxD,
        dimMinH: maxH
    }

    const handleDimensions = (event) =>{
        dispatch({
            type: "FETCH_DIMENSIONS",
            payload: dimensions
        });
    };

    return(
        <>
        <TextField
            sx={{ m:1, width: 80 }}
            label="Max Width"
            type="text" 
            onChange={(event) =>setMaxW(event.target.value)} 
        />
        <br></br>

        <TextField
            sx={{ m:1, width: 80 }}
            label="Max Depth"
            type="text" 
            onChange={(event) =>setMaxD(event.target.value)} 
        />
        <br></br>

        <TextField
            sx={{ m:1, width: 80 }}
            label="Max Height"
            type="text" 
            onChange={(event) =>setMaxH(event.target.value)} 
        />
        <br></br>
        
        <Button
            variant="contained"
            onClick={() => {
                handleDimensions();
            }}
            >
            Apply
        </Button>
        </>
    )
}

export default DimensionFilter;