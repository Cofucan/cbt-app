import { Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import ImportImgs from "../../../components/ImportImgs";
import useGetFaculty from "../../../hooks/getData/useGetFaculty";
import useGetDepartment from "../../../hooks/getData/useGetDepartment";
import useAddCourse from "../../../hooks/postData/useAddCourse";
import CustomButton from "../../../components/CustomButton";
import useAddStudent from "../../../hooks/postData/useAddStudent";

const { Option } = Select;

const AddNewStudentModal = ({ handleCancel, isModalOpen }) => {
  const images = ImportImgs();

  //Save New Course Modal Logic 

  const levels = ["100", "200", "300", "400"];
  const { data: facultyList } = useGetFaculty()

  const { formik, isLoading, isSuccess } = useAddStudent()
  const { data: departmentList } = useGetDepartment(formik?.values?.faculty)

  console.log(formik?.values);
  useEffect(() => {
    if (isSuccess) {
      handleCancel()
    }
  }, [isSuccess])

  return (
    <div>
      <Modal
        title="New Student"
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
          {/* Course Code Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Student Name</label>
            <Input className="w-full"
              name="first_name"
              onChange={formik.handleChange} />
          </div>

          {/* Course Title Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Matric no.</label>
            <Input
              placeholder=""
              onChange={formik.handleChange}
              name="identifier"
              className="w-full"
            />
          </div> 
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Faculty Name</label>
            <Select
              placeholder="Select Faculty"
              className="w-full"
              onChange={(value) => formik.setFieldValue("faculty", value)}
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
              onChange={(value) => formik.setFieldValue("department", value)}
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

          {/* Buttons */}

          <div className="flex justify-between gap-4 pt-6 items-center">
            <button
              onClick={handleCancel}
              className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
            >
              Cancel
            </button>
            <CustomButton title="Save Student" isLoading={isLoading} onClick={formik?.handleSubmit} />
          </div>
          {/* Save New Course Modal */}
          {/* {openSaveCourseModal && <SaveNewCourseModal CancelSaveModal={CancelSaveModal} />} */}
        </div>
      </Modal>
    </div>
  );
};

export default AddNewStudentModal;
