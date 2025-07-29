import LoginForm from '@/components/forms/LoginForm';
import React from 'react';
import loginBannerLg from "@/assets/Banner/login-banner-lg.png";

const Login = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center lg:flex-row bg-background-body overflow-hidden">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative h-full">
        <img
          src={loginBannerLg}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Login banner"
        />
      </div>
    </div>
  );
};

export default Login;