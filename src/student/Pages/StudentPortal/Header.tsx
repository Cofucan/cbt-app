import React, { useContext, useEffect, useState } from "react";
import ImportingImgs from "../../Components/ImportingImgs";
import { useNavigate } from "@tanstack/react-router";
import { getSchoolConfig } from "../../api/auth";
import AuthContext from "../../context/AuthProvider";
import { baseUrl } from "../../../lib/utils";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const images = ImportingImgs();
  const navigate = useNavigate();

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
          const schoolConfig = await getSchoolConfig(token);
          const logoPath = schoolConfig?.logo;

          const logoUrl = logoPath
            ? `${baseUrl}/media/${logoPath}`
            : images.mainLogo;
          setSchoolLogo(logoUrl);

          console.log("School Logo URL in landingPage:", logoPath);

          // Save the school config in localStorage
          localStorage.setItem("schoolConfig", JSON.stringify(schoolConfig));
        } else {
          console.error("No token found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching school logo:", error);
      }
    };

    fetchSchoolLogo();
  }, []);
  return (
    <div className="flex w-[100%] items-center justify-between bg-white px-3 py-5 lg:px-10">
      <img src={images.enugun} alt="mainLogo" width={200} />
      <button
        onClick={handleLogout}
        className="flex cursor-pointer justify-center bg-[#FF6636] px-8 py-2 text-lg font-semibold text-white hover:bg-[#f8733a] hover:duration-700 md:px-14 md:py-3 lg:text-xl"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
