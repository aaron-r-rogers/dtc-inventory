//external imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

//MUI imports
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

function DimensionFilter () {
    const dispatch = useDispatch();

    const [maxW, setMaxW] = useState(null);
    const [maxD, setMaxD] = useState(null);
    const [maxH, setMaxH] = useState(null);

    const dimensions = {
        maxW: maxW,
        maxD: maxD,
        maxH: maxH
    }

    const handleDimensions = (event) =>{
        console.log('dimensions:', dimensions);
        dispatch({
            type: "FETCH_DIMENSIONS",
            payload: dimensions
        });
        setMaxW('');
        setMaxD('');
        setMaxH('');
    };

    return(
        <>
        <br></br>
        <TextField
            sx={{ m:1, width: 120 }}
            label="Max Width"
            type="text"
            value={maxW} 
            onChange={(event) =>setMaxW(Number(event.target.value))} 
        />
        <br></br>

        <TextField
            sx={{ m:1, width: 120 }}
            label="Max Depth"
            type="text" 
            value={maxD}
            onChange={(event) =>setMaxD(Number(event.target.value))} 
        />
        <br></br>

        <TextField
            sx={{ m:1, width: 120 }}
            label="Max Height"
            type="text" 
            value={maxH}
            onChange={(event) =>setMaxH(Number(event.target.value))} 
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