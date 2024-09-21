import React, { useEffect, useState } from "react";
import { FiMenu, FiHome, FiUsers, FiDatabase, FiSettings} from "react-icons/fi";

import Logo from '../../assets/logo.svg'

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

import UserManagement from "./User";
import Dashboard from "./Dashboard";


const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


 

  return (
    <div className="flex h-screen">
      <aside
        className={`bg-gray-800 text-white w-64 min-h-screen p-4 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <nav>
            <div className="flex items-center justify-center m-4 ">
                <img src={Logo} alt="logo" className="w-20 h-20 bg-white rounded-full"  />
            </div>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${
                  activeTab === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <FiHome />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${
                  activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <FiUsers />
                <span>Users</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${
                  activeTab === "produtcs" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <FiDatabase />
                <span>Products</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${
                  activeTab === "settings" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <FiSettings />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className=" py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <FiMenu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {activeTab === "dashboard" && (
              <Dashboard />
            )}

            {activeTab === "users" && (
              <UserManagement />
            )}

            {activeTab === "products" && (
              <div className="mb-8">
                <h3 className="text-gray-700 text-3xl font-medium">Products</h3>
                <p className="mt-4 text-gray-600">Products management section content goes here.</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="mb-8">
                <h3 className="text-gray-700 text-3xl font-medium">Settings</h3>
                <p className="mt-4 text-gray-600">Settings section content goes here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
