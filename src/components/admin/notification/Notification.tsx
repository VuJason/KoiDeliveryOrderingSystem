import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Empty, List } from "antd";
import React, { useState } from "react";
import "./Notification.scss";

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: "Brian Jones",
      action: "Completed delivery",
      deliveryId: "#DF56478",
      time: "4 mins ago",
      avatar: "https://i.pravatar.cc/40?img=1",
      read: false,
    },
    {
      id: 2,
      user: "Brian Jones",
      action: "Completed delivery",
      deliveryId: "#DF56478",
      time: "4 mins ago",
      avatar: "https://i.pravatar.cc/40?img=2",
      read: false,
    },
    {
      id: 3,
      user: "Brian Jones",
      action: "Completed delivery",
      deliveryId: "#DF56478",
      time: "4 mins ago",
      avatar: "https://i.pravatar.cc/40?img=3",
      read: true, // Mark as read
    },
    {
      id: 4,
      user: "Brian Jones",
      action: "In transit with delivery",
      deliveryId: "#DF56478",
      time: "4 mins ago",
      avatar: "https://i.pravatar.cc/40?img=4",
      read: false,
    },
  ]);

  // Calculate unread notifications
  const unreadCount = notifications.filter((item) => !item.read).length;

  // Handle clear all notifications
  const handleClearAll = () => {
    setNotifications([]); // Clear all notifications
  };

  const menu = (
    <div className="notification-dropdown">
      <div className="notification-header">
        <span>Notification</span>
        <Button type="link" className="clear-all" onClick={handleClearAll}>
          CLEAR ALL
        </Button>
      </div>
      {notifications.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item className={item.read ? "notification-item-read" : ""}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <span>
                    <b>{item.user}</b> {item.action} <a>{item.deliveryId}</a>
                  </span>
                }
                description={item.time}
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No notifications" />
      )}
    </div>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <Badge count={unreadCount}>
        <BellOutlined className="notification-icon" />
      </Badge>
    </Dropdown>
  );
};

export default Notification;
