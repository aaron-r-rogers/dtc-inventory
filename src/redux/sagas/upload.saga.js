import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* upload(action) {
    try {

    let filename = yield axios.post('/api/upload', action.payload);
    console.log('action.payload is:', action.payload);

    yield put({ 
        type: 'SET_PATH',
        payload: filename.data
    });

    } catch (error) {
        console.log('Add item failed', error);
    }
}

function* uploadSaga() {
    yield takeLatest('UPLOAD', upload);
}

export default uploadSaga;