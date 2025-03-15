import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Marquee from "react-fast-marquee";
import { CgMenuBoxed } from "react-icons/cg";
import { FaShopware } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      {/* Thanh trên cùng */}
      <div className="bg-blue-400 font-semibold text-white text-sm lg:grid lg:grid-cols-3 px-4 py-2 h-10">
        <div className="hidden uppercase lg:col-span-2 lg:flex">
          <Marquee>Địa chỉ </Marquee>
        </div>
        <div className="flex items-center justify-end gap-3">
          <a href="#" className="hover:underline">
            Đăng nhập
          </a>
          <span>|</span>
          <span>Hotline: 0333333333</span>
        </div>
      </div>

      {/* Thanh điều hướng */}
      <div className="menu-navbar flex justify-between items-center pr-[3rem] pl-[3rem] shadow-[0px_4px_10px_rgba(0,0,0,0.15)]">
        <div className="menu-logo xl:order-first">
          <a href="">
            <FaShopware className="text-6xl m-[10px]" />
          </a>
        </div>
        <div className="menu-data order-first flex justify-between items-center h-[80px]">
          <ul className="hidden xl:flex justify-center items-center text-base  uppercase font-semibold text-gray-700 h-full">
            <li className="py-[30px] px-[20px]">
              <a href="/" className="hover:text-blue-500 transition">
                Trang chủ
              </a>
            </li>
            <li className="py-[30px] px-[20px]">
              <a href="#" className="hover:text-blue-500 transition">
                Giới thiệu
              </a>
            </li>
            <li className="relative group py-[30px] px-[20px]">
              <a
                href="#"
                className="flex items-center hover:text-blue-500 transition"
              >
                Sản phẩm
                <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180 " />
              </a>
              {/* Dropdown menu */}
              <ul className="absolute left-0 top-[90px] w-48 bg-orange-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    SẢN PHẨM HOT
                  </a>
                </li>
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    SẢN PHẨM SALE
                  </a>
                </li>
              </ul>
            </li>
            <li className="relative group py-[30px] px-[20px]">
              <a
                href="#"
                className="flex items-center hover:text-blue-500 transition"
              >
                Thương hiệu
                <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </a>
              {/* Dropdown menu */}
              <ul className="absolute left-0 top-[90px] w-48 bg-orange-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    NIKE
                  </a>
                </li>
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    ADIDAS
                  </a>
                </li>
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    NEW BALANCE
                  </a>
                </li>
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    PUMA
                  </a>
                </li>
              </ul>
            </li>
            <li className="relative group py-[30px] px-[20px]">
              <a
                href="#"
                className="flex items-center hover:text-blue-500 transition"
              >
                phụ kiện
                <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </a>
              {/* Dropdown menu */}
              <ul className="absolute left-0 top-[90px] w-48 bg-orange-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    vớ
                  </a>
                </li>
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    giày
                  </a>
                </li>
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    dung dịch vệ sinh
                  </a>
                </li>
              </ul>
            </li>
            <li className="relative group py-[30px] px-[20px]">
              <a
                href="/bai-viet"
                className="flex items-center hover:text-blue-500 transition"
              >
                blog
                <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </a>
              {/* Dropdown menu */}
              <ul className="absolute left-0 top-[90px] w-48 bg-orange-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    mẹo vặt
                  </a>
                </li>
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    Tin tức
                  </a>
                </li>
                <li className="border-b border-white hover:bg-orange-400">
                  <a href="#" className="block px-4 py-2 text-white">
                    sự kiện
                  </a>
                </li>
              </ul>
            </li>
            <li className="py-[30px] px-[20px]">
              <a href="/lien-he" className="hover:text-blue-500 transition">
                Liên hệ
              </a>
            </li>
          </ul>
          {/* icon response */}
          <div className="menu-icon">
            {isMenuOpen ? (
              <AiFillCloseSquare
                className="xl:hidden text-6xl text-orange-600 font-black cursor-pointer transition-transform duration-400 ease-in-out"
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <CgMenuBoxed
                className="xl:hidden text-6xl text-orange-600 font-black cursor-pointer transition-transform duration-400 ease-in-out"
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </div>
        </div>
        <div className="menu-cart order-last">
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <IoIosSearch className="cursor-pointer text-2xl text-gray-700 hover:text-blue-500" />
            <IoHeartOutline className="cursor-pointer text-2xl text-gray-700 hover:text-blue-500" />
            <HiOutlineShoppingBag className="cursor-pointer text-2xl text-gray-700 hover:text-blue-500" />
          </div>
        </div>
      </div>
      {/* Menu response */}
      <div
        className={`xl:hidden menu-parent bg-yellow-100 m-[4px] rounded-lg p-4 transition-transform duration-800 ${
          isMenuOpen
            ? "translate-x-0 h-[calc(100vh-80px)]"
            : "-translate-x-full hidden"
        }`}
      >
        <ul className="space-y-2">
          <li className="py-2 font-semibold relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
            <a href="/" className="hover:text-blue-500 transition">
              TRANG CHỦ
            </a>
          </li>
          <li className="py-2 font-semibold relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
            GIỚI THIỆU
          </li>
          <li className="relative group ">
            <div className="flex justify-between">
              <button className="py-2 font-semibold w-full text-left uppercase relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 group-hover:before:scale-x-100">
                sản phẩm
              </button>
              <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </div>
            <ul className="bg-orange-300 rounded-lg mt-2 hidden group-hover:block uppercase">
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                sản phẩm hot
              </li>
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                sản phẩm sale
              </li>
            </ul>
          </li>

          <li className="relative group ">
            <div className="flex justify-between">
              <button className="py-2 font-semibold w-full text-left uppercase relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 group-hover:before:scale-x-100">
                thương hiệu
              </button>
              <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </div>
            <ul className="bg-orange-300 rounded-lg mt-2 hidden group-hover:block uppercase">
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                nike
              </li>
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                adidas
              </li>
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                new balance
              </li>
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                puma
              </li>
            </ul>
          </li>
          <li className="relative group ">
            <div className="flex justify-between">
              <button className="py-2 font-semibold w-full text-left uppercase relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 group-hover:before:scale-x-100">
                phụ kiện
              </button>
              <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </div>
            <ul className="bg-orange-300 rounded-lg mt-2 hidden group-hover:block uppercase">
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                vớ
              </li>
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                dây giày
              </li>
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                dung dịch vệ sinh giày
              </li>
            </ul>
          </li>
          <li className="relative group ">
            <div className="flex justify-between">
              <button className="py-2 font-semibold w-full text-left uppercase relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 group-hover:before:scale-x-100">
                <a href="/bai-viet" className="hover:text-blue-500 transition">
                  BLOG
                </a>
              </button>
              <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </div>
            <ul className="bg-orange-300 rounded-lg mt-2 hidden group-hover:block uppercase">
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                mẹo vặt
              </li>
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                tin tức
              </li>
              <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                tư vấn
              </li>
            </ul>
          </li>
          <li className="py-2 font-semibold relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
            <a href="/lien-he" className="hover:text-blue-500 transition">
              LIÊN HỆ
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
