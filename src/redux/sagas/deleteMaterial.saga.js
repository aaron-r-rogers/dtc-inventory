import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteMaterial(action) {
    try {
        yield axios.delete(`/api/materials/${action.payload}`);

    } catch (error) {
        console.log('Delete material failed', error);
    }
}

function* deleteMaterialSaga() {
    yield takeLatest('DELETE_MATERIAL', deleteMaterial);
}

export default deleteMaterialSaga;