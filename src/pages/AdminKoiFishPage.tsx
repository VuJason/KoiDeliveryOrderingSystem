import React, { useEffect, useState } from "react";
import { Select, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
const FISH_HEALTH_STATUS = {
  EXCELLENT: "excellent",
  GOOD: "good",
  FAIR: "fair",
  POOR: "poor",
} as const;
interface KoiFish {
  id: number;
  koi_name: string;
  fish_weight: number;
  status: string;
}

const AdminKoiFishPage: React.FC = () => {
  const [koiData, setKoiData] = useState<KoiFish[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (fishId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://103.67.197.66:8080/api/koifish/${fishId}/status?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );
      if (response.ok) {
        // Update local state after successful API call
        setKoiData((prevData) =>
          prevData.map((fish) =>
            fish.id === fishId ? { ...fish, status: newStatus } : fish
          )
        );
      }
    } catch (error) {
      console.error("Error updating fish status:", error);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case FISH_HEALTH_STATUS.EXCELLENT:
        return "green";
      case FISH_HEALTH_STATUS.GOOD:
        return "blue";
      case FISH_HEALTH_STATUS.FAIR:
        return "orange";
      case FISH_HEALTH_STATUS.POOR:
        return "red";
      default:
        return "default";
    }
  };

  const columns: ColumnsType<KoiFish> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Koi Name",
      dataIndex: "koi_name",
      key: "koi_name",
    },
    {
      title: "Weight (kg)",
      dataIndex: "fish_weight",
      key: "fish_weight",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: KoiFish) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Select.Option value={FISH_HEALTH_STATUS.EXCELLENT}>
            EXCELLENT
          </Select.Option>
          <Select.Option value={FISH_HEALTH_STATUS.GOOD}>GOOD</Select.Option>
          <Select.Option value={FISH_HEALTH_STATUS.FAIR}>FAIR</Select.Option>
          <Select.Option value={FISH_HEALTH_STATUS.POOR}>POOR</Select.Option>
        </Select>
      ),
    },
  ];

  useEffect(() => {
    const fetchKoiFish = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://103.67.197.66:8080/api/koifish", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setKoiData(data);
      } catch (error) {
        console.error("Error fetching koi fish data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKoiFish();
  }, []);

  return (
    <div className="main-content">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Koi Fish Management</h1>
        <Table
          columns={columns}
          dataSource={koiData}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </div>
    </div>
  );
};

export default AdminKoiFishPage;
