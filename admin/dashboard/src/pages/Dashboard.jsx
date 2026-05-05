import { useEffect, useState } from "react";
import { Row, Col, Typography, Spin, theme, Card } from "antd";
import {
  FileTextOutlined,
  FormOutlined,
  TeamOutlined,
  InboxOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import API from "../api/axios";

const { Title, Text } = Typography;

export default function Dashboard() {
  const [stats, setStats]         = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading]     = useState(true);
  const adminName = localStorage.getItem("adminName") || "Admin";
  const { token } = theme.useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([
          API.get("/stats"),
          API.get("/stats/chart"),
        ]);
        setStats(statsRes.data);
        setChartData(chartRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    {
      title: "Total Blogs",
      value: stats?.blogs,
      icon: <FileTextOutlined />,
      color: "#06b6d4",
      gradient: "linear-gradient(135deg, #06b6d422 0%, #06b6d408 100%)",
    },
    {
      title: "Job Postings",
      value: stats?.jobs,
      icon: <FormOutlined />,
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #7c3aed22 0%, #7c3aed08 100%)",
    },
    {
      title: "Applications",
      value: stats?.applications,
      icon: <TeamOutlined />,
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b22 0%, #f59e0b08 100%)",
      badge: stats?.newApplications ? `+${stats.newApplications} new` : null,
    },
    {
      title: "Enquiries",
      value: stats?.enquiries,
      icon: <InboxOutlined />,
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b98122 0%, #10b98108 100%)",
      badge: stats?.newEnquiries ? `+${stats.newEnquiries} new` : null,
    },
    {
      title: "Portfolio",
      value: stats?.portfolio,
      icon: <PictureOutlined />,
      color: "#ec4899",
      gradient: "linear-gradient(135deg, #ec489922 0%, #ec489908 100%)",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-card {
          border-radius: 16px;
          padding: 24px;
          height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: fadeUp 0.4s ease both;
        }
        .stat-card:hover {
          transform: translateY(-3px);
        }
        .stat-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--card-color);
          border-radius: 16px 16px 0 0;
        }
        .stat-card-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .stat-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 20px;
          letter-spacing: 0.3px;
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <Title
          level={3}
          style={{ margin: 0, color: token.colorTextHeading, fontWeight: 700, letterSpacing: "-0.3px" }}
        >
          Welcome back, {adminName}
        </Title>
        <Text style={{ color: token.colorTextTertiary, fontSize: 13 }}>
          Here's what's happening today
        </Text>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 80 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {cards.map((card, i) => (
              <Col xs={24} sm={12} lg={8} xxl={4.8} key={card.title}>
                <div
                  className="stat-card"
                  style={{
                    "--card-color": card.color,
                    background: token.colorBgContainer,
                    border: `1px solid ${token.colorBorderSecondary}`,
                    boxShadow: token.boxShadowTertiary,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Text
                      style={{
                        color: token.colorTextSecondary,
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {card.title}
                    </Text>
                    <div
                      className="stat-card-icon"
                      style={{
                        background: card.gradient,
                        color: card.color,
                      }}
                    >
                      {card.icon}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <span
                      style={{
                        fontSize: 36,
                        fontWeight: 800,
                        color: token.colorText,
                        lineHeight: 1,
                        letterSpacing: "-1px",
                      }}
                    >
                      {card.value ?? 0}
                    </span>

                    {card.badge && (
                      <span
                        className="stat-badge"
                        style={{
                          background: `${card.color}18`,
                          color: card.color,
                          border: `1px solid ${card.color}30`,
                        }}
                      >
                        {card.badge}
                      </span>
                    )}
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Charts */}
          <Row gutter={[16, 16]}>
            {/* Line Chart */}
            <Col xs={24} xl={12}>
              <Card
                title="Monthly Trends"
                bordered={false}
                style={{
                  borderRadius: 16,
                  boxShadow: token.boxShadowTertiary,
                  animation: "fadeUp 0.5s ease 0.4s both",
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorderSecondary} />
                    <XAxis dataKey="month" stroke={token.colorTextSecondary} style={{ fontSize: 12 }} />
                    <YAxis stroke={token.colorTextSecondary} style={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: token.colorBgElevated,
                        border: `1px solid ${token.colorBorder}`,
                        borderRadius: 8,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="Blogs"        stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Applications" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Enquiries"    stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Portfolio"    stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Bar Chart */}
            <Col xs={24} xl={12}>
              <Card
                title="Monthly Comparison"
                bordered={false}
                style={{
                  borderRadius: 16,
                  boxShadow: token.boxShadowTertiary,
                  animation: "fadeUp 0.5s ease 0.5s both",
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorderSecondary} />
                    <XAxis dataKey="month" stroke={token.colorTextSecondary} style={{ fontSize: 12 }} />
                    <YAxis stroke={token.colorTextSecondary} style={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: token.colorBgElevated,
                        border: `1px solid ${token.colorBorder}`,
                        borderRadius: 8,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Blogs"        fill="#06b6d4" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Applications" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Enquiries"    fill="#10b981" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Portfolio"    fill="#ec4899" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
