import React, { useEffect } from "react";
import ImportImgs from "../../components/ImportImgs";
import useAddTest from "../../hooks/postData/useAddTest";
import FileUpload from "../NewTestPage/TestFormFileUpload";
import CustomButton from "../../components/CustomButton";

const BulkQuestionUpload = ({ data, ToggleBulkUploadClose, bulkUpload, closeAddMoreQuestion }) => {
  const images = ImportImgs();

  console.log(data);
  // const handleBulkUpload = () => {
  //   // Handle the exam activation logic here
  //   console.log("Exam Added");
  // };

  const { handleBulkUpload, file, setFile, question, setQuestion, loadingBulk, bulksuccess } = useAddTest(data?.id)

  useEffect(()=> {
    if(bulksuccess){
      ToggleBulkUploadClose()
      closeAddMoreQuestion()
    }
  }, [bulksuccess])

  return (
    <div>
      {/* Modal */}
      {bulkUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg w-[30rem] h-fit px-6 overflow-y-auto scrollbar-hide">
            
            <FileUpload
              setQuestion={setQuestion}
              question={question} file={file} setFile={setFile} />


            <div className="flex justify-between gap-4 px-6 pb-8 pt-6 items-center">
              <button
                onClick={ToggleBulkUploadClose}
                className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
              >
                Cancel
              </button>
              <CustomButton title="Upload Exam" isLoading={loadingBulk} onClick={() => handleBulkUpload()} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkQuestionUpload;
