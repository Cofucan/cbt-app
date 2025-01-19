
import ImportImgs from "../../../components/ImportImgs";

const ShareResultModal = ({closeShareResultModal}) => {
    const images = ImportImgs();
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Share Result</h2>
          <button
            onClick={closeShareResultModal}
            className="text-gray-500 hover:text-gray-700"
          >
           <img src={images.Times} alt="" />
          </button>
        </div>

        <form className="mt-4">
          <div className="mb-4">
            <label
              className="block text-black font-semibold text-sm mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 border placeholder:text-sm rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-semibold text-sm mb-2" htmlFor="email">
              Recipient's Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="button"
                onClick={closeShareResultModal}
              className="px-4 py-2 bg-gray-200 font-bold text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 flex items-center font-semibold gap-2 text-[#fff] bg-[#ff6636] shadow-md focus:outline-none"
            >
              Share Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareResultModal;
