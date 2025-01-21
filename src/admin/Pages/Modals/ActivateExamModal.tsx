import { useState, useEffect, SetStateAction, Dispatch } from "react";
import ImportImgs from "../../components/ImportImgs";
import ExamActivated from "./SuccessModal/ExamActivated";
import useActivateExam from "../../hooks/postData/useActivateExam";
import CustomButton from "../../components/CustomButton";

export interface ActivateExamModalProps {
  data: { id: string } | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}

const ActivateExamModal = ({ data, isOpen, setIsOpen, closeModal }: ActivateExamModalProps) => {
  const images = ImportImgs();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const toggleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    setIsOpen(false);
  };
  const { activateMutate, loadingActivation, activateSuccess } =
    useActivateExam();

  useEffect(() => {
    if (activateSuccess) {
      closeModal();
    }
  }, [activateSuccess]);

  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-[35rem] bg-white shadow-lg">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b px-6 py-2">
              <h2 className="text-xl font-semibold">Activate Exam</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <img src={images.Times} alt="Times" />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6">
              <p>Are you sure you want to activate this exam?</p>
            </div>

            {/* Modal footer */}
            {/* <div className="flex justify-between p-6 space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleActivate}
                className="px-4 py-2 bg-[#ff6636] text-white hover:bg-[#ff6636]"
              >
                Activate Exam
              </button>
            </div> */}

            <div className="flex items-center justify-between gap-4 px-6 pb-8 pt-6">
              <button
                onClick={closeModal}
                className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
              >
                Cancel
              </button>
              <CustomButton
                title="Activate Exam"
                isLoading={loadingActivation}
                onClick={() => {
                  if (!data?.id) return
                  activateMutate(data.id)
                }}
              />
            </div>
          </div>
        </div>
      )}

      {openSuccessModal && (
        <div>
          <ExamActivated TogglecloseSuccessModal={toggleCloseSuccessModal} />
        </div>
      )}
    </div>
  );
};

export default ActivateExamModal;
