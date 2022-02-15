import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all furniture from DB for ListView component
function* filterDimensions(action) {
    console.log('filterDimensions action.payload:',
        );
    try {
        let filteredList = yield axios.get(`/api/dimensions`, 
        {params: {
            minW: action.payload.minW,
            minD: action.payload.minD,
            minH: action.payload.minH,
            maxW: action.payload.maxW,
            maxD: action.payload.maxD,
            maxH: action.payload.maxH,
        }});
        yield put({
            type: 'SET_LIST',
            payload: filteredList.data
        })
    } catch (error) {
        console.log('Error fetchList:', error);
    }
}

function* filterDimensionsSaga() {
    yield takeLatest('FETCH_DIMENSIONS', filterDimensions);
}

export default filterDimensionsSaga;