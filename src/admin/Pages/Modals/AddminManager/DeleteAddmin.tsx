import React, { useEffect, useState } from "react";
import ImportImgs from "../../../components/ImportImgs";
import RemoveAdmin from "./RemoveAdmin";
import useDeleteAdmin from "../../../hooks/deleteData/useDeleteAdmin";
import CustomButton from "../../../components/CustomButton";

const DeleteAddmin = ({ data, handleCancel }) => {
  const images = ImportImgs();
  const [removeAdmin, setRemoveAdmin] = useState(false);

  //Remove Admin Logic
  const showAdminRemoveModal = () => setRemoveAdmin(true);
  // const CloseAdminRemoveModal = () => setRemoveAdmin(false);

  console.log(data);

  const { isLoading, mutate, isSuccess } = useDeleteAdmin();

  const clickHandler = () => {
    mutate(data?.id);
  };

  useEffect(() => {
    if (isSuccess) {
      showAdminRemoveModal();
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
        <div className="w-[35rem] bg-white shadow-lg">
          {/* Modal header */}
          <div className="flex items-center justify-between border-b px-6 py-2">
            <h2 className="text-xl font-semibold">Remove Admin</h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-800"
            >
              <img src={images.Times} alt="Times" />
            </button>
          </div>

          {/* Modal content */}
          <div className="p-6">
            <p>Are you sure you want to Remove this admin?</p>
          </div>

          {/* Modal footer */}
          {/* <div className="flex justify-between p-6 space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-black font-bold"
            >
              Cancel
            </button>
            <button
              onClick={showAdminRemoveModal}
              className="px-4 py-2 bg-[#FF3636] text-white"
            >
              Remove Admin
            </button>
          </div> */}

          <div className="flex items-center justify-between gap-4 px-6 pb-10">
            <button
              onClick={handleCancel}
              className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
            >
              Cancel
            </button>
            <CustomButton
              title="Delete Admin"
              isLoading={isLoading}
              onClick={clickHandler}
            />
          </div>
          {/* Admin Remove Successfully */}
          {removeAdmin && <RemoveAdmin handleCancel={handleCancel} />}
        </div>
      </div>
    </div>
  );
};

export default DeleteAddmin;
