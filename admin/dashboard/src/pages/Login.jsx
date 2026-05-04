import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import logo from "../assets/logo.png";

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { data } = await API.post("/auth/login", values);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminName", data.name);
      message.success("Welcome back!");
      navigate("/");
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
      }}
    >
      <Card
        style={{
          width: 400,
          background: "#111",
          border: "1px solid #222",
          borderRadius: 16,
        }}
      >
        {/* Logo / Title */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: 60,
              height: 60,
              objectFit: "contain",
              marginBottom: 16,
            }}
          />
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            Admin Dashboard
          </Title>
          <Text style={{ color: "#555" }}>First Reach Digital</Text>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Email required" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#555" }} />}
              placeholder="Email"
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password required" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#555" }} />}
              placeholder="Password"
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                color: "#fff",
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: "#05caf2",
                borderColor: "#05caf2",
                color: "#000",
                fontWeight: 700,
                height: 48,
                borderRadius: 8,
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
