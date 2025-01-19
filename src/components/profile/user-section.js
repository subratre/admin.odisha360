"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const User = () => {
  const session = useSession();

  const firstInitialName = session?.data?.user?.name?.charAt(0).toUpperCase();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8 bg-gray-100 text-center flex items-center justify-center rounded-full">
            {firstInitialName}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem>{session?.data?.user?.name}</DropdownMenuItem>

          <DropdownMenuItem>{session?.data?.user?.email}</DropdownMenuItem>
          <DropdownMenuItem>
            <Button className="p-0" onClick={signOut}>
              Sign Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default User;
