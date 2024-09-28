import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaTimes, FaUpload } from "react-icons/fa";
import Table from "../../../components/ui/Table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getProducts } from "../../../features/product/productSlice";
import { Modal } from "../../../components/ui/Modal";
import { IProduct } from "../../../types/product.types";
import { getCategories } from "../../../features/category/categorySlice";
import { BsSearch } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchField, setSearchField] = useState({
    productName: "",
    category: "",
    brand: "",
    tags: "",
    availability: "",
    isFeatured: false,
  });

  const columns = [
    // { key: "images", label: "Image", sortable: false }, // Hình ảnh sản phẩm
    { key: "productName", label: "Name", sortable: true }, // Tên sản phẩm
    { key: "price", label: "Price", sortable: true }, // Giá sản phẩm
    { key: "category", label: "Category", sortable: true }, // Danh mục sản phẩm
    { key: "stockQuantity", label: "Stock", sortable: true }, // Số lượng tồn kho
    { key: "averageRating", label: "Rating", sortable: true }, // Đánh giá trung bình
    { key: "isFeatured", label: "Featured", sortable: true }, // Sản phẩm nổi bật
    { key: "createdAt", label: "Created Date", sortable: true }, // Ngày tạo
  ];

  const dispatch: AppDispatch = useDispatch();
  const productState = useSelector((state: RootState) => state.productReducer);
  const categoryState = useSelector(
    (state: RootState) => state.categoryReducer
  );
  const { categories } = categoryState;
  const { products } = productState;
  const [productInfo, setProductInfo] = useState<IProduct>({
    _id: "",
    productName: "",
    description: "",
    price: 0,
    currency: "USD",
    images: [],
    category: "",
    material: "",
    stockQuantity: 0,
    availability: "",
    averageRating: 0,
    reviewsCount: 0,
    reviews: [],
    discount: undefined,
    isFeatured: false,
    tags: [],
    shippingInfo: "",
    brand: "",
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
    setSearchField({ ...searchField, [name]: value });
  };

  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file: any) => URL.createObjectURL(file));
    setProductInfo((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const handleTagAdd = (e: any) => {
    if (e.key === "Enter" && e.target.value) {
      setProductInfo((prev) => ({
        ...prev,
        tags: [...prev.tags, e.target.value],
      }));
      e.target.value = "";
    }
  };

  const handleTagRemove = (tagToRemove: any) => {
    setProductInfo((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const opentModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    console.log(productInfo);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Product Management
      </h1>
      {/* Search Field */}
      <div className="max-w-md">
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label
              htmlFor="searchName"
              className="min-w-[100px] text-sm text-left font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={searchField.productName}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter name"
            />
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="searchBrand"
              className="min-w-[100px] block text-left  text-sm font-medium text-gray-700 mb-1"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={searchField.brand}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter brand"
            />
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="category"
              className="block min-w-[100px] text-sm text-left font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              value={searchField.category}
              id="category-select"
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {categories.map((el) => (
                <option value={el.name} key={el._id} className="text-sm">
                  {el.name}
                </option>
              ))}
            </select>
            
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="category"
              className="block min-w-[100px] text-sm text-left font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              value={searchField.category}
              id="category-select"
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {categories.map((el) => (
                <option value={el.name} key={el._id} className="text-sm">
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="category"
              className="block min-w-[100px] text-sm text-left font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              value={searchField.category}
              id="category-select"
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {categories.map((el) => (
                <option value={el.name} key={el._id} className="text-sm">
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="category"
              className="block min-w-[100px] text-sm text-left font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              value={searchField.category}
              id="category-select"
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {categories.map((el) => (
                <option value={el.name} key={el._id} className="text-sm">
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="flex items-center justify-end mb-2 gap-4">
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
          <BsSearch className="mr-2" /> Search
        </button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
          <FiPlus className="mr-2" /> Add Product
        </button>
      </div>
      <div className="">
        <Table
          columns={columns}
          data={products}
          sortBy=""
          sortOrder="asc"
          selectedItems={["1"]}
          itemsPerPage={5}
          onDelete={() => {}}
          onEdit={() => {}}
          onSort={() => {}}
          onDeleteSelected={() => {}}
          onSelectItem={() => {}}
        />
      </div>
      <div>
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          title={`${
            productInfo?._id !== undefined ? "Create Product" : "Edit Product"
          }`}
          onSubmit={handleSubmit}
          submitText={`${
            productInfo?._id !== undefined ? "Create Product" : "Edit Product"
          }`}
          cancelText="Cancel"
          className={
            "inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl overflow-y-auto max-h-[90vh]"
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={productInfo.productName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productInfo.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-6 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <select
                    id="currency"
                    name="currency"
                    value={productInfo.currency}
                    onChange={handleInputChange}
                    className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option>USD</option>
                    <option>VND</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-span-full">
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
                value={productInfo.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={productInfo.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((item) => (
                  <>
                    <option key={item._id} value={`${item._id}`}>
                      {item.name}
                    </option>
                  </>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="material"
                className="block text-sm font-medium text-gray-700"
              >
                Material
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={productInfo.material}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="stockQuantity"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Quantity
              </label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={productInfo.stockQuantity}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div>
              <label
                htmlFor="availability"
                className="block text-sm font-medium text-gray-700"
              >
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                value={productInfo.availability}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={productInfo.discount}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={productInfo.brand}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div className="col-span-full">
              <label
                htmlFor="shippingInfo"
                className="block text-sm font-medium text-gray-700"
              >
                Shipping Information
              </label>
              <textarea
                id="shippingInfo"
                name="shippingInfo"
                rows={2}
                value={productInfo.shippingInfo}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-1 flex flex-wrap gap-2">
                {productInfo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-1 inline-flex text-indigo-400 focus:outline-none"
                    >
                      <span className="sr-only">Remove tag</span>
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  onKeyDown={handleTagAdd}
                  placeholder="Add a tag"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
              {productInfo.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {productInfo.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Uploaded image ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setProductInfo((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index),
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
              <div className="flex items-center mt-4">
                <input
                  id="isFeatured"
                  name="isFeatured"
                  type="checkbox"
                  checked={productInfo.isFeatured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isFeatured"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Mark as featured product
                </label>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProductManagement;
