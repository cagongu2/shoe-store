import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from "../../../redux/features/products/productsApi";
import Loading from "../../../components/Loading";
import { CiTrash } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { useFetchAllColorsQuery } from "../../../redux/features/colors/colorsApi";
import { useFetchAllCategoriesQuery } from "../../../redux/features/categories/categoriesApi";
import { useFetchAllBrandsQuery } from "../../../redux/features/brands/brandsApi";
import { useFetchAllSizesQuery } from "../../../redux/features/sizes/sizesApi";
import Pagination from "../../../components/Pagination";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";

const ProductList = () => {
  const { data: products = [], isLoading } = useFetchAllProductsQuery();
  const { data: categories = [] } = useFetchAllCategoriesQuery();
  const { data: colors = [] } = useFetchAllColorsQuery();
  const { data: brands = [] } = useFetchAllBrandsQuery();
  const { data: sizes = [] } = useFetchAllSizesQuery();

  const totalProductsRow = products.reduce(
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

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Sản phẩm này sẽ bị xoá vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xoá ngay!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(productId).unwrap();
          Swal.fire("Đã xoá!", "Sản phẩm đã bị xoá thành công.", "success");
        } catch (error) {
          console.error("Lỗi xoá sản phẩm:", error);
          Swal.fire("Lỗi!", "Không thể xoá sản phẩm.", "error");
        }
      }
    });
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
                ({ id, name, price, sale, hot, brand, stock }, index) => (
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
                    <td className="p-3 flex gap-4 text-xl">
                      {isDeleting ? (
                        "Đang xoá..."
                      ) : (
                        <div>
                          <button className="cursor-pointer">
                            <MdOutlineEdit onClick={() => setProductId(id)} />
                          </button>
                          <button className="cursor-pointer">
                            <CiTrash onClick={() => handleDeleteProduct(id)} />
                          </button>
                        </div>
                      )}
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
