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


  const { completedMutate, loadingComplete, completeSuccess } = useActivateExam()

  useEffect(()=> {
    if(completeSuccess) {
      closeDeactivateExamModal()
    }
  }, [completeSuccess])

  return (
    <div>
      {/* Modal */}
      {isOpenDeactivateExam && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg w-[35rem]">
            {/* Modal header */}
            <div className="flex justify-between items-center px-6 py-2 border-b">
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
            <div className="flex justify-between gap-4 px-6 pb-8 pt-6 items-center">
              <button
                onClick={closeDeactivateExamModal}
                className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
              >
                Cancel
              </button>
              <CustomButton title="Deactivate Exam" isLoading={loadingComplete} onClick={()=> completedMutate(data?.id)} />
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
