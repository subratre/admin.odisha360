"use client";
import React, { useState } from "react";
import ProfileSection from "./profile-section";
import MainSection from "./main-section";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div>
      <ProfileSection setActiveTab={setActiveTab} activeTab={activeTab} />
      <MainSection activeTab={activeTab} />
    </div>
  );
};

export default Profile;
