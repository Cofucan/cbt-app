import { Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import ImportImgs from "../../../components/ImportImgs";
import useGetFaculty from "../../../hooks/getData/useGetFaculty";
import useGetDepartment from "../../../hooks/getData/useGetDepartment";
import useAddCourse from "../../../hooks/postData/useAddCourse";
import CustomButton from "../../../components/CustomButton";
import useAddStudent from "../../../hooks/postData/useAddStudent";

const { Option } = Select;

const EditNewStudentModal = ({ data, handleCancel, isModalOpen }) => {
  const images = ImportImgs();

  //Save New Course Modal Logic

  const levels = ["100", "200", "300", "400"];
  const { data: facultyList } = useGetFaculty();

  const { formik, loadingEdit, editSuccess } = useAddStudent(data?.id);
  const { data: departmentList } = useGetDepartment(formik?.values?.faculty);

  const filteredData = () => {
    let value = facultyList.find(
      (faculty) => faculty.name === data?.faculty_name,
    );
    let depart = departmentList.find(
      (faculty) => faculty.name === data?.department_name,
    );
    console.log(depart);

    formik?.setValues({
      ...formik?.values,
      // "email": data?.email,
      first_name: data?.first_name,
      level: data?.level,
      identifier: data?.identifier,
      faculty: value?.id,
      department: depart?.id,
    });
    // formik.setFieldValue("faculty", value?.id)
    // formik.setFieldValue("department", depart?.id)
  };

  useEffect(() => {
    if (editSuccess) {
      handleCancel();
    }
  }, [editSuccess]);

  useEffect(() => {
    if (!formik?.values?.faculty && !formik?.values?.department) {
      filteredData();
    }
  }, [facultyList, departmentList]);

  console.log(departmentList);

  return (
    <div>
      <Modal
        title="Edit Student"
        open={isModalOpen} // Control modal visibility here
        onCancel={handleCancel} // Close modal on Cancel
        footer={null}
        width={500}
        closeIcon={
          <span className="text-lg text-gray-400">
            <img src={images.Times} alt="Times" />
          </span>
        }
      >
        <div className="p-4">
          {/* Course Code Input */}
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Student Name</label>
            <Input
              className="w-full"
              name="first_name"
              value={formik?.values?.first_name}
              onChange={formik.handleChange}
            />
          </div>

          {/* Course Code Input */}
          {/* <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <Input className="w-full"
              name="email"
              value={formik?.values?.email}
              onChange={formik.handleChange} />
          </div> */}

          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Faculty Name</label>
            <Select
              placeholder="Select Faculty"
              className="w-full"
              value={formik?.values?.faculty}
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
            <label className="mb-2 block text-gray-700">Departments</label>
            <Select
              placeholder={
                data?.department_name
                  ? data?.department_name
                  : "Select Department"
              }
              className="w-full"
              value={formik?.values?.department}
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
            <label className="mb-2 block text-gray-700">Level</label>
            <Select
              name="level"
              placeholder={"Select Level"}
              value={formik?.values?.level}
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
          <div className="mb-6">
            <label className="mb-2 block text-gray-700">Matric no.</label>
            <Input
              placeholder=""
              value={formik?.values?.identifier}
              onChange={formik.handleChange}
              name="identifier"
              className="w-full"
            />
          </div>

          {/* Buttons */}

          <div className="flex items-center justify-between gap-4 pt-6">
            <button
              onClick={handleCancel}
              className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
            >
              Cancel
            </button>
            <CustomButton
              title="Edit Student Data"
              isLoading={loadingEdit}
              onClick={formik?.handleSubmit}
            />
          </div>
          {/* Save New Course Modal */}
          {/* {openSaveCourseModal && <SaveNewCourseModal CancelSaveModal={CancelSaveModal} />} */}
        </div>
      </Modal>
    </div>
  );
};

export default EditNewStudentModal;
