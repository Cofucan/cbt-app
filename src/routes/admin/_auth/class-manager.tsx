import { createFileRoute } from "@tanstack/react-router";
import ImportImgs from "../../../admin/components/ImportImgs";
import { useState } from "react";
import useGetDepartment from "../../../admin/hooks/getData/useGetDepartment";
import useGetFaculty from "../../../admin/hooks/getData/useGetFaculty";
import LoadingAnimation from "../../../admin/components/LoadingAnimation.tsx";
import NewDepartmentModal from "../../../admin/Pages/Modals/ClassManagerModal/NewDepartmentModal";
import EditDepartmentModal from "../../../admin/Pages/Modals/EditDepartmentModal";
import DeleteDepartmentModal from "../../../admin/Pages/Modals/DeleteDepartmentModal";
import { Table, Input, Select, Menu, Dropdown, Button } from "antd";

export const Route = createFileRoute("/admin/_auth/class-manager")({
  component: RouteComponent,
});

// Data for the table
const StudentcoursesData = [
  { key: "1", faculty: "Arts", department: "Mass Comm", level: "200" },
  { key: "2", faculty: "Engineering", department: "Chemical", level: "200" },
  { key: "3", faculty: "Science", department: "Biology", level: "200" },
];

function RouteComponent() {
  const images = ImportImgs(); // Import images here
  const [filteredData, setFilteredData] = useState(StudentcoursesData);
  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState(null);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [level, setLevel] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saveNewDeptModal, setSaveNewDeptModal] = useState(false);
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

  const [singleData, setSingleData] = useState(null);

  const handleSaveEdit = (data) => {
    // Handle the saved data here
    console.log("Saved Data:", data);
    setIsDeleteModalVisible(true);
  };

  const openDeleteModal = () => {
    setVisibleDropdown(null);
    setIsDeleteModalVisible(true);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleSaveDept = (data) => {
    // Handle the saved data here
    console.log("Saved Data:", data);
    setSaveNewDeptModal(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    filterTable(value, faculty, department, level);
  };

  const handleFacultyChange = (value) => {
    setFaculty(value);
    setDepartment(null);
    filterTable(searchText, value, null, level);
  };

  const handleDepartmentChange = (value) => {
    setDepartment(value);
    filterTable(searchText, faculty, value, level);
  };

  const handleLevelChange = (value) => {
    setLevel(value);
    filterTable(searchText, faculty, department, value);
  };

  const filterTable = (searchText, faculty, department, level) => {
    let filtered = StudentcoursesData;

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.department.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (faculty) {
      filtered = filtered.filter((item) => item.faculty === faculty);
    }

    if (department) {
      filtered = filtered.filter((item) => item.department === department);
    }

    if (level) {
      filtered = filtered.filter((item) => item.level === level);
    }

    setFilteredData(filtered);
  };

  const toggleDropdown = (key) => {
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
      key: "faculty_name",
    },
    {
      title: "Department",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
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
      ),
    },
  ];

  return (
    <section>
      <div className="mr-32 px-10">
        <div className="flex items-center justify-between pb-20 pt-10">
          <h2 className="text-xl font-bold">Class List</h2>
          <button
            onClick={showDeptModal}
            type="primary"
            className="flex items-center gap-2 bg-[#ff6636] px-4 py-2 text-white shadow-md focus:outline-none"
          >
            Add Department
          </button>
        </div>

        <div className="mb-5 flex gap-5">
          {/* <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">Search</label>
            <Input
              placeholder="Search test.."
              value={searchText}
              onChange={handleSearch}
              style={{
                width: 500,
                marginBottom: 16,
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="w-full max-w-xs"
            />
          </div> */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">
              Faculty
            </label>
            <select
              onChange={(e) => setFacultyId(e.target.value)}
              placeholder={"Select Faculty"}
              className="w-[200px]rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Faculty</option>
              {facultyList?.map((item) => {
                return <option value={item?.id}>{item?.name}</option>;
              })}
            </select>
          </div>
          {/* <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">
              Department
            </label>
            <Select
              placeholder="Department"
              value={department}
              style={{ width: 200, marginBottom: 16 }}
              onChange={handleDepartmentChange}
              className="w-full max-w-xs"
              disabled={!faculty}
            >
              {faculty &&
                departments[faculty].map((dept) => (
                  <Option key={dept} value={dept}>
                    {dept}
                  </Option>
                ))}
            </Select>
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">Level</label>
            <Select
              placeholder="Level"
              value={level}
              style={{ width: 200, marginBottom: 16 }}
              onChange={handleLevelChange}
              className="w-full max-w-xs"
            >
              {levels.map((lvl) => (
                <Option key={lvl} value={lvl}>
                  {lvl}
                </Option>
              ))}
            </Select>
          </div> */}
        </div>
        <LoadingAnimation loading={isLoading} isRefetching={isRefetching}>
          <Table
            className="custom-table"
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 10,
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
            handleSave={handleSaveDept}
            saveNewDeptModal={saveNewDeptModal}
          />
        )}
      </div>
      <div>
        {isEditModalVisible && (
          <EditDepartmentModal
            data={singleData}
            visible={isEditModalVisible}
            handleCancel={handleCancelEdit}
            handleSaveEdit={handleSaveEdit}
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
