import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Table from "../../../components/ui/Table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

const ProductManagement = () => {
  const columns = [
    { key: "images", label: "Image", sortable: false }, // Hình ảnh sản phẩm
    { key: "name", label: "Name", sortable: true }, // Tên sản phẩm
    { key: "price", label: "Price", sortable: true }, // Giá sản phẩm
    { key: "category", label: "Category", sortable: true }, // Danh mục sản phẩm
    { key: "stockQuantity", label: "Stock", sortable: true }, // Số lượng tồn kho
    { key: "averageRating", label: "Rating", sortable: true }, // Đánh giá trung bình
    { key: "isFeatured", label: "Featured", sortable: true }, // Sản phẩm nổi bật
    { key: "createdAt", label: "Created Date", sortable: true }, // Ngày tạo
  ];

  const dispatch: AppDispatch = useDispatch();
  const productState = useSelector((state: RootState) => state.productReducer);

  const { products } = productState;

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // const handleSelectProduct = (productId: number) => {
  //   if (selectedProducts.includes(productId)) {
  //     setSelectedProducts(selectedProducts.filter((id) => id !== productId));
  //   } else {
  //     setSelectedProducts([...selectedProducts, productId]);
  //   }
  // };

  // const handleDeleteSelected = () => {
  //   setProducts(products.filter((product) => !selectedProducts.includes(product.id)));
  //   setSelectedProducts([]);
  // };

  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Product Management
      </h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
          <FaPlus className="mr-2" /> Add Product
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
    </div>
  );
};

export default ProductManagement;
