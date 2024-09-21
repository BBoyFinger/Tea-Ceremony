import React, { useState, useEffect } from "react";
import { FaSort, FaFilter, FaShoppingCart } from "react-icons/fa";
import { Product } from "../../types/product.types";
import { ICategory } from "../../types/category.types";

const ProductListingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch products and categories
    const fetchData = async () => {
      const productsData: Product[] = [
        {
          _id: 1,
          name: "Product 1",
          price: 99.99,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
          _id: 2,
          name: "Product 2",
          price: 149.99,
          category: "Clothing",
          image:
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1305&q=80",
        },
        {
          _id: 3,
          name: "Product 3",
          price: 199.99,
          category: "Home",
          image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
          _id: 4,
          name: "Product 4",
          price: 79.99,
          category: "Electronics",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
          _id: 5,
          name: "Product 5",
          price: 129.99,
          category: "Clothing",
          image:
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        },
        {
          _id: 6,
          name: "Product 6",
          price: 249.99,
          category: "Home",
          image:
            "https://images.unsplash.com/photo-1523575708161-ad0fc2a9b951?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
      ];
      const categoriesData = [
        { _id: 1, name: "All" },
        { _id: 2, name: "Electronics" },
        { _id: 3, name: "Clothing" },
        { _id: 4, name: "Home" },
      ];

      setProducts(productsData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e: any) => {
    setSortBy(e.target.value);
  };

  const handlePriceRangeChange = (e: any) => {
    setPriceRange([parseInt(e.target.min), parseInt(e.target.max)]);
  };

  const filteredProducts = products
    .filter(
      (product: Product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )
    .sort((a: any, b: any) => {
      if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <aside
            className={`w-full md:w-64 bg-white p-4 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 transition-all duration-300 ${
              isSidebarOpen ? "md:translate-x-0" : "md:-translate-x-full"
            }`}
          >
            <button
              className="md:hidden w-full bg-blue-500 text-white py-2 px-4 rounded mb-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? "Close Categories" : "Open Categories"}
            </button>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul>
              {categories.map((category: ICategory) => (
                <li key={category._id} className="mb-2">
                  <button
                    className={`w-full text-left py-2 px-4 rounded ${
                      selectedCategory === category.name
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <section className="flex-grow">
            <div className="mb-4 flex flex-wrap items-center justify-between">
              <div className="w-full md:w-auto mb-4 md:mb-0">
                <label htmlFor="sort" className="mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="py-2 px-4 rounded border border-gray-300"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <div className="w-full md:w-auto">
                <label htmlFor="priceRange" className="mr-2">
                  Price Range:
                </label>
                <input
                  type="range"
                  id="priceRange"
                  className="w-full md:w-64"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                />
                <span className="ml-2">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: Product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProductListingPage;
