import React, { useContext, useEffect, useState } from "react";
import ImportingImgs from "../../Components/ImportingImgs";
import { useNavigate } from "@tanstack/react-router";
import StartExamModal from "../Modal/StartExamModal";
import { getSchoolConfig } from "../../api/auth";
import AuthContext from "../../context/AuthProvider";
import { baseUrl } from "../../../lib/utils";

const Header = ({ courseDetails, examId }) => {
  const { logout } = useContext(AuthContext);
  const images = ImportingImgs();
  const navigate = useNavigate();
  const [isOpenStartExamModal, setIsOpenStartExamModal] = useState(false);
  const [schoolLogo, setSchoolLogo] = useState(null);

  const handleLogout = () => {
    logout();
    navigate({ to: "/student/login" });
  };

  useEffect(() => {
    const fetchSchoolLogo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const logoData = await getSchoolConfig(token);
          const logoPath = logoData?.logo;

          const logoUrl = logoPath
            ? `${baseUrl}/media/${logoPath}`
            : images.mainLogo;
          setSchoolLogo(logoUrl);

          console.log("School Logo URL in landingPage:", logoPath);
        } else {
          console.error("No token found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching school logo:", error);
      }
    };

    fetchSchoolLogo();
  }, []);

  const ToggleStartExamModal = () => {
    setIsOpenStartExamModal(true);
  };
  const ToggleStartExamModalClose = () => {
    setIsOpenStartExamModal(false);
  };

  return (
    <div className="flex w-[100%] items-center justify-between bg-white px-3 py-5 lg:px-10">
      <img src={images.enugun} alt="mainLogo" width={200} />

      <div className="flex items-center gap-2">
        <button
          onClick={ToggleStartExamModal}
          className="hidden cursor-pointer justify-center bg-[#FFEEE8] px-8 py-2 text-lg font-semibold text-[#FF6636] md:px-10 md:py-2 lg:flex lg:text-lg"
        >
          Start Test
        </button>
        <button
          onClick={handleLogout}
          className="flex cursor-pointer justify-center bg-[#FF6636] px-8 py-2 text-lg font-semibold text-white hover:bg-[#f8733a] hover:duration-700 md:px-10 md:py-2 lg:text-lg"
        >
          Logout
        </button>
      </div>
      {isOpenStartExamModal && (
        <StartExamModal
          ToggleStartExamModalClose={ToggleStartExamModalClose}
          courseDetails={courseDetails}
          examId={examId}
        />
      )}
    </div>
  );
};

export default Header;
