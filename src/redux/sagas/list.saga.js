import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all furniture from DB for ListView component
function* fetchList() {
    console.log('in fetchList saga');
    try {
        let list = yield axios.get('/api/list');
        yield put({
            type: 'SET_LIST',
            payload: list.data
        })
    } catch (error) {
        console.log('Error fetchList:', error);
    }
}

function* getShelfSaga() {
    yield takeLatest('FETCH_LIST', fetchList);
}

export default getShelfSaga;