import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth(); // ✅ use context
  const roleCode = user?.roleCode;
  const username = user?.fullName;

  // 🔐 Logout
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // 📋 Menu based on role
  const getMenuItems = () => {
    switch (roleCode) {

      // 👨‍🎓 STUDENT
      case "STU":
        return [
          {
            key: "/student/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard"
          },
          {
            key: "/student/subjects",
            icon: <BookOutlined />,
            label: "Subjects"
          }
        ];

      // 👨‍🏫 TEACHER
      case "TCH":
        return [
          {
            key: "/teacher/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard"
          },
          {
            key: "/teacher/students",
            icon: <UserOutlined />,
            label: "Students"
          }
        ];

      // 👨‍💼 ADMIN
      case "ADM":
        return [
          {
            key: "/admin/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard"
          },
          {
            key: "users",
            icon: <UserOutlined />,
            label: "User Management",
            children: [
              {
                key: "/users/create",
                label: "Create User"
              }
            ]
          }
        ];

      default:
        return [];
    }
  };

  // 🎯 Selected menu fix
  const getSelectedKey = () => {
    const path = location.pathname;

    if (path.includes("/users/create")) return "/users/create";

    return path;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <Sider>
        <div style={{ color: "white", padding: "16px", fontWeight: "bold" }}>
          Smart Learning
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          onClick={(e) => navigate(e.key)}
          items={getMenuItems()}
        />
      </Sider>

      {/* MAIN */}
      <Layout>
        <Header
          style={{
            background: "#001529",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px"
          }}
        >
          <div>Smart Learning System</div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div>{username}</div>

            <Button type="primary" danger onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Header>

        <Content style={{ margin: "16px", background: "#fff", padding: "16px" }}>
          <Outlet />
        </Content>
      </Layout>

    </Layout>
  );
};

export default MainLayout;