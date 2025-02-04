import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Register from './Register';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const { signInUser,signInWithGoogle } = useContext(AuthContext);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(result => {
                // console.log(result.user);
                e.target.reset();
                navigate('/');
            })
            .catch(error => {
                console.log("Error : ", error.message);
            })
    }

    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result => {
            navigate('/');
        })
        .catch(error => console.log('Error:',error.message));
    }

    return (
        <div>
            <div className="hero  bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 p-6 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div>
                        <p className='ml-8'>New to this Website? Please <Link className='text-blue-600' to="/register">Register</Link> </p>
                        </div>
                        <button onClick={handleGoogleSignIn} className="btn m-10  btn-outline btn-neutral">Sign in with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;