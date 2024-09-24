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

  const handleDelete = (id: number) => {
    // Logic xóa
  };

  const handleSelectItem = () => {

  }

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "productCount", label: "Products", sortable: true },
  ];

  const blogs = [
    {
        id: "1", name: "hehe", description: "no des", productCount: 4,
        
    },
    {
        id: "2", name: "hehe", description: "no des", productCount: 4,
        
    },
    {
        id: "3", name: "hehe", description: "no des", productCount: 4,
        
    },
  ]
  return (
    <div>
      <Table
        selectedItems={[1,2,3]}
        onSelectItem={handleSelectItem}
        onDeleteItem={handleDelete}
        onEditItem={handleEdit}
        onDeleteSelected={() => {}}
        columns={columns}
        data={blogs}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default BlogManagement;
