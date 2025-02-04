import ImportImgs from "../../../components/ImportImgs";
import { useNavigate } from "@tanstack/react-router";

const SuccessAdminModal = () => {
  const navigate = useNavigate();
  const images = ImportImgs();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
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
            onClick={() => navigate({ to: "/admin/settings" })}
            className="mt-6 w-full rounded-lg bg-[#ff6636] px-6 py-3 text-white hover:shadow-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessAdminModal;
