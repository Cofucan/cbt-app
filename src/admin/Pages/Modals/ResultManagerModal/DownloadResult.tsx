import { FC } from "react";
import ImportImgs from "../../../components/ImportImgs";
import ResultDownloaded from "./ResultDownloaded";
import { CSVLink } from "react-csv";
import useGetExamDownload from "../../../hooks/getData/useGetExamDownload";

interface DownloadResultProps {
  closeDownloadModal: () => void
  resultData: {
    title: string;
    department_name: string;
    id: string }
}
const DownloadResult: FC<DownloadResultProps> = (props) => {
  const { resultData, closeDownloadModal } = props
  const images = ImportImgs();
  const resultSuccessDownloaded = false
  // const [resultSuccessDownloaded, setResultSuccessDownloaded] = useState(false);

  // const toggleResultSuccess = () => setResultSuccessDownloaded(true);
  const { data } = useGetExamDownload(resultData.id);

  return (
    <div>
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
        <div className="w-[35rem] bg-white shadow-lg">
          {/* Modal header */}
          <div className="flex items-center justify-between border-b px-6 py-2">
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
          <div className="flex justify-between space-x-4 p-6">
            <button
              onClick={closeDownloadModal}
              className="bg-gray-200 px-4 py-2 font-semibold text-black"
            >
              Cancel
            </button>
            <CSVLink
              data={data}
              filename={
                resultData?.department_name + "_" + resultData?.title + ".csv"
              }
            >
              <button
                disabled={!data}
                className="bg-[#ff6636] px-4 py-2 text-white hover:bg-[#ff6636]"
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
