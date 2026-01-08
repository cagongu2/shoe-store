import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Marquee from "react-fast-marquee";
import { CgMenuBoxed } from "react-icons/cg";
import { FaShopware } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFetchUserByEmailQuery } from "../redux/features/users/userApi";
import { useFetchCartByUserIdQuery } from "../redux/features/carts/cartsApi";
import { useFetchAllBlogCategoriesQuery } from "../redux/features/blogCategories/blogCategoriesApi";
import { logout } from "../redux/features/auth/authSlice";

import { getImgUrl } from "../util/getImageUrl";

const Header = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { data: userData } = useFetchUserByEmailQuery(currentUser?.email, {
    skip: !currentUser?.email,
  });

  // Use userData (fresh) or currentUser (local storage)
  const user = userData || currentUser;
  // ... existing selectors



  const cartItemsFromStore = useSelector((state) => state.status.cartCount);
  const favoriteItems = useSelector((state) => state.favorite.favoriteItems);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: cartItemsFromDB = [] } = useFetchCartByUserIdQuery(
    userData?.id,
    {
      skip: !userData?.id,
    }
  );
  const unpaidCartItems = cartItemsFromDB.filter((item) => !item.isPayed);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (userData) {
      setCartItems(unpaidCartItems.length);
    } else {
      setCartItems(cartItemsFromStore);
    }
  }, [userData, unpaidCartItems, cartItemsFromStore]);

  const handleLogOut = () => {
    dispatch(logout());
    window.location.href = "/"; // Force redirect to Home and reload state
  };

  const { data: blogCategories = [] } = useFetchAllBlogCategoriesQuery();

  const newsTypes = blogCategories.length > 0 ? blogCategories.map(cat => ({
    type: cat.slug,
    label: cat.name
  })) : [
    { type: "meo-vat", label: "Mẹo vặt" },
    { type: "tin-tuc", label: "Tin tức" },
    { type: "su-kien", label: "Sự kiện" },
  ];

  const accessories = [
    { type: "vo", label: "Vớ" },
    { type: "giay", label: "Giày" },
    { type: "dung-dich-ve-sinh", label: "Dung dịch vệ sinh" },
  ];

  const brands = [
    { name: "nike", label: "NIKE" },
    { name: "addidas", label: "ADIDAS" },
    { name: "new-balance", label: "NEW BALANCE" },
    { name: "puma", label: "PUMA" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      {/* Thanh trên cùng */}
      <div className="bg-blue-400 font-semibold text-white text-sm lg:grid lg:grid-cols-3 px-4 py-2 h-10">
        <div className="hidden uppercase lg:col-span-2 lg:flex">
          <Marquee>Địa chỉ </Marquee>
        </div>
        <div className="flex items-center justify-end gap-3">
          {user ? (
            <div className="relative group z-50">
              <div className="flex items-center gap-2 cursor-pointer">
                {user.photo ? (
                  <img
                    src={getImgUrl(user.photo)}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    onError={(e) => e.target.src = "https://placehold.co/100?text=U"}
                  />
                ) : (
                  <FaUserCircle className="text-xl" />
                )}
                <span>{user.username || user.email}</span>
                <IoIosArrowDown />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-1 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {user.role === 'admin' && (
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                    Bảng điều khiển
                  </Link>
                )}
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  Thông tin cá nhân
                </Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                  Đơn hàng của tôi
                </Link>

                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/dang-nhap" className="hover:underline">
                Đăng nhập
              </Link>
              <span>|</span>
              <Link to="/dang-ky" className="hover:underline">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Thanh điều hướng */}
      <div className="menu-navbar flex justify-between items-center pr-[3rem] pl-[3rem] shadow-[0px_4px_10px_rgba(0,0,0,0.15)]">
        <div className="menu-logo xl:order-first">
          <Link to="">
            <FaShopware className="text-6xl m-[10px]" />
          </Link>
        </div>
        <div className="menu-data order-first flex justify-between items-center h-[80px]">
          <ul className="hidden xl:flex justify-center items-center text-base  uppercase font-semibold text-gray-700 h-full">
            <li className="py-[30px] px-[20px]">
              <Link to="/" className="hover:text-blue-500 transition">
                Trang chủ
              </Link>
            </li>
            <li className="py-[30px] px-[20px]">
              <Link
                to="/ve-chung-toi"
                className="hover:text-blue-500 transition"
              >
                Giới thiệu
              </Link>
            </li>
            <li className="relative group py-[30px] px-[20px]">
              <Link
                to="/san-pham"
                className="flex items-center hover:text-blue-500 transition"
              >
                Sản phẩm
                <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180 " />
              </Link>
              {/* Dropdown menu */}
              <ul className="absolute left-0 top-[80px] w-48 bg-orange-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li className="border-b border-white hover:bg-orange-400">
                  <Link
                    to="/san-pham?hot=true"
                    className="block px-4 py-2 text-white"
                  >
                    SẢN PHẨM HOT
                  </Link>
                </li>
                <li className="border-b border-white hover:bg-orange-400">
                  <Link
                    to="/san-pham?sale=true"
                    className="block px-4 py-2 text-white"
                  >
                    SẢN PHẨM SALE
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group py-[30px] px-[20px]">
              <Link
                to="/san-pham?brand=nike"
                className="flex items-center hover:text-blue-500 transition"
              >
                Thương hiệu
                <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
              {/* Dropdown menu */}
              <ul className="absolute left-0 top-[80px] w-48 bg-orange-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {brands.map((brand) => (
                  <li
                    key={`brand-${brand.name}`}
                    className="border-b border-white hover:bg-orange-400"
                  >
                    <Link
                      to={`/san-pham?brand=${brand.name}`}
                      className="block px-4 py-2 text-white"
                    >
                      {brand.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="relative group py-[30px] px-[20px]">
              <Link
                to="/san-pham?type=vo"
                className="flex items-center hover:text-blue-500 transition"
              >
                phụ kiện
                <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
              {/* Dropdown menu */}
              <ul className="absolute left-0 top-[80px] w-48 bg-orange-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {accessories.map((item) => (
                  <li
                    key={`item-${item.type}`}
                    className="border-b border-white hover:bg-orange-400"
                  >
                    <Link
                      to={`/san-pham?category=${item.type}`}
                      className="block px-4 py-2 text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="relative group py-[30px] px-[20px]">
              <Link
                to="/bai-viet"
                className="flex items-center hover:text-blue-500 transition"
              >
                blog
                <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
              {/* Dropdown menu */}
              <ul className="absolute left-0 top-[80px] w-48 bg-orange-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {newsTypes.map((item) => (
                  <li
                    key={item.type}
                    className="border-b border-white hover:bg-orange-400"
                  >
                    <Link
                      to={`/bai-viet?type=${item.type}`}
                      className="block px-4 py-2 text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="py-[30px] px-[20px]">
              <Link to="/lien-he" className="hover:text-blue-500 transition">
                Liên hệ
              </Link>
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
            <div className="relative">
              <Link to="/san-pham-yeu-thich">
                <IoHeartOutline className="cursor-pointer text-2xl text-gray-700 hover:text-blue-500" />
              </Link>
              {favoriteItems.length > 0 ? (
                <span className="absolute right-[-10px] top-[-10px] bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center text-sm text-white">
                  {favoriteItems.length}
                </span>
              ) : (
                <span className="absolute right-[-10px] top-[-10px] bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center text-sm text-white">
                  0
                </span>
              )}
            </div>
            <div className="relative">
              <Link to="/gio-hang">
                <HiOutlineShoppingBag className="cursor-pointer text-2xl text-gray-700 hover:text-blue-500" />
              </Link>
              {cartItems > 0 ? (
                <span className="absolute right-[-10px] top-[-10px] bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center text-sm text-white">
                  {cartItems}
                </span>
              ) : (
                <span className="absolute right-[-10px] top-[-10px] bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center text-sm text-white">
                  0
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Menu response */}
      <div
        className={`xl:hidden menu-parent bg-yellow-100 m-[4px] rounded-lg p-4 transition-transform duration-800 ${isMenuOpen
          ? "translate-x-0 h-[calc(100vh-80px)]"
          : "-translate-x-full hidden"
          }`}
      >
        <ul className="space-y-2">
          <li className="py-2 font-semibold relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
            <Link to="/" className="hover:text-blue-500 transition">
              TRANG CHỦ
            </Link>
          </li>
          <li className="py-2 font-semibold relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
            <Link to="/ve-chung-toi" className="hover:text-blue-500 transition">
              GIỚI THIỆU
            </Link>
          </li>
          <li className="relative group ">
            <div className="flex justify-between">
              <Link to="/san-pham">
                <button className="py-2 font-semibold w-full text-left uppercase relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 group-hover:before:scale-x-100">
                  sản phẩm
                </button>
              </Link>
              <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </div>
            <ul className="bg-orange-300 rounded-lg mt-2 hidden group-hover:block uppercase">
              <Link to="/san-pham?hot=true">
                <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                  sản phẩm hot
                </li>
              </Link>
              <Link to="/san-pham?hot=true">
                <li className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                  sản phẩm sale
                </li>
              </Link>
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
              {brands.map((brand) => (
                <li key={`${brand.name}`}>
                  <Link
                    to={`/san-pham?brand=${brand.name}`}
                  >
                    <div className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                      {brand.name}
                    </div>
                  </Link>
                </li>
              ))}
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
              {accessories.map((item) => (
                <li key={`accessory-${item.type}`}>
                  <Link
                    to={`/san-pham?category=${item.type}`}
                  >
                    <div className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                      {item.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="relative group ">
            <div className="flex justify-between">
              <button className="py-2 font-semibold w-full text-left uppercase relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 group-hover:before:scale-x-100">
                <Link to="/bai-viet" className="hover:text-blue-500 transition">
                  BLOG
                </Link>
              </button>
              <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </div>
            <ul className="bg-orange-300 rounded-lg mt-2 hidden group-hover:block uppercase">
              {newsTypes.map((item) => (
                <li key={`newsTypes-${item.type}`}>
                  <Link
                    to={`/bai-viet?type=${item.type}`}
                  >
                    <div className="px-4 py-2 text-white hover:bg-orange-400 hover:rounded-lg m-[2px]">
                      {item.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="py-2 font-semibold relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
            <Link to="/lien-he" className="hover:text-blue-500 transition">
              LIÊN HỆ
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
