import React, { useState } from "react";
import { Table, Avatar, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ImportImgs from "../components/ImportImgs";
import DeleteAddmin from "../Pages/Modals/AddminManager/DeleteAddmin";
import useGetAdmin from "../hooks/getData/useGetAdmin";
import useDeleteAdmin from "../hooks/deleteData/useDeleteAdmin";
import LoadingAnimation from "../components/loadingAnimation";

const AdminTable = () => {
  const images = ImportImgs();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [adminId, setAdminId] = useState();

  //-------DELETE MODAL LOGIC----------
  const showDeleteModal = () => setOpenDeleteModal(true);
  const handleCancel = () => setOpenDeleteModal(false);

  const { data, isLoading, isRefetching } = useGetAdmin();

  const clickHandler = (item) => {
    setAdminId(item);
    setOpenDeleteModal(true);
  };

  const closeHandler = (item) => {
    setAdminId(item);
    setOpenDeleteModal(true);
  };

  const dataSource = [
    {
      key: "1",
      name: "Tajudeen Abass",
      email: "Ojasamule@gmail.com",
      level: "Super Admin",
      phone: "090323748424",
      avatar: <img src={images.Paul} alt="" />,
    },
    {
      key: "2",
      name: "Sarah Brown",
      email: "kudaisibuuraimo@gmail.com",
      level: "Admin",
      phone: "090323748424",
      avatar: <img src={images.Paul} alt="" />,
    },
    {
      key: "3",
      name: "Micheal Owen",
      email: "johnboyega@gmail.com",
      level: "Admin",
      phone: "090323748424",
      avatar: <img src={images.Paul} alt="" />,
    },
    {
      key: "4",
      name: "Mary Jane",
      email: "maryolabisi@gmail.com",
      level: "Admin",
      phone: "090323748424",
      avatar: <img src={images.Paul} alt="" />,
    },
    {
      key: "5",
      name: "Peter Dodle",
      email: "ngozicynthia@gmail.com",
      level: "Admin",
      phone: "090323748424",
      avatar: <img src={images.Paul} alt="" />,
    },
  ];

  const columns = [
    {
      title: "Admins",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Level",
      dataIndex: "type",
      key: "level",
    },
    {
      title: "Phone Number",
      key: "phone",
      render: (item) => {
        return <p>{item?.phone_number ? item?.phone_number : "----"}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Button
          onClick={() => clickHandler(item)}
          type="text"
          icon={<img src={images.DeleteIcon} alt="deleteIcon" />}
        />
      ),
    },
  ];

  return (
    <>
      <LoadingAnimation loading={isLoading} refetching={isRefetching}>
        <Table
          className="custom-table"
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize: 10,
          }} // Disable pagination if not needed
          bordered
        />
      </LoadingAnimation>

      {openDeleteModal && (
        <DeleteAddmin data={adminId} handleCancel={handleCancel} />
      )}
    </>
  );
};

export default AdminTable;
