import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight, FaBoxOpen, FaUserFriends, FaBlog, FaShoppingBag, FaTachometerAlt, FaClipboardList, FaTags } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ activeMenu, onMenuSelect }) => {
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const saved = localStorage.getItem("sidebarExpanded");
    return saved ? JSON.parse(saved) : { ecommerce: true, users: false, blogs: false, orders: false, attributes: false };
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

  const isGroupActive = (groupPrefix) => {
    if (groupPrefix === 'ecommerce') return ['dashboard', 'productList', 'addProduct', 'editProduct'].includes(activeMenu);
    if (groupPrefix === 'users') return ['userList', 'addUser'].includes(activeMenu);
    if (groupPrefix === 'blogs') return ['blogList', 'addBlog', 'editBlog', 'manageBlogCategories'].includes(activeMenu);
    if (groupPrefix === 'orders') return ['orderList'].includes(activeMenu);
    if (groupPrefix === 'attributes') return ['manageBrands', 'manageColors', 'manageSizes', 'manageCategories'].includes(activeMenu);
    return false;
  };

  return (
    <aside className="w-72 bg-[#345DA7] text-white h-full flex flex-col transition-all duration-500 shadow-2xl z-20 font-sans border-r border-white/10">
      {/* Brand / Logo */}
      <div className="h-24 flex items-center px-8 bg-[#345DA7] border-b border-white/5 mx-2">
        <Link to="/" className="flex items-center gap-3 font-black text-2xl tracking-tighter hover:scale-105 transition-transform">
          <div className="w-10 h-10 bg-[#4BB4DE] rounded-xl flex items-center justify-center shadow-lg shadow-[#4BB4DE]/20">
            <FaShoppingBag className="text-white text-xl" />
          </div>
          <span className="flex flex-col leading-none">
            <span className="text-white">SHOESTORE</span>
            <span className="text-[#4BB4DE] text-[10px] tracking-[0.3em] ml-1 mt-1 font-bold">ADMIN PANEL</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">

        {/* Dashboard Item */}
        <div>
          <button
            onClick={() => handleMenuItemClick("dashboard")}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${activeMenu === 'dashboard'
              ? 'bg-gradient-to-r from-[#3B8AC4] to-[#4BB4DE] text-white shadow-lg shadow-[#3B8AC4]/40 scale-[1.02]'
              : 'hover:bg-white/5 text-[#EFDBCB]/80 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-4">
              <FaTachometerAlt className={`text-lg transition-colors ${activeMenu === 'dashboard' ? 'text-white' : 'text-[#4BB4DE] group-hover:text-white'}`} />
              <span className="font-bold text-sm tracking-wide">Bảng điều khiển</span>
            </div>
          </button>
        </div>

        <div className="pt-6 pb-2 px-4">
          <p className="text-[10px] font-black text-[#EFDBCB]/40 uppercase tracking-[0.2em]">Hệ thống quản lý</p>
        </div>

        {/* Group: Orders */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("orders")}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${isGroupActive('orders') ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-[#EFDBCB]/80 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-4">
              <FaClipboardList className={`text-lg ${isGroupActive('orders') ? 'text-[#4BB4DE]' : 'text-[#4BB4DE]/60 group-hover:text-white'}`} />
              <span className="font-bold text-sm">Đơn hàng</span>
            </div>
            <div className={`transition-transform duration-300 ${expandedGroups["orders"] ? 'rotate-180' : ''}`}>
              <FaChevronDown size={12} className="opacity-40" />
            </div>
          </button>

          {expandedGroups["orders"] && (
            <div className="ml-4 pl-8 border-l border-white/10 space-y-1 animate-slideDown">
              <button
                onClick={() => handleMenuItemClick("orderList")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${activeMenu === 'orderList' ? 'text-white bg-[#3B8AC4]' : 'text-[#EFDBCB]/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                Danh sách vận đơn
              </button>
            </div>
          )}
        </div>

        {/* Group: E-Commerce (Products) */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("ecommerce")}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${isGroupActive('ecommerce') ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-[#EFDBCB]/80 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-4">
              <FaBoxOpen className={`text-lg ${isGroupActive('ecommerce') ? 'text-[#4BB4DE]' : 'text-[#4BB4DE]/60 group-hover:text-white'}`} />
              <span className="font-bold text-sm">Kho hàng</span>
            </div>
            <div className={`transition-transform duration-300 ${expandedGroups["ecommerce"] ? 'rotate-180' : ''}`}>
              <FaChevronDown size={12} className="opacity-40" />
            </div>
          </button>

          {expandedGroups["ecommerce"] && (
            <div className="ml-4 pl-8 border-l border-white/10 space-y-1 animate-slideDown">
              <button
                onClick={() => handleMenuItemClick("productList")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${activeMenu === 'productList' ? 'text-white bg-[#3B8AC4]' : 'text-[#EFDBCB]/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                Tất cả sản phẩm
              </button>
              <button
                onClick={() => handleMenuItemClick("addProduct")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${activeMenu === 'addProduct' ? 'text-white bg-[#3B8AC4]' : 'text-[#EFDBCB]/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                Nhập kho mới
              </button>
            </div>
          )}
        </div>

        {/* Group: Attributes */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("attributes")}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${isGroupActive('attributes') ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-[#EFDBCB]/80 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-4">
              <FaTags className={`text-lg ${isGroupActive('attributes') ? 'text-[#4BB4DE]' : 'text-[#4BB4DE]/60 group-hover:text-white'}`} />
              <span className="font-bold text-sm">Phân loại</span>
            </div>
            <div className={`transition-transform duration-300 ${expandedGroups["attributes"] ? 'rotate-180' : ''}`}>
              <FaChevronDown size={12} className="opacity-40" />
            </div>
          </button>

          {expandedGroups["attributes"] && (
            <div className="ml-4 pl-8 border-l border-white/10 space-y-1 animate-slideDown">
              {['manageBrands', 'manageColors', 'manageSizes', 'manageCategories'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleMenuItemClick(item)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold capitalize transition-all ${activeMenu === item ? 'text-white bg-[#3B8AC4]' : 'text-[#EFDBCB]/60 hover:text-white hover:bg-white/5'}`}
                >
                  {item.replace('manage', '')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Group: Blogs */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("blogs")}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${isGroupActive('blogs') ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-[#EFDBCB]/80 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-4">
              <FaBlog className={`text-lg ${isGroupActive('blogs') ? 'text-[#4BB4DE]' : 'text-[#4BB4DE]/60 group-hover:text-white'}`} />
              <span className="font-bold text-sm">Nội dung</span>
            </div>
            <div className={`transition-transform duration-300 ${expandedGroups["blogs"] ? 'rotate-180' : ''}`}>
              <FaChevronDown size={12} className="opacity-40" />
            </div>
          </button>

          {expandedGroups["blogs"] && (
            <div className="ml-4 pl-8 border-l border-white/10 space-y-1 animate-slideDown">
              <button
                onClick={() => handleMenuItemClick("blogList")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${activeMenu === 'blogList' ? 'text-white bg-[#3B8AC4]' : 'text-[#EFDBCB]/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                Bài viết
              </button>
              <button
                onClick={() => handleMenuItemClick("addBlog")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${activeMenu === 'addBlog' ? 'text-white bg-[#3B8AC4]' : 'text-[#EFDBCB]/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                Soạn bài
              </button>
            </div>
          )}
        </div>

        {/* Group: Users */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("users")}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${isGroupActive('users') ? 'bg-white/5 text-white' : 'hover:bg-white/5 text-[#EFDBCB]/80 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-4">
              <FaUserFriends className={`text-lg ${isGroupActive('users') ? 'text-[#4BB4DE]' : 'text-[#4BB4DE]/60 group-hover:text-white'}`} />
              <span className="font-bold text-sm">Thành viên</span>
            </div>
            <div className={`transition-transform duration-300 ${expandedGroups["users"] ? 'rotate-180' : ''}`}>
              <FaChevronDown size={12} className="opacity-40" />
            </div>
          </button>

          {expandedGroups["users"] && (
            <div className="ml-4 pl-8 border-l border-white/10 space-y-1 animate-slideDown">
              <button
                onClick={() => handleMenuItemClick("userList")}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${activeMenu === 'userList' ? 'text-white bg-[#3B8AC4]' : 'text-[#EFDBCB]/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                Danh sách người dùng
              </button>
            </div>
          )}
        </div>

      </nav>

      {/* Footer Profile */}
      <div className="p-6 bg-black/10 border-t border-white/5 m-4 rounded-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#4BB4DE] flex items-center justify-center text-white font-black text-xl shadow-inner shadow-black/10">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-white truncate">Administrator</p>
            <p className="text-[10px] text-[#EFDBCB]/40 font-bold uppercase tracking-tight">Vị trí: Giám đốc</p>
          </div>
        </div>
        <button onClick={() => window.location.href = '/'} className="w-full mt-4 py-2 bg-white/5 hover:bg-red-500/10 text-[#EFDBCB]/60 hover:text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          Thoát hệ thống
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
