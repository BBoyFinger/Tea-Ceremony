import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
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
      const filteredSuggestions = dummyProducts.filter((product) =>
        product.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setError(filteredSuggestions.length === 0 ? "No results found" : "");
    } else {
      setSuggestions([]);
      setError("");
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    setSuggestions([]);
    setError("");
    inputRef.current.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="relative">
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
            className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm"
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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
            aria-label="Submit search"
          >
            <FaSearch />
          </button>
        </div>
        {error && (
          <p className="text-red-500 mt-2 text-sm animate-pulse">{error}</p>
        )}
        {isFocused && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ease-in-out"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default ProductSearch;
