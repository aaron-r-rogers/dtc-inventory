//external imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useEffect } from "react";

//internal imports
import DimensionFilter from '../DimensionFilter/DimensionFilter';
import ItemCard from '../ItemCard/ItemCard';
import ReturnToTop from '../ReturnToTop/ReturnToTop';

//MUI imports
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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
        dispatch({
            type: "FETCH_DIMENSIONS",
            payload: dimensions = {
                minW: 1,
                minD: 1,
                minH: 1,
                maxW: 999,
                maxD: 999,
                maxH: 999
            }
        });
    }

    const handleSearch = (event) =>{
        setSearch(event.target.value.toLowerCase());
    };



    return(
        <>
        <div>
        <ReturnToTop showBelow={250} />
        <Container maxWidth="xs">
        <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
            label="Search"
            fullWidth
            type="text" 
            value={search} 
            onChange={(event) =>handleSearch(event)} 
        />
        </Grid>
        <Grid item xs={12}>
        
        <InputLabel id="select-category">Category</InputLabel>
        <Select
            fullWidth
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
        
        </Grid>
        
        <DimensionFilter />
        
        <Grid container justifyContent = "center">
        <Button
            variant="contained"
            onClick={() => {
                handleReset();
            }}
            >
            RESET
        </Button>
        </Grid>

        </Grid>
        </Box>
        </Container>

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
        </div>
        </>
    )
}

export default ListView;