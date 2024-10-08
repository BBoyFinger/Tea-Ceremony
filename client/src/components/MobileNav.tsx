import React, { Fragment, useEffect, useState } from "react";
import { FiHome, FiInfo, FiMenu, FiX } from "react-icons/fi";
import {
  RiBloggerLine,
  RiContactsBook3Line,
  RiProductHuntLine,
} from "react-icons/ri";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

type Props = {};

const MobileNav = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome />,
    },
    {
      name: "Product",
      path: "/products",
      icon: <RiProductHuntLine />,
    },
    {
      name: "Blog",
      path: "/blog",
      icon: <RiBloggerLine />,
    },
    {
      name: "About Us",
      path: "/about",
      icon: <FiInfo />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <RiContactsBook3Line />,
    },
  ];
  return (
    <>
      <div
        className={` z-50 transition-all duration-300 ${
          isScrolled ? " shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <button
            className="md:hidden text-white hover:text-blue-600 transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleMenu}
        ></div>
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col h-full p-6">
            <button
              className="self-end text-gray-700 hover:text-blue-600 transition-colors duration-300 mb-8"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
            <div>
              <img src={Logo} alt="logo" />
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={`${item.path.toLowerCase()}`}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300 py-3"
                onClick={toggleMenu}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
