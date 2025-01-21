import React, { useEffect } from "react";
import useAddAdmin from "../../../hooks/postData/useAddAdmin";
import CustomButton from "../../../components/CustomButton";

const EditProfile = ({ data, close }) => {
  console.log(data);

  const id = localStorage.getItem("id");

  const { formik, loadingEdit, editSuccess } = useAddAdmin(id);

  useEffect(() => {
    formik?.setFieldValue("identifier", data?.identifier);
    formik?.setFieldValue("first_name", data?.first_name);
    formik?.setFieldValue("last_name", data?.last_name);
    formik?.setFieldValue("email", data?.email);
    formik?.setFieldValue("type", "");
    formik?.setFieldValue("password", "");
  }, [data]);

  useEffect(() => {
    if (editSuccess) {
      close();
    }
  }, [editSuccess]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {/* Surname */}
      <div className="relative mb-4">
        <label className="mb-2 block font-medium text-black">Fisrt Name</label>
        <input
          type="text"
          onChange={formik.handleChange}
          name="first_name"
          value={formik.values.first_name}
          className="w-full border-2 border-[#cbd5e1] p-2 placeholder:text-[gray]"
          placeholder="Enter Surname"
        />
      </div>
      {/* Other Name */}
      <div className="relative mb-4">
        <label className="mb-2 block font-medium text-black">Last Names</label>
        <input
          type="text"
          onChange={formik.handleChange}
          name="last_name"
          value={formik.values.last_name}
          className="w-full border-2 border-[#cbd5e1] p-2 placeholder:text-[gray]"
          placeholder="Other Names"
        />
      </div>
      {/* Email */}
      <div className="relative mb-4">
        <label className="mb-2 block font-medium text-black">Your Email</label>
        <input
          type="email"
          onChange={formik.handleChange}
          name="email"
          value={formik.values.email}
          className="w-full border-2 border-[#cbd5e1] p-2 placeholder:text-[gray]"
          placeholder="Enter email address"
        />
      </div>
      {/* Phone Number */}
      {/* <div className="mb-4 relative">
        <label className="block text-black font-medium mb-2">
          Phone Number
        </label>
        <input
          type="text"
          onChange={formik.handleChange}
          name="current_password"
          value={formik.values.first_name}
          className="w-full border-2 border-[#cbd5e1] placeholder:text-[gray] p-2"
          placeholder="Phone Number"
        />
      </div> */}
      {/* Username */}
      <div className="relative mb-4">
        <label className="mb-2 block font-medium text-black">Identifier</label>
        <input
          type="text"
          onChange={formik.handleChange}
          name="identifier"
          value={formik.values.identifier}
          className="w-full border-2 border-[#cbd5e1] p-2 placeholder:text-[gray]"
          placeholder="Enter Username"
        />
      </div>
      {/* Location */}
      {/* <div className="mb-4 relative">
        <label className="block text-black font-medium mb-2">Location</label>
        <input
          type="text"
          className="w-full border-2 border-[#cbd5e1] placeholder:text-[gray] p-2"
          placeholder="Enter Department Or Team"
        />
      </div> */}

      {/* Buttons */}
      {/* <div className="flex justify-between items-center">
        <button className="text-gray-600 border border-[#cbd5e1] rounded px-4 py-2">
          Cancel
        </button>
        <button className="bg-[#ff6636] rounded text-white px-4 py-2">
          Save Changes
        </button>
      </div> */}

      <div className="flex items-center justify-between gap-4 pt-6">
        <button
          onClick={close}
          className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
        >
          Cancel
        </button>
        <CustomButton
          title="Submit"
          isLoading={loadingEdit}
          onClick={formik?.handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditProfile;
