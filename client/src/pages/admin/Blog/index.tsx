import React, { ChangeEvent, useRef, useState } from "react";
import Table from "../../../components/ui/Table";

import { IBlog } from "../../../types/blog.type";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Modal } from "../../../components/ui/Modal";
import { FaTimes, FaUpload } from "react-icons/fa";
import { uploadImageBlog } from "../../../utils/uploadImage";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  getBlog,
  updateBlog,
} from "../../../features/blog/blogSlice";
import { toast } from "react-toastify";

const BlogManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogReducer.blogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<string[]>([]);
  const [blogInfo, setBlogInfo] = useState<IBlog | null>({
    _id: "",
    title: "",
    content: "",
    images: [
      {
        url: "",
        title: "",
      },
    ],
  });
  const [UploadImageInput, setUploadImageInput] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlogInfo({ ...blogInfo, [name]: value });
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
    setBlogInfo(blog);
    setIsModalOpen(true);
  };

  const handleSearch = (e: any) => {};

  const columns = [
    { key: "title", label: "Title", sortable: true },
    { key: "content", label: "Content", sortable: true },
  ];

  const handleSort = () => {};

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];

    setUploadImageInput(file?.name);

    const uploadImageFormCloudinary = await uploadImageBlog(file);

    setBlogInfo((prev: any) => {
      return {
        ...prev,
        images: [{ url: uploadImageFormCloudinary?.url, title: file?.name }],
      };
    });
  };

  const handleSubmit = async () => {
    console.log(blogInfo);
    if (blogInfo?._id) {
      await dispatch(updateBlog(blogInfo));
      toast.success("Update blog successfully!");
    } else {
      const payload = {
        title: blogInfo?.title,
        content: blogInfo?.content,
        images: blogInfo?.images,
      };
      await dispatch(createBlog(payload));
      toast.success("Create blog successfully!");
      setIsModalOpen(false);
    }
    await dispatch(getBlog());
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
            value=""
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
        selectedItems={selectedBlog}
        onSelectItem={handleSelectItem}
        onDeleteSelected={() => {}}
        columns={columns}
        data={blogs}
        sortBy={"sortBy"}
        sortOrder={"asc"}
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
              name="title"
              value={blogInfo?.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog title"
            />
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
              name="content"
              value={blogInfo?.content}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your blog content here"
            ></textarea>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="images"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload images</span>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {blogInfo?.images?.length && blogInfo?.images?.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {blogInfo?.images?.map((image: any, index: any) => (
                  <div key={index} className="relative">
                    <img
                      src={image?.url}
                      alt={`Uploaded image ${image?.title}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setBlogInfo((prev: any) => ({
                          ...prev,
                          images: prev.images.filter(
                            (_: any, i: any) => i !== index
                          ),
                        }))
                      }
                      className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BlogManagement;
