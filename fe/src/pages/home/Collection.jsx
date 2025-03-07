import React from "react";
import image1 from "../../assets/tmp/uploads/product/1701269731-1700986313-FD0368-100-2.jpg";
import { BsFillSendFill } from "react-icons/bs";

const Collection = () => {
  return (
    <>
      <div className="pb-[100px]">
        <div className="px-[48px]">
          {/* tilte */}
          <div className="mx-[-12px]">
            <div className="px-[12px] justify-center flex ">
              <div className="mb-[50px] max-w-2xl">
                <h1 className="mb-[8px] text-4xl font-medium justify-center flex">
                  Bộ sưu tập
                </h1>
                <p className="text-sm text-gray-400 font-[Open_Sans] justify-center flex">
                  Bộ sưu tập độc đáo dánh riếng cho những người yêu thích thời
                  trang và đôi giày
                </p>
              </div>
            </div>
          </div>
          {/* product */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2">
          
            {/* Single Product */}
            <div className="p-3">
              <div className="">
                <div className="border-solid rounded-md shadow-xl text-center">
                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src={image1}
                      alt="Nike Air Winflo 10"
                      className="mx-auto transition-transform duration-500 hover:scale-110 rounded-t-lg"
                    />
                  </div>
                  {/* Details */}
                  <div className="flex flex-col pt-4 pb-4 bg-white rounded-b-lg">
                    <a
                      href=""
                      className="block text-[15px] font-bold text-gray-700 uppercase mb-2 hover:text-blue-600"
                    >
                      Nike Air Winflo 10
                    </a>
                    <h6 className="pt-3 font-bold text-gray-700 text-[15px]  hover:text-blue-600">
                      3.489.000 VNĐ
                    </h6>
                    {/* Button */}
                    <div className="mt-3">
                      <a
                        href=""
                        className="bg-orange-500 text-white text-base px-4 py-1 rounded inline-block transition-transform duration-300 hover:-translate-y-1"
                      >
                        Mua ngay
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* btn  */}
        <div className="flex justify-center overflow-hidden pt-4">
          <a
            href=""
            className="group relative rounded-xl h-12 w-30 flex justify-center items-center text-white bg-gradient-to-r from-[#65cef4] via-[#2181eb] to-[#2181eb] overflow-hidden transition-all duration-500"
          >
            {/* Icon */}
            <div className="pr-2 text-base transition-transform duration-500 group-hover:translate-x-10 group-hover:text-xl group-hover:translate-y-[3px] group-hover:rotate-45">
              <BsFillSendFill />
            </div>

            {/* Text */}
            <span className="text-base transition-all duration-500 group-hover:translate-x-10 group-hover:opacity-0">
              Xem thêm
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Collection;
