import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./Context/AuthContext.jsx";
import Login from "./components/pages/Login.jsx";

import NavBar from "./components/layout/NavBar.jsx";
import SideBar from "./components/layout/SideBar.jsx";
import { fetchTodos, fetchUsers } from "./components/api/data.jsx";
import WorldMap from "./components/Tabs/WorldMap.jsx";
import Dashboard from "./components/Tabs/Dashboard.jsx";
import Companies from "./components/Tabs/CompaniesTable.jsx";
import UsersTable from "./components/Tabs/UsersTable.jsx";
import ExpansionTable from "./components/Tabs/ExpansionTable.jsx";
import Settings from "./components/Tabs/Settings.jsx";

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [compactBar, setCompactBar] = useState(false);

  // initialize theme from localStorage
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // sync <html> class and localStorage whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const loadData = async () => {
      const usersRes = await fetchUsers();
      const todosRes = await fetchTodos();
      setUsers(usersRes);
      setTodos(todosRes);
    };
    loadData();
  }, []);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="w-full h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <SideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compactBar={compactBar}
        setCompactBar={setCompactBar}
      />
      <Toaster position="top-center" reverseOrder={false} />

      <main
        className={`pt-[90px] p-6 h-full overflow-auto transition-all duration-300 
              ${
                compactBar
                  ? "sm:ml-[100px] ml-[70px]"
                  : "sm:ml-[280px] ml-[100px]"
              }`}
      >
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Dashboard Overview
            </h1>
            <Dashboard users={users} todos={todos} />
          </>
        )}
        {activeTab === "users" && <UsersTable users={users} />}
        {activeTab === "companies" && <Companies users={users} todos={todos} />}
        {activeTab === "cities" && (
          <WorldMap users={users} darkMode={darkMode} />
        )}
        {activeTab === "expansions" && (
          <ExpansionTable users={users} todos={todos} />
        )}
        {activeTab === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
