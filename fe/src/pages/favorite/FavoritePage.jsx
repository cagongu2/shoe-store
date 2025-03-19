import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../util/getImageUrl";

const FavoritePage = () => {
  const favoriteItems = [
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      category: "Nike",
      size: 36,
      quantity: 2,
      color: "Đỏ",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      category: "Nike",
      size: 36,
      quantity: 1,
      color: "Đỏ",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
  ];
  return (
    <>
      <div>
        <div className="mt-12 px-12 font-normal">
          {/* title */}
          <div className="mx-[-12px]">
            <div className="px-3">
              <div>
                <div className="mb-12.5 text-center">
                  <p className="font-[400] text-4xl">Sản phẩm yêu thích</p>
                </div>
              </div>
            </div>
          </div>
          {/* product */}
          {favoriteItems.map((item) => (
            <div className="mx-[-12px] mb-6">
              <div className="px-3 bg-white rounded font-[400] drop-shadow-xl">
                <div className="mb-4">
                  <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-2 p-4">
                      <a href={item.link}>
                        <img
                          src={`${getImgUrl(item.image)}`}
                          alt=""
                          className="rounded w-fit h-30 object-cover sm:w-full sm:h-fit"
                        />
                      </a>
                    </div>
                    <div className="col-span-12 md:col-span-10 flex items-center">
                      <div className="p-4 ">
                        <div className="mx-[-12px] grid grid-cols-1 xl:grid-cols-3">
                          <div className=" p-4 flex items-center">
                            <a href={item.link}>
                              <p className="text-xl font-medium">
                               {item.name}
                              </p>
                            </a>
                          </div>
                          <div className=" p-4 flex items-center">
                            <p className="text-orange-600 text-xl">
                              {item.price} VNĐ
                            </p>
                          </div>
                          <div className="p-4 flex items-center">
                            <div className="flex gap-3 text-white items-center justify-between text-base">
                              {/* <input type="hidden" name="product-id" className="pro-id" value="129"> */}
                              <div className="flex h-[40px] items-center justify-center">
                                <button className="py-2 px-3 inline-flex justify-center h-[100%] items-center bg-red-500 rounded w-25">
                                  <Link to="#">
                                    <FaRegTrashAlt className="leading-[100%]" />
                                  </Link>
                                </button>
                              </div>
                              <div className="py-2 px-3 h-[40px] w-40 bg-green-500 rounded ">
                                <a
                                  href={item.link}
                                  className=" flex items-center justify-center gap-2"
                                >
                                  <FaEye className="block" /> Xem sản phẩm
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritePage;
