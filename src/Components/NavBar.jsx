import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const NavBar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("User Sign Out Successfully");
            })
            .catch(error => console.log("Error:", error.message));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const links = (
        <>
            <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
            {!user && <li><NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink></li>}
            {!user && <li><NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink></li>}
            {user && (
                <>
                    <li><NavLink to="/orders" onClick={() => setIsMenuOpen(false)}>Order</NavLink></li>
                    <li><NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 px-4 md:px-10 shadow-md">
            {/* Left side with logo and mobile menu */}
            <div className="navbar-start">
                <div className="dropdown">
                    <button
                        tabIndex={0}
                        onClick={toggleMenu}
                        className="btn btn-ghost lg:hidden"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                    {isMenuOpen && (
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    )}
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
