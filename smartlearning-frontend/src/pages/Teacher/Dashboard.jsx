import React from "react";
import { Card, Row, Col } from "antd";
import MainLayout from "../../components/layout/MainLayout";

const TeacherDashboard = () => {
  return (
   
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Students">120</Card>
        </Col>
        <Col span={8}>
          <Card title="Subjects">5</Card>
        </Col>
        <Col span={8}>
          <Card title="Questions Added">300</Card>
        </Col>
      </Row>
    
  );
};

export default TeacherDashboard;