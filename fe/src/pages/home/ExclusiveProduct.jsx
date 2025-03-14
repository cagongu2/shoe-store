import React, {  } from "react";
import image from "../../assets/img/badge.png";
import image2 from "../../assets/img/hand.png";
import image3 from "../../assets/img/brand.png";
import image4 from "../../assets/img/price-tag.png";

import bgImage from "../../assets/img/exclusive1.png";

const ExclusiveProduct = () => {

  return (
    <>
      <div>
        <div className="px-3">
          <div className="mx-[-12px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            {/* col-left */}
            <div
              className="py-44 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              <div className="px-12">
                {/* row */}
                <div className="mx-3 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                  <div className="bg-white rounded-xl ">
                    <div className="flex justify-center items-center flex-col p-[16px]">
                      <h5 className="mb-[8px] text-base font-medium">
                        Đa dạng
                      </h5>
                      <img src={image3} alt="" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl ">
                    <div className="flex justify-center items-center flex-col p-[16px]">
                      <h5 className="mb-[8px] text-base font-medium">
                        Phong cách
                      </h5>
                      <img src={image2} alt="" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl ">
                    <div className="flex justify-center items-center flex-col p-[16px]">
                      <h5 className="mb-[8px] text-base font-medium">
                        Chính sách
                      </h5>
                      <img src={image} alt="" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl ">
                    <div className="flex justify-center items-center flex-col p-[16px]">
                      <h5 className="mb-[8px] text-base font-medium">Ưu đãi</h5>
                      <img src={image4} alt="" />
                    </div>
                  </div>
                </div>
                {/* btn */}
                <div className="flex items-center justify-center">
                  <a
                    href=""
                    className="bg-orange-500 w-fit text-white text-base px-[20px] py-[10px] mt-10 rounded inline-block transition-transform duration-300 hover:-translate-y-1"
                  >
                    Xem ngay
                  </a>
                </div>
              </div>
            </div>
            {/* col-right */}
            <div>
              {/* <div className="mt-12 px-20">
            
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExclusiveProduct;
