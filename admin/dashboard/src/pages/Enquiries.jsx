import { useEffect, useState } from "react";
import {
  Table, Tag, Select, App, Button, Popconfirm,
  Tooltip, Tabs, Modal, Form, Input
} from "antd";
import { ReloadOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import API from "../api/axios";

const STATUS_COLORS = { New: "blue", Read: "orange", Replied: "green" };
const FAQ_CATEGORIES = ["General Ask", "Job Career", "Pricing & Plan"];
const { TextArea } = Input;

function EnquiriesInner() {
  const { message } = App.useApp();

  // Enquiries state
  const [enquiries, setEnquiries] = useState([]);
  const [eLoading, setELoading]   = useState(false);

  // FAQ state
  const [faqs, setFaqs]           = useState([]);
  const [fLoading, setFLoading]   = useState(false);
  const [faqModal, setFaqModal]   = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm]                 = Form.useForm();
  const [saving, setSaving]       = useState(false);

  // ── Enquiries ──
  const fetchEnquiries = async () => {
    setELoading(true);
    try {
      const { data } = await API.get("/enquiries");
      setEnquiries(data);
    } catch { message.error("Failed to fetch enquiries"); }
    finally { setELoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/enquiries/${id}`, { status });
      message.success("Status updated");
      fetchEnquiries();
    } catch { message.error("Failed to update"); }
  };

  const deleteEnquiry = async (id) => {
    try {
      await API.delete(`/enquiries/${id}`);
      message.success("Enquiry deleted");
      fetchEnquiries();
    } catch { message.error("Delete failed"); }
  };

  // ── FAQs ──
  const fetchFAQs = async () => {
    setFLoading(true);
    try {
      const { data } = await API.get("/faqs/all");
      setFaqs(data);
    } catch { message.error("Failed to fetch FAQs"); }
    finally { setFLoading(false); }
  };

  useEffect(() => { fetchEnquiries(); fetchFAQs(); }, []);

  const openCreateFaq = () => {
    setEditingFaq(null);
    faqForm.resetFields();
    setFaqModal(true);
  };

  const openEditFaq = (record) => {
    setEditingFaq(record);
    faqForm.setFieldsValue({
      question: record.question,
      answer:   record.answer,
      category: record.category,
      order:    record.order,
      isActive: record.isActive,
    });
    setFaqModal(true);
  };

  const handleFaqSave = async () => {
    try {
      const values = await faqForm.validateFields();
      setSaving(true);
      if (editingFaq) {
        await API.put(`/faqs/${editingFaq._id}`, values);
        message.success("FAQ updated");
      } else {
        await API.post("/faqs", values);
        message.success("FAQ created");
      }
      setFaqModal(false);
      fetchFAQs();
    } catch (err) {
      if (err?.response?.data?.message) message.error(err.response.data.message);
    } finally { setSaving(false); }
  };

  const deleteFaq = async (id) => {
    try {
      await API.delete(`/faqs/${id}`);
      message.success("FAQ deleted");
      fetchFAQs();
    } catch { message.error("Delete failed"); }
  };

  // ── Enquiries columns ──
  const enquiryColumns = [
    { title: "Name", dataIndex: "fullName", key: "fullName", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 200, ellipsis: true },
    { title: "Phone", dataIndex: "phone", key: "phone", width: 130, render: (v) => v || "—" },
    {
      title: "Message", dataIndex: "message", key: "message", ellipsis: true,
      render: (v) => <span style={{ color: "#aaa" }}>{v}</span>,
    },
    {
      title: "Newsletter", dataIndex: "subscribeNewsletter", key: "subscribeNewsletter", width: 110,
      render: (v) => v ? <Tag color="cyan">Yes</Tag> : <Tag>No</Tag>,
    },
    {
      title: "Date", dataIndex: "createdAt", key: "createdAt", width: 120,
      render: (v) => new Date(v).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    },
    {
      title: "Status", key: "status", width: 150,
      render: (_, r) => (
        <Select value={r.status} onChange={(val) => updateStatus(r._id, val)} style={{ width: 120 }} size="small">
          {Object.keys(STATUS_COLORS).map((s) => (
            <Select.Option key={s} value={s}>
              <Tag color={STATUS_COLORS[s]} style={{ margin: 0 }}>{s}</Tag>
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action", key: "action", width: 80,
      render: (_, r) => (
        <Popconfirm title="Delete this enquiry?" onConfirm={() => deleteEnquiry(r._id)} okText="Yes" cancelText="No">
          <Tooltip title="Delete"><Button type="text" danger icon={<DeleteOutlined />} /></Tooltip>
        </Popconfirm>
      ),
    },
  ];

  // ── FAQ columns ──
  const faqColumns = [
    { title: "Question", dataIndex: "question", key: "question", ellipsis: true },
    {
      title: "Category", dataIndex: "category", key: "category", width: 140,
      render: (v) => <Tag color="purple">{v}</Tag>,
    },
    { title: "Order", dataIndex: "order", key: "order", width: 80 },
    {
      title: "Status", dataIndex: "isActive", key: "isActive", width: 100,
      render: (v) => v ? <Tag color="green">Active</Tag> : <Tag>Hidden</Tag>,
    },
    {
      title: "Actions", key: "actions", width: 120,
      render: (_, r) => (
        <Tooltip title="Edit">
          <Button type="text" icon={<EditOutlined />} onClick={() => openEditFaq(r)} />
          <Popconfirm title="Delete this FAQ?" onConfirm={() => deleteFaq(r._id)} okText="Yes" cancelText="No">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

  const tabItems = [
    {
      key: "enquiries",
      label: "Enquiries",
      children: (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <Button icon={<ReloadOutlined />} onClick={fetchEnquiries}>Refresh</Button>
          </div>
          <Table
            rowKey="_id" columns={enquiryColumns} dataSource={enquiries}
            loading={eLoading} pagination={{ pageSize: 10 }} scroll={{ x: 900 }}
            expandable={{
              expandedRowRender: (r) => (
                <div style={{ padding: "8px 16px", color: "#aaa" }}>
                  <strong style={{ color: "#fff" }}>Message:</strong> {r.message}
                </div>
              ),
            }}
          />
        </>
      ),
    },
    {
      key: "faqs",
      label: "FAQ Management",
      children: (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span />
            <Button type="primary" icon={<PlusOutlined />} onClick={openCreateFaq}>New FAQ</Button>
          </div>
          <Table
            rowKey="_id" columns={faqColumns} dataSource={faqs}
            loading={fLoading} pagination={{ pageSize: 10 }}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Enquiries & FAQs</h2>

      <Tabs items={tabItems} />

      {/* FAQ Modal */}
      <Modal
        title={editingFaq ? "Edit FAQ" : "New FAQ"}
        open={faqModal}
        onOk={handleFaqSave}
        onCancel={() => setFaqModal(false)}
        okText={editingFaq ? "Update" : "Create"}
        confirmLoading={saving}
        width={600}
      >
        <Form form={faqForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="question" label="Question" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="FAQ question" />
          </Form.Item>
          <Form.Item name="answer" label="Answer" rules={[{ required: true, message: "Required" }]}>
            <TextArea rows={4} placeholder="FAQ answer" />
          </Form.Item>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item name="category" label="Category" initialValue="General Ask">
              <Select>
                {FAQ_CATEGORIES.map((c) => <Select.Option key={c} value={c}>{c}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item name="order" label="Order" initialValue={0}>
              <Input type="number" min={0} />
            </Form.Item>
          </div>
          <Form.Item name="isActive" label="Status" initialValue={true}>
            <Select>
              <Select.Option value={true}>Active</Select.Option>
              <Select.Option value={false}>Hidden</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default function Enquiries() {
  return <App><EnquiriesInner /></App>;
}
