import { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Typography,
  ConfigProvider,
  theme as antdTheme,
  Tag,
} from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  InboxOutlined,
  FormOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined,
  PictureOutlined,
  StarOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

// All menu items with required role (undefined = both roles)
const ALL_MENU_ITEMS = [
  { key: "/",             icon: <DashboardOutlined    style={{ fontSize: 18 }} />, label: "Dashboard" },
  { key: "/blogs",        icon: <FileTextOutlined     style={{ fontSize: 18 }} />, label: "Blogs" },
  { key: "/jobs",         icon: <FormOutlined         style={{ fontSize: 18 }} />, label: "Job Postings" },
  { key: "/applications", icon: <TeamOutlined         style={{ fontSize: 18 }} />, label: "Applications" },
  { key: "/enquiries",    icon: <InboxOutlined        style={{ fontSize: 18 }} />, label: "Enquiries" },
  { key: "/portfolio",    icon: <PictureOutlined      style={{ fontSize: 18 }} />, label: "Portfolio" },
  { key: "/testimonials", icon: <StarOutlined         style={{ fontSize: 18 }} />, label: "Testimonials" },
  { key: "/team",         icon: <UserOutlined         style={{ fontSize: 18 }} />, label: "Team Members" },
  // Superadmin only
  { key: "/users",        icon: <UsergroupAddOutlined style={{ fontSize: 18 }} />, label: "Users & Roles", superadminOnly: true },
];

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();
  const [isDark, setIsDark] = useState(true);

  const adminName = localStorage.getItem("adminName") || "Admin";
  const adminRole = localStorage.getItem("adminRole") || "staff";
  const isSuperAdmin = adminRole === "superadmin";

  const menuItems = ALL_MENU_ITEMS.filter(
    (item) => !item.superadminOnly || isSuperAdmin
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminRole");
    navigate("/login");
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        {/* ── SIDEBAR ── */}
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          width={220}
          theme={isDark ? "dark" : "light"}
          style={{
            background: isDark ? "#0d0d0d" : "#ffffff",
            borderRight: isDark ? "1px solid #1e1e1e" : "1px solid #e5e7eb",
          }}
        >
          {/* Logo */}
          <div
            style={{
              height: 64,
              padding: "0 16px",
              borderBottom: isDark ? "1px solid #1e1e1e" : "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <img src={logo} alt="Logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
            {!collapsed && (
              <Text strong style={{ color: isDark ? "#fff" : "#000", fontSize: 14 }}>
                First Reach Digital
              </Text>
            )}
          </div>

          {/* Menu */}
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            items={menuItems}
            style={{
              background: isDark ? "#0d0d0d" : "#ffffff",
              border: "none",
              marginTop: 8,
            }}
            theme={isDark ? "dark" : "light"}
          />

          {/* Logout */}
          <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, padding: "0 12px" }}>
            <Button
              danger type="text" icon={<LogoutOutlined style={{fontSize:18,}} />}
              onClick={handleLogout} block
              style={{ color: "#ff4d4f", textAlign: "left" }}
            >
              {!collapsed && "Logout"}
            </Button>
          </div>
        </Sider>

        <Layout>
          {/* ── HEADER ── */}
          <Header
            style={{
              background: isDark ? "#0d0d0d" : "#ffffff",
              borderBottom: isDark ? "1px solid #1e1e1e" : "1px solid #e5e7eb",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined style={{ color: isDark ? "#fff" : "#000" }} /> : <MenuFoldOutlined style={{ color: isDark ? "#fff" : "#000" }} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 16 }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Button
                type="text"
                onClick={() => setIsDark(!isDark)}
                style={{ color: isDark ? "#fff" : "#000" }}
              >
                {isDark ? <SunOutlined style={{ fontSize: 18 }} /> : <MoonOutlined style={{ fontSize: 18 }} />}
              </Button>
              <Tag color={isSuperAdmin ? "red" : "blue"} style={{ margin: 0, fontWeight: 700 }}>
                {adminRole?.toUpperCase()}
              </Tag>
              <Avatar style={{ background: "#05caf2", color: "#000" }}>
                {adminName[0].toUpperCase()}
              </Avatar>
              <Text style={{ color: isDark ? "#fff" : "#000" }}>{adminName}</Text>
            </div>
          </Header>

          {/* ── CONTENT ── */}
          <Content
            style={{
              background: isDark ? "#111" : "#f5f5f5",
              padding: 24,
              minHeight: "calc(100vh - 64px)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
