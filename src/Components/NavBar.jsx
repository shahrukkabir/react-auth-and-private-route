import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const NavBar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("User Sign Out Successfully");
            })
            .catch(error => console.log("Error:", error.message));
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            {!user && <li><NavLink to="/login">Login</NavLink></li>}
            {!user && <li><NavLink to="/register">Register</NavLink></li>}
            {user && (
                <>
                    <li><NavLink to="/orders">Order</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 px-4 md:px-10 shadow-md">
            {/* Left side with logo and mobile menu */}
            <div className="navbar-start">
                <div className="dropdown">
                    <button tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">Authentication</Link>
            </div>

            {/* Center links (visible on large screens) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {links}
                </ul>
            </div>

            {/* Right side with user info or login button */}
            <div className="navbar-end space-x-2">
                {user ? (
                    <>
                        <span className="text-sm hidden md:inline">{user.email}</span>
                        <button onClick={handleSignOut} className="btn btn-sm">Sign Out</button>
                    </>
                ) : (
                    <Link to="/login" className="btn btn-sm">Login</Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
