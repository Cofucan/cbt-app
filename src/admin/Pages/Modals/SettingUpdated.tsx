import ImportImgs from "../../components/ImportImgs";

const SettingUpdated = ({ ToggleSettingsUpdatedOpen }: {ToggleSettingsUpdatedOpen: () => void}) => {
  const images = ImportImgs();
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-[350px] rounded bg-white p-6 text-center shadow">
        {/* Icon */}
        <div className="flex items-center justify-center pb-5">
          <img src={images.checkCircle} alt="successMark" />
        </div>

        {/* Success Message */}
        <h2 className="tracking text-lg font-semibold text-black">
          Settings Updated
        </h2>

        {/* Continue Button */}
        <button
          onClick={ToggleSettingsUpdatedOpen}
          className="mt-6 w-full rounded-lg bg-[#ff6636] px-6 py-3 text-white hover:shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SettingUpdated;
