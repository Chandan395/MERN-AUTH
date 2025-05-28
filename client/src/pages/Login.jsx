import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('signup');
  const navigate = useNavigate();

  const forgotPasswordNavigate = () => navigate('/reset-password');
  const goToHomepage = () => navigate('/');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { backendUrl, setIsLoggedIn, setUserData, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    try {
      if (state === 'signup') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success('Account created successfully!');
          setIsLoggedIn(true);
          getUserData();
          setUserData(data.user); // optional
          navigate('/');
        } else {
          toast.error(data.message || 'Signup failed.');
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          toast.success('Logged in successfully!');
          setIsLoggedIn(true);
          getUserData();
          setUserData(data.user); // optional
          navigate('/');
        } else {
          toast.error(data.message || 'Login failed.');
        }
      }
    } catch (error) {
      const msg = error?.response?.data?.message || 'Something went wrong.';
      toast.error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-500 to-purple-700">
      <div className="w-full max-w-md p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-white text-center">
          {state === 'signup' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-center text-white mb-8">
          {state === 'signup' ? 'Create your account' : 'Login to your account'}
        </p>

        <form className="space-y-6" onSubmit={onSubmitHandler}>
          {state === 'signup' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/40 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/40 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/40 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            {state === 'login' && (
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={forgotPasswordNavigate}
                  className="text-sm text-white underline hover:text-gray-200 cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-purple-700 py-3 rounded-lg font-semibold hover:bg-white/90 transition cursor-pointer"
          >
            {state === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="text-center text-white mt-6">
          {state === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setState(state === 'signup' ? 'login' : 'signup')}
            className="underline font-semibold cursor-pointer"
          >
            {state === 'signup' ? 'Login here' : 'Sign up here'}
          </button>
        </p>

        <div className="text-center mt-4">
          <button
            onClick={goToHomepage}
            className="text-white underline hover:text-gray-200 text-sm cursor-pointer"
            type="button"
          >
            Return to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
