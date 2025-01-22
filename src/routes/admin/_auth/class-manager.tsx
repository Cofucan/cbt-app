import { createFileRoute } from "@tanstack/react-router";
import ImportImgs from "../../../admin/components/ImportImgs";
import { useState } from "react";
import useGetDepartment from "../../../admin/hooks/getData/useGetDepartment";
import useGetFaculty from "../../../admin/hooks/getData/useGetFaculty";
import LoadingAnimation from "../../../admin/components/LoadingAnimation.tsx";
import NewDepartmentModal from "../../../admin/Pages/Modals/ClassManagerModal/NewDepartmentModal";
import EditDepartmentModal from "../../../admin/Pages/Modals/EditDepartmentModal";
import DeleteDepartmentModal from "../../../admin/Pages/Modals/DeleteDepartmentModal";
import { Dropdown, Menu, Table } from "antd";

export const Route = createFileRoute("/admin/_auth/class-manager")({
  component: RouteComponent
});

function RouteComponent() {
  const images = ImportImgs(); // Import images here
  const [visibleDropdown, setVisibleDropdown] = useState<string | null | undefined>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Handlers to open/close the DepartmentModal
  const showDeptModal = () => setIsModalVisible(true);
  const handleCancelDept = () => setIsModalVisible(false);

  // Open the edit department modal
  const openEditModal = () => {
    setVisibleDropdown(null);
    setIsEditModalVisible(true);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    // setSelectedRow(null);
  };

  const [facultyId, setFacultyId] = useState("");

  const { data, isLoading, isRefetching } = useGetDepartment(facultyId);

  const { data: facultyList } = useGetFaculty();

  const [singleData, setSingleData] = useState<{ id: string } | undefined>();

  const openDeleteModal = () => {
    setVisibleDropdown(null);
    setIsDeleteModalVisible(true);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };


  const toggleDropdown = (key?: { id: string }) => {
    setSingleData(key);
    setVisibleDropdown(visibleDropdown === key?.id ? null : key?.id);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={openEditModal}>
        Edit Department
      </Menu.Item>
      <Menu.Item key="2" onClick={openDeleteModal}>
        Delete Department
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Faculty",
      dataIndex: "faculty_name",
      key: "faculty_name"
    },
    {
      title: "Department",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Action",
      key: "action",
      render: (text: { id: string | undefined; }, record: { id: string; } | undefined) => (
        <Dropdown
          overlay={menu}
          visible={visibleDropdown === text.id}
          onVisibleChange={() => toggleDropdown(record)}
          trigger={["click"]}
          className=""
        >
          <button>
            <img src={images.DotsThree} alt="Action" />
          </button>
        </Dropdown>
      )
    }
  ];

  // @ts-ignore
  return (
    <section>
      <div className="mr-32 px-10">
        <div className="flex items-center justify-between pb-20 pt-10">
          <h2 className="text-xl font-bold">Class List</h2>
          <button
            onClick={showDeptModal}
            className="flex items-center gap-2 bg-[#ff6636] px-4 py-2 text-white shadow-md focus:outline-none"
          >
            Add Department
          </button>
        </div>

        <div className="mb-5 flex gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">
              Faculty
            </label>
            <select
              onChange={(e) => setFacultyId(e.target.value)}
              className="w-[200px]rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Faculty</option>
              {facultyList?.map((item) => {
                return <option value={item?.id}>{item?.name}</option>;
              })}
            </select>
          </div>
        </div>
        <LoadingAnimation loading={isLoading} isRefetching={isRefetching}>
          <Table
            className="custom-table"
            columns={columns}
            dataSource={data.map(x => ({...x, id: x?.id.toString()}))}
            pagination={{
              pageSize: 10
            }}
          />
        </LoadingAnimation>
      </div>
      {/*Add Department Modal */}
      <div className="z-10">
        {isModalVisible && (
          <NewDepartmentModal
            visible={isModalVisible}
            handleCancel={handleCancelDept}
          />
        )}
      </div>
      <div>
        {isEditModalVisible && (
          <EditDepartmentModal
            data={singleData}
            visible={isEditModalVisible}
            handleCancel={handleCancelEdit}
          />
        )}
      </div>
      <div>
        {isDeleteModalVisible && (
          <DeleteDepartmentModal
            data={singleData}
            handleCancelDelete={handleCancelDelete}
          />
        )}
      </div>
    </section>
  );
}
