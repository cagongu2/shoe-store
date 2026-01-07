import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight, FaBoxOpen, FaUserFriends, FaBlog, FaShoppingBag, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ activeMenu, onMenuSelect }) => {
  // State to manage expanded groups
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const saved = localStorage.getItem("sidebarExpanded");
    return saved ? JSON.parse(saved) : { ecommerce: true, users: false, blogs: false };
  });

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(expandedGroups));
  }, [expandedGroups]);

  const toggleGroup = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const handleMenuItemClick = (menu) => {
    if (onMenuSelect) {
      onMenuSelect(menu);
    }
  };

  // Helper to check if a group is active based on current selection
  const isGroupActive = (groupPrefix) => {
    // Simple heuristic: if activeMenu starts with the group prefix or belongs to it
    // This logic can be customized. 
    // ecommerce -> productList, addProduct...
    if (groupPrefix === 'ecommerce') return ['dashboard', 'productList', 'addProduct', 'editProduct'].includes(activeMenu);
    if (groupPrefix === 'users') return ['userList', 'addUser'].includes(activeMenu);
    if (groupPrefix === 'blogs') return ['blogList', 'addBlog', 'editBlog'].includes(activeMenu);
    return false;
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-full flex flex-col transition-all duration-300 shadow-xl z-20 font-sans">
      {/* Brand / Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700 bg-slate-950">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-blue-400 transition-colors">
          <FaShoppingBag className="text-blue-500" />
          <span>SHOESTORE<span className="text-blue-500">.</span></span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">

        {/* Dashboard Item */}
        <div>
          <button
            onClick={() => handleMenuItemClick("dashboard")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 group ${activeMenu === 'dashboard'
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-slate-800 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <FaTachometerAlt className={activeMenu === 'dashboard' ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
              <span className="font-medium text-sm">Dashboard</span>
            </div>
          </button>
        </div>

        <div className="pt-4 pb-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quản lý</p>
        </div>

        {/* Group: E-Commerce (Products) */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("ecommerce")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 group ${isGroupActive('ecommerce') ? 'text-white' : 'hover:bg-slate-800 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <FaBoxOpen className={isGroupActive('ecommerce') ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'} />
              <span className="font-medium text-sm">Sản phẩm</span>
            </div>
            {expandedGroups["ecommerce"] ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
          </button>

          {/* Submenu */}
          {expandedGroups["ecommerce"] && (
            <div className="pl-9 space-y-1">
              <button
                onClick={() => handleMenuItemClick("productList")}
                className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${activeMenu === 'productList' ? 'text-blue-400 font-semibold bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                Danh sách
              </button>
              <button
                onClick={() => handleMenuItemClick("addProduct")}
                className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${activeMenu === 'addProduct' ? 'text-blue-400 font-semibold bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                Thêm mới
              </button>
            </div>
          )}
        </div>

        {/* Group: Blogs */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("blogs")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 group ${isGroupActive('blogs') ? 'text-white' : 'hover:bg-slate-800 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <FaBlog className={isGroupActive('blogs') ? 'text-pink-400' : 'text-slate-400 group-hover:text-white'} />
              <span className="font-medium text-sm">Bài viết</span>
            </div>
            {expandedGroups["blogs"] ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
          </button>

          {expandedGroups["blogs"] && (
            <div className="pl-9 space-y-1">
              <button
                onClick={() => handleMenuItemClick("blogList")}
                className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${activeMenu === 'blogList' ? 'text-pink-400 font-semibold bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                Danh sách tin
              </button>
              <button
                onClick={() => handleMenuItemClick("addBlog")}
                className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${activeMenu === 'addBlog' ? 'text-pink-400 font-semibold bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                Viết bài mới
              </button>
            </div>
          )}
        </div>

        {/* Group: Users */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("users")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 group ${isGroupActive('users') ? 'text-white' : 'hover:bg-slate-800 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <FaUserFriends className={isGroupActive('users') ? 'text-green-400' : 'text-slate-400 group-hover:text-white'} />
              <span className="font-medium text-sm">Người dùng</span>
            </div>
            {expandedGroups["users"] ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
          </button>

          {expandedGroups["users"] && (
            <div className="pl-9 space-y-1">
              <button
                onClick={() => handleMenuItemClick("userList")}
                className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${activeMenu === 'userList' ? 'text-green-400 font-semibold bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                Danh sách User
              </button>
              <button
                onClick={() => handleMenuItemClick("addUser")}
                className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${activeMenu === 'addUser' ? 'text-green-400 font-semibold bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                Thêm User
              </button>
            </div>
          )}
        </div>

      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-slate-700 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin</p>
            <Link to="/" className="text-xs text-slate-400 hover:text-slate-200">Đăng xuất</Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
