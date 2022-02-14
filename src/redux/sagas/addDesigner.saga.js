import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendNewDesigner(action) {
    try {
        yield axios.post(`/api/designers'/${action.payload}`);

    } catch (error) {
        console.log('Add item failed', error);
    }
}

function* addNewDesignerSaga() {
    yield takeLatest('ADD_DESIGNER', sendNewDesigner);
}

export default addNewDesignerSaga;