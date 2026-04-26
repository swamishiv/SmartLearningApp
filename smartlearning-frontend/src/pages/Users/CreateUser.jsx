import { Card, Form, Input, Button, Tabs, message } from "antd";
import axios from "../../api/axios";

const CreateUser = () => {
  const [teacherForm] = Form.useForm();
  const [studentForm] = Form.useForm();

  const handleCreate = async (values, type) => {
    try {
      const payload = {
        ...values,
        roleCode: type, // TEACHER / STUDENT
      };

      await axios.post("/user/create", payload);

      message.success(`${type} created successfully`);

      if (type === "TEACHER") teacherForm.resetFields();
      if (type === "STUDENT") studentForm.resetFields();
    } catch (err) {
      message.error(err?.response?.data?.message || "Error creating user");
    }
  };

  return (
    <Card
      title="User Management"
      style={{ margin: 16 }}
    >
      <Tabs defaultActiveKey="teacher">

        {/* TEACHER TAB */}
        <Tabs.TabPane tab="Teacher" key="teacher">
          <Form
            form={teacherForm}
            layout="vertical"
            onFinish={(values) => handleCreate(values, "TEACHER")}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Enter name" }]}
            >
              <Input placeholder="Enter teacher name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Enter email" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item label="Subject" name="subject">
              <Input placeholder="Enter subject" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter password" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Create Teacher
            </Button>
          </Form>
        </Tabs.TabPane>

        {/* STUDENT TAB */}
        <Tabs.TabPane tab="Student" key="student">
          <Form
            form={studentForm}
            layout="vertical"
            onFinish={(values) => handleCreate(values, "STUDENT")}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Enter name" }]}
            >
              <Input placeholder="Enter student name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Enter email" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item label="Class" name="className">
              <Input placeholder="Enter class" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter password" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Create Student
            </Button>
          </Form>
        </Tabs.TabPane>

      </Tabs>
    </Card>
  );
};

export default CreateUser;