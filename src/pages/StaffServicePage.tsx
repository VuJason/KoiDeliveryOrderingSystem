import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import Header from "../components/Header";

interface Service {
  serviceId: number;
  serviceName: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  price: number;
}

const StaffServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingService, setEditingService] = useState<Service | null>(null);

  const columns: ColumnsType<Service> = [
    {
      title: "Service ID",
      dataIndex: "serviceId",
      key: "serviceId",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.serviceId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://103.67.197.66:8080/api/staff/services/viewService",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setServices(response.data);
    } catch (error) {
      message.error("Failed to fetch services");
    }
  };
  const handleDelete = async (serviceId: number) => {
    try {
      await axios.delete(
        `http://103.67.197.66:8080/api/staff/services/delete/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Service deleted successfully");
      fetchServices(); // Refresh the services list
    } catch (error) {
      message.error("Failed to delete service");
    }
  };
  const handleCreate = async (values: any) => {
    try {
      await axios.post(
        "http://103.67.197.66:8080/api/staff/services/addService",
        {
          serviceName: values.serviceName,
          description: values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Service created successfully");
      setIsModalVisible(false);
      form.resetFields();
      fetchServices();
    } catch (error) {
      message.error("Failed to create service");
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    form.setFieldsValue({
      serviceName: service.serviceName,
      description: service.description,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async (values: any) => {
    if (!editingService) return;

    try {
      await axios.put(
        `http://103.67.197.66:8080/api/staff/services/update/${editingService.serviceId}`,
        {
          serviceId: editingService.serviceId,
          serviceName: values.serviceName,
          description: values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Service updated successfully");
      setIsModalVisible(false);
      form.resetFields();
      setEditingService(null);
      fetchServices();
    } catch (error) {
      message.error("Failed to update service");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      <Header />
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Services Management</h1>
          <Button
            type="primary"
            onClick={() => {
              setEditingService(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Add New Service
          </Button>
        </div>

        <Table columns={columns} dataSource={services} rowKey="serviceId" />

        <Modal
          title={editingService ? "Edit Service" : "Create New Service"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
            setEditingService(null);
          }}
          onOk={() => form.submit()}
        >
          <Form
            form={form}
            onFinish={editingService ? handleUpdate : handleCreate}
            layout="vertical"
          >
            <Form.Item
              name="serviceName"
              label="Service Name"
              rules={[
                { required: true, message: "Please input service name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default StaffServicePage;
