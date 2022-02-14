import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteItem(action) {
    try {
        yield axios.delete(`/api/delete/${action.payload}`);

    } catch (error) {
        console.log('Delete item failed', error);
    }
}

function* deleteItemSaga() {
    yield takeLatest('DELETE_ITEM', deleteItem);
}

export default deleteItemSaga;