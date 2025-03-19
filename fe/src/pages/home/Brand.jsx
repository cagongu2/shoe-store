import React from "react";
import { getImgUrl } from "../../util/getImageUrl";

const Brand = () => {
  return (
    <>
      <div className="pb-25 flex items-center justify-center">
        <div className="px-[48px] w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 ">
            <div className="flex items-center justify-center">
              <a href="">
                <img
                  src={`${getImgUrl("uploads/product/category/1699345766-puma-1684311439523.webp")}`}
                  className="max-w-20 max-h-20  filter invert-[80%] brightness-90 hover:invert-0 hover:brightness-100"
                  alt=""
                />
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="">
                <img
                 src={`${getImgUrl("uploads/product/category/1699345752-nb-1684311439515.webp")}`}
                  className="max-w-20 max-h-20  filter invert-[80%] brightness-90 hover:invert-0 hover:brightness-100"
                  alt=""
                />
              </a>
            </div>
            <div className="flex items-center justify-center py-0 my-0">
              <a href="">
                <img
                 src={`${getImgUrl("uploads/product/category/1699345658-B.webp")}`}
                  className="max-w-20 max-h-20  filter invert-[80%] brightness-90 hover:invert-0 hover:brightness-100"
                  alt=""
                />
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="">
                <img
                  src={`${getImgUrl("uploads/product/category/1699345637-nike-1684311439519.webp")}`}
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
