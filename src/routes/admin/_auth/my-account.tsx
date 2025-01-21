import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import AdminProfile from "../../../admin/Pages/MyAccount/AdminProfile";
import PasswordSettings from "../../../admin/Pages/Modals/MyAccount/PasswordSettings";
import EditProfile from "../../../admin/Pages/Modals/MyAccount/EditProfile";

export const Route = createFileRoute("/admin/_auth/my-account")({
  component: RouteComponent,
});

function RouteComponent() {
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const TogglePasswordVisible = () => {
    setPasswordModalVisible(!passwordModalVisible);
  };
  const ToggleEditProfileVisible = () => {
    setEditProfileModalVisible(!editProfileModalVisible);
  };

  const [userData, setUserData] = useState(null);

  return (
    <section className="">
      <h2 className="px-20 pt-20 text-xl font-bold">Profile</h2>
      <div>
        <AdminProfile setUserData={setUserData} />
      </div>
      <div className="px-20 py-10">
        <button
          onClick={TogglePasswordVisible}
          className="text-lg text-[#5c6168]"
        >
          Change Password
        </button>
        <button
          onClick={ToggleEditProfileVisible}
          className="mt-10 flex items-center gap-2 bg-[#ff6636] px-14 py-2 text-white shadow-md focus:outline-none"
        >
          Edit Profile
        </button>
      </div>
      {passwordModalVisible && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black opacity-20"
            onClick={TogglePasswordVisible} // Close if the overlay is clicked
          ></div>
          <div className="fixed right-[20%] top-[20%] z-20 w-[40vw]">
            <PasswordSettings close={() => setPasswordModalVisible(false)} />
          </div>
        </>
      )}
      {editProfileModalVisible && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black opacity-20"
            onClick={ToggleEditProfileVisible} // Close if the overlay is clicked
          ></div>
          <div className="fixed right-[20%] top-[5%] z-20 h-[40vh] w-[40vw]">
            <EditProfile
              data={userData}
              close={() => setEditProfileModalVisible(false)}
            />
          </div>
        </>
      )}
    </section>
  );
}
