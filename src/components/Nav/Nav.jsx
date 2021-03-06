import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">DTC: Inventory</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user has admin access, show these links */}
        {user.authLevel === 'admin' && (
          <>
            <Link className="navLink" to="/list">
              Home
            </Link>

            <Link className="navLink" to="/add">
              Add
            </Link>

            <Link className="navLink" to="/admin">
              Admin
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {/* If a user has guest access, show these links */}
        {user.authLevel === 'guest' && (
          <>
            <Link className="navLink" to="/list">
              Home
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
