import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setIsLoggedIn, backendUrl } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

 const sendVerificationOtp = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
    const data = response.data;

    if (data.success) {
      toast.success(data.message);
      navigate('/email-verify');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message || 'Failed to send OTP');
  }
};



  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    toast.success("You have been logged out.");
    navigate('/');
  };


  // const handleVerify = () => {
  //   navigate('/verify-account');
  // };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate('/')}
      >
        MyLogo
      </div>

      {userData && userData.name ? (
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold cursor-pointer"
          >
            {userData.name.charAt(0).toUpperCase()}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10">
              <button
                onClick={sendVerificationOtp}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 block text-sm"
              >
                Verify Account
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 block text-sm text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLoginClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
