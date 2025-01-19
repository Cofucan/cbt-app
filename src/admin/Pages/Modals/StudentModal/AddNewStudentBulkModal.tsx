import { Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import ImportImgs from "../../../components/ImportImgs";
import useGetFaculty from "../../../hooks/getData/useGetFaculty";
import useGetDepartment from "../../../hooks/getData/useGetDepartment";
import useAddCourse from "../../../hooks/postData/useAddCourse";
import CustomButton from "../../../components/CustomButton"; 
import useAddStudentUpload from "../../../hooks/postData/useAddStudentUpload";
import { FaFileExcel } from "react-icons/fa";

const { Option } = Select;

const AddNewStudentBulkModal = ({ handleCancel, isModalOpen }) => {
  const images = ImportImgs();

  //Save New Course Modal Logic 

  const levels = ["100", "200", "300", "400"];
  const { data: facultyList } = useGetFaculty()

  const { formik, isLoading, isSuccess, file, setFile } = useAddStudentUpload()
  const { data: departmentList } = useGetDepartment(formik?.values.faculty_id) 

  const handleBrowse = (e) => {
    const selected = e.target.files[0];
    setFile(selected)
  };

  
  // const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false); // State to store the file to download 


  const handleDragOverQuestion = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeaveQuestion = () => {
    setDragging(false);
  };

  const handleDropQuestion = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles);
  };

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
          <div className="py-5">
            <label className="pb-4 text-[#1d2026]">Upload Student</label>
            <div className="flex items-center gap-16">
              <div
                className={`border rounded px-4 py-8 w-[80%] mt-2 flex items-center ${dragging ? "border-orange-500" : "border-gray-300"
                  }`}
                onDragOver={handleDragOverQuestion}
                onDragLeave={handleDragLeaveQuestion}
                onDrop={handleDropQuestion}
              >
                <input
                  type="file"
                  accept=".csv .xlsx"
                  className="hidden"
                  onChange={handleBrowse}
                />
                {!file && (
                  <div className="flex items-center">
                    <span className="text-[#8c94a3] flex items-center">
                      <img
                        src={images.DownloadUp}
                        onClick={() =>
                          document.querySelector('input[type="file"]').click()
                        }
                        alt="uploadIcon"
                        className="p-1 rounded-full mr-2 cursor-pointer border bg-[#e9eaf0]"
                      />{" "}
                      {/* Upload icon */}
                      Drag and drop your files here or
                    </span>
                    <button
                      className="ml-2 text-orange-500 font-semibold"
                      onClick={() =>
                        document.getElementById('input[type="file"]').click()
                      }
                    >
                      Browse{" "}
                      <span className="text-[#8c94a3] font-normal">
                        to upload CSV File
                      </span>
                    </button>
                  </div>
                )}
                {file && (
                  <div className=" w-full flex gap-3 justify-center items-center " >
                    <img
                      src={images.DownloadUp}
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }
                      alt="uploadIcon"
                      className="p-1 rounded-full mr-2 cursor-pointer border bg-[#e9eaf0]"
                    />{" "}
                    <FaFileExcel size={"40px"} />
                    <div>
                      <p>{file.name}</p>
                      <p>{(file?.size / 1024).toFixed(2)}kb</p>
                    </div>
                  </div>
                )}
              </div> 
            </div>
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

export default AddNewStudentBulkModal;
