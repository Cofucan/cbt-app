import { useEffect, useState } from "react";
import ImportingImgs from "./ImportingImgs";
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
      <div className="flex w-[100%] items-center justify-between bg-white px-3 py-3 lg:px-10">
        <img src={images.enugun} alt="mainLogo" width={200} />

        <div className="flex items-center gap-10">
          <button
            onClick={OpenModal}
            className="hidden cursor-pointer justify-center bg-[#FF6636] px-8 py-2 text-lg font-semibold text-white hover:bg-[#f8733a] hover:duration-700 md:px-10 md:py-2 lg:flex lg:text-lg"
          >
            Logout
          </button>
          <div className="flex items-center gap-2">
            <p className="hidden text-lg lg:block">{profileName}</p>
            <img src={profileImage} alt="MainUser" width={30} />
          </div>
        </div>
      </div>

      {openLogoutModal && <LogoutModal CloseModal={CloseModal} />}
    </section>
  );
};

export default Header;
