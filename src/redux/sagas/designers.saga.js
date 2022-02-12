import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all designers from DB for DetailsView editing
function* fetchDesigners() {
    console.log('in fetchDesigners saga');
    try {
        let designers = yield axios.get('/api/designers');
        yield put({
            type: 'SET_DESIGNERS',
            payload: designers.data
        })
    } catch (error) {
        console.log('Error fetchDesigners:', error);
    }
}

function* getDesignersSaga() {
    yield takeLatest('FETCH_DESIGNERS', fetchDesigners);
}

export default getDesignersSaga;