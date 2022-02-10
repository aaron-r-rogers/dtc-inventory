import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import list from './list.reducer';
import categories from './category.reducer';
import details from './details.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  list, // array of objects with properties path, designerName, and material
  categories, // all of the categories; used to filter in list and editable in admin
  details, // details fetched based on id of clicked item from list to details view
});

export default rootReducer;
