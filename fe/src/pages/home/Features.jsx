import React from "react";

import icon1 from "../../assets/img/features/f-icon1.png";
import icon2 from "../../assets/img/features/f-icon2.png";
import icon3 from "../../assets/img/features/f-icon3.png";
import icon4 from "../../assets/img/features/f-icon4.png";

const Features = () => {
  return (
    <>
      <div className="px-[48px] py-[80px]">
        <div className="my-[0px] mx-[12px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-[-12px] drop-shadow-xl bg-white">
            <div className="my-[20px] p-[16px]">
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-center">
                  <img src={icon1} className="text-4xl" alt=""></img>
                </div>
                <div className="flex items-center justify-center">
                  <h6 className="text-base font-semibold font-[Open_Sans] mt-[8px]">
                    Chính sách giao hàng
                  </h6>
                </div>
                <div className="flex items-center justify-center">
                  <p className="mt-[8px] text-sm text-gray-400">Phí vận chuyển ưu đãi</p>
                </div>
              </div>
            </div>
            <div className="my-[20px] p-[16px]">
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-center">
                  <img src={icon2} className="text-4xl" alt=""></img>
                </div>
                <div className="flex items-center justify-center">
                  <h6 className="text-base font-semibold font-[Open_Sans] mt-[8px]">
                    Chính sách đổi trả
                  </h6>
                </div>
                <div className="flex items-center justify-center">
                  <p className="mt-[8px] text-sm text-gray-400">Đổi trả & quyền lợi khách hàng</p>
                </div>
              </div>
            </div>
            <div className="my-[20px] p-[16px]">
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-center">
                  <img src={icon3} className="text-4xl" alt=""></img>
                </div>
                <div className="flex items-center justify-center">
                  <h6 className="text-base font-semibold font-[Open_Sans] mt-[8px]">
                    Hỗ trợ 24/7
                  </h6>
                </div>
                <div className="flex items-center justify-center">
                  <p className="mt-[8px] text-sm text-gray-400">
                    Không giới hạn thời gian khi bạn cần
                  </p>
                </div>
              </div>
            </div>
            <div className="my-[20px] p-[16px]">
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-center">
                  <img src={icon4} className="text-4xl" alt=""></img>
                </div>
                <div className="flex items-center justify-center">
                  <h6 className="text-base font-semibold font-[Open_Sans] mt-[8px]">
                    Bảo mật thông tin
                  </h6>
                </div>
                <div className="flex items-center justify-center">
                  <p className="mt-[8px] text-sm text-gray-400">An tâm trải nghiệm dịch vụ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
