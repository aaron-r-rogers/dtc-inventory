// external imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';

// MUI imports
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

function AddDimensions() {
    
    // Hooks
    const dispatch = useDispatch();

    // local state
    const [newDimMinW, setNewDimMinW] = useState(0);
    const [newDimMinD, setNewDimMinD] = useState(0);
    const [newDimMinH, setNewDimMinH] = useState(0);
    const [newDimMaxW, setNewDimMaxW] = useState(0);
    const [newDimMaxD, setNewDimMaxD] = useState(0);
    const [newDimMaxH, setNewDimMaxH] = useState(0);

    const newItemDimensions = {
        dimMinW: Number(newDimMinW),
        dimMinD: Number(newDimMinD),
        dimMinH: Number(newDimMinH),
        dimMaxW: Number(newDimMaxW),
        dimMaxD: Number(newDimMaxD),
        dimMaxH: Number(newDimMaxH)
    }

    useEffect(() => {
        dispatch({
            type:'STORE_DIMENSIONS',
            payload: newItemDimensions
        })
    }, [
        newDimMinW,
        newDimMinD,
        newDimMinH,
        newDimMaxW,
        newDimMaxD,
        newDimMaxH
    ]);

    return (
    <>
    <div>
        <FormControl sx={{ m: 1, width: "12ch" }} variant="outlined">
            <OutlinedInput
                id="minimum-width"
                value={newDimMinW}
                onChange={(event) => 
                    { setNewDimMinW(event.target.value) }   
                }
                endAdornment={<InputAdornment position="end">in.</InputAdornment>}
                aria-describedby="minimum-width-helper"
                inputProps={{
                    "aria-label": "Minimum width",
                }}
            />
            <FormHelperText id="minimum-width-helper">
            Width (min)
            </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: "12ch" }} variant="outlined">
            <OutlinedInput
                id="minimum-depth"
                value={newDimMinD}
                onChange={(event) => 
                    { setNewDimMinD(event.target.value) }   
                }
                endAdornment={<InputAdornment position="end">in.</InputAdornment>}
                aria-describedby="minimum-depth-helper"
                inputProps={{
                    "aria-label": "Minimum depth",
                }}
            />
            <FormHelperText id="minimum-depth-helper">
            Depth (min)
            </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: "12ch" }} variant="outlined">
            <OutlinedInput
                id="minimum-height"
                value={newDimMinH}
                onChange={(event) => 
                    { setNewDimMinH(event.target.value) }   
                }
                endAdornment={<InputAdornment position="end">in.</InputAdornment>}
                aria-describedby="minimum-height-helper"
                inputProps={{
                    "aria-label": "Minimum height",
                }}
            />
            <FormHelperText id="minimum-height-helper">
            Height (min)
            </FormHelperText>
        </FormControl>
    </div>
    <div>
        <FormControl sx={{ m: 1, width: "12ch" }} variant="outlined">
            <OutlinedInput
                id="maximum-width"
                value={newDimMaxW}
                onChange={(event) => 
                    { setNewDimMaxW(event.target.value) }   
                }
                endAdornment={<InputAdornment position="end">in.</InputAdornment>}
                aria-describedby="maximum-width-helper"
                inputProps={{
                    "aria-label": "Maximum width",
                }}
            />
            <FormHelperText id="maximum-width-helper">
            width (max)
            </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: "12ch" }} variant="outlined">
            <OutlinedInput
                id="maximum-depth"
                value={newDimMaxD}
                onChange={(event) => 
                    { setNewDimMaxD(event.target.value) }   
                }
                endAdornment={<InputAdornment position="end">in.</InputAdornment>}
                aria-describedby="maximum-depth-helper"
                inputProps={{
                    "aria-label": "Maximum depth",
                }}
            />
            <FormHelperText id="maximum-depth-helper">
            Depth (max)
            </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: "12ch" }} variant="outlined">
            <OutlinedInput
                id="maximum-height"
                value={newDimMaxH}
                onChange={(event) => 
                    { setNewDimMaxH(event.target.value) }   
                }
                endAdornment={<InputAdornment position="end">in.</InputAdornment>}
                aria-describedby="maximum-height-helper"
                inputProps={{
                    "aria-label": "Maximum height",
                }}
            />
            <FormHelperText id="maximum-height-helper">
            Height (max)
            </FormHelperText>
        </FormControl>
    </div>
    </>
    );
}

export default AddDimensions;
