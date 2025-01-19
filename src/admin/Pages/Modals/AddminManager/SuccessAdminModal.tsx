
import ImportImgs from "../../../components/ImportImgs";
import { useNavigate } from "@tanstack/react-router";

const SuccessAdminModal = ({closeAdminSuccessModal}) => {
    const navigate = useNavigate();
  const images = ImportImgs();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
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
            onClick={() => navigate({to: "/admin/settings"})}
            className="mt-6 px-6 py-3 w-full bg-[#ff6636] text-white rounded-lg hover:shadow-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessAdminModal;
