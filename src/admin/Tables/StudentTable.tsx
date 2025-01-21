import React, { useState } from "react";
import { Table, Input, Select, Pagination, Menu, Dropdown } from "antd";
import ImportImgs from "../components/ImportImgs";
import useGetStudent from "../hooks/getData/useGetStudent";
import LoadingAnimation from "../components/loadingAnimation";
import EditNewStudentModal from "../Pages/Modals/StudentModal/EditNewStudentModal";
import DeleteDepartmentModal from "../Pages/Modals/DeleteDepartmentModal";
import useGetFaculty from "../hooks/getData/useGetFaculty";
import useGetDepartment from "../hooks/getData/useGetDepartment";
import { CgProfile } from "react-icons/cg";

const { Option } = Select;
const { Search } = Input;

const StudentTable = () => {
  const images = ImportImgs();

  const [singleData, setSingleData] = useState(null)

  const [facultyId, setFacultyId] = useState("")
  const [department, setDepartment] = useState("")
  const [level, setLevel] = useState("")
  const [keyword, setKeyword] = useState("")

  const { data: facultyList } = useGetFaculty()
  const { data: departmentList } = useGetDepartment(facultyId)


  const { data, isLoading, isRefetching } = useGetStudent(facultyId, department, keyword, level)



  const [visibleDropdown, setVisibleDropdown] = useState(null);
  // Sample data
  const studentData = [
    {
      key: 1,
      name: "Tajudeen Abass",
      matric: "WCH-12KE",
      faculty: "Arts",
      department: "Mass Comm",
      level: "200",
    },
    {
      key: 2,
      name: "Sarah Brown",
      matric: "WCH-12KE",
      faculty: "Arts",
      department: "Mass Comm",
      level: "200",
    },
    {
      key: 3,
      name: "Micheal Owen",
      matric: "WCH-12KE",
      faculty: "Arts",
      department: "Mass Comm",
      level: "200",
    },
    {
      key: 4,
      name: "Mary Jane",
      matric: "WCH-12KE",
      faculty: "Arts",
      department: "Mass Comm",
      level: "200",
    },
    {
      key: 5,
      name: "Peter Dodle",
      matric: "WCH-12KE",
      faculty: "Arts",
      department: "Mass Comm",
      level: "200",
    },
    {
      key: 6,
      name: "John Doe",
      matric: "WCH-12KE",
      faculty: "Engineering",
      department: "Chemical",
      level: "200",
    },
    // Add more students as needed
  ];

  const openDeleteModal = () => {
    setVisibleDropdown(null)
    setIsDeleteModalVisible(true);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const toggleDropdown = (key) => {
    if (visibleDropdown === key) {
      setVisibleDropdown(null); // Close if the same dropdown is clicked
    } else {
      setVisibleDropdown(key); // Open the clicked dropdown
    }
  };
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(studentData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;
  const closeEditModal = () => setIsEditModalVisible(false);

  const clickHandler = (item) => {
    setSingleData(item)
    toggleDropdown(item.id)
  }

  // Filter and search logic
  const handleSearch = (value) => {
    setSearchTerm(value);
    filterStudents(value, selectedFaculty, selectedDepartment, selectedLevel);
  };
  //open downloadResult Modal.......
  const openEditStudentModal = () => {
    setIsEditModalVisible(true)
    setVisibleDropdown(null)
  };

  //open downloadResult Modal.......
  const openDeleteStudentModal = () => {
    setIsDeleteModalVisible(true)
    setVisibleDropdown(null)
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

  const handleFilterChange = (field, value) => {
    if (field === "faculty") setSelectedFaculty(value);
    if (field === "department") setSelectedDepartment(value);
    if (field === "level") setSelectedLevel(value);

    filterStudents(
      searchTerm,
      field === "faculty" ? value : selectedFaculty,
      field === "department" ? value : selectedDepartment,
      field === "level" ? value : selectedLevel
    );
  };

  const filterStudents = (search, faculty, department, level) => {
    let filtered = studentData;

    if (search) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (faculty) {
      filtered = filtered.filter((student) => student.faculty === faculty);
    }

    if (department) {
      filtered = filtered.filter(
        (student) => student.department === department
      );
    }

    if (level) {
      filtered = filtered.filter((student) => student.level === level);
    }

    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Students",
      dataIndex: "first_name",
      key: "first_name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          {/* Dummy avatar */}
          <div className=" w-fit " >
            {/* <img
              src={images.Paul}
              alt="user"
              className="w-8 h-8 rounded-full mr-3"
            /> */}
            <CgProfile size={"30px"} />
          </div>
          <span>{record.first_name
          }</span>
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
      render: (text) => (
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

  // Pagination
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  return (
    <div className=" mt-10 bg-gray-50">
      {/* Search and Filters */}
      <div className="flex gap-2 items-center mb-5">
        {/* <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#6e7485]">Search</label>
          <Input
            prefix={<img src={images.SearchIcon} alt="search" />}
            placeholder="Search test..."
            onSearch={handleSearch}
            style={{
              width: "100%",
              marginBottom: 16,
              fontSize: "14px",
              fontWeight: "400",
            }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div> */}

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#6e7485]">
            Search
          </label>

          <input
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for student"
            className="border px-3 py-2 w-[200px] rounded text-[#8c94a3]"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">
              Faculty
            </label>
            <select
              onChange={(e) => setFacultyId(e.target.value)}
              placeholder={"Select Faculty"}
              className="border px-3 py-2 w-[200px] rounded text-[#8c94a3]"
            >
              <option value={""} >Select Faculty</option>
              {facultyList?.map((item, index) => {
                return (
                  <option key={index} value={item?.id} >{item?.name}</option>
                )
              })}
            </select>
          </div>


          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">
              Department
            </label>

            <select
              onChange={(e) => setDepartment(e.target.value)}
              className="border px-3 py-2 w-[200px] rounded text-[#8c94a3]"
            >
              <option value={""} >Select Department</option>
              {departmentList?.map((item) => {
                return (
                  <option value={item?.id} >{item?.name}</option>
                )
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">Level</label>
            <select
              onChange={(e) => setLevel(e.target.value)}
              className="border px-3 py-2 w-[200px] rounded text-[#8c94a3]"
            >
              <option value={""} >Select Level</option>
              <option>400</option>
              <option>300</option>
              <option>200</option>
              <option>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <LoadingAnimation loading={isLoading} refetching={isRefetching} >
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
        <DeleteDepartmentModal data={singleData} handleCancelDelete={handleCancelDelete} />
      )}
    </div>
  );
};

export default StudentTable;
