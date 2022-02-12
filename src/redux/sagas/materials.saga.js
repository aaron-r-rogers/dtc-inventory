import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all materials from DB for details view edit dropdown
function* fetchMaterials() {
    console.log('in fetchMaterials saga');
    try {
        let materials = yield axios.get('/api/materials');
        yield put({
            type: 'SET_MATERIALS',
            payload: materials.data
        })
    } catch (error) {
        console.log('Error fetchMaterials:', error);
    }
}

function* getMaterialsSaga() {
    yield takeLatest('FETCH_MATERIALS', fetchMaterials);
}

export default getMaterialsSaga;