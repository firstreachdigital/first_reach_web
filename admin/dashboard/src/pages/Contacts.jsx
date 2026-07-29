import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Select, Tag, message, Space, Card, Modal, Descriptions } from "antd";
import { DeleteOutlined, MailOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import API from "../api/axios";

const { Option } = Select;

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/contacts");
      setContacts(data);
    } catch (error) {
      message.error("Failed to fetch contacts");
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/contacts/${id}`, { status });
      message.success("Status updated");
      fetchContacts();
    } catch {
      message.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      message.success("Contact deleted");
      fetchContacts();
    } catch {
      message.error("Failed to delete contact");
    }
  };

  const handleView = (record) => {
    setSelectedContact(record);
    setViewModalOpen(true);
    // optional: auto-mark as "read" when opened, only if it's still "new"
    if (record.status === "new") {
      handleStatusChange(record._id, "read");
    }
  };

  const filteredContacts = contacts.filter((c) =>
    filter === "all" ? true : c.status === filter
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 130,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status, record) => (
        <Select
          value={status}
          onChange={(val) => handleStatusChange(record._id, val)}
          style={{ width: 120 }}
          size="small"
        >
          <Option value="new">
            <Tag color="blue">New</Tag>
          </Option>
          <Option value="read">
            <Tag color="orange">Read</Tag>
          </Option>
          <Option value="replied">
            <Tag color="green">Replied</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Popconfirm
            title="Delete this contact?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Space style={{ marginBottom: 16 }} size="middle">
          <h2 style={{ margin: 0 }}>
            <MailOutlined /> Contact Submissions
          </h2>
          <Button icon={<ReloadOutlined />} onClick={fetchContacts} loading={loading}>
            Refresh
          </Button>
          <Select
            value={filter}
            onChange={setFilter}
            style={{ width: 140 }}
          >
            <Option value="all">All ({contacts.length})</Option>
            <Option value="new">New ({contacts.filter((c) => c.status === "new").length})</Option>
            <Option value="read">Read ({contacts.filter((c) => c.status === "read").length})</Option>
            <Option value="replied">Replied ({contacts.filter((c) => c.status === "replied").length})</Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredContacts}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Contact Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedContact && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Name">{selectedContact.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedContact.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedContact.phone}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={selectedContact.status === "new" ? "blue" : selectedContact.status === "read" ? "orange" : "green"}>
                {selectedContact.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {new Date(selectedContact.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Message">
              <div style={{ whiteSpace: "pre-wrap" }}>{selectedContact.message}</div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}