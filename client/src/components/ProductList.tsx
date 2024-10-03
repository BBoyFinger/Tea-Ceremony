import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../types/product.types";

const ProductsList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          to={`/products/${product._id}`}
          key={product._id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105"
        >
          <div className="p-4">
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0].url}
                alt={product.images[0].title}
                className="w-full h-48 object-fill mb-2"
              />
            )}
            <h3 className="text-base capitalize font-medium mb-1">
              {product.productName}
            </h3>
            {product.discount && (
              <div className="flex justify-between">
                <p className="text-[#a66920] mb-2 font-semibold text-sm">
                  Sale: $
                  {product.price &&
                    product.price - product.price * (product.discount / 100)}
                </p>
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 font-medium">
                    Rating: {product.averageRating} / 5
                  </p>
                  <p className="ml-2 text-sm text-gray-500 font-medium">
                    ({product.reviewsCount} reviews)
                  </p>
                </div>
              </div>
            )}
            {!product.discount && (
              <p className="text-[#a66920] mb-2 font-semibold text-sm">
                only ${product.price}
              </p>
            )}

            <button className="bg-[#f05338] w-full text-white py-2 px-4 rounded hover:bg-[#f04138] transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsList;
