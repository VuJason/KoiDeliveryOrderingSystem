import React, { useState, useEffect } from "react";
import { Table, Rate } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Feedback {
  id: number;
  content: string;
  rating: number;
  username: string;
}

const AdminFeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<Feedback> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
  ];

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://103.67.197.66:8080/api/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="main-content">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Customer Feedbacks</h1>
        <Table
          columns={columns}
          dataSource={feedbacks}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default AdminFeedbackPage;
