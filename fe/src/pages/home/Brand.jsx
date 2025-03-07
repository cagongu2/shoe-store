import React from "react";
import brand1 from "../../assets/tmp/uploads/product/category/1699345766-puma-1684311439523.webp";
import brand2 from "../../assets/tmp/uploads/product/category/1699345752-nb-1684311439515.webp";
import brand3 from "../../assets/tmp/uploads/product/category/1699345658-B.webp";
import brand4 from "../../assets/tmp/uploads/product/category/1699345637-nike-1684311439519.webp";

const Brand = () => {
  return (
    <>
      <div className="pb-25 flex items-center justify-center">
        <div className="px-[48px] w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 ">
            <div className="flex items-center justify-center">
              <a href="">
                <img
                  src={brand1}
                  className="max-w-20 max-h-20  filter invert-[80%] brightness-90 hover:invert-0 hover:brightness-100"
                  alt=""
                />
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="">
                <img
                  src={brand2}
                  className="max-w-20 max-h-20  filter invert-[80%] brightness-90 hover:invert-0 hover:brightness-100"
                  alt=""
                />
              </a>
            </div>
            <div className="flex items-center justify-center py-0 my-0">
              <a href="">
                <img
                  src={brand3}
                  className="max-w-20 max-h-20  filter invert-[80%] brightness-90 hover:invert-0 hover:brightness-100"
                  alt=""
                />
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="">
                <img
                  src={brand4}
                  className="max-w-20 max-h-20  filter invert-[80%] brightness-90 hover:invert-0 hover:brightness-100"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;
