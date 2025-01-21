import { FC, useEffect } from "react";
import useAddTest from "../../hooks/postData/useAddTest";
import FileUpload from "../NewTestPage/TestFormFileUpload";
import CustomButton from "../../components/CustomButton";

interface BulkQuestionUploadProps {
  data:  { id: string } | null
  ToggleBulkUploadClose: () => void
  bulkUpload: boolean
  closeAddMoreQuestion: () => void
}
const BulkQuestionUpload: FC<BulkQuestionUploadProps> = (props) => {
  const {
    data,
    ToggleBulkUploadClose,
    bulkUpload,
    closeAddMoreQuestion,
  } = props
  const {
    handleBulkUpload,
    file,
    setFile,
    question,
    setQuestion,
    loadingBulk,
    bulksuccess,
  } = useAddTest(data?.id);

  useEffect(() => {
    if (bulksuccess) {
      ToggleBulkUploadClose();
      closeAddMoreQuestion();
    }
  }, [bulksuccess]);

  return (
    <div>
      {/* Modal */}
      {bulkUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="h-fit w-[30rem] overflow-y-auto bg-white px-6 shadow-lg scrollbar-hide">
            <FileUpload
              setQuestion={setQuestion}
              question={question}
              file={file}
              setFile={setFile}
            />

            <div className="flex items-center justify-between gap-4 px-6 pb-8 pt-6">
              <button
                onClick={ToggleBulkUploadClose}
                className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
              >
                Cancel
              </button>
              <CustomButton
                title="Upload Exam"
                isLoading={loadingBulk}
                onClick={() => handleBulkUpload()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkQuestionUpload;
