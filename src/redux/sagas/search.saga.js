
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all furniture from DB for ListView component
function* fetchSearch(action) {
    console.log('fetchSearch action.payload:', action.payload);
    try {
        let searchResults = yield axios.get(`/api/search/${action.payload}`);
        yield put({
            type: 'SET_LIST',
            payload: searchResults.data
        })
    } catch (error) {
        console.log('Error fetchList:', error);
    }
}

function* searchSaga() {
    yield takeLatest('FETCH_SEARCH', fetchSearch);
}

export default searchSaga;