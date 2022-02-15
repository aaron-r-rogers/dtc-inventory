// external imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// MUI imports
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

function DetailsDimensions() {
    const dispatch = useDispatch();
    // Redux
    const details = useSelector((store) => store.details);
    // local state
    const [newDimMinW, setNewDimMinW] = useState(details.dimMinW);
    const [newDimMinD, setNewDimMinD] = useState(details.dimMinD);
    const [newDimMinH, setNewDimMinH] = useState(details.dimMinH);
    const [newDimMaxW, setNewDimMaxW] = useState(details.dimMaxW);
    const [newDimMaxD, setNewDimMaxD] = useState(details.dimMaxD);
    const [newDimMaxH, setNewDimMaxH] = useState(details.dimMaxH);

    useEffect(() => {
        dispatch({
            type: "SET_DIMENSIONS",
            payload: {
                dimMinW: Number(newDimMinW),
                dimMinD: Number(newDimMinD),
                dimMinH: Number(newDimMinH),
                dimMaxW: Number(newDimMaxW),
                dimMaxD: Number(newDimMaxD),
                dimMaxH: Number(newDimMaxH),
            }
        });
    }, [newDimMinW, newDimMinD, newDimMinH, newDimMaxW, newDimMaxD, newDimMaxH]);

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

export default DetailsDimensions;
