"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Wrapper = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Wrapper;
