import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { searchProduct } from "../features/product/productSlice";
import { IProduct } from "../types/product.types";
import { Link } from "react-router-dom";

const ProductSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const productState = useSelector((state: RootState) => state.productReducer);
  const { searchProducts } = productState;

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const dummyProducts = [
    "Smartphone",
    "Laptop",
    "Headphones",
    "Smart Watch",
    "Tablet",
    "Camera",
    "Bluetooth Speaker",
    "Gaming Console",
    "Fitness Tracker",
    "Wireless Earbuds",
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      dispatch(searchProduct(searchTerm));
    }
  }, [searchTerm]);

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setSearchTerm(e.target.value);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    setSuggestions([]);

    // inputRef.current.focus();
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search products..."
            aria-label="Search products"
            className="hidden md:inline-block min-w-96 py-2 px-3 pr-12 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearInput}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
          <button
            type="submit"
            className="absolute hidden md:inline-block right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
            aria-label="Submit search"
          >
            <FaSearch />
          </button>
        </div>

        {isFocused && searchProducts.length > 0 ? (
          <div className="absolute min-h-[420px] w-full z-[9999] bg-white left-0 top-[95px] py-4 px-3 ">
            <div className="container grid grid-cols-3 lg:grid-cols-8 items-center justify-center ">
              {searchProducts.map((product: IProduct) => (
                <Link
                  to={`products/${product._id}`}
                  key={product._id}
                  className="min-w-36 container leading-5 flex gap-3 flex-col justify-center items-center"
                >
                  <div className="">
                    <img
                      src={product.images && product?.images[0]?.url}
                      alt={product.images && product?.images[0]?.title}
                      className="w-full h-auto object-contain rounded-3xl"
                    />
                  </div>
                  <div>
                    <p className="text-black">{product.productName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : isFocused && searchProducts.length === 0 ? (
          <div className="absolute min-h-[420px] w-full z-[9999] bg-white left-0 top-[95px] py-4 px-3 ">
            <div className="container grid grid-cols-3 lg:grid-cols-8 items-center justify-center ">
              <p className="text-red-600">No product found!</p>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default ProductSearch;
