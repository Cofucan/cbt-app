import { createFileRoute } from "@tanstack/react-router";
import ImportImgs from "../../../admin/components/ImportImgs";
import { useState } from "react";
import StudentTable from "../../../admin/Tables/StudentTable";
import AddNewStudentModal from "../../../admin/Pages/Modals/StudentModal/AddNewStudentModal";
import AddNewStudentBulkModal from "../../../admin/Pages/Modals/StudentModal/AddNewStudentBulkModal";
import { useStudentDownloadTemplate } from "../../../admin/utils/useStudentDonloadTemplate";

export const Route = createFileRoute("/admin/_auth/student-manager")({
  component: RouteComponent,
});

function RouteComponent() {
  const images = ImportImgs();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBulk, setIsOpenBulk] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const downloadMutation = useStudentDownloadTemplate();

  return (
    <section>
      <div className="mx-auto h-full w-[95%] py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Student List</h2>
          <div className="flex items-center gap-5">
            <div>
              <button
                 onClick={() => downloadMutation.mutate()}
                className="flex items-center gap-2 bg-[#ffF7F5] px-4 py-2 font-bold text-[#ff6636] shadow-md focus:outline-none"
              >
                Download Template
                <img src={images.DownloadTemplate} alt="Download" />
              </button>
            </div>
            <div className="relative">
              {/* Add More Button */}
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-[#ff6636] px-4 py-2 text-white shadow-md focus:outline-none"
                aria-expanded={isOpen}
              >
                Add More
                <img
                  src={images.Addicon}
                  alt="Add Icon"
                  className="object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute z-10 w-full border border-gray-200 bg-white py-1 shadow-lg">
                  <div className="flex flex-col gap-2 text-[14px] text-[#4E5566]">
                    <p
                      onClick={() => setIsOpenBulk(true)}
                      className="cursor-pointer rounded px-2 py-1 transition hover:bg-[#FFEEE8] hover:text-[#000]"
                    >
                      Bulk Upload
                    </p>
                    <p
                      onClick={showModal}
                      className="cursor-pointer rounded px-2 py-1 transition hover:bg-[#FFEEE8] hover:text-[#000]"
                    >
                      Add Student
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*Student Table Below */}
        <div>
          <StudentTable />
        </div>
      </div>

      <div>
        {isModalOpen && (
          <AddNewStudentModal
            handleCancel={handleCancel}
            isModalOpen={isModalOpen}
          />
        )}
      </div>

      <div>
        {isOpenBulk && (
          <AddNewStudentBulkModal
            handleCancel={() => setIsOpenBulk(false)}
            isModalOpen={isOpenBulk}
          />
        )}
      </div>
    </section>
  );
}
