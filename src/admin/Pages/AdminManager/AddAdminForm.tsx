import React, { useEffect, useState } from "react";
import SuccessAdminModal from "../Modals/AddminManager/SuccessAdminModal";
import useAddAdmin from "../../hooks/postData/useAddAdmin";
import CustomButton from "../../components/CustomButton";
import { Select } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddAdminForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [openSuccessAdminModal, setOpenSuccessAdminModal] = useState(false);

  const showAdminSuccessModal = () => setOpenSuccessAdminModal(true);
  const closeAdminSuccessModal = () => setOpenSuccessAdminModal(false);

  const { formik, isLoading, isSuccess } = useAddAdmin()

  const handleSubmit = (e) => {
    e.preventDefault();
    formik?.handleSubmit()
  }

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(()=> {
    if(isSuccess){
      showAdminSuccessModal()
    }
  }, [isSuccess])

  return (
    <div className="flex items-center">
      <div className="bg-white p-8 shadow-sm w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">Add Admin</h2>

        <hr className="mb-4" />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="First name..."
              onChange={formik.handleChange}
              name="first_name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last name..."
              onChange={formik.handleChange}
              name="last_name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              onChange={formik.handleChange}
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Identifier
            </label>
            <input
              type="text"
              placeholder="Admin Identifier"
              onChange={formik.handleChange}
              name="identifier"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Role
            </label>

            <Select
              name="level"
              placeholder="Select Role"
              onChange={(value) => formik.setFieldValue("type", value)}
              className="w-full"
            >
              <Option value="super_admin">Super Admin</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </div>

          <div className="">
            <label className="text-2xl text-slate-700">Password</label>
            <div className="relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.password}
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Type Password"
                className="border border-[#CBD5E1] px-3 h-[40px] rounded-lg placeholder:text-base text-gray-500 focus:placeholder:text-sm custom-placeholder
   focus:ring-blue-300 focus:border-blue-400 w-full"
              />
              {passwordVisible ? (
                <FaEye
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-1/2 text-xl  -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-1/2  text-xl -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between gap-4 pt-10 items-center">
            <button
              className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
            >
              Cancel
            </button>
            <CustomButton title="Add Admin" isLoading={isLoading} onClick={formik?.handleSubmit} />
          </div>
        </form>

        {openSuccessAdminModal && <SuccessAdminModal closeAdminSuccessModal={closeAdminSuccessModal} />}
      </div>
    </div>
  );
};

export default AddAdminForm;
