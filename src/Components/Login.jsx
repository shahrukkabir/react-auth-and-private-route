import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { GithubAuthProvider, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const { signInUser, signInWithGoogle } = useContext(AuthContext);

    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setLoginError('');

        signInUser(email, password)
            .then((result) => {
                const user = result.user;

                if (!user.emailVerified) {
                    setLoginError('Please verify your email address.');
                    toast.warning('Email not verified. Please check your inbox.');
                } else {
                    toast.success('Login successful!');
                    navigate('/', { replace: true });
                }
            })
            .catch((error) => {
                console.error('ERROR:', error.message);
                setLoginError(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                toast.success('Successfully Logged in with Google!');
                navigate('/', { replace: true });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const provider = new GithubAuthProvider();

    const handleGithubSignIn = () =>{
        signInWithPopup(auth, provider)
        .then(result =>{
            toast.success('Successfully Logged in with Github!')
        })
        .catch(error => {
            toast.error(error.message)
        })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            toast.warn('Please provide a valid email address.');
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.info('Password reset email sent. Please check your inbox.');
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    return (
        <div className="w-full min-h-screen bg-base-200 flex justify-center items-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl mb-8 font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 p-6 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="Email"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                className="input input-bordered pr-10"
                                required
                            />
                            <span
                                className="absolute right-4 top-12 cursor-pointer text-lg text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            <label onClick={handleForgetPassword} className="label cursor-pointer">
                                <span className="label-text-alt link link-hover">Forgot password?</span>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>

                    {loginError && (
                        <p className="text-red-500 text-center mb-4">{loginError}</p>
                    )}

                    <div>
                        <p className="ml-8">
                            New to this Website?{' '}
                            <Link className="text-blue-600" to="/register">
                                Register
                            </Link>
                        </p>
                    </div>

                    <button onClick={handleGoogleSignIn} className="btn m-6 btn-outline btn-neutral" > Sign in with Google </button>
                    <button onClick={handleGithubSignIn} className="btn mx-6 btn-outline btn-neutral" > Sign in with Github </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
