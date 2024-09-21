import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FiUsers, FiDatabase, FiSettings } from "react-icons/fi";

type Props = {};

const Dashboard = (props: Props) => {
  const chartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
  ];
  return (
    <div>
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    8,282
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    200,521
                  </h4>
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
                  <h4 className="text-2xl font-semibold text-gray-700">
                    215,542
                  </h4>
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
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
