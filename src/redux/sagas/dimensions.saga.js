
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all furniture from DB for ListView component
function* filterDimensions(action) {
    console.log('filterDimensions action.payload:', action.payload);
    try {
        let filteredList = yield axios.get(`/api/dimensions/${action.payload}`);
        yield put({
            type: 'SET_LIST',
            payload: filteredList.data
        })
    } catch (error) {
        console.log('Error fetchList:', error);
    }
}

function* filterDimensionsSaga() {
    yield takeLatest('FILTER_CATEGORY', filterDimensions);
}

export default filterDimensionsSaga;