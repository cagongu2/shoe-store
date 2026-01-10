import React, { useMemo, useState, useEffect } from "react";
import { FaChevronUp, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper/modules";
import { getImgUrl } from "../../util/getImageUrl";
import { Link, useSearchParams } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import Loading from "../../components/Loading";
import RecommendationSection from "../home/RecommendationSection";
import { useSearchProductsQuery } from "../../redux/features/suggestions/suggestionsApi";

const Product = () => {
  const { data: products = [], isLoading } = useFetchAllProductsQuery();
  const [searchParams] = useSearchParams();

  // --- STATE PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Hiển thị 9 sản phẩm/trang

  // --- LẤY PARAMS LỌC ---
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const hotParam = searchParams.get("hot");
  const saleParam = searchParams.get("sale");
  const searchParam = searchParams.get("search");

  // --- SEMANTIC SEARCH ---
  const { data: searchResultIds = [] } = useSearchProductsQuery(searchParam, {
    skip: !searchParam
  });

  // Reset trang về 1 khi params thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryParam, brandParam, hotParam, saleParam, searchParam]);

  // --- LOGIC LỌC CHÍNH (CLIENT-SIDE) ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Lọc theo Semantic Search (Ontology)
      if (searchParam) {
        // Nếu có kết quả từ RDF store, chỉ hiện những SP đó
        if (searchResultIds.length > 0) {
          if (!searchResultIds.includes(String(product.id))) return false;
        } else {
          // Fallback lọc đơn giản theo tên nếu RDF không trả kết quả hoặc đang load
          if (!product.name.toLowerCase().includes(searchParam.toLowerCase())) return false;
        }
      }

      // Lọc theo Brand
      if (brandParam && product.brand?.name?.toLowerCase() !== brandParam.toLowerCase()) {
        return false;
      }
      // Lọc theo Category
      if (categoryParam && product.category?.name?.toLowerCase() !== categoryParam.toLowerCase()) {
        return false;
      }
      // Lọc theo HOT (hot=true)
      if (hotParam === "true" && !product.hot) {
        return false;
      }
      // Lọc theo SALE (sale=true)
      if (saleParam === "true" && !product.sale) {
        return false;
      }
      return true;
    });
  }, [products, categoryParam, brandParam, hotParam, saleParam, searchParam, searchResultIds]);


  // --- LOGIC PHÂN TRANG (Dựa trên filteredProducts) ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- LOGIC LỌC PHỤ KIỆN RIÊNG CHO SLIDER CUỐI TRANG ---
  // Lọc ra các sản phẩm có category là 'vo' hoặc 'dung-dich-ve-sinh-giay'
  const accessoryProducts = products.filter((p) => {
    const catName = p.category?.name?.toLowerCase();
    return catName === "vo" || catName === "dung-dich-ve-sinh-giay";
  });


  // --- THỐNG KÊ SIDEBAR (Vẫn đếm trên TOÀN BỘ products gốc để User biết tổng quan) ---
  const brandCount = products.reduce((acc, product) => {
    const brandName = product.brand.name;
    acc[brandName] = (acc[brandName] || 0) + 1;
    return acc;
  }, {});

  const categoryCount = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {});

  const hotCount = products.reduce((acc, product) => {
    if (product.hot) acc++;
    return acc;
  }, 0);

  const saleCount = products.reduce((acc, product) => {
    if (product.sale) acc++;
    return acc;
  }, 0);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="my-12 px-12">
        <div className="mx-[-12px] grid grid-cols-12">
          {/* --- SIDEBAR --- */}
          <div className="px-3 xl:col-span-3 col-span-12 md:col-span-5 lg:col-span-4">
            <div>
              {/* brand */}
              <div className="mb-6 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                <div>
                  <div>
                    <div className="bg-blue-300 w-full text-white inline-flex items-center justify-between h-15">
                      <button className="px-7.5 text-xl inline-flex items-center">
                        Thương hiệu
                      </button>
                      <FaChevronUp className="text-base mr-7.5" />
                    </div>
                  </div>
                  <div>
                    <ul className="px-5 ">
                      {Object.entries(brandCount).map(([brand, count]) => (
                        <li
                          key={brand}
                          className="border-b border-gray-300 h-12.5 flex items-center text-base last:border-none hover:text-orange-500"
                        >
                          <Link
                            to={`/san-pham?brand=${brand.toLowerCase()}`}
                            className={`pl-[10px] w-full ${brandParam?.toLowerCase() === brand.toLowerCase() ? 'text-orange-500 font-bold' : ''}`}
                          >
                            <span className="mr-2.5"></span>
                            {brand}
                            <span className="ml-2.5 text-gray-400">
                              ({count})
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* feature */}
              <div className="mb-6 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                <div>
                  <div>
                    <div className="bg-blue-300 w-full text-white inline-flex items-center justify-between h-15">
                      <button className="px-7.5 text-xl inline-flex items-center">
                        Đặc điểm
                      </button>
                      <FaChevronUp className="text-base mr-7.5" />
                    </div>
                  </div>
                  <div>
                    <ul className="px-5 ">
                      <li className="border-b border-gray-300 h-12.5 flex items-center text-base hover:text-orange-500">
                        <Link to="/san-pham?hot=true" className={`pl-[10px] w-full ${hotParam === 'true' ? 'text-orange-500 font-bold' : ''}`}>
                          <span className="mr-2.5"></span>Sản phẩm hot
                          <span className="ml-2.5 text-gray-400">
                            ({hotCount})
                          </span>
                        </Link>
                      </li>
                      <li className="h-12.5 flex items-center text-base hover:text-orange-500">
                        <Link to="/san-pham?sale=true" className={`pl-[10px] w-full ${saleParam === 'true' ? 'text-orange-500 font-bold' : ''}`}>
                          <span className="mr-2.5"></span>Sản phẩm sale
                          <span className="ml-2.5 text-gray-400">
                            ({saleCount})
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Accessories Categories */}
              <div className="mb-6 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                <div>
                  <div>
                    <div className="bg-blue-300 w-full text-white inline-flex items-center justify-between h-15">
                      <button className="px-7.5 text-xl inline-flex items-center">
                        Phụ kiện
                      </button>
                      <FaChevronUp className="text-base mr-7.5" />
                    </div>
                  </div>
                  <div>
                    <ul className="px-5 ">
                      {Object.entries(categoryCount).map(
                        ([category, count]) => (
                          <li
                            key={category}
                            className="border-b border-gray-300 h-12.5 flex items-center text-base last:border-none hover:text-orange-500"
                          >
                            <Link
                              to={`/san-pham?category=${category.toLowerCase()}`}
                              className={`pl-[10px] w-full ${categoryParam?.toLowerCase() === category.toLowerCase() ? 'text-orange-500 font-bold' : ''}`}
                            >
                              <span className="mr-2.5"></span>
                              {category}
                              <span className="ml-2.5 text-gray-400">
                                ({count})
                              </span>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- MAIN PRODUCT LIST --- */}
          <div className="px-3 xl:col-span-9 col-span-12 md:col-span-7 lg:col-span-8">
            <div className="mb-7.5 flex justify-end bg-blue-300 rounded">
              <div className="py-[11px] h-15 px-5 rounded">
                <div className="bg-white inline-flex h-full rounded">
                  <select
                    className="pl-3 pr-9 px-[6px] focus:outline-none drop-shadow-lg border-none text-base"
                    name="sort"
                    id="sort"
                  >
                    <option value="">Sắp xếp theo</option>
                    <option value="gia-giam">Giá giảm dần</option>
                    <option value="gia-tang">Giá tăng dần</option>
                    <option value="moi-nhat">Mới nhất</option>
                    <option value="cu-nhat">Cũ nhất</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Show filter status */}
            {(brandParam || categoryParam || hotParam || saleParam || searchParam) && (
              <div className="mb-4 text-gray-600 font-medium">
                Đang hiển thị {filteredProducts.length} sản phẩm
                {searchParam && <> cho từ khóa <span className="text-blue-500 uppercase">"{searchParam}"</span></>}
                {brandParam && <> thương hiệu <span className="text-orange-500 uppercase">"{brandParam}"</span></>}
                {categoryParam && <> danh mục <span className="text-orange-500 uppercase">"{categoryParam}"</span></>}
                {hotParam && <> <span className="text-red-500 font-bold">HOT</span></>}
                {saleParam && <> đang <span className="text-red-500 font-bold">SALE</span></>}
                :
              </div>
            )}

            {/* product grid */}
            <div>
              <div>
                <div className="grid grid-cols-12 mx-[-12px]">
                  {/* Sử dụng currentProducts thay vì products để phân trang */}
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="px-3 col-span-12 sm:col-span-6 md:col-span-12 lg:col-span-6 xl:col-span-4"
                      >
                        <div className="mb-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                          {/* img */}
                          <div className="relative overflow-hidden aspect-square">
                            <Link to={`/san-pham/${product.id}`}>
                              <img
                                src={`${getImgUrl(product.images?.[0]?.link)}`}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </Link>
                          </div>
                          {/* details */}
                          <div className="p-6">
                            <Link to={`/san-pham/${product.id}`}>
                              <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-2 group-hover:text-[#345DA7] transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <div className="flex items-center justify-between mt-4">
                              <p className="text-xl font-black text-[#345DA7]">
                                {product.price.toLocaleString()} VNĐ
                              </p>
                              <Link
                                to={`/san-pham/${product.id}`}
                                className="bg-orange-500 text-white p-3 rounded-2xl hover:bg-orange-600 transition-colors shadow-md"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-12 text-center py-12 text-gray-500 text-lg">
                      Không tìm thấy sản phẩm nào phù hợp.
                      <div className="mt-4">
                        <Link to="/san-pham" className="text-blue-500 underline">Xem tất cả sản phẩm</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* --- PAGINATION (CLIENT-SIDE) --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center px-3 mt-4">
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg flex items-center justify-center text-base ${currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    <FaAngleLeft />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`px-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg flex items-center justify-center text-base ${currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg flex items-center justify-center text-base ${currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RecommendationSection
        type="content-based"
        title="Gợi ý dành cho bạn"
        subtitle="Các sản phẩm tương hợp dựa trên xu hướng"
      />
    </>
  );
};

export default Product;
