import React, { useContext } from "react";
import ImportingImgs from "../../Components/ImportingImgs";
import { useNavigate } from "@tanstack/react-router";
import AuthContext from "../../context/AuthProvider";

const LogoutModal = ({ CloseModal }) => {
  const { logout } = useContext(AuthContext);
  const images = ImportingImgs();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/student/login" });
  };
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
        <div className="w-[47rem] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b px-6 py-3">
            <h2 className="text-lg font-medium">Logout</h2>
            <button
              onClick={CloseModal}
              className="text-gray-500 hover:text-gray-800"
            >
              <img src={images.Times} alt="Close" />
            </button>
          </div>
          <div className="px-6 py-10">
            <p>
              Logging out will end your exam session immediately.Any unsaved
              progress will be lost and you may not be able to resume the
              test.Are you sure you want to logout?
            </p>
          </div>
          <div className="flex justify-between space-x-4 p-6">
            <button
              onClick={CloseModal}
              className="bg-gray-200 px-4 py-2 font-semibold text-black"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#ff6636] px-5 py-3 font-semibold text-white hover:bg-[#e65c2f]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
