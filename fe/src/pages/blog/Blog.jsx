import React, { useState } from "react";
import { FaLongArrowAltRight, FaEye } from "react-icons/fa";
import img1 from "../../assets/tmp/uploads/blog/cach-bao-quan-giay.jpg";
import { useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";

const Blog = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="bg-white">
        {/* banner */}
        <div className="px-12 bg-gray-500">
          <div className="py-25 pr-20 flex items-center justify-end">
            <div className="pr-10 text-white">
              <p className="text-3xl mb-2">Bài viết</p>
              <nav className="flex items-center text-base">
                <a href="/">Trang chủ</a>
                <FaLongArrowAltRight className="mx-[10px]" />
                <a href="/bai-viet/meo-vat">Mẹo vặt</a>
              </nav>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="my-12 px-12">
          <div className="mx-[-12px] grid grid-cols-12">
            <div className="xl:col-span-8 lg:col-span-6 px-3 col-span-12">
              <div className="mb-4 border-solid border-1 rounded-xl border-gray-100">
                <div className="grid grid-cols-12">
                  <div className="md:col-span-5 col-span-12">
                    <a href="https://shoes.themedemo.site/blog/cach-bao-quan-giay.html">
                      <img
                        src={img1}
                        className="object-fill w-full rounded-l-lg h-[260px]"
                        alt="Cách bảo quản giày"
                      />
                    </a>
                  </div>
                  <div className="md:col-span-7 col-span-12">
                    <div className="m-4 overflow-hidden text-gray-700">
                      <a href="https://shoes.themedemo.site/blog/cach-bao-quan-giay.html">
                        <p className="mb-4 text-blue-600 text-xl">
                          Cách bảo quản giày
                        </p>
                      </a>
                      <p className="mb-4 line-clamp-2 text-base/7">
                        Sneaker đã trở thành một trong những xu hướng thời trang
                        được ưa chuộng trong những năm gần đây và vẫn đang tiếp
                        tục phát triển mạnh mẽ. Chắc hẳn với những tín đồ mộ
                        điệu sneaker thì mỗi vết dơ, ẩm mốc, hay vết bạc màu
                        cũng chính là kẻ thù số một. Nếu bạn vẫn đang loay hoay
                        không biết cách&nbsp;bảo quản giày sneaker&nbsp;thế nào
                        cho đúng thì hãy bỏ túi một số tips dưới đây nhé!
                      </p>
                      <p className="mb-4"></p>
                      <div className="flex gap-4 items-center mb-4 italic ">
                        <p className="">Ngày 01/12/2024 − 09:55</p>
                        <div className="grid grid-cols-[auto_1fr] items-start gap-1">
                          <FaEye className="text-lg" />
                          <p>• 405 Lượt xem</p>
                        </div>
                      </div>
                      <a
                        href="https://shoes.themedemo.site/blog/cach-bao-quan-giay.html"
                        className="relative  pl-1 pr-1 py-1.5 w-[160px] h-[50px] text-base text-nowrap group flex items-center justify-between rounded-2xl bg-orange-500 text-white font-semibold transition-all duration-500 hover:bg-white hover:border hover:border-orange-500 hover:text-orange-500"
                      >
                        <p className="absolute pl-3">Xem thêm</p>

                        <div className="absolute text-sm flex h-10 w-10 items-center justify-center rounded-xl right-1 bg-white text-orange-500 transition-all duration-500 group-hover:w-[95%] group-hover:pl-1 group-hover:bg-orange-500 group-hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                              fill="currentColor"
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13pv-2z"
                            ></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-4 lg:col-span-6 col-span-12">
              <div className="px-[15px] py-5 border-solid border-1 rounded-xl border-gray-100">
                {/* search */}
                <div className="pb-6">
                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center">
                      <input
                        id="search"
                        type="text"
                        {...register("search")}
                        className="relative py-[6px] h-[42px] pl-5 pr-3 text-orange-500 rounded-full border-1 w-full border-orange-500 focus:outline-none"
                        placeholder="Tìm bài viết..."
                      />
                      <span className="absolute right-[68px]">
                        <button className="hover:cursor-pointer" type="submit">
                          <IoIosSearch className="text-base" />
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                {/* popular blog */}
                <div>
                  <p className="mb-2 text-[18px]">Bài viết phổ biến</p>
                  <div className="mb-4 mt-2 w-full border-b border-gray-100"></div>
                  {/* single blog */}
                  <div className=" mb-4 border-0">
                    <div className="grid grid-cols-12 h-full md:h-[140px]">
                      <div className="col-span-12 md:col-span-4 h-full md:h-[140px]">
                        <a href="https://shoes.themedemo.site/blog/kho-luu-tru-nike-hoi-uc-ve-thap-ky-80-qua-nhung-hinh-bong-retro.html">
                          <img
                            src="https://shoes.themedemo.site/backend/uploads/blog/1699457757.png"
                            className=" h-full md:h-[140px] object-fit rounded-l-lg"
                            alt="Kho lưu trữ Nike: Hồi ức về Thập kỷ 80 qua những Hình Bóng Retro"
                          />
                        </a>
                      </div>
                      <div className="col-span-12 md:col-span-8">
                        <div className="p-4">
                          <a href="https://shoes.themedemo.site/blog/kho-luu-tru-nike-hoi-uc-ve-thap-ky-80-qua-nhung-hinh-bong-retro.html">
                            <p className="mb-2 text-base text-blue-500 font-[550] line-clamp-1">
                              Kho lưu trữ Nike: Hồi ức về Thập kỷ 80 qua những
                              Hình Bóng Retro
                            </p>
                          </a>
                          <p className="line-clamp-2 mb-2 text-sm text-gray-700">
                            Kể từ khi thành lập vào năm 1964, Nike đã tạo ra một
                            số thiết kế giày dép dễ nhận biết nhất trong lịch
                            sử. Tuy nhiên, thương hiệu có trụ sở tại Beaverton,
                            Oregon không được xây dựng trong một ngày hay chỉ
                            bằng một đôi giày.
                          </p>
                          <div className="flex gap-4 italic text-gray-700">
                            <p className="mb-0">01/12/2024 </p>
                            <div className="grid grid-cols-[auto_1fr] items-start gap-1">
                              <FaEye className="text-lg" />
                              <p>• 405</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 mt-2 w-full border-b border-gray-100 my-[30px]"></div>
                </div>
                {/* blog menu */}
                <div className="mb-[30px]">
                  <p className="py-2 mb-[30px] block bg-orange-500 text-center text-white text-[18px]">
                    Danh mục bài viết
                  </p>
                  <ul className="text-gray-500">
                    <li className="pb-3 border-b-1 border-dashed border-gray-400 ">
                      <a
                        href="https://shoes.themedemo.site/bai-viet/meo-vat"
                        className="flex justify-between"
                      >
                        <p>Mẹo vặt</p>
                        <p>39</p>
                      </a>
                    </li>
                    <li className="pt-[15px] pb-3 border-b-1 border-dashed border-gray-400">
                      <a
                        href="https://shoes.themedemo.site/bai-viet/tin-tuc"
                        className="flex justify-between"
                      >
                        <p>Tin tức</p>
                        <p>39</p>
                      </a>
                    </li>
                    <li className="pt-[15px] pb-3 border-b-1 border-dashed border-gray-400">
                      <a
                        href="https://shoes.themedemo.site/bai-viet/tu-van"
                        className="flex justify-between"
                      >
                        <p>Tư vấn</p>
                        <p>12</p>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* tag */}
                <div>
                  <p className="py-2 mb-[30px] block bg-orange-500 text-center text-white text-[18px]">
                    Thẻ tag
                  </p>
                  <ul className="">
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/sneaker-square">
                        Sneaker Square
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/nike">Nike</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/adidas">
                        Adidas
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/puma">Puma</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/vo-trang">
                        Vớ trắng
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/hot-trend">
                        Hot trend
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/moi-nhat">
                        Mới nhất
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/huu-ich">
                        Hữu ích
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/new-balance">
                        New Balance
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/sale">Sale</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/chia-se">
                        Chia sẻ
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/goi-y">Gợi ý</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/tin-moi">
                        Tin mới
                      </a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/blog">Blog</a>
                    </li>
                    <li className="inline-block mr-2 px-[13px] mb-2 border-1 border-gray-200 text-[12px] text-gray-600">
                      <a href="https://shoes.themedemo.site/tag/meo-hay-va-bo-ich">
                        Mẹo hay và bổ ích
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
