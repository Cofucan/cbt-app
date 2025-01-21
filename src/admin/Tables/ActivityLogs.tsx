import { Table, Avatar } from "antd";
import ImportImgs from "../components/ImportImgs"; // Import your image module

const ActivityLog = () => {
  // Get the images object from ImportImgs
  const images = ImportImgs();

  // Mock data for admin activity logs
  const dataSource = [
    {
      key: "1",
      dateTime: "3 Aug 03:12 PM",
      admin: {
        name: "Tajudeen Abass",
        avatar: images.Avatar, // Use the Avatar image as a string (path)
      },
      role: "Super Admin",
      action: "Downloaded Result",
      affectedItem: "Result",
      ipAddress: "123.232.2.2",
    },
    {
      key: "2",
      dateTime: "3 Aug 03:12 PM",
      admin: {
        name: "Sarah Brown",
        avatar: images.Avatar2,
      },
      role: "Admin",
      action: "Created A New Test",
      affectedItem: "Test",
      ipAddress: "232.232.2",
    },
    {
      key: "3",
      dateTime: "3 Aug 03:12 PM",
      admin: {
        name: "Tajudeen Abass",
        avatar: images.Avatar, // Use the Avatar image from ImportImgs
      },
      role: "Super Admin",
      action: "Removed Student",
      affectedItem: "Student",
      ipAddress: "12.232.23",
    },
    {
      key: "4",
      dateTime: "3 Aug 03:12 PM",
      admin: {
        name: "Mary Jane",
        avatar: images.Avatar2,
      },
      role: "Admin",
      action: "Added Department",
      affectedItem: "Department",
      ipAddress: "232.232",
    },
    {
      key: "5",
      dateTime: "3 Aug 03:12 PM",
      admin: {
        name: "Tajudeen Abass",
        avatar: images.Avatar, // Use the Avatar image from ImportImgs
      },
      role: "Super Admin",
      action: "Removed Admin",
      affectedItem: "Admin",
      ipAddress: "2.233.22",
    },
  ];

  // Define table columns
  const columns = [
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Admin",
      key: "admin",
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar src={record.admin.avatar} />{" "}
          {/* Use the string path for the Avatar */}
          <span className="ml-2">{record.admin.name}</span>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Affected Item",
      dataIndex: "affectedItem",
      key: "affectedItem",
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
  ];

  return (
    <div className="container mx-auto">
      <Table
        className="custom-table"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default ActivityLog;
