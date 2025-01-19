import React, { useState } from "react";
import ImportImgs from "../../../components/ImportImgs";
import DepartmentAdded from "../SuccessModal/DepartmentAdded";
import CustomButton from "../../../components/CustomButton";

const SaveNewDepartment = ({ handleCancel, onSubmit, success, isLoading }) => {
  const [addDeptSuccess, setAddDeptSuccess] = useState(false);

  const ToggleSuccess = () => {
    setAddDeptSuccess(true);
  };
  const images = ImportImgs();
  return (
    <div>
      {/* Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
        <div className="bg-white shadow-lg w-[31rem]">
          {/* Modal header */}
          <div className="flex justify-between items-center px-6 py-2 border-b">
            <h2 className="text-lg font-semibold">Save New Department</h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-800"
            >
              <img src={images.Times} alt="Times" />
            </button>
          </div>

          {/* Modal content */}
          <div className="p-6">
            <p>Are you sure you want to Add New Department?</p>
          </div>

          {/* Modal footer */}
          <div className="flex justify-between gap-4 items-center">
            <button
              onClick={handleCancel}
              className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
            >
              Cancel
            </button>
            <CustomButton title="Save Department" isLoading={isLoading} onClick={onSubmit} />
          </div>
        </div>
        {success && (
          <DepartmentAdded handleCancel={handleCancel} />
        )}
      </div>
    </div>
  );
};

export default SaveNewDepartment;
