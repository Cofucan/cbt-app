import React, { useState, useEffect } from "react";
import ImportImgs from "../../components/ImportImgs";
import ExamDeactivated from "./SuccessModal/ExamDeactivated";
import CustomButton from "../../components/CustomButton";
import useActivateExam from "../../hooks/postData/useActivateExam";

const DeactivateExam = ({
  data,
  isOpenDeactivateExam,
  setIsOpenDeactivateExam,
  closeDeactivateExamModal,
}) => {
  const images = ImportImgs();

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const TogglecloseSuccessModal = () => {
    setOpenSuccessModal(false);
    setIsOpenDeactivateExam(false);
  };

  const handleDeactivate = () => {
    // Handle the exam activation logic here
    console.log("Exam Deactivated!");
    setOpenSuccessModal(true);
  };

  const { completedMutate, loadingComplete, completeSuccess } =
    useActivateExam();

  useEffect(() => {
    if (completeSuccess) {
      closeDeactivateExamModal();
    }
  }, [completeSuccess]);

  return (
    <div>
      {/* Modal */}
      {isOpenDeactivateExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-[35rem] bg-white shadow-lg">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b px-6 py-2">
              <h2 className="text-xl font-semibold">Deactivate Exam</h2>
              <button
                onClick={closeDeactivateExamModal}
                className="text-gray-500 hover:text-gray-800"
              >
                <img src={images.Times} alt="Times" />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6">
              <p>Are you sure you want to deactivate this exam?</p>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between gap-4 px-6 pb-8 pt-6">
              <button
                onClick={closeDeactivateExamModal}
                className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
              >
                Cancel
              </button>
              <CustomButton
                title="Deactivate Exam"
                isLoading={loadingComplete}
                onClick={() => completedMutate(data?.id)}
              />
            </div>
          </div>
        </div>
      )}

      {openSuccessModal && (
        <ExamDeactivated TogglecloseSuccessModal={TogglecloseSuccessModal} />
      )}
    </div>
  );
};

export default DeactivateExam;
