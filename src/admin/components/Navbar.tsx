import { useState, useRef, useEffect, useCallback } from "react";
import logo from "../assets/enugun.png";
import { CiSearch } from "react-icons/ci";
import user from "../assets/user.svg";
import arrowdown from "../assets/Orange-Arrowdown.svg";
import { useNavigate } from "@tanstack/react-router";
import { FiMenu } from "react-icons/fi";
import useGetProfile from "../hooks/getData/useGetProfile";

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalProfileView, setIsModalProfileView] = useState(false);
  const profileRef = useRef(null); // Ref for the profile dropdown
  const { data } = useGetProfile()

  const toggleProfileDropdown = () => {
    setIsModalProfileView((prev) => !prev);
  };

  // Memoize the function to avoid unnecessary re-creation on each render
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
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
    navigate({to}); // Navigate to the corresponding page
  };

  const clickHandler = () => {
    localStorage.setItem("token", "")
    // navigate("/")
    navigate({to:"/admin"})
  }

  return (
    <section className="w-full h-full bg-white z-50">
      <div className="flex items-center justify-between px-3 lg:px-8 py-3">
        <div className="flex items-center gap-20">
          <img
            src={logo}
            alt="logo"
            height={200}
            width={200}
            className="object-cover w-[200px]"
          />
          <div className="hidden lg:flex flex-col">
            <p className="tracking-tighter text-sm text-gray-600">
              Good Morning
            </p>
            <h2 className="tracking text-lg font-semibold text-black">
              {data?.type}
            </h2>
          </div>
        </div>

        <div className="w-[35%] md:w-[50%] lg:w-[35%] hidden md:block">
          <div className="bg-[#f5f7fa] flex items-center w-full xl:max-w-2xl border border-gray-300 rounded-lg py-3">
            <CiSearch className="ms-3 text-2xl text-[black]" />
            <input
              className="bg-[#f5f7fa] border-none focus:border-none focus:ring-0 outline-none w-full h-full text-gray-700 placeholder-gray-500"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="hidden lg:flex">
            <p>{data?.first_name} {data?.last_name}</p>
          </div>
          <div
            onClick={toggleProfileDropdown}
            className="relative flex items-center gap-3 cursor-pointer"
          >
            <img
              src={user}
              alt="user"
              className="object-cover w-10 h-10 rounded-full"
            />
            <img
              src={arrowdown}
              alt="arrowdown"
              className="object-cover w-5 h-5 hidden lg:flex"
            />
          </div>
          <button className="xl:hidden text-2xl">
            <FiMenu className="border-2 border-[#ff6636] bg-[#fff] w-8 h-7 rounded text-[#ff6636]" />
          </button>

          {isModalProfileView && (
            <div
              ref={profileRef} // Attach ref to the modal
              className="flex flex-col bg-white border border-gray-300 w-36 absolute top-[65px] right-5 smd:top-[90px] lg:top-[95px] xl:right-10 xl:top-[54px]"
            >
              <div
                onClick={() => handleDropdownClick("/admin/my-account")}
                className="px-3 py-2 text-[15px] hover:bg-[#FFEEE8] hover:py-2 hover:px-3 cursor-pointer"
              >
                View Profile
              </div>
              <div
                onClick={() => handleDropdownClick("/admin/settings")}
                className="px-3 py-2 text-[15px] hover:bg-[#FFEEE8] hover:py-2 hover:px-3 cursor-pointer"
              >
                Settings
              </div>
              <div
                onClick={clickHandler}
                className="px-3 py-2 text-[15px] hover:bg-[#FFEEE8] hover:py-2 hover:px-3 cursor-pointer"
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
