import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteDesigner(action) {
    try {
        yield axios.delete(`/api/designers/${action.payload}`);

    } catch (error) {
        console.log('Delete designer failed', error);
    }
}

function* deleteDesignerSaga() {
    yield takeLatest('DELETE_DESIGNER', deleteDesigner);
}

export default deleteDesignerSaga;