
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all furniture from DB for ListView component
function* filterCategory(action) {
    console.log('filterCategory action.payload:', action.payload);
    try {
        let filteredList = yield axios.get(`/api/list/${action.payload}`);
        yield put({
            type: 'SET_LIST',
            payload: filteredList.data
        })
    } catch (error) {
        console.log('Error fetchList:', error);
    }
}

function* filterCategorySaga() {
    yield takeLatest('FILTER_CATEGORY', filterCategory);
}

export default filterCategorySaga;