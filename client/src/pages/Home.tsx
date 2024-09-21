import React from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const categories = [
    {
      name: "Tea Sets",
      image:
        "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Teapots",
      image:
        "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Tea Cups",
      image:
        "https://www.adagio.com/images5/products_index_retina/spiced_blood_orange.jpg",
    },
    {
      name: "Accessories",
      image:
        "https://www.adagio.com/images5/products_index_retina/pu_erh_coffee.jpg",
    },
  ];

  const newAdditions = [
    {
      name: "Elegant Porcelain Tea Set",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1614032686163-bdc24c13d0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Modern Glass Teapot",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1607260550778-aa9d29b2f339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Ceramic Tea Cup Set",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1530968129509-21d1534d4df1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const bestSellers = [
    {
      name: "Classic Cast Iron Teapot",
      price: 79.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    },
    {
      name: "Japanese Matcha Set",
      price: 89.99,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Electric Tea Kettle",
      price: 59.99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1635597355061-340503280064?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    },
  ];

  const bestReviews = [
    {
      name: "Stephanie L.",
      rating: 5,
      review:
        "The porcelain tea set is absolutely stunning! It's become the centerpiece of my tea parties.",
      product: "Elegant Porcelain Tea Set",
    },
    {
      name: "Michael R.",
      rating: 5,
      review:
        "I love my new glass teapot. It's perfect for brewing loose leaf teas and looks great on my kitchen counter.",
      product: "Modern Glass Teapot",
    },
    {
      name: "Emily W.",
      rating: 4.5,
      review:
        "The ceramic tea cup set is beautiful and functional. Great for everyday use!",
      product: "Ceramic Tea Cup Set",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.adagio.com/images5/front_page/2024_pu_erh_coffee_bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover Exquisite Teaware
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Elevate Your Tea Experience
            </p>
            <Link to="products">
              <button className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Easy to Find Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Easy to Find</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newest Additions Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Newest Additions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newAdditions.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">
                    New arrival in our collection
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${item.price}</span>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < Math.floor(item.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } mr-1`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">{item.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${item.price}</span>
                  <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Review Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Best Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < Math.floor(review.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } mr-1`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">{review.rating}</span>
                </div>
                <p className="text-gray-700 mb-4">"{review.review}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{review.name}</span>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    View {review.product} <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
