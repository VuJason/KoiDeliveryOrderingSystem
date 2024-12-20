import { useState, useEffect, useMemo } from "react";
import { Order, OrderStatus } from "../types/order";
import { orderApi } from "../services/orderApi";
import { ORDER_STATUS } from "../constants/orderStatus";

interface UseOrderManagementProps {
  pageSize?: number;
  fetchOrdersFn?: () => Promise<Order[]>;
  initialFilters?: {
    date?: boolean;
    type?: boolean;
    price?: boolean;
    status?: boolean;
    product?: boolean;
    dashboard?: boolean;
  };
}

export const useOrderManagement = ({
  fetchOrdersFn,
  initialFilters,
}: {
  fetchOrdersFn: () => Promise<any>;
  initialFilters: {
    date: boolean;
    type: boolean;
    status: boolean;
    price: boolean;
    product: boolean;
  };
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchResults, setSearchResults] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [pageSize] = useState(5);

  const handlePriceFilter = (price: string, filter: string) => {
    const numPrice = parseFloat(price);
    switch (filter) {
      case "low":
        return numPrice <= 50;
      case "medium":
        return numPrice > 50 && numPrice <= 100;
      case "high":
        return numPrice > 100;
      default:
        return true;
    }
  };

  const getSortedData = (data: Order[]) => {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField as keyof Order];
      const bValue = b[sortField as keyof Order];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  };

  const getFilteredData = () => {
    if (!orders || !Array.isArray(orders)) {
      return []; // Return an empty array if orders is undefined or not an array
    }

    const filtered = orders.filter((order) => {
      const conditions = [
        orderNumber === "" || order.id.toString().includes(orderNumber),
        !initialFilters.type ||
          filterType === "" ||
          order.type?.toLowerCase().includes(filterType.toLowerCase()),
        !initialFilters.status ||
          filterStatus === "" ||
          order.orderStatus.toLowerCase() === filterStatus.toLowerCase(),
        !initialFilters.product ||
          filterProduct === "" ||
          order.product?.toLowerCase().includes(filterProduct.toLowerCase()),
        !initialFilters.date ||
          filterDate === "" ||
          order.order_date?.includes(filterDate),
        !initialFilters.price ||
          filterPrice === "" ||
          handlePriceFilter(order.price, filterPrice),
      ];

      return conditions.every((condition) => condition);
    });

    return getSortedData(filtered);
  };

  const dashboardStats = useMemo(() => {
    if (!initialFilters.dashboard) return null;

    const filteredOrders = getFilteredData();
    console.log(filteredOrders);
    return {
      totalOrders: filteredOrders.length,
      pendingOrders: filteredOrders.filter(
        (order) => order.status === ORDER_STATUS.PENDING
      ).length,
      deliveredOrders: filteredOrders.filter(
        (order) => order.status === ORDER_STATUS.DELIVERED
      ).length,
      canceledOrders: filteredOrders.filter(
        (order) => order.status === ORDER_STATUS.CANCELED
      ).length,
      totalRevenue: filteredOrders.reduce(
        (sum, order) => sum + parseFloat(order.price || "0"),
        0
      ),
      averageOrderValue: filteredOrders.length
        ? filteredOrders.reduce(
            (sum, order) => sum + parseFloat(order.price || "0"),
            0
          ) / filteredOrders.length
        : 0,
    };
  }, [orders, filterType, filterStatus, filterDate]);

  const getChartData = () => {
    if (!initialFilters.dashboard) return null;

    const last30Days = [...Array(30)]
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split("T")[0];
      })
      .reverse();

    return last30Days.map((date) => ({
      date,
      orders: orders.filter((order) => order.date?.includes(date)).length,
      revenue: orders
        .filter((order) => order.date?.includes(date))
        .reduce((sum, order) => sum + parseFloat(order.price || "0"), 0),
    }));
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await fetchOrdersFn();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialOrders = async () => {
      await fetchOrders();
    };

    fetchInitialOrders();
  }, [fetchOrdersFn]);

  const handleSearch = () => {
    if (!searchInput.trim()) {
      setSearchError("Tracking number required");
      return;
    }
    setSearchError("");
    setOrderNumber(searchInput);

    const results = orders.filter(
      (order) =>
        order.orderId.toString().includes(searchInput) ||
        order.customerName?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchInput("");
    setOrderNumber("");
    setFilterDate("");
    setFilterType("");
    setFilterPrice("");
    setFilterProduct("");
    setFilterStatus("");
    setSearchError("");
    setSearchResults([]);
    setCurrentPage(1);
  };

  const getCurrentPageData = () => {
    const dataToUse =
      searchResults.length > 0 ? searchResults : getFilteredData();
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return dataToUse.slice(startIndex, endIndex);
  };

  const handleViewDetails = (id: number) => {
    setSelectedOrderId(id);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
    document.body.style.overflow = "unset";
  };

  const handleDeleteOrder = (id: number) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== id)
    );
    setSearchResults((prevResults) =>
      prevResults.filter((order) => order.orderId !== id)
    );
  };

  const updateOrderStatus = async (id: number, newStatus: OrderStatus) => {
    try {
      await orderApi.updateOrderStatus(id, newStatus);
      await fetchOrders();
    } catch (err) {
      setError("Failed to update order status");
    }
  };

  return {
    orders,
    isLoading,
    error,
    currentPage,
    searchInput,
    orderNumber,
    filterPrice,
    filterProduct,
    filterStatus,
    searchError,
    searchResults,
    setCurrentPage,
    setSearchInput,
    setFilterPrice,
    setFilterProduct,
    setFilterStatus,
    handleSearch,
    resetFilters,
    getCurrentPageData,
    getFilteredData,
    fetchOrders,
    filterDate,
    filterType,
    setFilterDate,
    setFilterType,
    handleViewDetails,
    handleCloseModal,
    handleDeleteOrder,
    updateOrderStatus,
    selectedOrderId,
    isModalOpen,
    sortField,
    sortDirection,
    setSortField,
    setSortDirection,
    handlePriceFilter,
    dashboardStats,
    getChartData,
    pageSize,
  };
};
