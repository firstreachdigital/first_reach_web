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

// ── Dynamic base URL — local & production both work ──
const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5000";
  console.log("BASE_URL:", BASE_URL);

function ApplicationsInner() {
  const { message } = App.useApp();
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [loading, setLoading]           = useState(false);
  const [jobFilter, setJobFilter]       = useState("all");
  const [jobOptions, setJobOptions]     = useState([]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/careers/applications");
      setApplications(data);
      setFiltered(data);

      // Build unique job options for filter dropdown
      const unique = {};
      data.forEach((a) => {
        const title = a.jobTitle || a.job?.title;
        const id    = a.job?._id || a.jobTitle;
        if (title && id && !unique[id]) unique[id] = title;
      });
      setJobOptions(Object.entries(unique).map(([id, title]) => ({ id, title })));
    } catch {
      message.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  // ── Filter by job ──
  const handleFilter = (val) => {
    setJobFilter(val);
    if (val === "all") {
      setFiltered(applications);
    } else {
      setFiltered(
        applications.filter((a) => {
          const title = a.jobTitle || a.job?.title || "";
          return title === val;
        })
      );
    }
  };

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
    { title: "Name",  dataIndex: "fullName", key: "fullName", width: 160 },
    { title: "Email", dataIndex: "email",    key: "email",    width: 200, ellipsis: true },
    { title: "Phone", dataIndex: "phone",    key: "phone",    width: 130 },
    {
      title: "Job Role", key: "job", width: 180,
      render: (_, r) => (
        <Tag color="purple">{r.jobTitle || r.job?.title || "—"}</Tag>
      ),
    },
    {
      title: "Portfolio", dataIndex: "portfolio", key: "portfolio", width: 120,
      render: (v) => v
        ? <a href={v} target="_blank" rel="noreferrer" style={{ color: "#05caf2" }}>View</a>
        : "—",
    },
    {
      title: "Applied On", dataIndex: "createdAt", key: "createdAt", width: 120,
      render: (v) => new Date(v).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      }),
    },
    {
      title: "Resume", key: "resume", width: 90,
      render: (_, r) => r.resumeUrl
        ? (
          <Tooltip title="Download Resume">
            <Button
              type="text"
              icon={<DownloadOutlined />}
              style={{ color: "#05caf2", fontSize: 20 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = `${BASE_URL}${r.resumeUrl}`;
                window.open(url, "_blank");
              }}
            />
          </Tooltip>
        )
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
            <Button type="text" danger icon={<DeleteOutlined />} style={{ fontSize: 20 }} />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12,
      }}>
        <h2 style={{ margin: 0, color: "#fff" }}>Job Applications</h2>

        <Space wrap>
          {/* ── Job Role Filter ── */}
          <Select
            value={jobFilter}
            onChange={handleFilter}
            style={{ width: 200 }}
            placeholder="Filter by Job Role"
          >
            <Select.Option value="all">All Roles</Select.Option>
            {jobOptions.map((j) => (
              <Select.Option key={j.id} value={j.title}>
                {j.title}
              </Select.Option>
            ))}
          </Select>

          <Button icon={<ReloadOutlined />} onClick={fetchApplications}>
            Refresh
          </Button>
        </Space>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <Tag key={status} color={color} style={{ padding: "4px 12px", fontSize: 13 }}>
            {status}: {applications.filter((a) => a.status === status).length}
          </Tag>
        ))}
        <Tag style={{ padding: "4px 12px", fontSize: 13 }}>
          Total: {applications.length}
        </Tag>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filtered}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1100 }}
        expandable={{
          expandedRowRender: (r) => (
            <div style={{ padding: "8px 16px", color: "#aaa" }}>
              <strong style={{ color: "#fff" }}>Cover Note: </strong>
              {r.coverNote || "No cover note provided."}
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