import React, { useEffect } from "react";
import ImportImgs from "../../../components/ImportImgs";
import useDeleteCourse from "../../../hooks/deleteData/useDeleteCourse";
import CustomButton from "../../../components/CustomButton";

const DeleteCourseModal = ({ data, handleDeleteCancel }) => {
  const images = ImportImgs();

  const { mutate, isLoading, isSuccess } = useDeleteCourse()


  useEffect(() => {
    if (isSuccess) {
      handleDeleteCancel()
    }
  }, [isSuccess])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg w-[35rem]">
        {/* Modal header */}
        <div className="flex justify-between items-center px-6 py-2 border-b">
          <h2 className="text-xl font-semibold">Delete Course</h2>
          <button
            onClick={handleDeleteCancel}
            className="text-gray-500 hover:text-gray-800"
          >
            <img src={images.Times} alt="Times" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6">
          <p>Are you sure you want to Delete this Course?</p>
        </div>

        {/* Modal footer */}

        <div className="flex justify-between gap-4 p-6 items-center">
          <button
            onClick={handleDeleteCancel}
            className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
          >
            Cancel
          </button>
          <CustomButton red={true} title="Delete Course" isLoading={isLoading} onClick={() => mutate(data?.id)} />
        </div>

        {/* {openDeletedDept && (
          // <div className="h-32 w-96 bg-red-700"></div>
          <DeletedDepartment handleCancelDelete={handleCancelDelete} />
        )} */}
      </div>
    </div>
  );
};

export default DeleteCourseModal;
