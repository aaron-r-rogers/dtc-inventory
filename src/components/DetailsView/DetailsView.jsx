import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailsView() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const details = useSelector((store) => store.details);

    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: params.id
        });
    }, [params.id]);

    return (
        <>
        <img src={details.path}></img>
        <br></br>
        <p>In the details view.</p>
        </>
    );
}

export default DetailsView;