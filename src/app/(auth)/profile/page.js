import Profile from "@/components/profile";

import React from "react";

export const metadata = {
  title: "profile",
};

const ProfilePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Profile />
    </div>
  );
};

export default ProfilePage;
