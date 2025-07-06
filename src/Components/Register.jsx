import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const { createUser, signInWithGoogle } = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;

        if (!terms) {
            setErrorMessage('Please accept our terms and conditions.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password should be 6 characters or longer');
            setLoading(false);
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage(
                'At least one uppercase, one lowercase, one number, one special character'
            );
            setLoading(false);
            return;
        }

        createUser(email, password)
            .then((result) => {
                toast.success("Successfully Registered!");
                const user = result.user;
                
                updateProfile(user, {
                    displayName: name,
                    photoURL: photo,
                })
                    .then(() => {
                        sendEmailVerification(user)
                            .then(() => {
                                toast.info("Verification email sent. Please check your inbox.");
                            })
                            .catch((error) => {
                                console.error("Verification email error:", error);
                                toast.error("Failed to send verification email.");
                            });

                        e.target.reset();
                        setLoading(false);
                        navigate("/", { replace: true });
                    })
                    .catch((error) => {
                        toast.error(error.message);
                        setLoading(false);
                    });
            })
            .catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });

    };

    const handleGoogleSignUp = () => {
        signInWithGoogle()
            .then((result) => {
                toast.success("Successfully Registered!");
                navigate("/", { replace: true });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Register now!</h1>
                </div>

                <div className="card bg-base-100 p-6 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label htmlFor="name" className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input id="name" type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label htmlFor="photo" className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input id="photo" type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input id="email" type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>

                        <div className="form-control relative">
                            <label htmlFor="password" className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input id="password" type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="input input-bordered" required />
                            <span onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-8 top-14 cursor-pointer text-lg text-gray-600">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="form-control mt-2">
                            <label className="label justify-start cursor-pointer">
                                <input type="checkbox" name="terms" className="checkbox" />
                                <span className="label-text ml-2">Accept Our Terms And Condition.</span>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>

                    {
                        errorMessage && <p className="text-red-600 text-center mt-2 px-4 text-sm">{errorMessage}</p>
                    }

                    <p className="text-center mt-4 text-sm">Already have an account?{' '}
                        <Link className="text-blue-600" to="/login">Login</Link>
                    </p>

                    <button onClick={handleGoogleSignUp} className="btn mt-6 btn-outline btn-neutral"> Sign up with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;