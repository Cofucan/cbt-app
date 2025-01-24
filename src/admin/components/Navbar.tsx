import { useState, useRef, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
// import user from "../assets/user.svg";
import schoolLogo from "../assets/enugun.png"
import arrowdown from "../assets/Orange-Arrowdown.svg";
import { useNavigate } from "@tanstack/react-router";
import { FiMenu } from "react-icons/fi";
import useGetSettings from "../hooks/getData/useGetSettings.ts";
import { baseUrl } from "../../lib/utils.ts";

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalProfileView, setIsModalProfileView] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null); // Ref for the profile dropdown
  const { data } = useGetSettings();
  const logo = baseUrl + "/media/" + data?.logo;
  console.log(data);

  const toggleProfileDropdown = () => {
    setIsModalProfileView((prev) => !prev);
  };

  // Memoize the function to avoid unnecessary re-creation on each render
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node
    if (profileRef.current && !profileRef.current.contains(target)) {
      setIsModalProfileView(false); // Close the modal if clicked outside
    }
  }, []);

  useEffect(() => {
    // Attach event listener only when the modal is open
    if (isModalProfileView) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener on component unmount or when the modal closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalProfileView, handleClickOutside]);

  // Function to handle closing the dropdown after clicking any item
  const handleDropdownClick = (to: string) => {
    setIsModalProfileView(false); // Close dropdown
    navigate({ to }); // Navigate to the corresponding page
  };

  const clickHandler = () => {
    localStorage.setItem("token", "");
    // navigate("/")
    navigate({ to: "/admin" });
  };

  return (
    <section className="z-50 h-full w-full bg-white">
      <div className="flex items-center justify-between px-3 py-3 lg:px-8">
        <div className="flex items-center gap-20">
          <img
            src={schoolLogo}
            alt="logo"
            className="w-[200px] object-contain h-16"
          />
          <div className="hidden flex-col lg:flex">
            <p className="text-sm tracking-tighter text-gray-600">
              Good Morning
            </p>
            <h2 className="tracking text-lg font-semibold text-black">
              {data?.type}
            </h2>
          </div>
        </div>

        <div className="hidden w-[35%] md:block md:w-[50%] lg:w-[35%]">
          <div className="flex w-full items-center rounded-lg border border-gray-300 bg-[#f5f7fa] py-3 xl:max-w-2xl">
            <CiSearch className="ms-3 text-2xl text-[black]" />
            <input
              className="h-full w-full border-none bg-[#f5f7fa] text-gray-700 placeholder-gray-500 outline-none focus:border-none focus:ring-0"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="hidden lg:flex">
            <p>
              {data?.name}
            </p>
          </div>
          <div
            onClick={toggleProfileDropdown}
            className="relative flex cursor-pointer items-center gap-3"
          >
            <img
              src={logo}
              alt="user"
              className="h-10 w-10 rounded-full object-cover"
            />
            <img
              src={arrowdown}
              alt="arrowdown"
              className="hidden h-5 w-5 object-cover lg:flex"
            />
          </div>
          <button className="text-2xl xl:hidden">
            <FiMenu className="h-7 w-8 rounded border-2 border-[#ff6636] bg-[#fff] text-[#ff6636]" />
          </button>

          {isModalProfileView && (
            <div
              ref={profileRef} // Attach ref to the modal
              className="smd:top-[90px] absolute right-5 top-[65px] flex w-36 flex-col border border-gray-300 bg-white lg:top-[95px] xl:right-10 xl:top-[54px]"
            >
              <div
                onClick={() => handleDropdownClick("/admin/my-account")}
                className="cursor-pointer px-3 py-2 text-[15px] hover:bg-[#FFEEE8] hover:px-3 hover:py-2"
              >
                View Profile
              </div>
              <div
                onClick={() => handleDropdownClick("/admin/settings")}
                className="cursor-pointer px-3 py-2 text-[15px] hover:bg-[#FFEEE8] hover:px-3 hover:py-2"
              >
                Settings
              </div>
              <div
                onClick={clickHandler}
                className="cursor-pointer px-3 py-2 text-[15px] hover:bg-[#FFEEE8] hover:px-3 hover:py-2"
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
