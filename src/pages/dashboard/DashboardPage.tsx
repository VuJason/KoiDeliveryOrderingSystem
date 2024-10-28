import React, {useState} from "react";
import Card from "../../components/admin/card/Card";
import DeliveryList from "../../components/admin/delivery/list/DeliveryList";
import DeliveryPagination from "../../components/admin/delivery/pagination/DeliveryPagination";
import DeliverySearchForm from "../../components/admin/filter-delivery/DeliverySearchForm";
import SalesChart from "../../components/admin/salechart/SalesChart";
import "./DashboardPage.scss";

// Import dữ liệu mẫu từ DeliveryList
import { data as deliveryData } from "../../components/admin/delivery/list/DeliveryList";

const DashboardPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const pageSize = 5;

  // Hàm lọc dữ liệu
  const getFilteredData = () => {
    return deliveryData.filter((delivery) => {
      const searchMatch = 
        delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.customer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const typeMatch = filterType === "" || delivery.type?.toLowerCase() === filterType.toLowerCase();
      
      return searchMatch && typeMatch;
    });
  };

  const filteredData = getFilteredData();

  // Lấy dữ liệu cho trang hiện tại
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  // Xử lý khi thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Xử lý khi thay đổi tìm kiếm
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Xử lý khi thay đổi bộ lọc
  const handleFilterChange = (type: string) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <Card />
      <SalesChart />
      <DeliverySearchForm 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange}
      />
      <div className="delivery-section">
        <DeliveryList data={getCurrentPageData()} />
        <DeliveryPagination
          current={currentPage}
          onChange={handlePageChange}
          total={filteredData.length}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
