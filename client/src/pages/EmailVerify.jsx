import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const EmailVerify = () => {
  const { backendUrl } = useContext(AppContext);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, '');
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0 && !otp[index]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp: enteredOtp });
      const data = res.data;

      if (data.success) {
        toast.success(data.message || "Account verified successfully.");
      } else {
        toast.error(data.message || "Invalid OTP.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
      const data = res.data;
      if (data.success) {
        toast.success(data.message || "OTP resent successfully.");
      } else {
        toast.error(data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 px-4">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/30 w-full max-w-md text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="mb-6 text-sm">Please enter the 6-digit code sent to your email.</p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6 gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-12 text-center text-xl rounded-lg bg-white/30 border border-white/50 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition cursor-pointer mb-3"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="text-sm mt-2">
          Didn't get the code?{' '}
          <button onClick={handleResendOtp} className="underline text-white font-semibold hover:text-purple-200">
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;
