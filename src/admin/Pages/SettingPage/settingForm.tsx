import { FormEvent, useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import useSettings from "../../hooks/postData/useSettings";
import { BASEURL } from "../../utils/url";

export default function SettingForm({ data, loading }) {
  const { formik, isLoading, setFile } = useSettings();
  const [logoPreview, setLogoPreview] = useState(null);

  const url = BASEURL;

  console.log(url() + "media/" + data?.logo);

  useEffect(() => {
    formik.setFieldValue("name", data?.name);
    formik.setFieldValue("current_session", data?.current_session);
    formik.setFieldValue("code", data?.code);
    formik.setFieldValue("result_after_test", data?.result_after_test);
    formik.setFieldValue("semester", data?.semester);
    formik.setFieldValue("type", data?.type);
    setLogoPreview(url() + "media/" + data?.logo?.replace("app", ""));
  }, [data, loading]);

  console.log(data);
  console.log(formik?.values);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);

      // Create a preview of the uploaded image
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
    // Reset form fields after submission if needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-5 border-b pb-3">
        <h2 className="px-5 text-lg font-semibold">Settings</h2>
      </div>
      {/* School Logo Upload */}
      <h2 className="py-2 font-medium">School Logo</h2>
      <div className="mb-6 flex items-center">
        {logoPreview ? (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="h-20 w-20 rounded-full border border-dashed object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-lg text-gray-600">
            CN
          </div>
        )}
        <div className="ml-4">
          <label
            htmlFor="upload-logo"
            className="cursor-pointer text-sm font-bold text-[#ff6636]"
          >
            Upload your photo
          </label>
          <input
            id="upload-logo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>
      </div>

      {/* School Name */}
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-black"
          htmlFor="school-name"
        >
          School Name
        </label>
        <input
          id="school-name"
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik?.values?.name ?? data?.name}
          placeholder="School name..."
          className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Current Session */}
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-black"
          htmlFor="current-session"
        >
          Current Session
        </label>
        <select
          id="current-session"
          name="current_session"
          onChange={formik.handleChange}
          value={formik?.values?.current_session}
          className="w-full rounded border border-gray-300 px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value={""}>Select Session</option>
          <option>2023/2024</option>
          <option>2022/2023</option>
        </select>
      </div>

      {/* Current Semester */}
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-black"
          htmlFor="current-semester"
        >
          Current Semester
        </label>
        <select
          id="current-session"
          name="semester"
          onChange={formik.handleChange}
          value={formik?.values?.semester}
          className="w-full rounded border border-gray-300 px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value={""}>Select Semester</option>
          <option>Rain</option>
          <option> Harmattan</option>
        </select>
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-medium text-black"
          htmlFor="current-semester"
        >
          Display Results Immediately After Test?
        </label>
        <select
          id="current-session"
          name="result_after_test"
          onChange={formik.handleChange}
          value={formik?.values?.result_after_test}
          className="w-full rounded border border-gray-300 px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value={""}>Select Option</option>
          <option value={"true"}>Yes</option>
          <option value={"false"}>No</option>
        </select>
      </div>

      {/* Buttons */}

      <div className="flex items-center justify-between gap-2 pb-8 pt-6">
        <button
          type="button"
          className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
        >
          Cancel
        </button>
        <CustomButton
          title="Update Settings"
          isLoading={isLoading}
          type="submit"
        />
      </div>
    </form>
  );
}
