import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import ProductList from "./products/ProductList";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditProduct";

const DashBoard = () => {
  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "dashboard"
  );



  useEffect(() => {
    const handleStorageChange = () => {
      setActiveMenu(localStorage.getItem("activeMenu") || "dashboard");
     
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <>
      <div>
        <div className="px-3">
          <div className="mx-[-12] grid grid-cols-12">
            {/* menu */}
            <div className="col-span-2">
              <Sidebar />
            </div>
            {/* details */}
            <div className="col-span-10">
              {activeMenu === "productList" && <ProductList />}
              {activeMenu === "addProduct" && <AddProduct />}
              {activeMenu === "editProduct" && <EditProduct/>}
              {activeMenu === "dashboard" && <div>Welcome to Dashboard</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
