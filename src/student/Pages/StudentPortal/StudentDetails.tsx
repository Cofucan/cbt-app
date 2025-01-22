import { FC, useEffect, useState } from "react";
import ImportingImgs from "../../Components/ImportingImgs";
import { getUserProfile } from "../../api/auth";

interface StudentDetailsProps {
  user: {
    profile: { department_name: string; faculty_name: string; level: string };
    name: string, identifier: string
  };
}

const StudentDetails: FC<StudentDetailsProps> = ({ user }) => {
  const images = ImportingImgs();
  const [profileImage, setProfileImage] = useState<string | undefined>();

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
    <div className="rounded-lg border-2 border-[#e9eaf0] bg-white px-5 py-6">
      <h2 className="py- mb-4 text-2xl font-semibold text-[#ff6636]">
        Student Details
      </h2>
      <img
        src={profileImage}
        alt="Student"
        className="mb-10 h-48 w-48 rounded-full object-cover"
      />

      <div className="flex flex-col gap-5 pb-5 text-black md:text-2xl xl:pb-0">
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
