import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Switch, Upload, message, Popconfirm, Space, Card, Image } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, ReloadOutlined, PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import API from "../api/axios";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(""); // ✅ separate state

  useEffect(() => { fetchClients(); }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/clients/all");
      setClients(data);
    } catch {
      message.error("Failed to fetch clients");
    }
    setLoading(false);
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("logo", file);
    try {
      const { data } = await API.post("/clients/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      form.setFieldsValue({ logo: data.url });
      setLogoUrl(data.url); // ✅ state update
      onSuccess(data);
      message.success("Logo uploaded");
    } catch (err) {
      onError(err);
      message.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingClient) {
        await API.patch(`/clients/${editingClient._id}`, values);
        message.success("Client updated");
      } else {
        await API.post("/clients", values);
        message.success("Client created");
      }
      setModalOpen(false);
      form.resetFields();
      setLogoUrl(""); // ✅ reset
      setEditingClient(null);
      fetchClients();
    } catch {
      message.error("Operation failed");
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    form.setFieldsValue(client);
    setLogoUrl(client.logo || ""); // ✅ state set
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/clients/${id}`);
      message.success("Client deleted");
      fetchClients();
    } catch {
      message.error("Delete failed");
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    form.resetFields();
    setLogoUrl(""); // ✅ reset
    setEditingClient(null);
  };

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 100,
      render: (logo) => (
        <Image
          src={logo} // ✅ direct, full URL
          width={60}
          height={40}
          style={{ objectFit: "contain" }}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name", width: 200 },
    { title: "Order", dataIndex: "order", key: "order", width: 80, sorter: (a, b) => a.order - b.order },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      width: 80,
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={async (checked) => {
            try {
              await API.patch(`/clients/${record._id}`, { isActive: checked });
              message.success("Status updated");
              fetchClients();
            } catch {
              message.error("Update failed");
            }
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Delete this client?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}><PictureOutlined /> Client Logos</h2>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>Add Client</Button>
          <Button icon={<ReloadOutlined />} onClick={fetchClients} loading={loading}>Refresh</Button>
        </Space>
        <Table columns={columns} dataSource={clients} rowKey="_id" loading={loading} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title={editingClient ? "Edit Client" : "Add Client"}
        open={modalOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        width={500}
        okButtonProps={{ loading }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Client Name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="e.g., Shortcode" />
          </Form.Item>

          <Form.Item name="logo" label="Logo" rules={[{ required: true, message: "Please upload a logo" }]}>
            <Input placeholder="Logo URL" disabled />
          </Form.Item>

          <Upload customRequest={handleUpload} showUploadList={false} accept="image/*">
            <Button icon={uploading ? <LoadingOutlined /> : <UploadOutlined />} loading={uploading} block style={{ marginBottom: 12 }}>
              {uploading ? "Uploading..." : "Upload Logo"}
            </Button>
          </Upload>

          {/* ✅ logoUrl state use ചെയ്യുന്നു, form.getFieldValue അല്ല */}
          {logoUrl && (
            <div style={{ marginBottom: 16, textAlign: "center" }}>
              <Image
                src={logoUrl}
                width={120}
                style={{ border: "1px solid #d9d9d9", borderRadius: 4, padding: 8 }}
              />
            </div>
          )}

          <Form.Item name="order" label="Order" initialValue={0}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="isActive" label="Active" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}