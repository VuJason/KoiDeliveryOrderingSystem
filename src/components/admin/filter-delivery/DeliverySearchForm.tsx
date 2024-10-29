import { Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";
import "./DeliverySearchForm.scss";

const DeliverySearchForm: React.FC = () => {
  return (
    <div className="delivery-search-form">
      <h3>Delivery Information</h3>
      <Form layout="vertical" className="search-form">
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="Customer" name="customer">
              <Input placeholder="Enter Customer Name" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Order number" name="orderNumber">
              <Input placeholder="Enter order number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Start Date" name="startDate">
              <DatePicker placeholder="Start Date" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="End Date" name="endDate">
              <DatePicker placeholder="End Date" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DeliverySearchForm;
