import { useState } from "react";
import { Dropdown, Menu, Table } from "antd";
import ImportImgs from "../components/ImportImgs";
import useGetStudent from "../hooks/getData/useGetStudent";
import LoadingAnimation from "../components/LoadingAnimation.tsx";
import EditNewStudentModal from "../Pages/Modals/StudentModal/EditNewStudentModal";
// import DeleteDepartmentModal from "../Pages/Modals/DeleteDepartmentModal";
import useGetFaculty from "../hooks/getData/useGetFaculty";
import useGetDepartment from "../hooks/getData/useGetDepartment";
import { CgProfile } from "react-icons/cg";
import DeleteStudentModal from "../Pages/Modals/StudentModal/deleteStudentModal.tsx";


const StudentTable = () => {
  const images = ImportImgs();

  const [singleData, setSingleData] = useState<{id: string} | null>(null);

  const [facultyId, setFacultyId] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data: facultyList } = useGetFaculty();
  const { data: departmentList } = useGetDepartment(facultyId);

  const { data, isLoading, isRefetching } = useGetStudent(
    facultyId,
    department,
    keyword,
    level,
  );

  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);
  // const openDeleteModal = () => {
  //   setVisibleDropdown(null);
  //   setIsDeleteModalVisible(true);
  // };
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const toggleDropdown = (key: string) => {
    if (visibleDropdown === key) {
      setVisibleDropdown(null); // Close if the same dropdown is clicked
    } else {
      setVisibleDropdown(key); // Open the clicked dropdown
    }
  };
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const closeEditModal = () => setIsEditModalVisible(false);

  const clickHandler = (item: {id: string}) => {
    setSingleData(item);
    toggleDropdown(item.id);
  };

  // Filter and search logic
  // const handleSearch = (value) => {
  //   setSearchTerm(value);
  //   filterStudents(value, selectedFaculty, selectedDepartment, selectedLevel);
  // };
  //open downloadResult Modal.......
  const openEditStudentModal = () => {
    setIsEditModalVisible(true);
    setVisibleDropdown(null);
  };

  //open downloadResult Modal.......
  const openDeleteStudentModal = () => {
    setIsDeleteModalVisible(true);
    setVisibleDropdown(null);
  };

  const menu = (
    <div className="">
      <Menu>
        <Menu.Item key="1" onClick={openEditStudentModal}>
          Edit Student
        </Menu.Item>
        <Menu.Item key="2" onClick={openDeleteStudentModal}>
          Delete Student
        </Menu.Item>
      </Menu>
    </div>
  );

  const columns = [
    {
      title: "Students",
      dataIndex: "first_name",
      key: "first_name",
      render: (_: string, record: {first_name: string}) => (
        <div className="flex items-center gap-2">
          {/* Dummy avatar */}
          <div className="w-fit">
            {/* <img
              src={images.Paul}
              alt="user"
              className="w-8 h-8 rounded-full mr-3"
            /> */}
            <CgProfile size={"30px"} />
          </div>
          <span>{record.first_name}</span>
        </div>
      ),
    },
    {
      title: "Matric No",
      dataIndex: "identifier",
      key: "identifier",
    },
    {
      title: "Faculty",
      dataIndex: "faculty_name",
      key: "faculty_name",
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Action",
      key: "action",
      render: (text: {id: string}) => (
        <Dropdown
          overlay={menu}
          visible={visibleDropdown === text.id}
          onVisibleChange={() => clickHandler(text)}
          trigger={["click"]}
          className=""
        >
          <button className="">
            <img src={images.DotsThree} alt="DotsThree" />
          </button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="mt-10 bg-gray-50">
      {/* Search and Filters */}
      <div className="mb-5 flex items-center gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#6e7485]">Search</label>

          <input
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for student"
            className="w-[200px] rounded border px-3 py-2 text-[#8c94a3]"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">
              Faculty
            </label>
            <select
              onChange={(e) => setFacultyId(e.target.value)}
              className="w-[200px] rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Faculty</option>
              {facultyList?.map((item, index) => {
                return (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">
              Department
            </label>

            <select
              onChange={(e) => setDepartment(e.target.value)}
              className="w-[200px] rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Department</option>
              {departmentList?.map((item) => {
                return <option value={item?.id}>{item?.name}</option>;
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">Level</label>
            <select
              onChange={(e) => setLevel(e.target.value)}
              className="w-[200px] rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Level</option>
              <option>400</option>
              <option>300</option>
              <option>200</option>
              <option>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <LoadingAnimation loading={isLoading} isRefetching={isRefetching}>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize: 10,
          }}
          className="custom-table"
        />
      </LoadingAnimation>

      {isEditModalVisible && (
        <EditNewStudentModal
          data={singleData}
          isModalOpen={isEditModalVisible}
          handleCancel={closeEditModal}
        />
      )}

      {isDeleteModalVisible && (
        <DeleteStudentModal
          data={singleData}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default StudentTable;
