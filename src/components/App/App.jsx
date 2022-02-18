import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ListView from '../ListView/ListView';
import DetailsView from '../DetailsView/DetailsView';
import AddItem from '../AddItem/AddItem';
import Admin from '../Admin/Admin';

import CssBaseline from '@mui/material/CssBaseline';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <CssBaseline>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/list" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/list" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/list" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <Route
            exact
            path="/list"
          >
            {user.id ?
              // If the user is already logged in, 
              // go to ListView
              <ListView />
              :
              // Otherwise, go to register
              <Redirect to="/registration" />
            }
          </Route>

          <Route
            exact
            path="/details/:id"
          >
            {user.id ?
              // If the user is already logged in, 
              // go to DetailsView
              <DetailsView />
              :
              // Otherwise, go to register
              <Redirect to="/registration" />
            }
          </Route>

          <Route
            exact
            path="/add"
          >
            {user.authLevel === 'admin' ?
              // If the user is already logged in, 
              // go to AddItem
              <AddItem />
              :
              // Otherwise, go to list
              <Redirect to="/list" />
            }
          </Route>

          <Route
            exact
            path="/admin"
          >
            {user.authLevel === 'admin' ?
              // If the user is already logged in, 
              // go to Admin
              <Admin />
              :
              // Otherwise, go to list
              <Redirect to="/list" />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route 
            exact
            path="/login"
          >
          </Route>
        </Switch>
        <Footer />
      </div>
      </CssBaseline>
    </Router>
  );
}

export default App;
