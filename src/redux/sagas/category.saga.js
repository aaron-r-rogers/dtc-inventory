import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets all categories from DB for ListView filtering
function* fetchCategories() {
    console.log('in fetchCategories saga');
    try {
        let categories = yield axios.get('/api/category');
        yield put({
            type: 'SET_CATEGORIES',
            payload: categories.data
        })
    } catch (error) {
        console.log('Error fetchcategories:', error);
    }
}

function* getCategorySaga() {
    yield takeLatest('FETCH_CATEGORIES', fetchCategories);
}

export default getCategorySaga;