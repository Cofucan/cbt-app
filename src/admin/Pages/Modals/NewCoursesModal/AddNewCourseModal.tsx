import { Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import ImportImgs from "../../../components/ImportImgs";
import SaveNewCourseModal from "./SaveNewCourseModal";
import useGetFaculty from "../../../hooks/getData/useGetFaculty";
import useGetDepartment from "../../../hooks/getData/useGetDepartment";
import useAddCourse from "../../../hooks/postData/useAddCourse";
import CustomButton from "../../../components/CustomButton";

const { Option } = Select;

const AddNewCourseModal = ({ handleCancel, isModalOpen }) => {
  const images = ImportImgs(); 

  //Save New Course Modal Logic
  const [openSaveCourseModal, setSaveCourseModal] = useState(false);

  const showSaveModal = () => setSaveCourseModal(true);
  const CancelSaveModal = () => setSaveCourseModal(false);
 
  const levels = ["100", "200", "300", "400"];
  const { data: facultyList } = useGetFaculty()

  const { formik, isLoading, isSuccess } = useAddCourse()
  const { data: departmentList } = useGetDepartment(formik?.values?.faculty_id)

  console.log(formik?.values);
  useEffect(() => {
    if (isSuccess) {
      handleCancel()
    }
  }, [isSuccess])

  return (
    <div>
      <Modal
        title="New Course"
        open={isModalOpen} // Control modal visibility here
        onCancel={handleCancel} // Close modal on Cancel
        footer={null}
        width={500}
        closeIcon={
          <span className="text-gray-400 text-lg">
            <img src={images.Times} alt="Times" />
          </span>
        }
      >
        <div className="p-4">
          {/* Faculty Name Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Faculty Name</label>
            <Select
              placeholder="Select Faculty"
              className="w-full" 
              onChange={(value) => formik.setFieldValue("faculty_id", value)}
            >
              {facultyList.map((item) => (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Departments Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Departments</label>
            <Select
              placeholder="Select Department"
              className="w-full" 
              onChange={(value) => formik.setFieldValue("department_id", value)}
            >
              {departmentList.map((item) => (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Level Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Level</label>
            <Select
              name="level"
              placeholder="Select Level"
              onChange={(value) => formik.setFieldValue("level", value)}
              className="w-full" 
            >
              {levels.map((levelOption) => (
                <Option key={levelOption} value={levelOption}>
                  {levelOption}
                </Option>
              ))}
            </Select>
          </div>

          {/* Course Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Course Title</label>
            <Input
              placeholder="Introduction to Programming"
              onChange={formik.handleChange}
              name="title"
              className="w-full"
            />
          </div>

          {/* Course Code Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Course Code</label>
            <Input placeholder="COM 101" className="w-full"
            name="code"
              onChange={formik.handleChange} />
          </div>

          {/* Buttons */}
          
          <div className="flex justify-between gap-4 pt-6 items-center">
              <button
                onClick={handleCancel}
                className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
              >
                Cancel
              </button>
              <CustomButton title="Save Course" isLoading={isLoading} onClick={formik?.handleSubmit} />
            </div>
          {/* Save New Course Modal */}
          {openSaveCourseModal && <SaveNewCourseModal CancelSaveModal={CancelSaveModal} />}
        </div>
      </Modal>
    </div>
  );
};

export default AddNewCourseModal;
