import { Pagination } from "antd";
import React, { useState } from "react";
import "./DeliveryPagination.scss";

interface DeliveryPaginationProps {
  current?: number;
  onChange?: (page: number) => void;
  total?: number;
  pageSize?: number;
}

const DeliveryPagination: React.FC<DeliveryPaginationProps> = ({
  current = 1,
  onChange,
  total = 50,
  pageSize = 5
}) => {
  return (
    <div className="pagination-container">
      <span className="pagination-info">
        Showing {current * pageSize - pageSize + 1} to {Math.min(current * pageSize, total)} of {total} entries
      </span>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
        className="pagination"
      />
    </div>
  );
};

export default DeliveryPagination;
