import { useEffect } from "react";
import { motion } from "framer-motion";
import { BiWorld } from "react-icons/bi";
import { FaBuilding, FaListAlt, FaUsers } from "react-icons/fa";
import { GiAmericanShield } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { LuArrowRightToLine } from "react-icons/lu";

import Button from "../ui/Button";
import { useAuth } from "../../Context/AuthContext";

export default function Sidebar({
  activeTab,
  setActiveTab,
  compactBar,
  setCompactBar,
}) {
  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setCompactBar(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCompactBar]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <RiDashboardLine size={23} />,
    },
    { id: "users", label: "Users", icon: <FaUsers size={23} /> },
    { id: "companies", label: "Companies", icon: <FaBuilding size={23} /> },
    { id: "cities", label: "Cities", icon: <BiWorld size={23} /> },
    { id: "expansions", label: "Expansions", icon: <FaListAlt size={23} /> },
    { id: "settings", label: "Settings", icon: <IoSettings size={23} /> },
  ];

  return (
    <motion.div
      animate={{ width: compactBar ? 70 : 250 }}
      transition={{ duration: 0.3 }}
      className="absolute left-4 md:h-[998px] h-[650px] mt-4 
        bg-white dark:bg-gray-900 
        text-gray-800 dark:text-gray-200 
        border border-gray-200 dark:border-[#6960d0]
        rounded-lg shadow-md overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center justify-center px-3 py-4">
        <div className="flex items-center gap-2">
          <GiAmericanShield size={30} className="text-[#6960d0]" />
          {!compactBar && (
            <h1 className="font-bold text-[24px] text-[#34353d] dark:text-gray-100">
              Smart
              <span className="font-normal text-[#404546] dark:text-gray-300">
                BOD
              </span>
            </h1>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <ul className="space-y-2 px-2">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 p-3 w-full rounded-md transition-all ${
                activeTab === item.id
                  ? "bg-[#bcb4e9] text-[#5d5999] font-bold"
                  : "text-[#797b7e] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              } ${compactBar && "ml-0 justify-center"}`}
            >
              {item.icon}
              {!compactBar && <span>{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>

      {/* Collapse Button */}
      <div className="absolute md:flex hidden bottom-[75px] w-full px-2 items-center justify-center">
        <Button
          onClick={() => setCompactBar(!compactBar)}
          icon={
            <LuArrowRightToLine
              size={20}
              className={`transition-transform duration-700 ${
                compactBar ? "" : "rotate-[180deg]"
              }`}
            />
          }
          label="Collapse"
          compactBar={compactBar}
          color="primary"
        />
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-5 w-full px-2">
        <Button
          onClick={logout}
          icon={<MdLogout size={24} />}
          label="Log Out"
          compactBar={compactBar}
          color="danger"
        />
      </div>
    </motion.div>
  );
}
