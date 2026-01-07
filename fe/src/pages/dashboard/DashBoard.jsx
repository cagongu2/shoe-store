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

const DashBoard = () => {
  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "dashboard"
  );

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem("activeMenu", menu);
  };

  useEffect(() => {
    // Keep localStorage in sync in case of external changes, though less likely now
    const handleStorageChange = () => {
      setActiveMenu(localStorage.getItem("activeMenu") || "dashboard");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - Fixed width */}
      <Sidebar activeMenu={activeMenu} onMenuSelect={handleMenuChange} />

      {/* Main Content - Flexible width, scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Optional Header could go here */}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="container mx-auto">
            {/* Dynamic Content */}
            {activeMenu === "dashboard" && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Tổng quan</h1>
                <p className="text-gray-600">Chào mừng bạn đến với trang quản trị.</p>
              </div>
            )}

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


            {/* Fallback for sub-menus that might not have a direct component mapped yet */}
            {/* {(activeMenu === "ecommerce" || activeMenu === "products" || activeMenu === "users" || activeMenu === "blogs") && (
                 <div className="text-center mt-10 text-gray-400">Chọn một mục từ menu bên trái</div>
             )} */}
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashBoard;
