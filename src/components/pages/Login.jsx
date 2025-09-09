import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../Context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      // i already managed error with toasty in AuthContext
    }
  };

  const handleAutofill = () => {
    setEmail("admin@example.com");
    setPassword("password123");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-2xl w-96"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100"
        >
          Welcome Back
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       focus:ring-2 focus:ring-blue-400 focus:outline-none 
                       dark:bg-gray-700 dark:text-white transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       focus:ring-2 focus:ring-blue-400 focus:outline-none 
                       dark:bg-gray-700 dark:text-white transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md 
                       hover:bg-blue-700 active:bg-blue-800 transition"
          >
            Log In
          </motion.button>
        </form>

        {/* Autofill Button instead of <p> */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
        <div className="flex justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAutofill}
            className="text-sm bg-blue-500 px-5 py-2 rounded-full text-white"
          >
            Autofill credentials for demo
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
