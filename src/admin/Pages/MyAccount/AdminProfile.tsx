import React, {useEffect} from "react";
import ImportImgs from "../../components/ImportImgs";
import LoadingAnimation from "../../components/loadingAnimation";
import useGetProfile from "../../hooks/getData/useGetProfile";

const ProfileCard = ({ data, loading }) => {
  const images = ImportImgs();

  console.log(data);

  return (
    <LoadingAnimation loading={loading} >

      <div className="w-[90%] mx-auto bg-white shadow-sm rounded-lg p-6 flex">
        {/* Left section: Profile image and basic info */}
        <div className="relative w-[20%]">
          <img
            className="w-32 h-32 object-cover"
            src={images.Admin}
            alt={`${name}'s profile`}
          />
          {/* Edit button overlay on the image */}
          <button className="absolute bottom-20 left-28 transform -translate-y-1/2 bg-orange-500 p-2 text-white">
            <img src={images.ProfilePen} alt="Edit profile" className="w-6 h-6" />
          </button>
          <p className="px-10 text-[#5c6168]">{data?.type}</p>
          {/* Admin Info below the image */}
          <div className="mt-4">
            <p className="font-semibold">{data?.name}</p>
            <p className="text-sm text-[#5c6168]">{data?.email}</p>
          </div>
        </div>

        {/* Right section: Additional details */}
        <div className="w-[80%] grid grid-cols-3 gap-4">
          <div>
            <p className="font-semibold text-lg">{data?.identifier}</p>
            <p className="text-gray-500">Username</p>
          </div>
          <div>
            <p className="font-semibold text-lg">{data?.type}</p>
            <p className="text-gray-500">Role</p>
          </div>
          <div>
            <p className="font-semibold text-lg">-----</p>
            <p className="text-gray-500">Date Joined</p>
          </div>
          <div>
            <p className="text-gray-500 text-lg">Status</p>
            <span
              className={`px-3 py-1 inline-block text-sm font-medium ${status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
                }`}
            >
              {status}
            </span>
          </div>
          <div>
            <p className="font-semibold text-lg">---</p>
            <p className="text-gray-500">Location</p>
          </div>
          <div>
            <p className="font-semibold text-lg">{data?.phone_number ? data?.phone_number : "----"}</p>
            <p className="text-gray-500">Phone Number</p>
          </div>
        </div>
      </div>
    </LoadingAnimation>
  );
};

// Sample data for testing
const AdminProfile = ({setUserData}) => {
  const images = ImportImgs(); // Import images here

  // Admin data
  const adminData = {
    name: "John Badarin",
    username: "Johnie",
    role: "Admin",
    dateJoined: "02 August, 2023",
    status: "Active",
    location: "Abuja, Nigeria",
    phoneNumber: "0902323743",
    email: "johnbaderin@gmail.com",
    imageUrl: images.Admin, // Dynamically assign the profile image from ImportImgs
    editIcon: images.ProfilePen, // Dynamically assign the edit icon
  };


  const { isLoading, data } = useGetProfile() 

  useEffect(() => {
    setUserData(data)
  }, [data?.email])

  return (
    <div className="p-6">
      <ProfileCard data={data} loading={isLoading} />
    </div>
  );
};

export default AdminProfile;
