import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ImportImgs from "../../../components/ImportImgs";
import useChangePassword from "../../../hooks/postData/useChangePassword";
import CustomButton from "../../../components/CustomButton";
import toast from "react-hot-toast";

const PasswordSettings = ({ close }) => {
  const images = ImportImgs();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handlers for toggling password visibility
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { formik, isLoading, isSuccess } = useChangePassword();

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess]);

  const clickHandler = () => {
    if (formik?.values?.new_password !== confirmPassword) {
      toast?.error(
        "The new password does not match the confirmation password.",
      );
    } else {
      formik?.handleSubmit();
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-2 text-xl font-semibold">Password Settings</h2>
      <p className="mb-6 text-gray-600">
        Update password for enhanced account security
      </p>

      {/* Current Password */}
      <div className="relative mb-4">
        <label className="mb-2 block text-gray-600">Current Password</label>
        <input
          type={showCurrentPassword ? "text" : "password"}
          className="w-full border-2 border-[#cbd5e1] bg-[#FFFEFE] p-2"
          placeholder="********"
          onChange={formik.handleChange}
          name="current_password"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 top-8 text-gray-600"
          onClick={toggleCurrentPasswordVisibility}
        >
          {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>

      {/* New Password */}
      <div className="relative mb-4">
        <label className="mb-2 block text-gray-600">New Password</label>
        <input
          type={showNewPassword ? "text" : "password"}
          className="w-full border-2 border-[#cbd5e1] bg-[#FFFEFE] p-2"
          placeholder="********"
          onChange={formik.handleChange}
          name="new_password"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 top-8 text-gray-600"
          onClick={toggleNewPasswordVisibility}
        >
          {showNewPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>

      {/* Confirm New Password */}
      <div className="relative mb-4">
        <label className="mb-2 block text-gray-600">Confirm New Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="w-full border-2 border-[#cbd5e1] bg-[#FFFEFE] p-2"
          value={confirmPassword}
          placeholder="********"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 top-8 text-gray-600"
          onClick={toggleConfirmPasswordVisibility}
        >
          {showConfirmPassword ? (
            <FaEye />
          ) : (
            <img src={images.FaSlashEye} alt="FaEyE" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 pt-6">
        <button
          onClick={close}
          className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
        >
          Cancel
        </button>
        <CustomButton
          title="Submit"
          isLoading={isLoading}
          onClick={clickHandler}
        />
      </div>

      {/* Buttons */}
      {/* <div className="flex justify-between items-center">
        <button className="text-gray-600 border border-[#cbd5e1] rounded px-4 py-2">
          Cancel
        </button>
        <button className="bg-[#ff6636] rounded text-white px-4 py-2">
          Update Password
        </button>
      </div> */}
    </div>
  );
};

export default PasswordSettings;
