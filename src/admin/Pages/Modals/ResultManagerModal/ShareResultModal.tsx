import ImportImgs from "../../../components/ImportImgs";

const ShareResultModal = ({ closeShareResultModal }) => {
  const images = ImportImgs();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between border-b pb-2">
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
              className="mb-2 block text-sm font-semibold text-black"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Subject"
              className="w-full rounded-lg border px-4 py-2 text-gray-700 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-semibold text-black"
              htmlFor="email"
            >
              Recipient's Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              className="w-full rounded-lg border px-4 py-2 text-gray-700 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={closeShareResultModal}
              className="bg-gray-200 px-4 py-2 font-bold text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#ff6636] px-6 py-2 font-semibold text-[#fff] shadow-md focus:outline-none"
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
