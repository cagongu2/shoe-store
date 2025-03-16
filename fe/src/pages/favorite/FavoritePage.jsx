import React from "react";
import img1 from "../../assets/tmp/uploads/product/1701278362-WL574EVW-3_900x@2x.jpg";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const FavoritePage = () => {
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
          <div className="mx-[-12px] mb-6">
            <div className="px-3 bg-white rounded font-[400] drop-shadow-xl">
              <div className="mb-4">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 md:col-span-2 p-4">
                    <a href="#">
                      <img
                        src={img1}
                        alt=""
                        className="rounded w-fit h-30 object-cover sm:w-full sm:h-fit"
                      />
                      {/* <img onerror="this.src='/uploads/img_error2.jpg'" src="backend/uploads/product/1701277327-1699808901-M860B13-3.jpg" className="img-fluid rounded border img-wish__page" alt="New Balance 860v13 Fresh Foam"> */}
                    </a>
                  </div>
                  <div className="col-span-12 md:col-span-10 flex items-center">
                    <div className="p-4 ">
                      <div className="mx-[-12px] grid grid-cols-1 xl:grid-cols-3">
                        <div className=" p-4 flex items-center">
                          <a href="#">
                            <p className="text-xl font-medium">
                              New Balance 860v13 Fresh Foam
                            </p>
                          </a>
                        </div>
                        <div className=" p-4 flex items-center">
                          <p className="text-orange-600 text-xl">
                            3.809.000 VNĐ
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
                                href="#"
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
          {/* product */}

          <div className="mx-[-12px] mb-6">
            <div className="px-3 bg-white rounded font-[400] drop-shadow-xl">
              <div className="mb-4">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 md:col-span-2 p-4">
                    <a href="#">
                      <img
                        src={img1}
                        alt=""
                        className="rounded w-fit h-30 object-cover sm:w-full sm:h-fit"
                      />
                      {/* <img onerror="this.src='/uploads/img_error2.jpg'" src="backend/uploads/product/1701277327-1699808901-M860B13-3.jpg" className="img-fluid rounded border img-wish__page" alt="New Balance 860v13 Fresh Foam"> */}
                    </a>
                  </div>
                  <div className="col-span-12 md:col-span-10 flex items-center">
                    <div className="p-4 ">
                      <div className="mx-[-12px] grid grid-cols-1 xl:grid-cols-3">
                        <div className=" p-4 flex items-center">
                          <a href="#">
                            <p className="text-xl font-medium">
                              New Balance 860v13 Fresh Foam
                            </p>
                          </a>
                        </div>
                        <div className=" p-4 flex items-center">
                          <p className="text-orange-600 text-xl">
                            3.809.000 VNĐ
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
                                href="#"
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
        </div>
      </div>
    </>
  );
};

export default FavoritePage;
