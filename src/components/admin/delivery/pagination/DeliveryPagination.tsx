import { Pagination } from "antd";
import React, { useState } from "react";
import "./DeliveryPagination.scss";

const DeliveryPagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination-container">
      <span className="pagination-info">
        Showing {currentPage * 5 - 4} to {currentPage * 5} of 50 entries
      </span>
      <Pagination
        current={currentPage}
        pageSize={5}
        total={50}
        onChange={onChange}
        showSizeChanger={false}
        className="pagination"
      />
    </div>
  );
};

export default DeliveryPagination;
