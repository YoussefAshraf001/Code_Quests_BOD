import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Persist notifications
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const login = (email, password) => {
    if (email === "admin@example.com" && password === "password123") {
      const savedUser = localStorage.getItem("user");
      let newUser;

      if (savedUser) {
        newUser = JSON.parse(savedUser);
      } else {
        newUser = { email, name: "Admin", image: "/default-avatar.png" };
      }

      setUser(newUser);
      toast.success(`Welcome back, ${newUser.name} 👋`);
      addNotification({
        title: "Login Successful",
        message: `Logged in as ${newUser.name}`,
        type: "success",
      });
      return true;
    } else {
      toast.error("Invalid email or password");
      return false;
    }
  };

  const logout = () => {
    toast("Logged out successfully", { icon: "👋" });
    addNotification({
      title: "Logged Out",
      message: "You logged out",
      type: "info",
    });
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updated = { ...prev, ...updates };

      if (updates.password) {
        addNotification({
          title: "Password Changed",
          message: "Your password has been successfully updated.",
          type: "success",
        });
      }

      if (updates.image && updates.image !== prev.image) {
        addNotification({
          title: "Profile Picture Changed",
          message: "Your profile picture has been updated.",
          type: "success",
        });
      }

      if (updates.name && updates.name !== prev.name) {
        addNotification({
          title: "Name Updated",
          message: `Your name was changed from "${prev.name}" to "${updates.name}".`,
          type: "success",
        });
      }

      // fallback notification if generic update
      if (!updates.password && !updates.image && !updates.name) {
        addNotification({
          title: "Profile Updated",
          message: "Your profile has been updated.",
          type: "success",
        });
      }

      toast.success("Profile updated!");
      return updated;
    });
  };

  const addNotification = ({ title, message, type = "info" }) => {
    const newNotification = {
      id: Date.now(),
      title: title || "Notification",
      message: message || "You have a new notification",
      type,
      time: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]); // max 10
  };

  // ✅ New function to clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        notifications,
        addNotification,
        clearNotifications, // expose it
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
