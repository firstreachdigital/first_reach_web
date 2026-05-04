import { useEffect, useState } from "react";
import { Row, Col, Typography, Spin, theme } from "antd";
import {
  FileTextOutlined,
  FormOutlined,
  TeamOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import API from "../api/axios";

const { Title, Text } = Typography;

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const adminName = localStorage.getItem("adminName") || "Admin";
  const { token } = theme.useToken();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogs, jobs, applications, enquiries] = await Promise.all([
          API.get("/blogs/all"),
          API.get("/careers/jobs/all"),
          API.get("/careers/applications"),
          API.get("/enquiries"),
        ]);
        setStats({
          blogs:           blogs.data.length,
          jobs:            jobs.data.length,
          applications:    applications.data.length,
          enquiries:       enquiries.data.length,
          newEnquiries:    enquiries.data.filter((e) => e.status === "New").length,
          newApplications: applications.data.filter((a) => a.status === "New").length,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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
        <Row gutter={[16, 16]}>
          {cards.map((card, i) => (
            <Col xs={24} sm={12} xl={6} key={card.title}>
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
                {/* Top row: title + icon */}
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

                {/* Bottom row: number + badge */}
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
      )}
    </div>
  );
}