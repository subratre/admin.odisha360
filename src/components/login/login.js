"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

// import { useUpload } from "../utilities/runtime-helpers";

function AdminLogin() {
  const [isSignup, setIsSignup] = useState(false); // Default to false
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex">
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <i className="fa fa-graduation-cap text-4xl text-blue-500"></i>
                <h1 className="text-3xl font-bold text-white font-poppins">
                  Study Mentor
                </h1>
              </div>
              <h2 className="text-4xl font-bold text-white font-poppins mb-2">
                {isSignup ? "Create Account" : "Welcome Back"}
              </h2>
              <Button className="bg-white h-[40px] mt-5" onClick={signIn}>
                <Image
                  src={`https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg`}
                  width={30}
                  height={30}
                />
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative h-screen">
          <img
            src="/study-illustration.jpg"
            alt="Students collaborating on digital learning platform"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute" />
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
