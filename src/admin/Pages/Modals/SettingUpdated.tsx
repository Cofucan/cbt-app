
import ImportImgs from "../../components/ImportImgs";

const SettingUpdated = ({ ToggleSettingsUpdatedOpen }) => {
  const images = ImportImgs();
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white w-[350px] p-6 rounded shadow text-center">
        {/* Icon */}
        <div className="flex justify-center items-center pb-5">
          <img src={images.checkCircle} alt="successMark" />
        </div>

        {/* Success Message */}
        <h2 className="text-lg font-semibold text-black tracking">
          Settings Updated
        </h2>

        {/* Continue Button */}
        <button
          onClick={ToggleSettingsUpdatedOpen}
          className="mt-6 px-6 py-3 w-full bg-[#ff6636] text-white rounded-lg hover:shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SettingUpdated;
