import React from "react";
import Logo from "./Logo";
import { IoSearchOutline } from "react-icons/io5";
import { PiUserCircleLight } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setUserDetails } from "../features/auth/authSlice";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ROLE } from "../utils/User";

type Props = {};

const Header = (props: Props) => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axiosInstance.get("/logout");

    if (response.data.success) {
      toast.success(response.data.message);
      dispatch(setUserDetails(null));
    }

    if (response.data.error) {
      toast.error(response.data.message);
    }
    navigate("/login");
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
          <div className="">
            {/* User */}
            <Menu as={"div"} className="relative text-left">
              <div className="flex items-center">
                {user?.pictureImg ? (
                  <MenuButton className="cursor-pointer text-3xl">
                    <img
                      src={user?.pictureImg}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  </MenuButton>
                ) : (
                  <div className="cursor-pointer text-3xl">
                    <PiUserCircleLight />
                  </div>
                )}
              </div>
              <MenuItems
                transition
                className="absolute left-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <nav>
                    {user?.role === ROLE.ADMIN ? (
                      <Link
                        to={"/admin-panel"}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Admin Panel
                      </Link>
                    ): (
                      <Link
                        to={"/profile"}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Profile
                      </Link>
                    )}
                  </nav>
                </div>
              </MenuItems>
            </Menu>
          </div>

          {/* Cart*/}
          <div className=" text-2xl relative cursor-pointer">
            <span>
              <HiOutlineShoppingBag />
            </span>
            <div className="bg-[#bd3030] text-white w-4 h-4 p-1 flex items-center justify-center rounded-full absolute -top-1 -right-2">
              <p className="text-xs">0</p>
            </div>
          </div>
          <div className="">
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full font-bold bg-[#bd3030] hover:opacity-[0.9] text-white "
              >
                {" "}
                Logout{" "}
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-4 py-2 rounded-full font-bold bg-[#bd3030] hover:opacity-[0.9] text-white "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
