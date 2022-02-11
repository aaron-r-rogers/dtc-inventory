import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailsView() {

    const dispatch = useDispatch();
    //const history = useHistory();
    const params = useParams();
    const details = useSelector((store) => store.details);
    const [editable, setEditable] = useState(false);
    const [newDesigner, setNewDesigner] = useState('');
    const [newComments, setNewComments] = useState('');

    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: params.id
        });
        setNewDesigner(details.designerName);
        setNewComments(details.comments);
    }, [params.id]);

    return (
        <>
        <img src={`images/${details.path}`}></img>
        <br></br>
        <p>Material: {details.material?.join(', ')}</p>
        <p>Designer:</p>
        {editable === false ?
            <p>{details.designerName}</p> :
            <input 
                type="text"
                aria-label="Designer name"
                value={newDesigner}
                onChange={(event) =>
                    { setNewDesigner(event.target.value) }
                }>
            </input>
        }
        <p>Category: {details.categoryName}</p>
        <p>Dimensions: {details.dimMinW}" x {details.dimMinD}" x {details.dimMinH}"</p>
        <p>Comments: {details.comments}</p>
        <p>Comments:</p>
        {editable === false ?
            <p>{details.comments}</p> :
            <textarea rows="4" cols="50" 
                type="text"
                aria-label="Comments"
                value={newComments}
                onChange={(event) =>
                    { setNewComments(event.target.value) }
                }>
            </textarea>
        }
        <button onClick={() => setEditable(true)}>Edit Details</button>
        <button onClick={() => setEditable(false)}>Cancel</button>
        <button onClick={() => deleteItem(details.id)}>Delete</button>
        </>
    );
}

export default DetailsView;