import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendChanges(action) {
    try {
        yield axios.put('/api/edit', action.payload);

        yield put({ 
            type: 'FETCH_DETAILS',
            payload: action.payload.furnitureId
        });

    } catch (error) {
        console.log('Add item failed', error);
    }
}

function* detailsEditSaga() {
    yield takeLatest('SEND_FURNITURE_EDIT', sendChanges);
}

export default detailsEditSaga;