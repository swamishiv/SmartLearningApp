import React from "react";
import { Card, Row, Col } from "antd";
import MainLayout from "../../components/layout/MainLayout";

const AdminDashboard = () => {
  return (
   
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Users">200</Card>
        </Col>
        <Col span={8}>
          <Card title="Teachers">20</Card>
        </Col>
        <Col span={8}>
          <Card title="Students">180</Card>
        </Col>
      </Row>
  
  );
};

export default AdminDashboard;