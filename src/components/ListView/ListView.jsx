//external imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useEffect } from "react";

//MUI imports
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';


function ListView () {
    console.log('in ListView');
    const dispatch = useDispatch();
    const list = useSelector((store) => store.list);
    const categories = useSelector((store) => store.categories);
    // const [allData,setAllData] = useState(list);
    // const [filteredData,setFilteredData] = useState(allData);

    // defines parameters for Select
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
        },
    };

    useEffect(() => {
        dispatch({
            type: "FETCH_LIST",
        });
        dispatch({
            type: "FETCH_CATEGORIES",
        });
    }, []);

    // const handleSearch = (event) =>{
    //     let value = event.target.value.toLowerCase();
    //     let result = [];
    //     console.log(value);
    //     result = allData.filter((data) => {
    //     return data.designerName.search(value) != -1;
    //     });
    //     setFilteredData(result);
    // };

    return(
        <>
        {/* <div style={{ margin: '0 auto', marginTop: '10%' }}>
            <label>Search:</label>
            <input type="text" onChange={(event) =>handleSearch(event)} />
        </div> */}
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="select-category">Category</InputLabel>
                <Select
                    labelId="select-category"
                    id="select-category"
                    // Stretch: make multiple genre selections possible
                    // multiple
                    // value={newMovie.genre_id}
                    // onChange={(event) =>
                    //     setNewMovie({ ...newMovie, genre_id: event.target.value })
                    // }
                    input={<OutlinedInput label="Category" />}
                    MenuProps={MenuProps}
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
        <ul style={{padding:10}}>
            {list?.map((item,index)=>{
                return(
                    <li key={index}>
                        <img src={`images/${item.path}`}/> {item.material} {item.designerName}
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default ListView;