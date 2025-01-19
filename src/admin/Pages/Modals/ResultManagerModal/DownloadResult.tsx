import React, { useState } from "react";
import ImportImgs from "../../../components/ImportImgs";
import ResultDownloaded from "./ResultDownloaded";
import { SINGLEBASEURL } from "../../../utils/url";
import { CSVLink } from 'react-csv'
import useGetExamDownload from "../../../hooks/getData/useGetExamDownload";

const DownloadResult = ({ data: resultData, closeDownloadModal }) => {
  const images = ImportImgs();
  const [resultSuccessDownloaded, setResultSuccessDownloaded] = useState(false);

  const toggleResultSuccess = () => setResultSuccessDownloaded(true); 
  const { data } = useGetExamDownload(resultData.id) 

  return (
    <div>
      {/* Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
        <div className="bg-white shadow-lg w-[35rem]">
          {/* Modal header */}
          <div className="flex justify-between items-center px-6 py-2 border-b">
            <h2 className="text-xl font-semibold">Download Result</h2>
            <button
              onClick={closeDownloadModal}
              className="text-gray-500 hover:text-gray-800"
            >
              <img src={images.Times} alt="Times" />
            </button>
          </div>

          {/* Modal content */}
          <div className="p-6">
            <p>Are you sure you want to Download this result?</p>
          </div>

          {/* Modal footer */}
          <div className="flex justify-between p-6 space-x-4 ">
            <button
              onClick={closeDownloadModal}
              className="px-4 py-2 font-semibold bg-gray-200 text-black"
            >
              Cancel
            </button>
            <CSVLink data={data}
              filename={resultData?.department_name + "_" + resultData?.title + '.csv'} >
              <button
              disabled={data ? false : true}
                className="px-4 py-2 bg-[#ff6636] text-white hover:bg-[#ff6636]"
              >
                Download Result
              </button>
            </CSVLink>

          </div>
        </div>
      </div>

      {/*Result Success Downloaded Modal */}
      {resultSuccessDownloaded && (
        <div>
          <ResultDownloaded closeDownloadModal={closeDownloadModal} />
        </div>
      )}
    </div>
  );
};

export default DownloadResult;
