import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteCategory(action) {
    try {
        yield axios.delete(`/api/category/${action.payload}`);

    } catch (error) {
        console.log('Delete category failed', error);
    }
}

function* deleteCategorySaga() {
    yield takeLatest('DELETE_CATEGORY', deleteCategory);
}

export default deleteCategorySaga;