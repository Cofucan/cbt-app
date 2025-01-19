import React, { useContext } from "react";
import ImportingImgs from "../../Components/ImportingImgs";
import { useNavigate } from "@tanstack/react-router";
import AuthContext from "../../context/AuthProvider";

const LogoutModal = ({ CloseModal }) => {
  const {logout } = useContext(AuthContext)
  const images = ImportingImgs();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  
    navigate({to: "/student/login"}); 
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
        <div className="bg-white shadow-lg w-[47rem]">
          <div className="flex justify-between items-center px-6 py-3 border-b">
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
          <div className="flex justify-between p-6 space-x-4">
            <button
              onClick={CloseModal}
              className="px-4 py-2 font-semibold bg-gray-200 text-black"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-3 bg-[#ff6636] text-white hover:bg-[#e65c2f] font-semibold"
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
