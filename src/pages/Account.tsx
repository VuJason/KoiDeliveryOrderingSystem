import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St",
    city: "New York",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `http://103.67.197.66:8080/api/customer/${user.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          }),
        }
      );

      if (response.ok) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

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
              <InputField
                label="Name"
                value={formData.fullName}
                disabled={!isEditing}
                onChange={(value) => handleInputChange("fullName", value)}
              />
              <InputField
                label="Delivery Address"
                value={formData.address}
                disabled={!isEditing}
                onChange={(value) => handleInputChange("address", value)}
              />
              <InputField
                label="City"
                value={formData.city}
                disabled={!isEditing}
                onChange={(value) => handleInputChange("city", value)}
              />
            </div>
            <div>
              <InputField
                label="Email"
                value={formData.email}
                disabled={!isEditing}
                onChange={(value) => handleInputChange("email", value)}
              />
              <InputField
                label="Phone Number"
                value={formData.phone}
                disabled={!isEditing}
                onChange={(value) => handleInputChange("phone", value)}
              />
              <InputField
                label="Password"
                type="password"
                value="********"
                disabled={true}
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
                onClick={handleUpdateAccount}
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

interface InputFieldProps {
  label: string;
  value: string;
  type?: string;
  disabled: boolean;
  onChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  type = "text",
  disabled,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full p-2 border rounded-md bg-gray-50 disabled:opacity-75"
    />
  </div>
);

export default Account;
