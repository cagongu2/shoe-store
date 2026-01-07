import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState(() => {
    const savedMenus = localStorage.getItem("openMenus");
    return savedMenus ? JSON.parse(savedMenus) : {};
  });

  const [activeMenu, setActiveMenu] = useState(() => {
    return localStorage.getItem("activeMenu") || null;
  });

  useEffect(() => {
    localStorage.setItem("openMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  useEffect(() => {
    localStorage.setItem("activeMenu", activeMenu);
  }, [activeMenu]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => {
      const newMenus = { ...prev, [menu]: !prev[menu] };
      return newMenus;
    });
    setActiveMenu(menu);
  };

  const handleClick = (menu) => {
    localStorage.removeItem("activeMenu");
    localStorage.setItem("activeMenu", menu);
    window.location.reload();
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl font-bold text-indigo-600">
          <Link to="/">Cửa Hàng Giày</Link>
        </span>
      </div>
      {/* Menu Items */}
      <ul className="space-y-2 text-base text-gray-700 font-semibold">
        {/* eCommerce */}
        <li>
          <button
            onClick={() => {
              toggleMenu("ecommerce");
              // handleClick("ecommerce");
            }}
            className={`flex justify-between items-center w-full p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "ecommerce" ? "bg-purple-100 text-blue-500" : ""
              }`}
          >
            <div className="flex items-center">
              <IoCartOutline />
              <span className="ml-2">Thương mại điện tử</span>
            </div>
            <FaChevronDown
              className={`transition ${openMenus["ecommerce"] ? "rotate-180" : ""}`}
              size={16}
            />
          </button>
          {openMenus["ecommerce"] && (
            <ul className="ml-4 mt-1 space-y-1 text-gray-600 text-sm">
              <li
                className={`p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "dashboard" ? "bg-purple-100 text-blue-500" : ""
                  }`}
                onClick={() => handleClick("dashboard")}
              >
                Bảng điều khiển
              </li>
              <li>
                <button
                  onClick={() => {
                    toggleMenu("products");
                    // handleClick("products");
                  }}
                  className={`flex justify-between items-center w-full p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "products" ? "bg-purple-100 text-blue-500" : ""
                    }`}
                >
                  <span>Sản phẩm</span>
                  <FaChevronDown
                    className={`transition ${openMenus["products"] ? "rotate-180" : ""}`}
                    size={16}
                  />
                </button>
                {openMenus["products"] && (
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600 text-sm">
                    <li
                      className={`p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "productList" ? "bg-purple-100 text-blue-500" : ""
                        }`}
                      onClick={() => handleClick("productList")}
                    >
                      Danh sách sản phẩm
                    </li>
                    <li
                      className={`p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "addProduct" ? "bg-purple-100 text-blue-500" : ""
                        }`}
                      onClick={() => handleClick("addProduct")}
                    >
                      Thêm sản phẩm
                    </li>
                    <li
                      className={`p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "editProduct" ? "bg-purple-100 text-blue-500" : ""
                        }`}
                      onClick={() => handleClick("editProduct")}
                    >
                      Chỉnh sửa sản phẩm
                    </li>
                    {/* <li
                      className={`p-2 rounded-lg hover:bg-gray-100 ${
                        activeMenu === "productCategory" ? "bg-purple-100 text-blue-500" : ""
                      }`}
                      onClick={() => handleClick("productCategory")}
                    >
                      Danh mục sản phẩm
                    </li> */}
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        {/* Blogs */}
        <li>
          <button
            onClick={() => {
              toggleMenu("blogs");
            }}
            className={`flex justify-between items-center w-full p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "blogs" ? "bg-purple-100 text-blue-500" : ""
              }`}
          >
            <div className="flex items-center">
              <span className="material-icons-outlined text-lg w-5">article</span>
              <span className="ml-2">Quản lý bài viết</span>
            </div>
            <FaChevronDown
              className={`transition ${openMenus["blogs"] ? "rotate-180" : ""}`}
              size={16}
            />
          </button>
          {openMenus["blogs"] && (
            <ul className="ml-4 mt-1 space-y-1 text-gray-600 text-sm">
              <li
                className={`p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "blogList" ? "bg-purple-100 text-blue-500" : ""
                  }`}
                onClick={() => handleClick("blogList")}
              >
                Danh sách bài viết
              </li>
              <li
                className={`p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "addBlog" ? "bg-purple-100 text-blue-500" : ""
                  }`}
                onClick={() => handleClick("addBlog")}
              >
                Thêm bài viết
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            onClick={() => {
              toggleMenu("users");
              // handleClick("users");
            }}
            className={`flex justify-between items-center w-full p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "users" ? "bg-purple-100 text-blue-500" : ""
              }`}
          >
            <div className="flex items-center">
              <FaRegUser />
              <span className="ml-2">Người dùng</span>
            </div>
            <FaChevronDown
              className={`transition ${openMenus["users"] ? "rotate-180" : ""}`}
              size={16}
            />
          </button>
          {openMenus["users"] && (
            <ul className="ml-4 mt-1 space-y-1 text-gray-600 text-sm">
              <li
                className={`p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "userList" ? "bg-purple-100 text-blue-500" : ""
                  }`}
                onClick={() => handleClick("userList")}
              >
                Danh sách người dùng
              </li>
              <li
                className={`p-2 rounded-lg hover:bg-gray-100 ${activeMenu === "addUser" ? "bg-purple-100 text-blue-500" : ""
                  }`}
                onClick={() => handleClick("addUser")}
              >
                Thêm người dùng
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
