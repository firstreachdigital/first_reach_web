import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Select, Tag, message, Space, Card, Descriptions, Badge } from "antd";
import { DeleteOutlined, ReloadOutlined, FileTextOutlined, ShopOutlined } from "@ant-design/icons";
import API from "../api/axios";
import { useOutletContext } from "react-router-dom";
const { Option } = Select;

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const context = useOutletContext();
  const isDark = context?.isDark ?? true;

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/quote");
      setQuotes(data);
    } catch (error) {
      message.error("Failed to fetch quotes");
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/quote/${id}`, { status });
      message.success("Status updated");
      fetchQuotes();
    } catch {
      message.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/quote/${id}`);
      message.success("Quote deleted");
      fetchQuotes();
    } catch {
      message.error("Failed to delete quote");
    }
  };

  const filteredQuotes = quotes.filter((q) =>
    filter === "all" ? true : q.status === filter
  );

//   const [isDark, setIsDark] = useState(
//   document.documentElement.getAttribute("data-theme") === "dark"
// );

// useEffect(() => {
//   const observer = new MutationObserver(() => {
//     setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
//   });
//   observer.observe(document.documentElement, { 
//     attributes: true, 
//     attributeFilter: ["data-theme"] 
//   });
//   return () => observer.disconnect();
// }, []);

  const expandedRowRender = (record) => (
    <div style={{ padding: "16px 24px", background: isDark ? "#1a1a1a" : "#fafafa"  }}>
      <Descriptions bordered size="small" column={2}
      labelStyle={{ color: isDark ? "#888" : "#555", background: isDark ? "#141414" : "#f0f0f0" }}   
      contentStyle={{ color: isDark ? "#e5e5e5" : "#222", background: isDark ? "#1a1a1a" : "#fff"  }} 
      >
        <Descriptions.Item label="Business Name" span={1}>
          {record.businessName}
        </Descriptions.Item>
        <Descriptions.Item label="Industry" span={1}>
          {record.industry}
        </Descriptions.Item>
        <Descriptions.Item label="Website/Instagram" span={2}>
          {record.websiteOrInstagram || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Full Name" span={1}>
          {record.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={1}>
          {record.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone" span={2}>
          {record.countryCode} {record.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Selected Services" span={2}>
          <Space wrap>
            {record.selectedServices?.map((s, i) => (
              <Tag key={i} color="blue">{s}</Tag>
            ))}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Requirements" span={2}>
          {Object.keys(record.requirements || {}).length > 0 ? (
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              {Object.entries(record.requirements).map(([key, val]) => (
                <div key={key}>
                  <strong>{key}:</strong> {val || "—"}
                </div>
              ))}
            </Space>
          ) : (
            "—"
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const columns = [
    {
      title: "Business",
      dataIndex: "businessName",
      key: "businessName",
      width: 180,
    },
    {
      title: "Contact Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      width: 130,
    },
    {
      title: "Services",
      dataIndex: "selectedServices",
      key: "selectedServices",
      width: 100,
      render: (services) => (
        <Badge count={services?.length || 0} showZero style={{ backgroundColor: "#1890ff" }} />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 170,
      render: (status, record) => (
        <Select
          value={status}
          onChange={(val) => handleStatusChange(record._id, val)}
          style={{ width: 150 }}
          size="small"
        >
          <Option value="new">
            <Tag color="blue">New</Tag>
          </Option>
          <Option value="contacted">
            <Tag color="orange">Contacted</Tag>
          </Option>
          <Option value="proposal-sent">
            <Tag color="purple">Proposal Sent</Tag>
          </Option>
          <Option value="closed">
            <Tag color="green">Closed</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Popconfirm
          title="Delete this quote?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="small" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Space style={{ marginBottom: 16 }} size="middle">
          <h2 style={{ margin: 0 }}>
            <FileTextOutlined /> Quote Requests
          </h2>
          <Button icon={<ReloadOutlined />} onClick={fetchQuotes} loading={loading}>
            Refresh
          </Button>
          <Select
            value={filter}
            onChange={setFilter}
            style={{ width: 180 }}
          >
            <Option value="all">All ({quotes.length})</Option>
            <Option value="new">New ({quotes.filter((q) => q.status === "new").length})</Option>
            <Option value="contacted">Contacted ({quotes.filter((q) => q.status === "contacted").length})</Option>
            <Option value="proposal-sent">Proposal Sent ({quotes.filter((q) => q.status === "proposal-sent").length})</Option>
            <Option value="closed">Closed ({quotes.filter((q) => q.status === "closed").length})</Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredQuotes}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          expandable={{
            expandedRowRender,
            expandRowByClick: true,
          }}
        />
      </Card>
    </div>
  );
}
