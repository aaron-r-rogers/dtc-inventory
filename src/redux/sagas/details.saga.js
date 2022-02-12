import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all furniture from DB for ListView component
function* fetchDetails(action) {
    console.log('fetchDetails action.payload:', action.payload);
    try {
        let selectedDetails = yield axios.get(`/api/details/${action.payload}`);
        yield put({
            type: 'SET_DETAILS',
            payload: selectedDetails.data
        })
    } catch (error) {
        console.log('Error fetchList:', error);
    }
}

function* detailsSaga() {
    yield takeLatest('FETCH_DETAILS', fetchDetails);
}

export default detailsSaga;