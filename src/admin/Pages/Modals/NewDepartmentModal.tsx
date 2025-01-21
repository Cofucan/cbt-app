import React, { useState } from "react";
import { Modal, Button, Input, Select } from "antd";
import ImportImgs from "../../components/ImportImgs";

const { Option } = Select;

const NewDepartmentModal = ({ visible, handleCancel, handleSave }) => {
  const images = ImportImgs();
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");

  // Sample data for faculty and level options
  const faculties = ["Engineering", "Science", "Business"];
  const levels = ["100", "200", "300", "400"];

  return (
    <div>
      <Modal
        title="New Department"
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
              placeholder="Select Faculty"
              className="w-full"
              value={faculty}
              onChange={(value) => setFaculty(value)}
            >
              {faculties.map((facultyOption) => (
                <Option key={facultyOption} value={facultyOption}>
                  {facultyOption}
                </Option>
              ))}
            </Select>
          </div>

          {/* Departments Input */}
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Departments</label>
            <Input
              placeholder="Department"
              className="w-full py-2"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* Level Dropdown */}
          <div className="mb-6">
            <label className="mb-2 block text-gray-700">Level</label>
            <Select
              placeholder="Select Level"
              className="w-full"
              value={level}
              onChange={(value) => setLevel(value)}
            >
              {levels.map((levelOption) => (
                <Option key={levelOption} value={levelOption}>
                  {levelOption}
                </Option>
              ))}
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleCancel}
              className="border-none bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave({ faculty, department, level })}
              className="border-none bg-[#ff6636] px-6 py-2 text-white hover:bg-[#ff6636]"
            >
              Save Department
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewDepartmentModal;
