import { useEffect, useState } from "react";
import {
  Table, Button, Modal, Form, Input, Select, Space,
  Tag, Popconfirm, Tooltip, App, theme
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import API from "../api/axios";

const ROLE_COLORS = { superadmin: "red", staff: "blue" };

const ROLE_PERMISSIONS = {
  superadmin: ["All Access — Full control over everything"],
  staff: [
    "Portfolio", "Blogs", "Jobs", "Job Applications",
    "Testimonials", "Enquiries & FAQs",
  ],
};

function UsersInner() {
  const { message } = App.useApp();
  const { token }   = theme.useToken();

  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form]                    = Form.useForm();
  const [saving, setSaving]       = useState(false);

  const currentUserId = null; // we don't need it client-side, backend handles self-protection

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch { message.error("Failed to fetch users"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({ name: record.name, email: record.email, role: record.role, password: "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      // Remove empty password on edit
      if (editing && !values.password) delete values.password;

      if (editing) {
        await API.put(`/users/${editing._id}`, values);
        message.success("User updated");
      } else {
        await API.post("/users", values);
        message.success("User created");
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      if (err?.response?.data?.message) message.error(err.response.data.message);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      message.success("User deleted");
      fetchUsers();
    } catch (err) {
      message.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const columns = [
    { title: "Name",  dataIndex: "name",  key: "name",  width: 180 },
    { title: "Email", dataIndex: "email", key: "email", ellipsis: true },
    {
      title: "Role", dataIndex: "role", key: "role", width: 130,
      render: (v) => <Tag color={ROLE_COLORS[v] || "default"}>{v?.toUpperCase()}</Tag>,
    },
    {
      title: "Permissions", dataIndex: "role", key: "permissions",
      render: (v) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {(ROLE_PERMISSIONS[v] || []).map((p) => (
            <Tag key={p} style={{ fontSize: 11 }}>{p}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Created", dataIndex: "createdAt", key: "createdAt", width: 130,
      render: (v) => new Date(v).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    },
    {
      title: "Actions", key: "actions", width: 110,
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          </Tooltip>
          <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, color: token.colorTextHeading }}>Users & Roles</h2>
          <p style={{ margin: 0, color: token.colorTextSecondary, fontSize: 13 }}>
            Manage staff accounts and their access permissions
          </p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>New User</Button>
      </div>

      {/* Role legend */}
      <div style={{
        display: "flex", gap: 16, marginBottom: 20, padding: "14px 20px",
        background: token.colorBgContainer, borderRadius: 12,
        border: `1px solid ${token.colorBorderSecondary}`,
      }}>
        {Object.entries(ROLE_PERMISSIONS).map(([role, perms]) => (
          <div key={role} style={{ flex: 1 }}>
            <Tag color={ROLE_COLORS[role]} style={{ marginBottom: 8, fontWeight: 700 }}>
              {role.toUpperCase()}
            </Tag>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {perms.map((p) => <Tag key={p} style={{ fontSize: 11 }}>{p}</Tag>)}
            </div>
          </div>
        ))}
      </div>

      <Table rowKey="_id" columns={columns} dataSource={users}
        loading={loading} pagination={{ pageSize: 10 }} />

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <KeyOutlined style={{ color: token.colorPrimary }} />
            {editing ? "Edit User" : "Create New User"}
          </div>
        }
        open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)}
        okText={editing ? "Update" : "Create"} confirmLoading={saving}
        width={480}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="e.g. John Doe" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email required" }]}>
            <Input placeholder="user@firstreach.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label={editing ? "New Password (leave blank to keep current)" : "Password"}
            rules={editing ? [] : [{ required: true, min: 6, message: "Min 6 characters" }]}
          >
            <Input.Password placeholder={editing ? "Leave blank to keep current" : "Min 6 characters"} />
          </Form.Item>
          <Form.Item name="role" label="Role" initialValue="staff" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="superadmin">
                <Tag color="red">SUPERADMIN</Tag> — Full access
              </Select.Option>
              <Select.Option value="staff">
                <Tag color="blue">STAFF</Tag> — Limited access
              </Select.Option>
            </Select>
          </Form.Item>

          {/* Permission preview */}
          <Form.Item noStyle shouldUpdate={(prev, cur) => prev.role !== cur.role}>
            {({ getFieldValue }) => {
              const role = getFieldValue("role") || "staff";
              return (
                <div style={{
                  padding: "10px 14px", borderRadius: 8,
                  background: token.colorFillTertiary,
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}>
                  <p style={{ margin: "0 0 6px", fontSize: 12, color: token.colorTextSecondary }}>
                    Permissions for this role:
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {(ROLE_PERMISSIONS[role] || []).map((p) => (
                      <Tag key={p} style={{ fontSize: 11 }}>{p}</Tag>
                    ))}
                  </div>
                </div>
              );
            }}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default function UsersRoles() {
  return <App><UsersInner /></App>;
}
