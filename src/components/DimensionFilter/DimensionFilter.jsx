//external imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

//MUI imports
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        <Container maxWidth="xs">
        <Box sx={{ width: '100%' }}>

        <Grid container spacing={2}>
        <Grid item xs={2} sx={{ alignSelf: "center" }}>
        <Typography variant="h6">Width</Typography>
        </Grid>
        <Grid item xs={4} >
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Min Width"
            type="text"
            value={minW} 
            onChange={(event) =>setMinW(Number(event.target.value))} 
        />
        </Grid>
        <Grid item xs={1} sx={{ alignSelf: "center" }}>
        <Typography variant="h6">to</Typography>
        </Grid>
        <Grid item xs={4}>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Max Width"
            type="text"
            value={maxW} 
            onChange={(event) =>setMaxW(Number(event.target.value))} 
        />
        </Grid>
        </Grid>

        <Grid container spacing={2}>
        <Grid item xs={2} sx={{ alignSelf: "center" }}>
        <Typography variant="h6">Depth</Typography>
        </Grid>
        <Grid item xs={4} >
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Min Depth"
            type="text"
            value={minD} 
            onChange={(event) =>setMinD(Number(event.target.value))} 
        />
        </Grid>
        <Grid item xs={1} sx={{ alignSelf: "center" }}>
        <Typography variant="h6">to</Typography>
        </Grid>
        <Grid item xs={4}>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Max Depth"
            type="text" 
            value={maxD}
            onChange={(event) =>setMaxD(Number(event.target.value))} 
        />
        </Grid>
        </Grid>

        <Grid container spacing={2}>
        <Grid item xs={2} sx={{ alignSelf: "center" }}>
        <Typography variant="h6">Height</Typography>
        </Grid>
        <Grid item xs={4}>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Min Height"
            type="text"
            value={minH} 
            onChange={(event) =>setMinH(Number(event.target.value))} 
        />
        </Grid>
        <Grid item xs={1} sx={{ alignSelf: "center" }}>
        <Typography variant="h6">to</Typography>
        </Grid>
        <Grid item xs={4}>
        <TextField
            sx={{ m:1, width: 120 }}
            // label="Max Height"
            type="text" 
            value={maxH}
            onChange={(event) =>setMaxH(Number(event.target.value))} 
        />
        </Grid>
        </Grid>
        
        <Grid item xs={6} sm={4} sx={{ alignSelf: "center" }}>
        <Button
            variant="contained"
            onClick={() => {
                handleDimensions();
            }}
            >
            Apply
        </Button>
        </Grid>

        </Box>
        </Container>
        </>
    )
}

export default DimensionFilter;