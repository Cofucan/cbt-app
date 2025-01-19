import React, { useState, useEffect } from "react";
import ImportImgs from "../../components/ImportImgs";
import ExamActivated from "./SuccessModal/ExamActivated";
import useActivateExam from "../../hooks/postData/useActivateExam";
import CustomButton from "../../components/CustomButton";

const ActivateExamModal = ({ data ,isOpen, setIsOpen, closeModal }) => {
  const images = ImportImgs();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const TogglecloseSuccessModal = () => {
    setOpenSuccessModal(false);
    setIsOpen(false);
  };

  console.log(data);
  const handleActivate = () => {
    // Handle the exam activation logic here
    console.log("Exam activated!");
    setOpenSuccessModal(true);
  };

  const { activateMutate, loadingActivation, activateSuccess } = useActivateExam()

  useEffect(()=> {
    if(activateSuccess) {
      closeModal()
    }
  }, [activateSuccess])

  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg w-[35rem]">
            {/* Modal header */}
            <div className="flex justify-between items-center px-6 py-2 border-b">
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


            <div className="flex justify-between gap-4 px-6 pb-8 pt-6 items-center">
              <button
                onClick={closeModal}
                className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
              >
                Cancel
              </button>
              <CustomButton title="Activate Exam" isLoading={loadingActivation} onClick={()=> activateMutate(data?.id)} />
            </div>
          </div>
        </div>
      )}

      {openSuccessModal && (
        <div>
          <ExamActivated TogglecloseSuccessModal={TogglecloseSuccessModal} />
        </div>
      )}
    </div>
  );
};

export default ActivateExamModal;
