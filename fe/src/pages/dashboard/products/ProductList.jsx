import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
  useToggleProductStatusMutation,
  usePermanentlyDeleteProductMutation,
} from "../../../redux/features/products/productsApi";
import Loading from "../../../components/Loading";
import { CiTrash } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { FaToggleOn, FaToggleOff, FaTrashAlt } from "react-icons/fa";
import { useFetchAllColorsQuery } from "../../../redux/features/colors/colorsApi";
import { useFetchAllCategoriesQuery } from "../../../redux/features/categories/categoriesApi";
import { useFetchAllBrandsQuery } from "../../../redux/features/brands/brandsApi";
import { useFetchAllSizesQuery } from "../../../redux/features/sizes/sizesApi";
import Pagination from "../../../components/Pagination";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";

const ProductList = () => {
  const { data: allProducts = [], isLoading } = useFetchAllProductsQuery({ all: true });
  const { data: categories = [] } = useFetchAllCategoriesQuery();
  const { data: colors = [] } = useFetchAllColorsQuery();
  const { data: brands = [] } = useFetchAllBrandsQuery();
  const { data: sizes = [] } = useFetchAllSizesQuery();

  // Include all products for management view (including deleted)
  const products = allProducts;

  const totalProductsRow = allProducts.reduce(
    (total, product) => total + (product.stocks?.length || 0),
    0
  );

  const [currentPageProducts, setCurrentPageProducts] = useState(1);
  const [currentPageBrands, setCurrentPageBrands] = useState(1);
  const [currentPageColors, setCurrentPageColors] = useState(1);
  const [currentPageSizes, setCurrentPageSizes] = useState(1);
  const [currentPageCategories, setCurrentPageCategories] = useState(1);

  const itemsPerPage = 5;

  const paginateProducts = (products, page) => {
    const start = (page - 1) * itemsPerPage;
    let count = 0;
    let paginatedList = [];

    for (let product of products) {
      for (let stock of product.stocks || []) {
        if (count >= start && count < start + itemsPerPage) {
          paginatedList.push({ ...product, stock });
        }
        count++;
        if (count >= start + itemsPerPage) break;
      }
      if (count >= start + itemsPerPage) break;
    }

    return paginatedList;
  };

  const paginateData = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const [toggleStatus] = useToggleProductStatusMutation();
  const [permanentlyDelete] = usePermanentlyDeleteProductMutation();

  const handleToggleStatus = async (productId, productName, isDeleted) => {
    const action = isDeleted ? "kích hoạt" : "ẩn";
    const result = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} sản phẩm?`,
      text: `Bạn muốn ${action} "${productName}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: isDeleted ? "#10b981" : "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: action.charAt(0).toUpperCase() + action.slice(1),
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await toggleStatus(productId).unwrap();
        Swal.fire(
          "Thành công!",
          `Đã ${action} sản phẩm.`,
          "success"
        );
      } catch (error) {
        console.error("Lỗi toggle status:", error);
        Swal.fire("Lỗi!", `Không thể ${action} sản phẩm.`, "error");
      }
    }
  };

  const handlePermanentDelete = async (productId, productName) => {
    const result = await Swal.fire({
      title: "Xóa vĩnh viễn?",
      html: `<p>Bạn có chắc chắn muốn <strong>xóa vĩnh viễn</strong> sản phẩm "${productName}"?</p><p class="text-red-600 mt-2">⚠️ Hành động này không thể hoàn tác và sẽ xóa cả ảnh!</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Xóa vĩnh viễn",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await permanentlyDelete(productId).unwrap();
        Swal.fire(
          "Đã xóa!",
          "Sản phẩm đã bị xóa vĩnh viễn.",
          "success"
        );
      } catch (error) {
        console.error("Lỗi xóa vĩnh viễn:", error);
        Swal.fire("Lỗi!", "Không thể xóa sản phẩm.", "error");
      }
    }
  };

  const setProductId = (id) => {
    localStorage.removeItem("editProductId");
    localStorage.setItem("editProductId", id);
    localStorage.removeItem("activeMenu");
    localStorage.setItem("activeMenu", "editProduct");
    window.location.reload();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Main product list */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#3B8AC4]/10 overflow-hidden">
        <div className="p-8 border-b border-[#3B8AC4]/10 flex justify-between items-center bg-gradient-to-r from-white to-[#EFDBCB]/10">
          <div>
            <h1 className="text-2xl font-black text-[#345DA7] tracking-tight">Danh sách sản phẩm</h1>
            <p className="text-sm text-gray-400 mt-1">Quản lý kho hàng và trạng thái hiển thị</p>
          </div>
          <button
            className="group flex items-center gap-3 bg-[#345DA7] hover:bg-[#3B8AC4] text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-[#345DA7]/20 hover:scale-105"
            onClick={() => {
              localStorage.removeItem("activeMenu");
              localStorage.setItem("activeMenu", "addProduct");
              window.location.reload();
            }}
          >
            <span className="font-bold text-sm">Thêm sản phẩm</span>
            <div className="bg-white/20 p-1 rounded-lg">
              <FaPlus className="text-xs" />
            </div>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#345DA7]/5">
                <th className="p-5 text-xs font-black text-[#345DA7] uppercase tracking-wider">Sản phẩm</th>
                <th className="p-5 text-xs font-black text-[#345DA7] uppercase tracking-wider">Giá niêm yết</th>
                <th className="p-5 text-xs font-black text-[#345DA7] uppercase tracking-wider">Trạng thái</th>
                <th className="p-5 text-xs font-black text-[#345DA7] uppercase tracking-wider">Phân loại</th>
                <th className="p-5 text-xs font-black text-[#345DA7] uppercase tracking-wider">Chi tiết kho</th>
                <th className="p-5 text-xs font-black text-[#345DA7] uppercase tracking-wider text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3B8AC4]/10">
              {paginateProducts(products, currentPageProducts).map(
                ({ id, name, price, sale, hot, brand, stock, isDeleted }, index) => (
                  <tr
                    key={`${id}-${index}`}
                    className="hover:bg-[#EFDBCB]/10 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="font-bold text-gray-800 group-hover:text-[#345DA7] transition-colors">{name}</div>
                      <div className="flex gap-2 mt-1">
                        {sale && <span className="text-[10px] px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full font-bold uppercase">Sale</span>}
                        {hot && <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-bold uppercase">Hot</span>}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="font-mono font-bold text-[#3B8AC4]">{price?.toLocaleString()}đ</span>
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isDeleted ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-600'}`}>
                        {isDeleted ? "Đã ẩn" : "Đang bán"}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="text-xs font-bold text-gray-600">{brand?.name}</div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Màu: {stock?.color?.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Size: {stock?.size?.name}</span>
                        <span className="text-xs font-black text-[#4BB4DE]">SL: {stock?.quantity}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-2 rounded-xl bg-[#3B8AC4]/10 text-[#3B8AC4] hover:bg-[#3B8AC4] hover:text-white transition-all transform hover:rotate-12"
                          title="Sửa"
                          onClick={() => setProductId(id)}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          className={`p-2 rounded-xl transition-all transform hover:-rotate-12 ${isDeleted ? 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white' : 'bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white'}`}
                          title={isDeleted ? "Kích hoạt" : "Ẩn"}
                          onClick={() => handleToggleStatus(id, name, isDeleted)}
                        >
                          {isDeleted ? <FaToggleOff /> : <FaToggleOn />}
                        </button>
                        <button
                          className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110"
                          title="Xóa vĩnh viễn"
                          onClick={() => handlePermanentDelete(id, name)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-white border-t border-[#3B8AC4]/10">
          <Pagination
            currentPage={currentPageProducts}
            totalPages={Math.ceil(totalProductsRow / itemsPerPage)}
            onPageChange={setCurrentPageProducts}
          />
        </div>
      </div>

      {/* Attributes Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { data: brands, title: "Thương hiệu", page: currentPageBrands, setPage: setCurrentPageBrands },
          { data: colors, title: "Màu sắc", page: currentPageColors, setPage: setCurrentPageColors },
          { data: sizes, title: "Kích cỡ", page: currentPageSizes, setPage: setCurrentPageSizes },
          { data: categories, title: "Danh mục", page: currentPageCategories, setPage: setCurrentPageCategories },
        ].map(({ data, title, page, setPage }) => (
          <div
            key={title}
            className="bg-white p-6 rounded-3xl shadow-sm border border-[#3B8AC4]/10 hover:shadow-md transition-shadow"
          >
            <h2 className="text-sm font-black text-[#345DA7] uppercase tracking-widest mb-4 border-b border-[#EFDBCB] pb-2">{title}</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EFDBCB]/20">
                  <th className="p-3 text-[10px] font-black text-[#345DA7] uppercase">Tên</th>
                  <th className="p-3 text-[10px] font-black text-[#345DA7] uppercase text-right">Mã</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginateData(data, page).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 text-xs font-bold text-gray-600 truncate max-w-[100px]">{item.name}</td>
                    <td className="p-3 text-[10px] font-mono text-gray-300 text-right">#{String(item.id).slice(0, 4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 opacity-70">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(data.length / itemsPerPage)}
                onPageChange={setPage}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
