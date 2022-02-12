import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendFurnitureMaterials(action) {
    try {
        yield axios.post('/api/edit', action.payload);

        yield put({ 
            type: 'FETCH_DETAILS',
            payload: action.payload.furnitureId
        });

    } catch (error) {
        console.log('Add item failed', error);
    }
}

function* furnitureMaterialsSaga() {
    yield takeLatest('SEND_MATERIALS_EDIT', sendFurnitureMaterials);
}

export default furnitureMaterialsSaga;