import React, { FC, useEffect, useState } from "react";
import { Modal, Select, Input } from "antd";
import ImportImgs from "../../../components/ImportImgs";
import SaveNewDepartment from "./SaveNewDepartment";
import useAddDepartment from "../../../hooks/postData/useAddDepartment";
import useGetFaculty from "../../../hooks/getData/useGetFaculty";
import CustomButton from "../../../components/CustomButton";

interface NewDepartmentModalProps {
  visible: boolean
  handleCancel: () => void
}

const NewDepartmentModal: FC<NewDepartmentModalProps> = ({
                              visible,
                              handleCancel
                            }) => {
  const images = ImportImgs();

  // Sample data for faculty and level options 
  const levels = ["100", "200", "300", "400"];
  const { data: faculty } = useGetFaculty();
  const { formik, isLoading, isSuccess } = useAddDepartment();

  useEffect(() => {
    if (isSuccess) {
      handleCancel();
    }
  }, [isSuccess]);

  return (
    <div className="">
      <div className="relative">
        <Modal
          title="New Department"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
          width={500} // Adjust width if needed
          closeIcon={
            <span className="text-gray-400 text-lg">
              <img src={images.Times} alt="Times" />
            </span>
          } // Custom close icon
        >
          {/* Modal Content */}
          <div className="p-4">
            {/* Faculty Name Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Faculty Name</label>
              <select
                onChange={formik.handleChange}
                // value={formik.values.faculty_id} 
                name="faculty"
                className="border px-3 py-2 w-full rounded text-[#8c94a3]"
              >
                <option value={""}>Select Faculty</option>
                {faculty?.map((item) => {
                  return (
                    <option value={Number(item?.id)}>{item?.name}</option>
                  );
                })}
              </select>
            </div>

            {/* Departments Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Departments</label>
              <Input
                placeholder="Department"
                className="w-full py-2"
                name="name"
                onChange={formik.handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4 items-center">
              <button
                onClick={handleCancel}
                className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
              >
                Cancel
              </button>
              <CustomButton title="Save Department" isLoading={isLoading} onClick={formik?.handleSubmit} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NewDepartmentModal;
