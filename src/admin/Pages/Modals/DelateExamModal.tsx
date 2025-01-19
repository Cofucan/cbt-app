import React, { useState } from "react";
import ImportImgs from "../../components/ImportImgs";
import DeleteExam from "./SuccessModal/DeleteExam";

const DelateExamModal = ({
  isOpenDeleteExam,
  closeDeleteExamModal,
  setIsOpenDeleteExam,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const TogglecloseSuccessModal = () => {
    setIsOpenDeleteExam(false);
    setDeleteModalOpen(false);
  };

  const images = ImportImgs();
  const handleDeleteExam = () => {
    // Handle the exam activation logic here
    console.log("Exam Deactivated!");
    setDeleteModalOpen(true);
  };

  return (
    <div>
      {/* Modal */}
      {isOpenDeleteExam && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg w-[35rem]">
            {/* Modal header */}
            <div className="flex justify-between items-center px-6 py-2 border-b">
              <h2 className="text-xl font-semibold">Delete Exam</h2>
              <button
                onClick={closeDeleteExamModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <img src={images.Times} alt="Times" />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6">
              <p>Are you sure you want to Delete this Exam?</p>
            </div>

            {/* Modal footer */}
            <div className="flex justify-between p-6 space-x-4">
              <button
                onClick={closeDeleteExamModal}
                className="px-4 py-2 bg-gray-200 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteExam}
                className="px-4 py-2 bg-[#FF3636] text-white hover:bg-[#ff3636]"
              >
                Delete Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <DeleteExam TogglecloseSuccessModal={TogglecloseSuccessModal} />
      )}
    </div>
  );
};

export default DelateExamModal;
