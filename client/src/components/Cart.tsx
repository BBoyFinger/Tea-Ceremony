import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

// Define the item type
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = ({ id, name, price, image, quantity }: CartItem) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);

  useEffect(() => {
    setItemCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  const toggleCart = () => setIsOpen(!isOpen);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    showConfirmation(item.name);
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateSubtotal = (): string => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const showConfirmation = (itemName: string) => {
    const notification = document.createElement("div");
    notification.textContent = `${itemName} added to cart`;
    notification.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in-out";
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const dummyItems: Omit<CartItem, "quantity">[] = [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleCart}
        className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out z-10"
        aria-label="Open shopping cart"
      >
        <FaShoppingCart className="text-xl" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-full p-1"
              aria-label="Close cart"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4 bg-gray-100 p-2 rounded-lg hover:shadow-md transition-shadow duration-300 ease-in-out"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-full p-1"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-full p-1"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full p-1"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold">${calculateSubtotal()}</span>
            </div>
            <button
              onClick={clearCart}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out mb-2"
              aria-label="Clear cart"
            >
              Clear Cart
            </button>
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out"
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
            <button
              onClick={() => addItem(item)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out"
              aria-label={`Add ${item.name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
