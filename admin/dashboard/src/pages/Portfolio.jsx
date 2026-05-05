import { useEffect, useState } from "react";
import {
  Table, Button, Modal, Form, Input, Switch, Space,
  Tag, Popconfirm, Tooltip, App, theme, Upload
} from "antd";
import {
  PlusOutlined, EditOutlined, DeleteOutlined,
  UploadOutlined, LoadingOutlined,
} from "@ant-design/icons";
import API from "../api/axios";

function PortfolioInner() {
  const { message } = App.useApp();
  const { token } = theme.useToken();

  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form]                    = Form.useForm();
  const [saving, setSaving]       = useState(false);
  const [imageUrl, setImageUrl]   = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/portfolio/all");
      setItems(data);
    } catch { message.error("Failed to fetch portfolio items"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setImageUrl("");
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      title:    record.title,
      subtitle: record.subtitle,
      category: record.category,
      tags:     record.tags?.join(", "),
      color:    record.color,
      order:    record.order,
      isActive: record.isActive,
    });
    setImageUrl(record.image || "");
    setModalOpen(true);
  };

  // Custom upload handler — sends to backend, gets back URL
  const handleUpload = async ({ file, onSuccess, onError }) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const { data } = await API.post("/portfolio/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(data.url);
      onSuccess(data);
      message.success("Image uploaded");
    } catch (err) {
      onError(err);
      message.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const payload = {
        ...values,
        image: imageUrl,
        tags: values.tags
          ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      };
      if (editing) {
        await API.put(`/portfolio/${editing._id}`, payload);
        message.success("Portfolio item updated");
      } else {
        await API.post("/portfolio", payload);
        message.success("Portfolio item created");
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      if (err?.response?.data?.message) message.error(err.response.data.message);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/portfolio/${id}`);
      message.success("Deleted");
      fetchItems();
    } catch { message.error("Delete failed"); }
  };

  const columns = [
    {
      title: "Image", dataIndex: "image", key: "image", width: 80,
      render: (v) => v
        ? <img src={v} alt="" style={{ width: 50, height: 36, objectFit: "cover", borderRadius: 6 }} />
        : <span style={{ color: "#555" }}>—</span>,
    },
    { title: "Title",    dataIndex: "title",    key: "title",    ellipsis: true, width: 180 },
    { title: "Subtitle", dataIndex: "subtitle", key: "subtitle", ellipsis: true },
    {
      title: "Category", dataIndex: "category", key: "category", width: 130,
      render: (v) => <Tag color="purple">{v}</Tag>,
    },
    {
      title: "Tags", dataIndex: "tags", key: "tags", width: 180,
      render: (v) => v?.map((t) => <Tag key={t}>{t}</Tag>),
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
          <Popconfirm title="Delete this item?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
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
        <h2 style={{ margin: 0, color: token.colorTextHeading }}>Portfolio</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>New Project</Button>
      </div>

      <Table rowKey="_id" columns={columns} dataSource={items}
        loading={loading} pagination={{ pageSize: 10 }} scroll={{ x: 900 }} />

      <Modal
        title={editing ? "Edit Project" : "New Project"}
        open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)}
        okText={editing ? "Update" : "Create"} confirmLoading={saving}
        width={600}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="Project title" />
          </Form.Item>
          <Form.Item name="subtitle" label="Subtitle">
            <Input placeholder="Short description" />
          </Form.Item>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item name="category" label="Category" initialValue="Web design">
              <Input placeholder="e.g. Web design" />
            </Form.Item>
            <Form.Item name="order" label="Order" initialValue={0}>
              <Input type="number" min={0} />
            </Form.Item>
          </div>

          <Form.Item name="tags" label="Tags (comma separated)" initialValue="Web design, Portfolio">
            <Input placeholder="e.g. Web design, Branding" />
          </Form.Item>

          {/* ── Image Upload ── */}
          <Form.Item label="Project Image">
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={handleUpload}
              maxCount={1}
            >
              <Button icon={uploading ? <LoadingOutlined /> : <UploadOutlined />} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            </Upload>

            {imageUrl && (
              <div style={{ marginTop: 10, position: "relative", display: "inline-block" }}>
                <img
                  src={imageUrl}
                  alt="preview"
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8, display: "block" }}
                />
                <Button
                  size="small"
                  danger
                  style={{ position: "absolute", top: 6, right: 6 }}
                  onClick={() => setImageUrl("")}
                >
                  Remove
                </Button>
              </div>
            )}
          </Form.Item>

          <Form.Item name="color" label="Accent Color" initialValue="#05caf2">
            <Input placeholder="#05caf2" />
          </Form.Item>

          <Form.Item name="isActive" label="Status" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Active" unCheckedChildren="Hidden" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default function Portfolio() {
  return <App><PortfolioInner /></App>;
}
