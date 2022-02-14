import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendNewItem(action) {
    try {
        yield axios.post('/api/add', action.payload);

    } catch (error) {
        console.log('Add item failed', error);
    }
}

function* addNewItemSaga() {
    yield takeLatest('SEND_NEW_ITEM', sendNewItem);
}

export default addNewItemSaga;