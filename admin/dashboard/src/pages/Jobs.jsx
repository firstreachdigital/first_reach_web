import { useEffect, useState } from "react";
import {
  Table, Button, Modal, Form, Input, Switch, Space,
  Tag, Popconfirm, Tooltip, Select, App
} from "antd";
import {
  PlusOutlined, EditOutlined, DeleteOutlined,
  EyeOutlined, EyeInvisibleOutlined
} from "@ant-design/icons";
import API from "../api/axios";

const { TextArea } = Input;

const DEPARTMENTS = ["Design", "Development", "Marketing", "Strategy", "Other"];
const TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

function JobsInner() {
  const { message } = App.useApp();
  const [jobs, setJobs]           = useState([]);
  const [loading, setLoading]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form]                    = Form.useForm();
  const [saving, setSaving]       = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/careers/jobs/all");
      setJobs(data);
    } catch {
      message.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      title:       record.title,
      department:  record.department,
      type:        record.type,
      location:    record.location,
      experience:  record.experience,
      description: record.description,
      tags:        record.tags?.join(", "),
      isActive:    record.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const payload = {
        ...values,
        tags: values.tags ? values.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      };
      if (editing) {
        await API.put(`/careers/jobs/${editing._id}`, payload);
        message.success("Job updated");
      } else {
        await API.post("/careers/jobs", payload);
        message.success("Job created");
      }
      setModalOpen(false);
      fetchJobs();
    } catch (err) {
      if (err?.response?.data?.message) message.error(err.response.data.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/careers/jobs/${id}`);
      message.success("Job deleted");
      fetchJobs();
    } catch {
      message.error("Delete failed");
    }
  };

  const toggleActive = async (record) => {
    try {
      await API.put(`/careers/jobs/${record._id}`, { isActive: !record.isActive });
      message.success(record.isActive ? "Job hidden" : "Job published");
      fetchJobs();
    } catch {
      message.error("Failed to update");
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", ellipsis: true, width: 200 },
    {
      title: "Department", dataIndex: "department", key: "department", width: 120,
      render: (v) => <Tag color="purple">{v}</Tag>,
    },
    { title: "Type", dataIndex: "type", key: "type", width: 110 },
    { title: "Location", dataIndex: "location", key: "location", width: 140 },
    { title: "Experience", dataIndex: "experience", key: "experience", width: 120 },
    {
      title: "Status", dataIndex: "isActive", key: "isActive", width: 100,
      render: (v) => v ? <Tag color="green">Active</Tag> : <Tag color="default">Hidden</Tag>,
    },
    {
      title: "Actions", key: "actions", width: 140,
      render: (_, record) => (
        <Space>
          <Tooltip title={record.isActive ? "Hide" : "Publish"}>
            <Button
              type="text"
              icon={record.isActive ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={() => toggleActive(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          </Tooltip>
          <Popconfirm title="Delete this job?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
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
        <h2 style={{ margin: 0 }}>Job Postings</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>New Job</Button>
      </div>

      <Table rowKey="_id" columns={columns} dataSource={jobs} loading={loading} pagination={{ pageSize: 10 }} scroll={{ x: 900 }} />

      <Modal
        title={editing ? "Edit Job" : "New Job"}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => setModalOpen(false)}
        okText={editing ? "Update" : "Create"}
        confirmLoading={saving}
        width={680}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title" label="Job Title" rules={[{ required: true, message: "Title is required" }]}>
            <Input placeholder="e.g. Senior React Developer" />
          </Form.Item>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item name="department" label="Department" rules={[{ required: true, message: "Required" }]}>
              <Select placeholder="Select department">
                {DEPARTMENTS.map((d) => <Select.Option key={d} value={d}>{d}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item name="type" label="Job Type">
              <Select placeholder="Select type">
                {TYPES.map((t) => <Select.Option key={t} value={t}>{t}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item name="location" label="Location">
              <Input placeholder="e.g. Remote / Kochi" />
            </Form.Item>

            <Form.Item name="experience" label="Experience">
              <Input placeholder="e.g. 2–4 years" />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Description is required" }]}>
            <TextArea rows={4} placeholder="Job description..." />
          </Form.Item>

          <Form.Item name="tags" label="Tags (comma separated)">
            <Input placeholder="e.g. React, Figma, Node.js" />
          </Form.Item>

          <Form.Item name="isActive" label="Active" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Active" unCheckedChildren="Hidden" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default function Jobs() {
  return <App><JobsInner /></App>;
}
