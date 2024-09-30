import React, { useState } from "react";
import Table from "../../../components/ui/Table";

import { IBlog } from "../../../types/blog.type";

const BlogManagement = () => {
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleEdit = (blog: IBlog) => {
    // Logic chỉnh sửa
  };

  const handleDelete = (id: string[]) => {
    // Logic xóa
  };

  const handleSelectItem = () => {};

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "productCount", label: "Products", sortable: true },
  ];

  const blogs = [
    {
      id: "1",
      name: "hehe",
      description: "no des",
      productCount: 4,
    },
    {
      id: "2",
      name: "hehe",
      description: "no des",
      productCount: 4,
    },
    {
      id: "3",
      name: "hehe",
      description: "no des",
      productCount: 4,
    },
  ];
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Blogs Management
      </h1>
      <Table
        selectedItems={["1", "2", "3"]}
        onSelectItem={handleSelectItem}
        onDeleteSelected={() => {}}
        columns={columns}
        data={blogs}
        sortBy={sortBy}
        sortOrder={sortOrder}
        itemsPerPage={20}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default BlogManagement;
