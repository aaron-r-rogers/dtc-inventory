//external imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useEffect } from "react";

function ListView () {
    console.log('in ListView');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCH_LIST",
        });
    }, []);

    return(
        <>
        <ul>
            <li>This is a list.</li>
        </ul>
        </>
    )
}

export default ListView;