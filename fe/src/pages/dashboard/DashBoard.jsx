import ProductList from "./products/ProductList";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditProduct";
import BlogList from "./blogs/BlogList";
import AddBlog from "./blogs/AddBlog";
import EditBlog from "./blogs/EditBlog";
import UserList from "./users/UserList";
import AddUser from "./users/AddUser";
import OrderList from "./orders/OrderList";
import ManageBrands from "./attributes/ManageBrands";
import ManageColors from "./attributes/ManageColors";
import ManageSizes from "./attributes/ManageSizes";
import ManageCategories from "./categories/ManageCategories";
import ManageBlogCategories from "./blogs/categories/ManageBlogCategories";
import { useState, useEffect } from "react";
import Sidebar from "./SideBar";

import { useGetAdminStatsQuery } from "../../redux/features/admin/adminApi";
import Loading from "../../components/Loading";

const DashBoard = () => {
  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "dashboard"
  );

  const { data: stats, isLoading, error } = useGetAdminStatsQuery(undefined, {
    skip: activeMenu !== "dashboard"
  });

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem("activeMenu", menu);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setActiveMenu(localStorage.getItem("activeMenu") || "dashboard");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="flex h-screen bg-[#EFDBCB]/30 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} onMenuSelect={handleMenuChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <header className="h-16 bg-white border-b border-[#3B8AC4]/20 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-[#345DA7] font-bold text-lg uppercase tracking-wider">
              Hệ thống quản trị
            </h2>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 italic">
            Ocean Management System v1.0
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {/* Dynamic Content */}
            {activeMenu === "dashboard" && (
              <>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loading />
                  </div>
                ) : error ? (
                  <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100 italic">
                    Lỗi khi tải dữ liệu thống kê. Vui lòng thử lại sau.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
                    {/* Stats Cards */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-[#345DA7] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <p className="text-[10px] font-black text-[#345DA7] uppercase mb-1 tracking-widest">Doanh thu tổng</p>
                      <p className="text-2xl font-black text-gray-800 font-mono">
                        {stats?.totalRevenue?.toLocaleString()}đ
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-[#3B8AC4] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <p className="text-[10px] font-black text-[#3B8AC4] uppercase mb-1 tracking-widest">Đơn hàng (7 ngày)</p>
                      <p className="text-2xl font-black text-gray-800 font-mono">{stats?.newOrders}</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-[#4BB4DE] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <p className="text-[10px] font-black text-[#4BB4DE] uppercase mb-1 tracking-widest">Thành viên</p>
                      <p className="text-2xl font-black text-gray-800 font-mono">{stats?.totalUsers}</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-[#EFDBCB] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Sản phẩm kho</p>
                      <p className="text-2xl font-black text-gray-800 font-mono">{stats?.totalProducts}</p>
                    </div>

                    <div className="col-span-full bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#3B8AC4]/10 bg-gradient-to-br from-white to-[#EFDBCB]/10">
                      <h1 className="text-3xl font-black text-[#345DA7] mb-4 tracking-tight">Chào mừng trở lại, Admin!</h1>
                      <p className="text-gray-500 leading-relaxed max-w-2xl font-medium">
                        Bảng điều khiển Ocean đã được cập nhật dữ liệu mới nhất từ hệ thống.
                        Bạn có <span className="text-[#3B8AC4] font-bold">{stats?.newOrders} đơn hàng mới</span> trong tuần này cần xử lý.
                      </p>
                      <button onClick={() => handleMenuChange('orderList')} className="mt-8 px-8 py-3 bg-[#345DA7] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#3B8AC4] transition-all shadow-lg shadow-[#345DA7]/20">
                        Xem danh sách đơn hàng
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Content Area with Animation Wrapper */}
            <div className="animate-fadeIn">
              {/* Products */}
              {activeMenu === "productList" && <ProductList />}
              {activeMenu === "addProduct" && <AddProduct />}
              {activeMenu === "editProduct" && <EditProduct />}

              {/* Blogs */}
              {activeMenu === "blogList" && <BlogList />}
              {activeMenu === "addBlog" && <AddBlog />}
              {activeMenu === "editBlog" && <EditBlog />}
              {activeMenu === "manageBlogCategories" && <ManageBlogCategories />}

              {/* Users */}
              {activeMenu === "userList" && <UserList />}
              {activeMenu === "addUser" && <AddUser />}

              {/* Orders */}
              {activeMenu === "orderList" && <OrderList />}

              {/* Attributes */}
              {activeMenu === "manageBrands" && <ManageBrands />}
              {activeMenu === "manageColors" && <ManageColors />}
              {activeMenu === "manageSizes" && <ManageSizes />}
              {activeMenu === "manageCategories" && <ManageCategories />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashBoard;
