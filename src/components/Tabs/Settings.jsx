import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function Settings() {
  const { user, updateUser } = useAuth();

  // Local state for editing (not persisted until Save)
  const [preview, setPreview] = useState(user?.image || "/default-avatar.png");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // Only update local preview
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (password && password.trim().length < 6) {
      return alert("Password must be at least 6 characters");
    }

    updateUser({
      image: preview,
      name,
      email,
      ...(password ? { password } : {}),
    });

    setPassword(""); // clear after save
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Edit Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col justify-center items-center gap-3 mb-6">
        <img
          src={preview}
          alt=""
          className="w-20 h-20 rounded-full object-cover border"
        />
        <label className="cursor-pointer px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Change
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Name */}
      <label className="block mb-2 text-gray-700 dark:text-gray-300">
        Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      {/* Email */}
      <label className="block mb-2 text-gray-700 dark:text-gray-300">
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      {/* Password */}
      <label className="block mb-2 text-gray-700 dark:text-gray-300">
        New Password
      </label>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
}
