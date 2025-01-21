import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Select } from "antd";
import ImportImgs from "../../components/ImportImgs";
import SaveNewDepartment from "./ClassManagerModal/SaveNewDepartment";
import useAddDepartment from "../../hooks/postData/useAddDepartment";
import useGetFaculty from "../../hooks/getData/useGetFaculty";
import useGetDepartment from "../../hooks/getData/useGetDepartment";
import CustomButton from "../../components/CustomButton";

const { Option } = Select;

const EditDepartmentModal = ({ data, visible, handleCancel }) => {
  const images = ImportImgs();
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [openSaveNewDepartment, setopenSaveNewDepartment] = useState(false);

  const ToggleSaveNewDepartmentOpen = () => {
    setopenSaveNewDepartment(true);
  };
  const { data: facultyList } = useGetFaculty();

  const { editSuccess, formik, loadingEdit } = useAddDepartment(data?.id);

  const filteredData = () => {
    let value = facultyList.find(
      (faculty) => faculty.name === data?.faculty_name,
    );
    formik.setFieldValue("faculty", value?.id);
    // return value
  };

  useEffect(() => {
    filteredData();
    formik.setFieldValue("name", data.name);
  }, [facultyList]);

  useEffect(() => {
    if (editSuccess) {
      handleCancel();
    }
  }, [editSuccess]);

  return (
    <div>
      <Modal
        title="Edit Department"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={500} // Adjust width if needed
        closeIcon={
          <span className="text-lg text-gray-400">
            <img src={images.Times} alt="Times" />
          </span>
        } // Custom close icon
      >
        {/* Modal Content */}
        <div className="p-4">
          {/* Faculty Name Dropdown */}
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Faculty Name</label>
            <Select
              placeholder={"Select Faculty"}
              className="w-full"
              onChange={formik.handleChange}
              value={formik?.values?.faculty}
              name="faculty"
            >
              {facultyList.map((facultyOption) => (
                <Option key={facultyOption?.id} value={facultyOption?.id}>
                  {facultyOption?.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Departments Input */}
          <div className="mb-6">
            <label className="mb-2 block text-gray-700">Departments</label>
            <Input
              placeholder="Department"
              className="w-full py-2"
              name="name"
              onChange={formik.handleChange}
              value={formik?.values.name}
            />
          </div>

          {/* Buttons */}
          {/* <div className="flex justify-between items-center">
            <button
              onClick={handleCancel}
              className="bg-gray-100 text-gray-500 border-none hover:bg-gray-200 px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={ToggleSaveNewDepartmentOpen}
              className="bg-[#ff6636] text-white border-none hover:bg-[#ff6636] px-6 py-2"
            >
              Save Department
            </button>
          </div> */}

          <div className="flex items-center justify-between gap-4 pt-6">
            <button
              onClick={handleCancel}
              className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
            >
              Cancel
            </button>
            <CustomButton
              title="Save Department"
              isLoading={loadingEdit}
              onClick={formik?.handleSubmit}
            />
          </div>

          <div>
            {openSaveNewDepartment && (
              <SaveNewDepartment handleCancel={handleCancel} />
            )}
          </div>
        </div>
      </Modal>
    </div>
    // <div className="bg-green0600 h-32 w-96"></div>
  );
};

export default EditDepartmentModal;
