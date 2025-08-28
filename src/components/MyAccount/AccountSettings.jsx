import { useState, useEffect } from "react";
import axios from "axios";
import { Lock, Trash2, Pencil, CreditCard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  // ✅ Fetch user + addresses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/user/me");
        setUser(userRes.data);

        const addrRes = await api.get("/user/addresses");
        setAddresses(addrRes.data);
      } catch (err) {
        console.error("❌ Error fetching account info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Update Profile
  const handleUpdateProfile = async () => {
    try {
      await api.put("/user/update", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      });
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("❌ Update failed", err);
    }
  };

  // ✅ Change Password
  const handleChangePassword = async () => {
    const newPass = prompt("Enter new password:");
    if (!newPass) return;
    try {
      await api.put("/user/change-password", { password: newPass });
      alert("✅ Password changed successfully!");
    } catch (err) {
      console.error("❌ Password change failed", err);
    }
  };

  // ✅ Add Address
  const handleAddAddress = async () => {
    if (!newAddress.trim()) return;
    try {
      const res = await api.post("/user/addresses", { address: newAddress });
      setAddresses([...addresses, res.data]);
      setNewAddress("");
    } catch (err) {
      console.error("❌ Failed to add address", err);
    }
  };

  // ✅ Delete Address
  const handleDeleteAddress = async (id) => {
    try {
      await api.delete(`/user/addresses/${id}`);
      setAddresses(addresses.filter((addr) => addr._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete address", err);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <p className="text-gray-600">Loading account settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-background/40 border-r">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-text">Account Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            {["profile", "security", "addresses", "payments"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer font-medium transition ${
                  activeTab === tab
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {tab === "profile"
                  ? "Profile Information"
                  : tab === "security"
                  ? "Security"
                  : tab === "addresses"
                  ? "Saved Addresses"
                  : "Payment Options"}
              </div>
            ))}
            <div
              onClick={handleLogout}
              className="cursor-pointer font-medium text-red-500 hover:text-red-700 flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 p-8">
          {message && (
            <div className="mb-4 text-green-600 font-medium">{message}</div>
          )}

          {activeTab === "profile" && (
            <>
              <h3 className="text-xl font-bold text-text mb-6">Profile Information</h3>

              {/* First Name */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">First Name</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    className="flex-1 outline-none bg-transparent text-gray-800"
                  />
                  <Pencil className="w-4 h-4 text-gray-500 ml-2" />
                </div>
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="flex-1 outline-none bg-transparent text-gray-800"
                  />
                  <Pencil className="w-4 h-4 text-gray-500 ml-2" />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="flex-1 outline-none bg-transparent text-gray-800"
                  />
                  <Pencil className="w-4 h-4 text-gray-500 ml-2" />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-1">Phone</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <input
                    type="text"
                    name="phone"
                    value={user.phone || ""}
                    onChange={handleChange}
                    className="flex-1 outline-none bg-transparent text-gray-800"
                  />
                  <Pencil className="w-4 h-4 text-gray-500 ml-2" />
                </div>
              </div>

              <button
                onClick={handleUpdateProfile}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
              >
                Save Changes
              </button>
            </>
          )}

          {activeTab === "security" && (
            <div>
              <h3 className="text-xl font-bold text-text mb-4">Security</h3>
              <p className="text-gray-600">Manage your password & login security.</p>
              <button
                onClick={handleChangePassword}
                className="mt-4 flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition cursor-pointer"
              >
                <Lock className="w-4 h-4 mr-2" /> Change Password
              </button>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h3 className="text-xl font-bold text-text mb-4">Saved Addresses</h3>
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr._id}
                    className="flex justify-between items-center border rounded-lg p-3"
                  >
                    <p>{addr.address}</p>
                    <button
                      onClick={() => handleDeleteAddress(addr._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Enter new address"
                  className="border p-2 flex-1 rounded-lg"
                />
                <button
                  onClick={handleAddAddress}
                  className="bg-primary text-white px-4 rounded-lg hover:bg-secondary"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h3 className="text-xl font-bold text-text mb-4">Payment Options</h3>
              <p className="text-gray-600 mb-4">
                (This will integrate with Razorpay or Stripe in real case.)
              </p>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition cursor-pointer">
                <CreditCard size={16} /> Add Payment Method
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
