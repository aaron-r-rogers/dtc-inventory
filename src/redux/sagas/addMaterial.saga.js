import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendNewMaterial(action) {
    try {
        yield yield axios.post('/api/materials', action.payload);

    } catch (error) {
        console.log('Add item failed', error);
    }
}

function* addNewMaterialSaga() {
    yield takeLatest('ADD_MATERIAL', sendNewMaterial);
}

export default addNewMaterialSaga;