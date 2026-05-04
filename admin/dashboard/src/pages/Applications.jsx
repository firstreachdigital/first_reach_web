import { useEffect, useState } from "react";
import { Table, Tag, Select, App, Button, Popconfirm, Space, Tooltip } from "antd";
import { ReloadOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import API from "../api/axios";

const STATUS_COLORS = {
  New: "blue",
  Reviewing: "orange",
  Shortlisted: "green",
  Rejected: "red",
};

function ApplicationsInner() {
  const { message } = App.useApp();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/careers/applications");
      setApplications(data);
    } catch {
      message.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/careers/applications/${id}`, { status });
      message.success("Status updated");
      fetchApplications();
    } catch {
      message.error("Failed to update status");
    }
  };

  const deleteApplication = async (id) => {
    try {
      await API.delete(`/careers/applications/${id}`);
      message.success("Application deleted");
      fetchApplications();
    } catch {
      message.error("Delete failed");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "fullName", key: "fullName", width: 160 },
    { title: "Email", dataIndex: "email", key: "email", width: 200, ellipsis: true },
    { title: "Phone", dataIndex: "phone", key: "phone", width: 130 },
    {
      title: "Job", key: "job", width: 180,
      render: (_, r) => r.jobTitle || r.job?.title || "—",
    },
    {
      title: "Portfolio", dataIndex: "portfolio", key: "portfolio", width: 160,
      render: (v) => v ? <a href={v} target="_blank" rel="noreferrer" style={{ color: "#05caf2" }}>View</a> : "—",
    },
    {
      title: "Cover Note", dataIndex: "coverNote", key: "coverNote", ellipsis: true, width: 200,
      render: (v) => v || "—",
    },
    {
      title: "Applied On", dataIndex: "createdAt", key: "createdAt", width: 120,
      render: (v) => new Date(v).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    },
    {
      title: "Resume", key: "resume", width: 100,
      render: (_, r) => r.resumeUrl
        ? <Tooltip title="Download Resume">
            <a href={`http://localhost:5000${r.resumeUrl}`} target="_blank" rel="noreferrer">
              <Button type="text" icon={<DownloadOutlined />} style={{ color: "#05caf2", fontSize: 20 }} />
            </a>
          </Tooltip>
        : <span style={{ color: "#444" }}>—</span>,
    },
    {
      title: "Status", key: "status", width: 150,
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(val) => updateStatus(record._id, val)}
          style={{ width: 130 }}
          size="small"
        >
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
      render: (_, record) => (
        <Popconfirm
          title="Delete this application?"
          onConfirm={() => deleteApplication(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Delete">
            <Button type="text" danger icon={<DeleteOutlined />} style={{fontSize:20}} />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Job Applications</h2>
        <Button icon={<ReloadOutlined />} onClick={fetchApplications}>Refresh</Button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={applications}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1100 }}
        expandable={{
          expandedRowRender: (r) => (
            <div style={{ padding: "8px 16px", color: "#aaa" }}>
              <strong style={{ color: "#fff" }}>Cover Note:</strong> {r.coverNote || "No cover note provided."}
            </div>
          ),
        }}
      />
    </div>
  );
}

export default function Applications() {
  return <App><ApplicationsInner /></App>;
}
