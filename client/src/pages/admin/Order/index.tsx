import React from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import Table from "../../../components/ui/Table";

type Props = {};

const OrderManagement = (props: Props) => {

  const column = [
    { key: "name", label: "Name", sortable: true },
  ]
  function openModal(arg0: null): void {
    throw new Error("Function not implemented.");
  }

  function handleSelectOrder(id: string): void {
    throw new Error("Function not implemented.");
  }

  function handleSort(key: string): void {
    throw new Error("Function not implemented.");
  }

  function handleDeleteOrder(id: string[]): void {
    throw new Error("Function not implemented.");
  }

  function handleDeleteOrderSelected(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Orders Management
      </h1>
      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories"
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={() => openModal(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
        >
          <FiPlus className="mr-2" /> Add Order
        </button>
      </div>
      {/* Table */}
      <div>
        <Table
          selectedItems={selectedOrders}
          onSelectItem={(id) => handleSelectOrder(id)}
          onSort={handleSort}
          onEdit={(Order) => openModal(Order)}
          onDelete={(id) => handleDeleteOrder(id)}
          onDeleteSelected={handleDeleteOrderSelected}
          itemsPerPage={orders.length}
          sortBy={sortBy}
          sortOrder={sortOrder}
          columns={columns}
          data={orders}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
