import React, { useEffect, useState } from "react";
import { FiMenu, FiHome, FiUsers, FiDatabase, FiSettings, FiMoon, FiSun } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Logo from '../../assets/logo.svg'
import moment from "moment";
import { FaBicycle, FaEdit, FaTrash } from "react-icons/fa";
import ChangeRoleUser from "../../components/ChangeRoleUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getAllUser } from "../../features/auth/authSlice";
import { User } from "../../types/user.types";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const dispatch : AppDispatch = useDispatch();

  const userState = useSelector((state: RootState) => state.authReducer.users)

  useEffect(() => {
    dispatch(getAllUser())
  },[])

  const handleEditRole = (role:any) => {
    setSelectedUserRole(role);
    setIsDialogOpen(true);
  };


  const chartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "tuvngdev@gmail.com", role: "Admin", status: "Active", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", createAt:"" },
    { id: 2, name: "Jane Smith", email: "tuvngdev@gmail.com", role: "Editor", status: "Inactive", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", createAt:"" },
    { id: 3, name: "Bob Johnson", email: "tuvngdev@gmail.com", role: "Viewer", status: "Active", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", createAt:"" },
  ];

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
              <div className="mb-8">
                <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>
                <div className="mt-4">
                  <div className="flex flex-wrap -mx-6">
                    <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                      <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                        <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                          <FiUsers className="h-8 w-8 text-white" />
                        </div>
                        <div className="mx-5">
                          <h4 className="text-2xl font-semibold text-gray-700">8,282</h4>
                          <div className="text-gray-500">New Users</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                      <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                        <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
                          <FiDatabase className="h-8 w-8 text-white" />
                        </div>
                        <div className="mx-5">
                          <h4 className="text-2xl font-semibold text-gray-700">200,521</h4>
                          <div className="text-gray-500">Total Products</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                      <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                        <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                          <FiSettings className="h-8 w-8 text-white" />
                        </div>
                        <div className="mx-5">
                          <h4 className="text-2xl font-semibold text-gray-700">215,542</h4>
                          <div className="text-gray-500">Available Products</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="mb-8">
                <h3 className="text-gray-700 text-3xl font-medium">Users</h3>
                <div className="mt-8">
                  <div className="flex flex-col mt-6">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                      <div
                        className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
                      >
                        <table className="min-w-full">
                          <thead>
                            <tr>
                              <th
                                className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Email
                              </th>
                              <th
                                className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Role
                              </th>
                              <th
                                className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Status
                              </th>
                              <th
                                className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Created Date
                              </th>
                              <th
                                className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {userState.map((user: User) => (
                              <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img
                                        className="h-10 w-10 rounded-full"
                                        src={user.image}
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm leading-5 font-medium text-gray-900">
                                        {user.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">{user.role}</div>
                                </td>
                                
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      user.status === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {user.status}
                                  </span>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">{moment(user.createAt).format("LL")}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex gap-2">
                                  <button className="bg-yellow-100 p-3 rounded-full cursor-pointer hover:bg-yellow-200 flex items-center ">
                                    <FaEdit onClick={handleEditRole} />
                                  </button>
                                  <button className="bg-red-400 p-3 rounded-full cursor-pointer hover:bg-red-500 hover:text-white flex items-center ">
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <ChangeRoleUser open={isDialogOpen} onClose={() => setIsDialogOpen(false)} role={selectedUserRole} />
              </div>
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
