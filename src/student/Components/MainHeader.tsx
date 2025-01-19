import { useEffect, useState } from "react";
import ImportingImgs from "./ImportingImgs";
import { useNavigate } from "@tanstack/react-router";
import { getUserProfile } from "../api/auth";
import LogoutModal from "../Pages/Modal/LogoutModal";

const Header = () => {
  const images = ImportingImgs();
  // const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileName, setProfileName] = useState(null);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const OpenModal = () => {
    setOpenLogoutModal(true);
  };

  const CloseModal = () => {
    setOpenLogoutModal(false);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const profileData = await getUserProfile(token);
          const imageUrl = profileData?.result?.profile_image;
          const userName = profileData?.result?.name;
          // console.log("Profile Image URL:", imageUrl);
          setProfileImage(imageUrl || images.defaultUser);
          setProfileName(userName);
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
    <section>
      <div className="flex justify-between bg-white items-center w-[100%] px-3 lg:px-10 py-3">
        <img
          src={images.enugun}
          alt="mainLogo"
         width={200}
        />

        <div className="flex gap-10 items-center">
          <button
            onClick={OpenModal}
            className="hidden lg:flex justify-center px-8 py-2 md:px-10 md:py-2  cursor-pointer text-white text-lg lg:text-lg font-semibold bg-[#FF6636] hover:bg-[#f8733a] hover:duration-700"
          >
            Logout
          </button>
          <div className="flex gap-2 items-center">
            <p className="text-lg hidden lg:block">{profileName}</p>
            <img src={profileImage} alt="MainUser" width={30} />
          </div>
        </div>
      </div>

      {openLogoutModal && (
        <LogoutModal
          CloseModal={CloseModal}
         
        />
      )}
    </section>
  );
};

export default Header;
