import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendNewCategory(action) {
    try {
        yield axios.post(`/api/category'/${action.payload}`);

    } catch (error) {
        console.log('Add item failed', error);
    }
}

function* addNewCategorySaga() {
    yield takeLatest('ADD_CATEGORY', sendNewCategory);
}

export default addNewCategorySaga;