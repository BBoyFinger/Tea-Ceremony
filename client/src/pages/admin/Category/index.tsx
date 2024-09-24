import React, { useState, useEffect, ReactHTMLElement } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Dialog, DialogBackdrop, Transition } from "@headlessui/react";
import { ImSpinner3 } from "react-icons/im";

interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch categories
    const fetchCategories = async () => {
      setIsLoading(true);
      // Replace this with actual API call
      const response = await new Promise<Category[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: 1,
                name: "Electronics",
                description: "Electronic devices and gadgets",
                productCount: 150,
              },
              {
                id: 2,
                name: "Clothing",
                description: "Apparel and accessories",
                productCount: 200,
              },
              {
                id: 3,
                name: "Books",
                description: "Printed and digital books",
                productCount: 100,
              },
              {
                id: 4,
                name: "Home & Garden",
                description: "Items for home and garden",
                productCount: 180,
              },
              {
                id: 5,
                name: "Sports",
                description: "Sports equipment and accessories",
                productCount: 120,
              },
            ]),
          1000
        )
      );
      setCategories(response);
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = filteredCategories.sort((a: any, b: any) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const openModal = (category = null) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCategory(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating API call to create/update category
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Update categories state
    if (currentCategory) {
      setCategories(
        categories.map((cat: Category) =>
          cat.id === currentCategory.id ? currentCategory : cat
        )
      );
    } else {
      const newCategory: Category = {
        id: categories.length + 1,
        name: "New Category", // Bạn có thể thay đổi giá trị này theo yêu cầu
        description: "New Description", // Bạn có thể thay đổi giá trị này theo yêu cầu
        productCount: 0,
      };
      setCategories([...categories, newCategory]);
    }
    setIsLoading(false);
    closeModal();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setIsLoading(true);
      // Simulating API call to delete category
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCategories(categories.filter((cat) => cat.id !== id));
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Category Management</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories"
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
        >
          <FiPlus className="mr-2" /> Add Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("description")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Description{" "}
                {sortBy === "description" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("productCount")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Products{" "}
                {sortBy === "productCount" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((category: any) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                <td className="px-6 py-4">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {category.productCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openModal(category)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, sortedCategories.length)} of{" "}
          {sortedCategories.length} entries
        </div>
        <div className="flex">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= sortedCategories.length}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogBackdrop className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {currentCategory ? "Edit Category" : "Add Category"}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={currentCategory?.name || ""}
                      onChange={(e: any) =>
                        setCurrentCategory((prevCategory: any) => ({
                          ...(prevCategory || {}), // Sử dụng giá trị trước đó hoặc một đối tượng rỗng nếu prevCategory là null
                          id: prevCategory?.id || categories.length + 1, // Đảm bảo id luôn có giá trị
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={currentCategory?.description || ""}
                      onChange={(e) =>
                        setCurrentCategory((prevCategory) => {
                          if (!prevCategory) {
                            // Nếu prevCategory là null, tạo một đối tượng mới với giá trị mặc định
                            return {
                              id: categories.length + 1, // Đảm bảo id luôn có giá trị
                              name: "Default Name", // Sử dụng giá trị mặc định hoặc yêu cầu người dùng nhập vào
                              description: e.target.value,
                              productCount: 0, // Đảm bảo productCount luôn có giá trị
                            };
                          }

                          // Nếu prevCategory không phải là null, tiếp tục cập nhật description
                          return {
                            ...prevCategory,
                            description: e.target.value,
                          };
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {currentCategory ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center flex-col">
            <ImSpinner3 className="animate-spin w-[40px] h-[40px]"/>

            <p className="mt-4 text-gray-700">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
