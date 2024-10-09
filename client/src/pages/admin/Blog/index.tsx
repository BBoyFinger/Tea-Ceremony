import React, { useRef, useState } from "react";
import Table from "../../../components/ui/Table";

import { IBlog } from "../../../types/blog.type";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Modal } from "../../../components/ui/Modal";
import { FaSpinner, FaUpload } from "react-icons/fa";

interface IError {
  title?: string;
  content?: string;
  description?: string;
}
const BlogManagement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState<IError>({});
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [sortBy, setSortBy] = useState<string>("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogInfo, setBlogInfo] = useState({
    _id: "",
    name: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (blog: IBlog | null = null) => {
    setIsModalOpen(true);
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "content", label: "Content", sortable: true },
  ];

  const blogs = [
    {
      id: "1",
      name: "hehe",
      content: "no des",
    },
    {
      id: "2",
      name: "hehe",
      content: "no des",
    },
    {
      id: "3",
      name: "hehe",
      content: "no des",
    },
  ];

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log("hello");
    let newErrors: IError = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Blogs Management
      </h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Blogs"
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={() => openModal(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
        >
          <FiPlus className="mr-2" /> Add Blog
        </button>
      </div>

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

      <div>
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          title={`${blogInfo?._id === undefined ? "Create Blog" : "Edit Blog"}`}
          onSubmit={handleSubmit}
          submitText={`${
            blogInfo?._id === undefined ? "Create Blog" : "Edit Blog"
          }`}
          cancelText="Cancel"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your blog content here"
            ></textarea>
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail Image
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  } else {
                    console.error("fileInputRef.current is null");
                  }
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaUpload className="mr-2" />
                Upload Image
              </button>
            </div>
            {image && (
              <div className="mt-2">
                <img
                  src={image}
                  alt="Preview"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BlogManagement;
