import React from "react";
import { FaTrash } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { useForm } from "react-hook-form";

const Cart = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className="my-12 px-12 ">
        <div>
          <div className="px-3 mx-2">
            <div className="mx-[-12px] grid grid-cols-1 lg:grid-cols-12 bg-white drop-shadow-xl rounded-xl">
              {/* cart item */}
              <div className="p-4 col-span-8">
                <div>
                  {/* title */}
                  <div className="p-4">
                    <p className="text-lg mb-2">Giỏ hàng</p>
                  </div>

                  {/* cart item */}
                  <div>
                    {/* single item */}
                    <div className="grid grid-cols-12 ">
                      {/* img */}
                      <div className="p-4 col-span-12 md:col-span-3">
                        <img
                          className="lg:w-[150px] lg:h-[150px] rounded-xl object-contain"
                          src="https://shoes.themedemo.site/backend/uploads/product/1701279232-DD9284-401-2.jpg"
                          alt=""
                        />
                      </div>
                      {/* item-info */}
                      <div className="col-span-12 md:col-span-9">
                        <div className="p-4">
                          <div className="mx-[-12px]">
                            <div className="px-3">
                              <p className="text-lg mb-2">
                                Nike Flex Experience Rn 11
                              </p>
                              <div className="d-flex gap-3 align-items-center">
                                <p className="text-base mb-4 text-orange-500">
                                  4.218.000 VNĐ
                                </p>
                              </div>
                              <div className="flex justify-between mb-4 flex-wrap gap-2">
                                <div>
                                  <span className="text-semibold">
                                    Thương hiệu:
                                  </span>
                                  <span>Nike</span>
                                </div>
                                <div>
                                  <span className="text-semibold">Size:</span>
                                  <span>36</span>
                                </div>
                                <div>
                                  <span className="text-semibold">SL:</span>
                                  <span>2</span>
                                </div>
                                <div>
                                  <span className="text-semibold">
                                    Màu sắc:
                                  </span>
                                  <span>Đen</span>
                                </div>
                              </div>
                              <div className="text-red-700">
                                <FaTrash />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* single item */}
                    <div className="grid grid-cols-12 ">
                      {/* img */}
                      <div className="p-4 col-span-12 md:col-span-3">
                        <img
                          className="lg:w-[150px] lg:h-[150px] rounded-xl object-contain"
                          src="https://shoes.themedemo.site/backend/uploads/product/1701279232-DD9284-401-2.jpg"
                          alt=""
                        />
                      </div>
                      {/* item-info */}
                      <div className="col-span-12 md:col-span-9">
                        <div className="p-4">
                          <div className="mx-[-12px]">
                            <div className="px-3">
                              <p className="text-lg mb-2">
                                Nike Flex Experience Rn 11
                              </p>
                              <div className="d-flex gap-3 align-items-center">
                                <p className="text-base mb-4 text-orange-500">
                                  4.218.000 VNĐ
                                </p>
                              </div>
                              <div className="flex justify-between mb-4 flex-wrap gap-2">
                                <div>
                                  <span className="text-semibold">
                                    Thương hiệu:
                                  </span>
                                  <span>Nike</span>
                                </div>
                                <div>
                                  <span className="text-semibold">Size:</span>
                                  <span>36</span>
                                </div>
                                <div>
                                  <span className="text-semibold">SL:</span>
                                  <span>2</span>
                                </div>
                                <div>
                                  <span className="text-semibold">
                                    Màu sắc:
                                  </span>
                                  <span>Đen</span>
                                </div>
                              </div>
                              <div className="text-red-700">
                                <FaTrash />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-5 w-full border-b border-gray-200"></div>

                  {/* btn */}
                  <div className="mx-[-12px]">
                    <div className="mt-4 px-3">
                      <div className="w-full">
                        <div className="mx-[-12px] text-white flex flex-col lg:flex-row ">
                          {/* icon left */}
                          <div className="group max-w-[180px] px-3 mb-4 pr-0 bg-green-500 inline-flex items-center justify-center rounded ml-7 group-hover:px-0">
                            <a
                              href="https://shoes.themedemo.site/san-pham"
                              className="flex items-center justify-center gap-4 relative w-full"
                            >
                              <span className="text-base p-2 mr-10">
                                Mua thêm hàng
                              </span>
                              <div className="absolute right-0 bg-green-600 flex h-10 w-10 items-center justify-center rounded text-white transition-all duration-500 group-hover:w-[calc(100%+12px)]">
                                <RiShoppingBagLine />
                              </div>
                            </a>
                          </div>

                          {/* icon right */}
                          <div className="group max-w-[180px] px-3 mb-4 pr-0 bg-red-500 inline-flex items-center justify-center rounded ml-7 group-hover:px-0">
                            <a
                              href="https://shoes.themedemo.site/san-pham"
                              className="flex items-center justify-center gap-4 relative w-full"
                            >
                              <span className="text-base p-2 mr-10 w-[100%]">
                                Xóa giỏ hàng
                              </span>
                              <div className="absolute right-0 bg-red-600 flex h-10 w-10 items-center justify-center rounded text-white transition-all duration-500 group-hover:w-[calc(100%+12px)]">
                                <FaTrash />
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* checkout */}
              <div className="col-span-4 p-4">
                <h4 className="text-center mb-4 p-4 text-lg">Thanh toán</h4>
                <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
                  <label className="block text-gray-400 text-sm mb-2">
                    Mã giảm giá
                  </label>
                  <input
                    type="text"
                    {...register("coupon")}
                    className="w-full mb-6 p-2 rounded border-solid border-1 border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-300 px-3 py-[6px]"
                    placeholder="Nhập tại đây..."
                  />
                  {errors.name && (
                    <p className="text-red-500 font-thin text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="rounded bg-black text-white w-full p-[6px]"
                  >
                    Kiểm tra
                  </button>
                </form>
                <div className="my-5 w-full border-b border-gray-200"></div>

                <div className="flex justify-between">
                  <p className="font-medium text-base mb-2">TỔNG TIỀN: </p>
                  <p className="font-semibold text-base mb-2">10.213.000 VNĐ</p>
                </div>
                <a
                  href=""
                  className="rounded bg-orange-500 text-white w-full p-[6px] block mt-2 text-center"
                >
                  Thanh toán
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
