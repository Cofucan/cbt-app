import { Dispatch, FC, SetStateAction, useState } from "react";
import ImportImgs from "../../components/ImportImgs";
import DeleteExam from "./SuccessModal/DeleteExam";

interface DelateExamModalProps {
  isOpenDeleteExam: boolean
  closeDeleteExamModal: () => void
  setIsOpenDeleteExam: Dispatch<SetStateAction<boolean>>
}

const DelateExamModal: FC<DelateExamModalProps> = (props) => {
  const {
    isOpenDeleteExam,
    closeDeleteExamModal,
    setIsOpenDeleteExam
  } = props;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-[35rem] bg-white shadow-lg">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b px-6 py-2">
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
            <div className="flex justify-between space-x-4 p-6">
              <button
                onClick={closeDeleteExamModal}
                className="bg-gray-200 px-4 py-2 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteExam}
                className="bg-[#FF3636] px-4 py-2 text-white hover:bg-[#ff3636]"
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
