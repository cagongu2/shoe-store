import React from "react";
import { FaChevronUp, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper/modules";
import { getImgUrl } from "../../util/getImageUrl";
import { Link } from "react-router-dom";

const Product = () => {
  const products = [
    {
      id: 1,
      name: "Nike Air Force One",
      price: 120,
      hot: true,
      sale: false,
      link: "/san-pham/1",
      description: "Classic and comfortable sneakers for all occasions.",
      brand: {
        id: 1,
        name: "Nike",
      },
      category: {
        id: 2,
        name: "Sneakers",
      },
      images: [
        {
          id: 101,
          url: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
        },
        {
          id: 102,
          url: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
        },
      ],
      stock: [
        {
          size: {
            id: 1,
            name: 32,
          },
          color: {
            id: 1,
            name: "Red",
          },
          quantity: 10,
        },
        {
          size: {
            id: 1,
            name: 32,
          },
          color: {
            id: 2,
            name: "Blue",
          },
          quantity: 5,
        },
        {
          size: {
            id: 2,
            name: 34,
          },
          color: {
            id: 1,
            name: "Red",
          },
          quantity: 8,
        },
      ],
      createdAt: "2024-03-20T10:00:00.000Z",
      updatedAt: "2024-03-21T10:00:00.000Z",
    },
  ];

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

  return (
    <>
      <div className="my-12 px-12">
        <div className="mx-[-12px] grid grid-cols-12">
          <div className="px-3 xl:col-span-3 col-span-12 md:col-span-5 lg:col-span-4">
            <div>
              {/* brand */}
              <div className="mb-4 drop-shadow-xl rounded bg-white">
                <div>
                  <div>
                    <div className="bg-blue-300 w-full rounded text-white inline-flex items-center justify-between h-15">
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
                          className="border-b border-gray-300 h-12.5 flex items-center text-base last:border-none"
                        >
                          <Link
                            to={`/san-pham?brand=${brand.toLowerCase()}`}
                            className="pl-[10px]"
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
              <div className="mb-4 drop-shadow-xl rounded bg-white">
                <div>
                  <div>
                    <div className="bg-blue-300 w-full rounded text-white inline-flex items-center justify-between h-15">
                      <button className="px-7.5 text-xl inline-flex items-center">
                        Đặc điểm
                      </button>
                      <FaChevronUp className="text-base mr-7.5" />
                    </div>
                  </div>
                  <div>
                    <ul className="px-5 ">
                      <li className="border-b border-gray-300 h-12.5 flex items-center text-base">
                        <Link to="/san-pham?hot=true" className="pl-[10px]">
                          <span className="mr-2.5"></span>Sản phẩm hot
                          <span className="ml-2.5 text-gray-400">
                            ({hotCount})
                          </span>
                        </Link>
                      </li>
                      <li className="h-12.5 flex items-center text-base">
                        <Link to="/san-pham?sale=true" className="pl-[10px]">
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
              {/* Accessories */}
              <div className="mb-4 drop-shadow-xl rounded bg-white">
                <div>
                  <div>
                    <div className="bg-blue-300 w-full rounded text-white inline-flex items-center justify-between h-15">
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
                            className="border-b border-gray-300 h-12.5 flex items-center text-base last:border-none"
                          >
                            <Link
                              to={`/san-pham?category=${category.toLowerCase()}`}
                              className="pl-[10px]"
                            >
                              <span className="mr-2.5"></span>
                              {(() => {
                                switch (category) {
                                  case "vo":
                                    return "Vớ";

                                  case "giay":
                                    return "Giày";
                                  case "dung-dich-ve-sinh-giay":
                                    return "Dung dịch vệ sinh giày";
                                  default:
                                    return category;
                                }
                              })()}
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
            {/* product */}
            <div>
              <div>
                <div className="grid grid-cols-12 mx-[-12px]">
                  {/* single product */}
                  {products.map((product) => (
                    <div className="px-3 col-span-12 sm:col-span-6 md:col-span-12 rounded lg:col-span-6 xl:col-span-4">
                      <div className="mb-7.5 bg-white rounded drop-shadow-lg">
                        {/* img */}
                        <div className="mb-5 rounded border-gray-200 overflow-hidden">
                          <Link to={product.link}>
                            <img
                              src={`${getImgUrl(product.images[0].url)}`}
                              alt={product.name}
                              className="w-full h-[240px] object-cover rounded hover:scale-[120%] transition-all duration-500"
                            />
                          </Link>
                        </div>
                        {/* details */}
                        <div className="rounded">
                          <Link to="">
                            <div>
                              <p className="px-2 mb-2 text-center text-lg font-normal">
                                {product.name}
                              </p>
                            </div>
                          </Link>
                          <div>
                            <p className="pr-[15px] text-center text-lg font-normal">
                              {product.price} VNĐ
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <Link
                              to={product.link}
                              className="text-base bg-orange-500 rounded text-white inline-flex py-[6px] px-4 my-4 hover:-translate-y-0.5 transition-all duration-500"
                            >
                              Mua ngay
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* pagination */}
            <div className=" flex justify-center items-center px-3">
              <div className=" flex justify-center items-center gap-3">
                <Link
                  to="https://shoes.themedemo.site/san-pham?keyword=&amp;page=2"
                  className="px-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center text-base"
                >
                  <FaAngleLeft />
                </Link>
                <Link
                  to="#"
                  className="px-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center text-base"
                >
                  1
                </Link>
                <Link
                  to="https://shoes.themedemo.site/san-pham?keyword=&amp;page=2"
                  className="px-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center text-base"
                >
                  2
                </Link>
                <Link
                  to="https://shoes.themedemo.site/san-pham?keyword=&amp;page=3"
                  className="px-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center text-base"
                >
                  3
                </Link>
                <Link
                  to="https://shoes.themedemo.site/san-pham?keyword=&amp;page=4"
                  className="px-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center text-base"
                >
                  4
                </Link>

                <Link
                  to="https://shoes.themedemo.site/san-pham?keyword=&amp;page=2"
                  className="px-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center text-base"
                >
                  <FaAngleRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Accessories */}
      <div className="px-12">
        {/* title */}
        <div className="mx-[-12px]">
          <div className="px-3">
            <div className="mb-12.5 text-center">
              <p className="text-3xl mb-2">Phụ kiện</p>
              <p className="text-gray-600 text-base">
                Phụ kiện hoàn hảo cho đôi giày của bạn - cùng shop khám phá ngay
              </p>
            </div>
          </div>
        </div>
        {/* item */}
        <div className="mb-12">
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={15}
            freeMode={true}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
            }}
            modules={[FreeMode]}
            className="mySwiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="text-center rounded">
                  {/* img */}
                  <div>
                    <Link to="">
                      <img
                        className="rounded"
                        src={`${getImgUrl(product.images[0].url)}`}
                        alt=""
                      />
                    </Link>
                  </div>
                  {/* content */}
                  <div className="rounded">
                    <Link to="">
                      <p className="line-clamp-1 px-2 mt-[15px] mb-2 text-sm font-[500] uppercase">
                        {product.name}
                      </p>
                    </Link>
                    <div>
                      <p className="mb-2 text-sm font-[500] uppercase">
                        {product.price} VNĐ
                      </p>
                    </div>
                    <div className="">
                      <Link
                        to={product.link}
                        className="px-4 py-1.5 mb-4 bg-orange-500 text-white inline-flex rounded hover:-translate-y-0.5 duration-500 transition-all"
                      >
                        Mua ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Product;
