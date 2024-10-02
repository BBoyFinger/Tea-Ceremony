import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../types/product.types";

const ProductsList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="w-full h-48 object-cover mb-4"
              />
            )}
            <h3 className="text-lg font-semibold mb-2">
              {product.productName}
            </h3>
            {product.discount && (
              <p className="text-red-500 mb-2">
                Sale: $
                {product.price &&
                  (
                    product.price -
                    product.price * (product.discount / 100)
                  ).toFixed(2)}
              </p>
            )}
            {!product.discount && (
              <p className="text-gray-600 mb-2">${product.price}</p>
            )}
            {/* {product.discount && (
              <p className="text-red-500 mb-2">
                Sale: $
                {product.price &&
                  (
                    product.price -
                    product.price * (product.discount / 100)
                  ).toFixed(2)}
              </p>
            )}
            {!product.discount && (
              <p className="text-gray-600 mb-2">${product.price}</p>
            )}
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              Category: {product.category}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Material: {product.material}
            </p>
            {product.stockQuantity ? (
              <p className="text-sm text-green-600">
                In Stock: {product.stockQuantity}
              </p>
            ) : (
              <p className="text-sm text-red-600">Out of Stock</p>
            )}
            <div className="flex items-center mb-2">
              <p className="text-sm text-gray-500">
                Rating: {product.averageRating} / 5
              </p>
              <p className="ml-2 text-sm text-gray-500">
                ({product.reviewsCount} reviews)
              </p>
            </div> */}
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsList;
