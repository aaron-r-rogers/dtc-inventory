//external imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useEffect } from "react";

//internal imports
import DimensionFilter from '../DimensionFilter/DimensionFilter';
import ItemCard from '../ItemCard/ItemCard';

//MUI imports
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function ListView () {
    console.log('in ListView');
    const dispatch = useDispatch();
    const list = useSelector((store) => store.list);
    const categories = useSelector((store) => store.categories);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        dispatch({
            type: "FETCH_LIST",
        });
        dispatch({
            type: "FETCH_CATEGORIES",
        });
        dispatch({
            type: "FILTER_CATEGORY",
            payload: category
        });
        dispatch({
            type: "FETCH_SEARCH",
            payload: search
        });
    }, [category, search]);

    function handleReset () {
        setCategory();
        setSearch('');
        dispatch({
            type: "FETCH_LIST",
        });
        dispatch({
            type: "FETCH_CATEGORIES",
        });
        setMaxW(999);
        setMaxD(999);
        setMaxH(999);
        setMinW(1);
        setMinD(1);
        setMinH(1);
    }

    const handleSearch = (event) =>{
        setSearch(event.target.value.toLowerCase());
    };



    return(
        <>
        <TextField
            sx={{ m:1, width: 300 }}
            label="Search"
            type="text" 
            value={search} 
            onChange={(event) =>handleSearch(event)} 
        />
        <br></br>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-category">Category</InputLabel>
        <Select
            labelId="select-category"
            id="select-category"
            value={category}
            onChange={(event) =>
                { setCategory(event.target.value) }
            }
            input={<OutlinedInput label="Category" />}
        >
            {categories.map((category) => (
            <MenuItem 
                key={category.id} 
                value={category.id}
            >
                {category.name}
            </MenuItem>
            ))}
        </Select>
        </FormControl>

        <DimensionFilter />

        <Button
            variant="contained"
            onClick={() => {
                handleReset();
            }}
            >
            RESET
        </Button>

        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {list?.map((item)=>
                    <Grid item xs={6} key={item.id}>
                    <ItemCard 
                        item={item}
                    />
                    </Grid>
                )}
            </Grid>
        </Box>
        </>
    )
}

export default ListView;