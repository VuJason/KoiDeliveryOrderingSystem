import { Button, Modal } from "antd";
import React from "react";
import "./LogoutForm.scss";

interface LogoutProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const Logout: React.FC<LogoutProps> = ({ isVisible, onOk, onCancel }) => {
  return (
    <Modal
      visible={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      centered
      className="logout-modal"
    >
      <div className="logout-content">
        <h2>Are you sure you want to log out?</h2>
        <div className="logout-actions">
          <Button onClick={onCancel} className="no-button">
            No
          </Button>
          <Button onClick={onOk} className="yes-button">
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Logout;
