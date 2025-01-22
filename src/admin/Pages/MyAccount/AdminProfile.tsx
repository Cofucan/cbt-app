import { Dispatch, FC, SetStateAction, useEffect } from "react";
import ImportImgs from "../../components/ImportImgs";
import LoadingAnimation from "../../components/LoadingAnimation.tsx";
import useGetProfile from "../../hooks/getData/useGetProfile";
import { Admin } from "../../utils.ts";
interface ProfileCardProps {
  data: Admin | undefined, loading: boolean
}
const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { data, loading } = props
  const images = ImportImgs();

  return (
    <LoadingAnimation loading={loading}>
      <div className="mx-auto flex w-[90%] rounded-lg bg-white p-6 shadow-sm">
        {/* Left section: Profile image and basic info */}
        <div className="relative w-[20%]">
          <img
            className="h-32 w-32 object-cover"
            src={images.Admin}
            alt={`${data?.name}'s profile`}
          />
          {/* Edit button overlay on the image */}
          <button className="absolute bottom-20 left-28 -translate-y-1/2 transform bg-orange-500 p-2 text-white">
            <img
              src={images.ProfilePen}
              alt="Edit profile"
              className="h-6 w-6"
            />
          </button>
          <p className="px-10 text-[#5c6168]">{data?.type}</p>
          {/* Admin Info below the image */}
          <div className="mt-4">
            <p className="font-semibold">{data?.name}</p>
            <p className="text-sm text-[#5c6168]">{data?.email}</p>
          </div>
        </div>

        {/* Right section: Additional details */}
        <div className="grid w-[80%] grid-cols-3 gap-4">
          <div>
            <p className="text-lg font-semibold">{data?.identifier}</p>
            <p className="text-gray-500">Username</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{data?.type}</p>
            <p className="text-gray-500">Role</p>
          </div>
          <div>
            <p className="text-lg font-semibold">-----</p>
            <p className="text-gray-500">Date Joined</p>
          </div>
          {/*<div>*/}
          {/*  <p className="text-lg text-gray-500">Status</p>*/}
          {/*  <span*/}
          {/*    className={`inline-block px-3 py-1 text-sm font-medium ${*/}
          {/*      data?.status === "Active"*/}
          {/*        ? "bg-green-100 text-green-600"*/}
          {/*        : "bg-red-100 text-red-600"*/}
          {/*    }`}*/}
          {/*  >*/}
          {/*    {data?.status}*/}
          {/*  </span>*/}
          {/*</div>*/}
          <div>
            <p className="text-lg font-semibold">---</p>
            <p className="text-gray-500">Location</p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {data?.phone_number ? data?.phone_number : "----"}
            </p>
            <p className="text-gray-500">Phone Number</p>
          </div>
        </div>
      </div>
    </LoadingAnimation>
  );
};

// Sample data for testing
interface AdminProfileProps {
 setUserData: Dispatch<SetStateAction<Admin | undefined>>
}
const AdminProfile: FC<AdminProfileProps> = ({ setUserData }) => {

  const { isLoading, data } = useGetProfile();

  useEffect(() => {
    setUserData(data);
  }, [data?.email]);

  return (
    <div className="p-6">
      <ProfileCard data={data} loading={isLoading} />
    </div>
  );
};

export default AdminProfile;
