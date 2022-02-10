//external imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

//MUI imports
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

function DimensionFilter () {
    const dispatch = useDispatch();

    const [minW, setMinW] = useState(1);
    const [minD, setMinD] = useState(1);
    const [minH, setMinH] = useState(1);
    const [maxW, setMaxW] = useState(999);
    const [maxD, setMaxD] = useState(999);
    const [maxH, setMaxH] = useState(999);

    const dimensions = {
        minW: minW,
        minD: minD,
        minH: minH,
        maxW: maxW,
        maxD: maxD,
        maxH: maxH,
    }

    const handleDimensions = (event) =>{
        console.log('dimensions:', dimensions);
        dispatch({
            type: "FETCH_DIMENSIONS",
            payload: dimensions
        });
        setMaxW(999);
        setMaxD(999);
        setMaxH(999);
        setMinW(1);
        setMinD(1);
        setMinH(1);
    };

    return(
        <>
        <br></br>

        <p>Width</p>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Min Width"
            type="text"
            value={minW} 
            onChange={(event) =>setMinW(Number(event.target.value))} 
        />
        <p>to</p>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Max Width"
            type="text"
            value={maxW} 
            onChange={(event) =>setMaxW(Number(event.target.value))} 
        />
        <br></br>

        <p>Depth</p>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Min Depth"
            type="text"
            value={minD} 
            onChange={(event) =>setMinD(Number(event.target.value))} 
        />
        <p>to</p>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Max Depth"
            type="text" 
            value={maxD}
            onChange={(event) =>setMaxD(Number(event.target.value))} 
        />
        <br></br>

        <p>Height</p>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Min Height"
            type="text"
            value={minH} 
            onChange={(event) =>setMinH(Number(event.target.value))} 
        />
        <p>to</p>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Max Height"
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