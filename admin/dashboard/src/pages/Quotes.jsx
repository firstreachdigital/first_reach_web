import React, { useState, useEffect } from "react";
import {
  Table, Button, Popconfirm, Select, Tag, Space,
  Tooltip, Input, App,
} from "antd";
import {
  DeleteOutlined, ReloadOutlined, SaveOutlined,
} from "@ant-design/icons";
import API from "../api/axios";

const { Option } = Select;
const { TextArea } = Input;

const STATUS_COLORS = {
  new: "blue",
  contacted: "orange",
  "proposal-sent": "purple",
  closed: "green",
};

function QuotesInner() {
  const { message } = App.useApp();
  const [quotes, setQuotes]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter]   = useState("all");
  const [notes, setNotes]     = useState({});

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/quote");
      setQuotes(data);
      const init = {};
      data.forEach((q) => { init[q._id] = q.followUpNote || ""; });
      setNotes(init);
    } catch {
      message.error("Failed to fetch quotes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuotes(); }, []);

  const handleStatus = async (id, status) => {
    try {
      await API.patch(`/quote/${id}`, { status });
      message.success("Status updated");
      fetchQuotes();
    } catch {
      message.error("Failed to update status");
    }
  };

  const saveNote = async (id) => {
    try {
      await API.patch(`/quote/${id}`, { followUpNote: notes[id] });
      message.success("Note saved");
    } catch {
      message.error("Failed to save note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/quote/${id}`);
      message.success("Deleted");
      fetchQuotes();
    } catch {
      message.error("Delete failed");
    }
  };

  const filtered = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  const columns = [
    { title: "Name",    dataIndex: "fullName", key: "fullName", width: 150 },
    { title: "Email",   dataIndex: "email",    key: "email",    width: 200, ellipsis: true },
    {
      title: "Phone", key: "phone", width: 140,
      render: (_, r) => `+91 ${r.phone}`,
    },
    {
      title: "Service", dataIndex: "service", key: "service", width: 180,
      render: (v) => v ? <Tag color="purple">{v}</Tag> : "—",
    },
    {
      title: "Status", key: "status", width: 160,
      render: (_, r) => (
        <Select value={r.status} onChange={(val) => handleStatus(r._id, val)} style={{ width: 145 }} size="small">
          {Object.entries(STATUS_COLORS).map(([s, c]) => (
            <Option key={s} value={s}><Tag color={c} style={{ margin: 0 }}>{s}</Tag></Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Submitted", dataIndex: "createdAt", key: "createdAt", width: 120,
      render: (v) => new Date(v).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    },
    {
      title: "Action", key: "action", width: 70,
      render: (_, r) => (
        <Popconfirm title="Delete this lead?" onConfirm={() => handleDelete(r._id)} okText="Yes" cancelText="No">
          <Tooltip title="Delete">
            <Button type="text" danger icon={<DeleteOutlined />} style={{ fontSize: 18 }} />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ margin: 0, color: "#fff" }}>Quote Requests</h2>
        <Space wrap>
          <Select value={filter} onChange={setFilter} style={{ width: 180 }}>
            <Option value="all">All ({quotes.length})</Option>
            {Object.entries(STATUS_COLORS).map(([s, c]) => (
              <Option key={s} value={s}>
                <Tag color={c}>{s}</Tag> ({quotes.filter((q) => q.status === s).length})
              </Option>
            ))}
          </Select>
          <Button icon={<ReloadOutlined />} onClick={fetchQuotes} loading={loading}>Refresh</Button>
        </Space>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(STATUS_COLORS).map(([s, c]) => (
          <Tag key={s} color={c} style={{ padding: "4px 12px", fontSize: 13 }}>
            {s}: {quotes.filter((q) => q.status === s).length}
          </Tag>
        ))}
        <Tag style={{ padding: "4px 12px", fontSize: 13 }}>Total: {quotes.length}</Tag>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filtered}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        expandable={{
          expandedRowRender: (r) => (
            <div style={{ padding: "12px 16px" }}>
              {r.message && (
                <div style={{ marginBottom: 12 }}>
                  <strong style={{ color: "#fff" }}>Message: </strong>
                  <span style={{ color: "#aaa" }}>{r.message}</span>
                </div>
              )}
              <div>
                <strong style={{ color: "#fff", display: "block", marginBottom: 6 }}>Follow-up Note:</strong>
                <TextArea
                  rows={3}
                  value={notes[r._id] || ""}
                  onChange={(e) => setNotes((n) => ({ ...n, [r._id]: e.target.value }))}
                  placeholder="Add follow-up notes here..."
                  style={{ marginBottom: 8 }}
                />
                <Button
                  type="primary"
                  size="small"
                  icon={<SaveOutlined />}
                  onClick={() => saveNote(r._id)}
                >
                  Save Note
                </Button>
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}

export default function Quotes() {
  return <App><QuotesInner /></App>;
}
