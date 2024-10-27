import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white min-h-screen text-black">
      <Header />

      <main className="w-full pb-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto mt-10 text-center">
          <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
          <img
            src="a.png"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-8"
          />

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <InputField label="Name" value="John Doe" disabled={!isEditing} />

              <InputField
                label="Delivery Address"
                value="123 Main St"
                disabled={!isEditing}
              />
              <InputField label="City" value="New York" disabled={!isEditing} />
            </div>
            <div>
              <InputField
                label="Email"
                value="john@example.com"
                disabled={!isEditing}
              />
              <InputField
                label="Phone Number"
                value="+1234567890"
                disabled={!isEditing}
              />

              <InputField
                label="Password"
                type="password"
                value="********"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isEditing ? "Cancel" : "Edit Details"}
            </button>
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const InputField = ({ label, value, type = "text", disabled }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      disabled={disabled}
      className="w-full p-2 border rounded-md bg-gray-50 disabled:opacity-75"
    />
  </div>
);

export default Account;