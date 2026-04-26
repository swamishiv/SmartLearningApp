import React from "react";
import { Card, Row, Col } from "antd";
import MainLayout from "../../components/layout/MainLayout";

const StudentDashboard = () => {
  return (
   
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Subjects" bordered={false}>
            <h2>3</h2>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Tests Attempted" bordered={false}>
            <h2>12</h2>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Average Score" bordered={false}>
            <h2>75%</h2>
          </Card>
        </Col>
      </Row>
  
  );
};

export default StudentDashboard;