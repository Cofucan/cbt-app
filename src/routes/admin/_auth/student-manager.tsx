import { createFileRoute } from '@tanstack/react-router'
import ImportImgs from "../../../admin/components/ImportImgs";
import {useState} from "react";
import StudentTable from "../../../admin/Tables/StudentTable";
import AddNewStudentModal from "../../../admin/Pages/Modals/StudentModal/AddNewStudentModal";
import AddNewStudentBulkModal from "../../../admin/Pages/Modals/StudentModal/AddNewStudentBulkModal";

export const Route = createFileRoute('/admin/_auth/student-manager')({
  component: RouteComponent,
})

function RouteComponent() {
    const images = ImportImgs();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenBulk, setIsOpenBulk] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false)
    const handleCancelDelete = () => {
      setIsDeleteModalVisible(false);
    };

    return (
        <section>
          <div className="w-[95%] mx-auto h-full py-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Student List</h2>
              <div className="flex items-center gap-5">
                <div>
                  <button
                      // onClick={()=> setIsOpenBulk(true)}
                      className="px-4 py-2 flex items-center gap-2 text-[#ff6636] font-bold bg-[#ffF7F5] shadow-md focus:outline-none">
                    Download Template
                    <img src={images.DownloadTemplate} alt="Download" />
                  </button>
                </div>
                <div className="relative">
                  {/* Add More Button */}
                  <button
                      onClick={toggleDropdown}
                      className="px-4 py-2 flex items-center gap-2 text-white bg-[#ff6636] shadow-md focus:outline-none"
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
                      <div className="bg-white w-full py-1 absolute z-10 shadow-lg border border-gray-200">
                        <div className="flex flex-col gap-2 text-[#4E5566] text-[14px]">
                          <p
                              onClick={()=> setIsOpenBulk(true)}
                              className="cursor-pointer hover:bg-[#FFEEE8] hover:text-[#000] px-2 py-1 rounded transition"
                          >
                            Bulk Upload
                          </p>
                          <p
                              onClick={showModal}
                              className="cursor-pointer hover:bg-[#FFEEE8] hover:text-[#000] px-2 py-1 rounded transition"
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
                    handleCancel={handleCancel} isModalOpen={isModalOpen}
                />
            )}
          </div>

          <div>
            {isOpenBulk && (
                <AddNewStudentBulkModal
                    handleCancel={()=> setIsOpenBulk(false)} isModalOpen={isOpenBulk}
                />
            )}
          </div>

        </section>
    );
}
