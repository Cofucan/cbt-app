import React, { useEffect } from "react";
import { Modal, Input } from "antd";
import ImportImgs from "../../components/ImportImgs";
import useAddFaculty from "../../hooks/postData/useAddFacutly";
import CustomButton from "../../components/CustomButton";

const NewFacultyModal = ({ handleCancel, handleSave, visible }) => {
  const images = ImportImgs();

  const { formik, isLoading, isSuccess } = useAddFaculty();

  useEffect(() => {
    if (isSuccess) {
      handleSave();
    }
  }, [isSuccess]);

  return (
    <div className="">
      {/* Modal */}
      <Modal
        title="New Faculty"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={500} // adjust width if needed
        closeIcon={
          <span className="text-lg text-gray-400">
            <img src={images.Times} alt="Times" />
          </span>
        } // Custom close icon
        className="custom-modal"
      >
        {/* Modal Content */}
        <div className="p-4">
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Faculty Name</label>
            <Input
              placeholder="Faculty name"
              name="name"
              onChange={formik.handleChange}
              className="w-full py-2 placeholder:text-gray-400"
            />
          </div>

          {/* <div className="mb-6">
            <label className="block text-gray-700 mb-2">Departments</label>
            <Input placeholder="Department" className="w-full py-2 placeholder:text-gray-400" />
          </div> */}

          {/* Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleCancel}
              className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
            >
              Cancel
            </button>
            <CustomButton
              title="Save Faculty"
              isLoading={isLoading}
              onClick={formik?.handleSubmit}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewFacultyModal;
