import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaFacebook,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { getProductById } from "../../features/product/productSlice";

const ProductDetailPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const productState = useSelector((state: RootState) => state.productReducer);
  const { product } = productState;

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getProductById(params.id));
    }
  }, [params.id]);

  const relatedProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      name: "Noise-Cancelling Headphones",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const handleAddToCart = () => {
    setShowMiniCart(true);
    setTimeout(() => setShowMiniCart(false), 3000);
  };

  const renderStars = (rating: any) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<BsStarFill key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<BsStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<BsStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Product Image Gallery */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={product?.images && product?.images[currentImage]?.url}
              alt={product?.images && product.images[currentImage]?.title}
              className="w-full h-auto object-cover transition-transform duration-300 transform hover:scale-110"
            />
          </div>
          <div className="flex mt-4 space-x-2">
            {product?.images &&
              product?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden ${
                    index === currentImage ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.productName} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 md:pl-8 flex flex-col gap-2">
          <p className="text-red-500 text-base font-semibold mb-2">
            {product?.category?.name}
          </p>
          <h1 className="text-2xl font-medium mb-2">{product?.productName}</h1>
          <p className="text-base font-semibold mb-2">${product?.price}</p>
          <p className="text-gray-600 text-base mb-2">{product?.description}</p>

          {/* Add to Cart Section */}
          <div className="flex items-center gap-4 mb-2">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-[50%] px-2 py-1 border rounded-md"
            />
            <button
              onClick={handleAddToCart}
              className="bg-[#f05338] w-[50%]  text-white py-1 px-3 rounded hover:bg-[#f04138] transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>

          <div className="mb-2">
            <span className="text-base">
              {product?.stockQuantity} Items in Stock
            </span>
          </div>

          {/* Social Sharing */}
          <div className="flex space-x-4 mb-8">
            <button className="text-blue-600 hover:text-blue-700">
              <FaFacebook size={24} />
            </button>
            <button className="text-blue-400 hover:text-blue-500">
              <FaTwitter size={24} />
            </button>
            <button className="text-red-600 hover:text-red-700">
              <FaPinterest size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews and Rating Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center mb-4">
          {/* <div className="flex mr-2">{renderStars(product.rating)}</div>
          <span className="text-gray-600">{product.} out of 5</span> */}
        </div>
        <div className="space-y-4">
          {product?.reviews &&
            product?.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">{renderStars(review.rating)}</div>
                  <span className="font-semibold">{review.user}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
        </div>
        <button className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors duration-300">
          Write a Review
        </button>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {relatedProduct.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  ${relatedProduct.price.toFixed(2)}
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Cart Preview */}
      {showMiniCart && (
        <div className="fixed top-4 right-4 bg-white p-4 rounded-md shadow-md">
          <div className="flex items-center">
            <FaShoppingCart className="text-blue-500 mr-2" />
            <p>Item added to cart!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
