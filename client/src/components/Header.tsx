import React from "react";
import Logo from "./Logo";
import { IoSearchOutline } from "react-icons/io5";
import { PiUserCircleLight } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {};



const Header = (props: Props) => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  console.log("user: ", user)

  const handleLogout = async () => {
    const response = await axiosInstance.get("/logout");

    if (response.data.success) {
      toast.success(response.data.message);
    }

    if (response.data.error) {
      toast.error(response.data.message);
    }
  };

  return (
    <header className="h-24 shadow-2xl bg-[#db8f32]">
      <div className="container h-full flex justify-between items-center  text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo width={100} height={100} />
          <span className="text-xl">Teaware Shop</span>
        </Link>
        {/* Search */}
        <div className="hidden lg:flex w-full items-center justify-between max-w-sm border rounded-full pl-2 focus-within:shadow">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none bg-transparent placeholder:text-white text-white"
          />
          <div className="text-lg min-w-[50px] h-[32px] flex items-center justify-center rounded-r-full bg-[#bd3030] text-white cursor-pointer ">
            <IoSearchOutline />
          </div>
        </div>
        {/* Cart User */}
        <div className="flex gap-4 items-center justify-center">
          <div className="cursor-pointer text-3xl">
            <PiUserCircleLight />
          </div>
          <div className=" text-2xl relative cursor-pointer">
            <span>
              <HiOutlineShoppingBag />
            </span>
            <div className="bg-[#bd3030] text-white w-4 h-4 p-1 flex items-center justify-center rounded-full absolute -top-1 -right-2">
              <p className="text-xs">0</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button onClick={handleLogout}> Logout </button>
            ) : (
              <Link
                to={"/login"}
                className="px-4 py-2 rounded-full font-bold bg-[#bd3030] hover:opacity-[0.9] text-white "
              >
                Login
              </Link>
            )}
             {/* <Link
                to={"/login"}
                className="px-4 py-2 rounded-full font-bold bg-[#bd3030] hover:opacity-[0.9] text-white "
              >
                Login
              </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
