import React, { useEffect, useState } from "react";
import ImportingImgs from "../../Components/ImportingImgs";
import { getUserProfile } from "../../api/auth";

const StudentDetails = ({ user }) => {
  const images = ImportingImgs();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const profileData = await getUserProfile(token);
          const imageUrl = profileData?.result?.profile_image;
          // console.log("Profile Image URL:", imageUrl);
          setProfileImage(imageUrl || images.defaultUser);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <div className="bg-white py-6 px-5 rounded-lg border-2 border-[#e9eaf0]">
      <h2 className="text-2xl font-semibold text-[#ff6636] py- mb-4">
        Student Details
      </h2>
      <img
        src={profileImage}
        alt="Student"
        className="w-48 h-48 rounded-full object-cover mb-10"
      />

      <div className="text-black md:text-2xl flex flex-col gap-5 pb-5 xl:pb-0">
        <p>
          <span className="font-semibold">Full Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Matric No:</span> {user.identifier}
        </p>
        {/* <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p> */}
        <p>
          <span className="font-semibold">Faculty:</span>{" "}
          {user.profile.faculty_name || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Department:</span>{" "}
          {user.profile.department_name || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Level:</span> {user.profile.level}
        </p>
      </div>
    </div>
  );
};

export default StudentDetails;
