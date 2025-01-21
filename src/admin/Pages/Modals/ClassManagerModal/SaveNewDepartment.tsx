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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
        <div className="w-[31rem] bg-white shadow-lg">
          {/* Modal header */}
          <div className="flex items-center justify-between border-b px-6 py-2">
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
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleCancel}
              className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
            >
              Cancel
            </button>
            <CustomButton
              title="Save Department"
              isLoading={isLoading}
              onClick={onSubmit}
            />
          </div>
        </div>
        {success && <DepartmentAdded handleCancel={handleCancel} />}
      </div>
    </div>
  );
};

export default SaveNewDepartment;
