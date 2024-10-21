import { Avatar, Button, Input, Upload } from "antd";
import React, { useState } from "react";
import "./SettingsPage.scss";

const SettingsPage: React.FC = () => {
  const [adminName, setAdminName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [role, setRole] = useState("CEO");

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="avatar-section">
        <Avatar size={120} src="https://i.pravatar.cc/300" />
        <Upload showUploadList={false}>
          <Button type="link" className="change-avatar">
            Change Avatar
          </Button>
        </Upload>
      </div>

      <div className="form-section">
        <div className="form-row">
          <div className="form-field">
            <label>Admin name</label>
            <Input
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Password</label>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Role</label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
        </div>

        <div className="button-section">
          <Button type="primary" className="add-admin-button">
            Add new admin
          </Button>
          <Button danger className="delete-admin-button">
            Delete existing admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
