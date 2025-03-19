import React from "react";
import { getImgUrl } from "../../util/getImageUrl";

const BestSeller = () => {
  // đoạn này thay bằng fetch api để đổ dữ liệu xuống
  const products = [
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
    {
      id: 1,
      name: "Nike Air Winflo 10",
      price: "3.489.000",
      image: "uploads/product/1701269731-1700986313-FD0368-100-2.jpg",
      link: "/san-pham/nike-air-winflo-10",
    },
  ];
  return (
    <div className="py-20">
      <div className="px-12">
        <div className="flex justify-center mx-[-12px]">
          <div className="px-3 text-center">
            <div className="mb-[50px]">
              <h1 className="pb-[8px] text-4xl font-medium ">
                Sản phẩm xem nhiều nhất
              </h1>
              <p className="text-sm text-gray-600 font-[Open_Sans]">
                Top sản phẩm nhiều lượt xem. Đề xuất bạn thuận tiện tham khảo
                các khuyến nghị từ các khách hàng khác.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 overflow-x-hidden mx-[-12px]">
          <div className="col-span-12 lg:col-span-9 px-3">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-[-12px]">
              {/* single product */}
              {products.map((product) => (
                <div key={product.id} className="px-3">
                  <div className="mb-[15px] flex">
                    <a href="https://shoes.themedemo.site/san-pham/nike-flex-experience-rn-11">
                      <img
                        src={`${getImgUrl(product.image)}`}
                        alt="Nike Flex Experience Rn 11"
                        className="rounded max-w-[70px]"
                      />
                    </a>
                    <div className="pl-[15px] px-[10px]">
                      <a
                        href="https://shoes.themedemo.site/san-pham/nike-flex-experience-rn-11"
                        className="overflow-hidden line-clamp-1 text-sm font-bold"
                      >
                        {product.name}
                      </a>
                      <div className="price">
                        <h6 className="pr-[10px] text-sm font-medium">
                          {" "}
                          {product.price} VNĐ{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 hidden lg:flex">
            <div className="max-">
              <img
                className="w-full object-cover rounded"
                src={`${getImgUrl(
                  "uploads/product/1701279232-DD9284-401-2.jpg"
                )}`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
