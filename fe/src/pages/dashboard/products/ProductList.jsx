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
    <div className="px-3 mx-3 w-full">
      <div className="p-6 mx-[-12px] bg-white rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Danh sách sản phẩm</h1>
          <button
            className="flex mb-4 items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => {
              localStorage.removeItem("activeMenu");
              localStorage.setItem("activeMenu", "addProduct");
              window.location.reload();
            }}
          >
            <FaPlus />
          </button>
        </div>
        <div className="overflow-x-auto shadow-md">
          <table className="w-full bg-white drop-shadow-xl rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Tên sản phẩm</th>
                <th className="p-3 text-left">Giá</th>
                <th className="p-3 text-left">Sale</th>
                <th className="p-3 text-left">Hot</th>
                <th className="p-3 text-left">Thương hiệu</th>
                <th className="p-3 text-left">Màu sắc</th>
                <th className="p-3 text-left">Kích cỡ</th>
                <th className="p-3 text-left">Số lượng</th>
                <th className="p-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginateProducts(products, currentPageProducts).map(
                ({ id, name, price, sale, hot, brand, stock, isDeleted }, index) => (
                  <tr
                    key={`${id}-${index}`}
                    className="border-b border-gray-200"
                  >
                    <td className="p-3">{name}</td>
                    <td className="p-3">{price}</td>
                    <td className="p-3">{sale ? "sale" : "Không sale"}</td>
                    <td className="p-3">{hot ? "hot" : "Không hot"}</td>
                    <td className="p-3">{brand?.name}</td>
                    <td className="p-3">{stock?.color?.name}</td>
                    <td className="p-3">{stock?.size?.name}</td>
                    <td className="p-3">{stock?.quantity}</td>
                    <td className="p-3 flex gap-3 text-xl items-center">
                      <button
                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                        title="Chỉnh sửa"
                      >
                        <MdOutlineEdit onClick={() => setProductId(id)} />
                      </button>
                      <button
                        className={`cursor-pointer ${isDeleted ? 'text-green-600 hover:text-green-800' : 'text-orange-600 hover:text-orange-800'}`}
                        title={isDeleted ? "Kích hoạt" : "Ẩn"}
                        onClick={() => handleToggleStatus(id, name, isDeleted)}
                      >
                        {isDeleted ? <FaToggleOff /> : <FaToggleOn />}
                      </button>
                      <button
                        className="cursor-pointer text-red-600 hover:text-red-800"
                        title="Xóa vĩnh viễn"
                        onClick={() => handlePermanentDelete(id, name)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-2">
          <Pagination
            currentPage={currentPageProducts}
            totalPages={Math.ceil(totalProductsRow / itemsPerPage)}
            onPageChange={setCurrentPageProducts}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {[
            {
              data: brands,
              title: "Thương hiệu",
              page: currentPageBrands,
              setPage: setCurrentPageBrands,
            },
            {
              data: colors,
              title: "Màu sắc",
              page: currentPageColors,
              setPage: setCurrentPageColors,
            },
            {
              data: sizes,
              title: "Kích cỡ",
              page: currentPageSizes,
              setPage: setCurrentPageSizes,
            },
            {
              data: categories,
              title: "Danh mục",
              page: currentPageCategories,
              setPage: setCurrentPageCategories,
            },
          ].map(({ data, title, page, setPage }) => (
            <div
              key={title}
              className="bg-white p-4 rounded-lg shadow-md drop-shadow-xl"
            >
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Tên {title.toLowerCase()}</th>
                    <th className="p-3 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginateData(data, page).map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3 flex gap-4 text-xl">
                        <button className="cursor-pointer">
                          <MdOutlineEdit />
                        </button>
                        <button className="cursor-pointer">
                          <CiTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(data.length / itemsPerPage)}
                onPageChange={setPage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
