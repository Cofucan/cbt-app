import { createFileRoute, Link } from "@tanstack/react-router";
import ImportImgs from "../../../../admin/components/ImportImgs.tsx";
import { useState } from "react";
import TextManagerTable from "../../../../admin/Tables/TextManagerTable.tsx";
import NewFacultyModal from "../../../../admin/Pages/Modals/NewFacultyModal.tsx";
import NewDepartmentModal from "../../../../admin/Pages/Modals/ClassManagerModal/NewDepartmentModal.tsx";

export const Route = createFileRoute('/admin/_auth/test/')({
  component: RouteComponent,
})

function RouteComponent() {
  const images = ImportImgs()
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  // Handlers to open/close the FacultyModal
  const showModal = () => setVisible(true)
  const handleCancel = () => setVisible(false)
  const handleSave = () => {
    // Handle saving logic
    setVisible(false)
  }
  // Handlers to open/close the DepartmentModal
  const showDeptModal = () => setIsModalVisible(true)
  const handleCancelDept = () => setIsModalVisible(false)

  return (
    <section className="full">
      <div className="w-[95%] mx-auto h-full py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Test Manager</h2>
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
                  <Link
                    to={'/admin/new-test'}
                    className="cursor-pointer hover:bg-[#FFEEE8] hover:text-[#000] px-2 py-1 rounded transition"
                  >
                    Add Test
                  </Link>
                  <p
                    onClick={showModal}
                    className="cursor-pointer hover:bg-[#FFEEE8] hover:text-[#000] px-2 py-1 rounded transition"
                  >
                    Add Faculty
                  </p>
                  <p
                    onClick={showDeptModal}
                    className="cursor-pointer hover:bg-[#FFEEE8] hover:text-[#000] px-2 py-1 rounded transition"
                  >
                    Add Department
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="TextManagerTable">
          <TextManagerTable />
        </div>
        {/*New Faculty Modal */}
        {visible && (
          <NewFacultyModal
            handleCancel={handleCancel}
            handleSave={handleSave}
            visible={visible}
          />
        )}
      </div>
      {/* New Department Modal */}
      {isModalVisible && (
        <NewDepartmentModal
          visible={isModalVisible}
          handleCancel={handleCancelDept}
        />
      )}
    </section>
  )
}

