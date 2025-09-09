import { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ darkMode, setDarkMode }) {
  const { user, notifications, clearNotifications } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);

  const modalVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div
        className="fixed top-4 md:left-[280px] left-[160px] w-[calc(100%-280px)]
                    flex items-center justify-end md:px-8 py-3 z-50 rounded-xl transition-all duration-300
                    bg-transparent"
      >
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <MdLightMode
                className="text-yellow-400 animate-[spin_12s_linear_infinite]"
                size={22}
              />
            ) : (
              <MdDarkMode className="text-gray-700 animate-bob" size={22} />
            )}

            <span className="hidden sm:inline text-sm font-medium dark:text-gray-100">
              {darkMode ? "Light" : "Dark"}
            </span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative bg-gray-50 dark:bg-gray-800 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FaRegBell className="text-gray-600 dark:text-gray-300" />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* User info */}
          {user && (
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500 hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.8)] transition duration-300">
              <img
                src={user.image || "default-avatar.png"}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden sm:inline text-sm font-medium text-gray-800 dark:text-gray-100">
                {user.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setShowNotifications(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-96 max-w-[90%] flex flex-col"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Notifications
                </h3>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-sm text-red-500 hover:text-red-700 transition"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {notifications.length > 0 ? (
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 max-h-80 overflow-y-auto pr-2">
                  {notifications.map((n) => (
                    <motion.li
                      key={n.id}
                      className={`p-3 rounded-lg shadow-sm ${
                        n.type === "success"
                          ? "bg-green-100 dark:bg-green-700"
                          : n.type === "error"
                          ? "bg-red-100 dark:bg-red-700"
                          : n.type === "warning"
                          ? "bg-yellow-100 dark:bg-yellow-700"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-semibold">{n.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {n.message}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {n.time ? new Date(n.time).toLocaleString() : ""}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-10">
                  No notifications yet
                </p>
              )}

              <button
                onClick={() => setShowNotifications(false)}
                className="mt-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
