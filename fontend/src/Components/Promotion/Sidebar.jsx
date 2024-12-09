import React, { useState, useEffect } from "react";
import { HiOutlineTag, HiOutlinePlus } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  // Update selected state on route change
  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 flex flex-col bg-neutral text-secondary w-64 h-screen p-6 shadow-lg z-50">
      {/* Sidebar Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-10"
      >
        <h1 className="text-4xl font-league-gothic text-primary">Dashboard</h1>
      </motion.div>

      {/* Navigation Items */}
      <nav className="space-y-8 mt-10">
        <SidebarItem
          Icon={HiOutlineTag}
          label="Promotions"
          link="/allpromotion"
          isActive={selected === "/"}
        />

        <SidebarItem
          Icon={HiOutlinePlus}
          label="Add a Promotion"
          link="/addpromotion"
          isActive={selected === "/addpromotion"}
        />
      </nav>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-auto bg-primary text-white rounded-full py-2 px-6 font-franklinGothic shadow-lg hover:bg-opacity-90 transition-all duration-300"
      >
        Log Out
      </motion.button>
    </div>
  );
};

const SidebarItem = ({ Icon, label, link, isActive }) => {
  return (
    <Link
      to={link}
      className={`relative flex items-center cursor-pointer p-3 rounded-lg font-franklinGothic text-lg transition-all duration-300 ${
        isActive ? "bg-primary text-white shadow-lg" : "text-secondary"
      }`}
    >
      <Icon className="text-2xl" />
      <span className="ml-3">{label}</span>

      {/* Active State Indicator */}
      {isActive && (
        <motion.div
          layoutId="sidebarActiveIndicator"
          className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-lg"
        />
      )}
    </Link>
  );
};
