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

  const { formik, isLoading, isSuccess } = useAddAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    formik?.handleSubmit();
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (isSuccess) {
      showAdminSuccessModal();
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center">
      <div className="w-full max-w-xl bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Add Admin</h2>

        <hr className="mb-4" />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="First name..."
              onChange={formik.handleChange}
              name="first_name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last name..."
              onChange={formik.handleChange}
              name="last_name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              onChange={formik.handleChange}
              name="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Admin Identifier
            </label>
            <input
              type="text"
              placeholder="Admin Identifier"
              onChange={formik.handleChange}
              name="identifier"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
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
                className="custom-placeholder h-[40px] w-full rounded-lg border border-[#CBD5E1] px-3 text-gray-500 placeholder:text-base focus:border-blue-400 focus:ring-blue-300 focus:placeholder:text-sm"
              />
              {passwordVisible ? (
                <FaEye
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                />
              ) : (
                <FaEyeSlash
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 pt-10">
            <button className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200">
              Cancel
            </button>
            <CustomButton
              title="Add Admin"
              isLoading={isLoading}
              onClick={formik?.handleSubmit}
            />
          </div>
        </form>

        {openSuccessAdminModal && (
          <SuccessAdminModal closeAdminSuccessModal={closeAdminSuccessModal} />
        )}
      </div>
    </div>
  );
};

export default AddAdminForm;
