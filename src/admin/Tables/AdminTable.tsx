import { useState } from "react";
import { Button, Table } from "antd";
import ImportImgs from "../components/ImportImgs";
import DeleteAddmin from "../Pages/Modals/AddminManager/DeleteAddmin";
import useGetAdmin from "../hooks/getData/useGetAdmin";
import LoadingAnimation from "../components/LoadingAnimation.tsx";

const AdminTable = () => {
  const images = ImportImgs();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [adminId, setAdminId] = useState<string | undefined>();

  //-------DELETE MODAL LOGIC----------
  const handleCancel = () => setOpenDeleteModal(false);

  const { data, isLoading, isRefetching } = useGetAdmin();

  const clickHandler = (item: string) => {
    setAdminId(item);
    setOpenDeleteModal(true);
  };

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
      render: (item?: {phone_number: string}) => {
        return <p>{item?.phone_number ? item?.phone_number : "----"}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item: string) => (
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
      <LoadingAnimation loading={isLoading} isRefetching={isRefetching}>
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
        <DeleteAddmin data={{ id: adminId }} handleCancel={handleCancel} />
      )}
    </>
  );
};

export default AdminTable;
