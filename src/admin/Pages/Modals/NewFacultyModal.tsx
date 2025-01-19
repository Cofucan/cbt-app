import React, { useEffect } from "react";
import { Modal, Input } from "antd";
import ImportImgs from "../../components/ImportImgs";
import useAddFaculty from "../../hooks/postData/useAddFacutly";
import CustomButton from "../../components/CustomButton";

const NewFacultyModal = ({ handleCancel, handleSave, visible }) => {
  const images = ImportImgs();

  const { formik, isLoading, isSuccess } = useAddFaculty()

  useEffect(() => {
    if (isSuccess) {
      handleSave()
    }
  }, [isSuccess])

  return (
    <div className="">
      {/* Modal */}
      <Modal
        title="New Faculty"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={500} // adjust width if needed
        closeIcon={<span className="text-gray-400 text-lg">
          <img src={images.Times} alt="Times" />
        </span>} // Custom close icon
        className="custom-modal"
      >
        {/* Modal Content */}
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Faculty Name</label>
            <Input placeholder="Faculty name" 
                name="name"
                onChange={formik.handleChange}
                className="w-full py-2 placeholder:text-gray-400" />
          </div>

          {/* <div className="mb-6">
            <label className="block text-gray-700 mb-2">Departments</label>
            <Input placeholder="Department" className="w-full py-2 placeholder:text-gray-400" />
          </div> */}

          {/* Buttons */}
          <div className="flex justify-between gap-4 items-center">
            <button
              onClick={handleCancel}
              className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
            >
              Cancel
            </button>
            <CustomButton title="Save Faculty" isLoading={isLoading} onClick={formik?.handleSubmit} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewFacultyModal;
