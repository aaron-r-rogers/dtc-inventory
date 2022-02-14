import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import listSaga from './list.saga';
import categorySaga from './category.saga';
import filterCategorySaga from './categoryFilter.saga';
import searchSaga from './search.saga';
import dimensionsSaga from './dimensions.saga';
import detailsSaga from './details.saga';
import designersSaga from './designers.saga';
import materialsSaga from './materials.saga';
import detailsEditSaga from './detailsEdit.saga';
import furnitureMaterialsSaga from './furnitureMaterials.saga';
import uploadSaga from './upload.saga';
import addNewItemSaga from './addItem.saga';
import deleteItemSaga from './delete.saga';
import addNewDesignerSaga from './addDesigner.saga';
import addNewCategorySaga from './addCategory.saga';
import addNewMaterialSaga from './addMaterial.saga';
import deleteMaterialSaga from './deleteMaterial.saga';
import deleteCategorySaga from './deleteCategory.saga';
import deleteDesignerSaga from './deleteDesigner.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    listSaga(),
    categorySaga(),
    filterCategorySaga(),
    searchSaga(),
    dimensionsSaga(),
    detailsSaga(),
    designersSaga(),
    materialsSaga(),
    detailsEditSaga(),
    furnitureMaterialsSaga(),
    uploadSaga(),
    addNewItemSaga(),
    deleteItemSaga(),
    addNewDesignerSaga(),
    addNewMaterialSaga(),
    addNewCategorySaga(),
    deleteMaterialSaga(),
    deleteDesignerSaga(),
    deleteCategorySaga()
  ]);
}
