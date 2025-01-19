import React from "react";
import "../../globals.css";
import Link from "next/link";
import Wrapper from "@/components/wrpper";
import { useSession } from "next-auth/react";
import User from "@/components/profile/user-section";

const layout = ({ children }) => {
  return (
    <Wrapper>
      <header className=" fixed mb-2 z-40 bg-white top-0 py-3 w-full left-0 right-0">
        <div className="container mx-auto ">
          <div className="flex items-center justify-between">
            <Link href={"/profile"}>
              <h1 className="text-2xl font-bold ">Study Mentor</h1>
            </Link>
            <div>
              <User />
            </div>
          </div>
        </div>
      </header>
      <div className="mt-[80px]">{children}</div>

      <footer>footer</footer>
    </Wrapper>
  );
};

export default layout;
