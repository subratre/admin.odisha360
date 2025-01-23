"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

// import { useUpload } from "../utilities/runtime-helpers";

function AdminLogin() {
  const [isSignup, setIsSignup] = useState(false); // Default to false

  const signInHandler = () => {
    signIn("google", { callbackUrl: "/profile" });
  };
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

              <Button
                className="bg-white h-[40px] mt-5"
                onClick={signInHandler}
              >
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
            src="https://e1a4c9d0d2f9f737c5e1.ucr.io/https://studymentor.created.app/api/ai-img?prompt=Students%2520collaborating%2520on%2520digital%2520learning%2520platform"
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
