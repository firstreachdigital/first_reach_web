import { useEffect, useState } from "react";
import {
  Table, Button, Modal, Form, Input, Switch, Space,
  Tag, Popconfirm, Tooltip, App, theme, Upload, Rate
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import API from "../api/axios";

const { TextArea } = Input;

function TestimonialsInner() {
  const { message } = App.useApp();
  const { token }   = theme.useToken();

  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form]                    = Form.useForm();
  const [saving, setSaving]       = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/testimonials/all");
      setItems(data);
    } catch { message.error("Failed to fetch testimonials"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setAvatarUrl("");
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      name:     record.name,
      role:     record.role,
      quote:    record.quote,
      stars:    record.stars,
      order:    record.order,
      isActive: record.isActive,
    });
    setAvatarUrl(record.avatar || "");
    setModalOpen(true);
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const { data } = await API.post("/testimonials/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAvatarUrl(data.url);
      onSuccess(data);
      message.success("Avatar uploaded");
    } catch (err) {
      onError(err);
      message.error("Upload failed");
    } finally { setUploading(false); }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const payload = { ...values, avatar: avatarUrl };
      if (editing) {
        await API.put(`/testimonials/${editing._id}`, payload);
        message.success("Testimonial updated");
      } else {
        await API.post("/testimonials", payload);
        message.success("Testimonial created");
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      if (err?.response?.data?.message) message.error(err.response.data.message);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/testimonials/${id}`);
      message.success("Deleted");
      fetchItems();
    } catch { message.error("Delete failed"); }
  };

  const columns = [
    {
      title: "Avatar", dataIndex: "avatar", key: "avatar", width: 80, align: "center",
      render: (v) => v
        ? <img src={v} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
        : <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#222", display: "grid", placeItems: "center", color: "#555" }}>?</div>,
    },
    { title: "Name", dataIndex: "name", key: "name", width: 140 },
    { title: "Role", dataIndex: "role", key: "role", width: 160 },
    { title: "Quote", dataIndex: "quote", key: "quote", ellipsis: true },
    {
      title: "Stars", dataIndex: "stars", key: "stars", width: 130,
      render: (v) => <Rate disabled defaultValue={v} style={{ fontSize: 12 }} />,
    },
    { title: "Order", dataIndex: "order", key: "order", width: 70 },
    {
      title: "Status", dataIndex: "isActive", key: "isActive", width: 90,
      render: (v) => v ? <Tag color="green">Active</Tag> : <Tag>Hidden</Tag>,
    },
    {
      title: "Actions", key: "actions", width: 110,
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          </Tooltip>
          <Popconfirm title="Delete this testimonial?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, color: token.colorTextHeading }}>Testimonials</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>New Testimonial</Button>
      </div>

      <Table rowKey="_id" columns={columns} dataSource={items}
        loading={loading} pagination={{ pageSize: 10 }} scroll={{ x: 900 }} />

      <Modal
        title={editing ? "Edit Testimonial" : "New Testimonial"}
        open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)}
        okText={editing ? "Update" : "Create"} confirmLoading={saving}
        width={560}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Client Name" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="e.g. James R." />
          </Form.Item>
          <Form.Item name="role" label="Role / Company">
            <Input placeholder="e.g. CEO, TechFlow" />
          </Form.Item>
          <Form.Item name="quote" label="Testimonial Quote" rules={[{ required: true, message: "Required" }]}>
            <TextArea rows={4} placeholder="What the client said..." />
          </Form.Item>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item name="stars" label="Rating" initialValue={5}>
              <Rate />
            </Form.Item>
            <Form.Item name="order" label="Order" initialValue={0}>
              <Input type="number" min={0} />
            </Form.Item>
          </div>

          {/* Avatar Upload */}
          <Form.Item label="Client Avatar">
            <Upload accept="image/*" showUploadList={false} customRequest={handleUpload} maxCount={1}>
              <Button icon={uploading ? <LoadingOutlined /> : <UploadOutlined />} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Avatar"}
              </Button>
            </Upload>
            {avatarUrl && (
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}>
                <img src={avatarUrl} alt="avatar" style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }} />
                <Button size="small" danger onClick={() => setAvatarUrl("")}>Remove</Button>
              </div>
            )}
          </Form.Item>

          <Form.Item name="isActive" label="Status" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Active" unCheckedChildren="Hidden" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default function Testimonials() {
  return <App><TestimonialsInner /></App>;
}
