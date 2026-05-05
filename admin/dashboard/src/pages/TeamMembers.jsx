import { useEffect, useState } from "react";
import {
  Table, Button, Modal, Form, Input, Switch, Space,
  Tag, Popconfirm, Tooltip, App, theme, Upload
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, LoadingOutlined, MinusCircleOutlined } from "@ant-design/icons";
import API from "../api/axios";

const { TextArea } = Input;

function TeamInner() {
  const { message } = App.useApp();
  const { token }   = theme.useToken();

  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form]                    = Form.useForm();
  const [saving, setSaving]       = useState(false);
  const [imgUrl, setImgUrl]       = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/team/all");
      setItems(data);
    } catch { message.error("Failed to fetch team members"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setImgUrl("");
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      name:      record.name,
      role:      record.role,
      bio:       record.bio?.length ? record.bio : [""],
      linkedin:  record.socials?.linkedin  || "",
      twitter:   record.socials?.twitter   || "",
      instagram: record.socials?.instagram || "",
      order:     record.order,
      isActive:  record.isActive,
    });
    setImgUrl(record.img || "");
    setModalOpen(true);
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("img", file);
    try {
      const { data } = await API.post("/team/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImgUrl(data.url);
      onSuccess(data);
      message.success("Image uploaded");
    } catch (err) {
      onError(err);
      message.error("Upload failed");
    } finally { setUploading(false); }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const payload = {
        name:     values.name,
        role:     values.role,
        bio:      (values.bio || []).filter(Boolean),
        img:      imgUrl,
        order:    values.order,
        isActive: values.isActive,
        socials: {
          linkedin:  values.linkedin  || "",
          twitter:   values.twitter   || "",
          instagram: values.instagram || "",
        },
      };
      if (editing) {
        await API.put(`/team/${editing._id}`, payload);
        message.success("Team member updated");
      } else {
        await API.post("/team", payload);
        message.success("Team member created");
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      if (err?.response?.data?.message) message.error(err.response.data.message);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/team/${id}`);
      message.success("Deleted");
      fetchItems();
    } catch { message.error("Delete failed"); }
  };

  const columns = [
    {
      title: "Photo", dataIndex: "img", key: "img", width: 80, align: "center",
      render: (v) => v
        ? <img src={v} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
        : <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#222", display: "grid", placeItems: "center", color: "#555" }}>?</div>,
    },
    { title: "Name",  dataIndex: "name", key: "name", width: 160 },
    { title: "Role",  dataIndex: "role", key: "role", width: 180 },
    { title: "Slug",  dataIndex: "slug", key: "slug", ellipsis: true },
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
          <Popconfirm title="Delete this member?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
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
        <h2 style={{ margin: 0, color: token.colorTextHeading }}>Team Members</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>New Member</Button>
      </div>

      <Table rowKey="_id" columns={columns} dataSource={items}
        loading={loading} pagination={{ pageSize: 10 }} scroll={{ x: 800 }} />

      <Modal
        title={editing ? "Edit Team Member" : "New Team Member"}
        open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)}
        okText={editing ? "Update" : "Create"} confirmLoading={saving}
        width={620}
        styles={{ body: { maxHeight: "72vh", overflowY: "auto", paddingRight: 4 } }}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Required" }]}>
              <Input placeholder="e.g. Alex Johnson" />
            </Form.Item>
            <Form.Item name="role" label="Role / Title">
              <Input placeholder="e.g. Creative Director" />
            </Form.Item>
          </div>

          {/* Bio paragraphs */}
          <Form.List name="bio" initialValue={[""]}>
            {(fields, { add, remove }) => (
              <Form.Item label="Bio Paragraphs">
                {fields.map((field, i) => (
                  <div key={field.key} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <Form.Item {...field} style={{ flex: 1, margin: 0 }}>
                      <TextArea rows={3} placeholder={`Paragraph ${i + 1}`} />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} style={{ marginTop: 4 }} />
                    )}
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Paragraph
                </Button>
              </Form.Item>
            )}
          </Form.List>

          {/* Photo Upload */}
          <Form.Item label="Profile Photo">
            <Upload accept="image/*" showUploadList={false} customRequest={handleUpload} maxCount={1}>
              <Button icon={uploading ? <LoadingOutlined /> : <UploadOutlined />} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Photo"}
              </Button>
            </Upload>
            {imgUrl && (
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}>
                <img src={imgUrl} alt="preview" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }} />
                <Button size="small" danger onClick={() => setImgUrl("")}>Remove</Button>
              </div>
            )}
          </Form.Item>

          {/* Socials */}
          <Form.Item label="Social Links">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Form.Item name="linkedin" noStyle>
                <Input prefix="LinkedIn:" placeholder="https://linkedin.com/in/..." />
              </Form.Item>
              <Form.Item name="twitter" noStyle>
                <Input prefix="Twitter:" placeholder="https://twitter.com/..." />
              </Form.Item>
              <Form.Item name="instagram" noStyle>
                <Input prefix="Instagram:" placeholder="https://instagram.com/..." />
              </Form.Item>
            </div>
          </Form.Item>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item name="order" label="Order" initialValue={0}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="isActive" label="Status" valuePropName="checked" initialValue={true}>
              <Switch checkedChildren="Active" unCheckedChildren="Hidden" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default function TeamPage() {
  return <App><TeamInner /></App>;
}
