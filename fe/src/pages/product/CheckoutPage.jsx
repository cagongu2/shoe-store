import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { currentUser, loading } = useAuth();

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      carts: cartItems.map((item) => item),
      totalPrice: totalPrice,
    };
    console.log(newOrder);
  };

  return (
    <>
      {!loading ? (
        <section>
          <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
              <div>
                <div>
                  <h2 className="font-semibold text-xl text-gray-600 mb-2">
                    Thanh toán khi nhận hàng
                  </h2>
                  <p className="text-gray-500 mb-2">
                    Tổng tiền: {totalPrice} vnd
                  </p>
                  <p className="text-gray-500 mb-6">
                    Số lượng sản phẩm:{" "}
                    {cartItems.length > 0 ? cartItems.length : 0}
                  </p>
                </div>

                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
                  >
                    <div className="text-gray-600">
                      <p className="font-medium text-lg">Thông tin cá nhân</p>
                      <p>Vui lòng điền đầy đủ các trường.</p>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <label htmlFor="full_name">Họ và tên</label>
                          <input
                            {...register("name", { required: true })}
                            type="text"
                            name="name"
                            id="name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="email">Địa chỉ email</label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            disabled
                            defaultValue={currentUser?.email}
                            placeholder="email@domain.com"
                          />
                        </div>
                        <div className="md:col-span-5">
                          <label htmlFor="phone">Số điện thoại</label>
                          <input
                            {...register("phone", { required: true })}
                            type="number"
                            name="phone"
                            id="phone"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="address"> Địa chỉ / Đường phố</label>
                          <input
                            {...register("address", { required: true })}
                            type="text"
                            name="address"
                            id="address"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder=""
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="city">Thành phố</label>
                          <input
                            {...register("city", { required: true })}
                            type="text"
                            name="city"
                            id="city"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder=""
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="country">Quốc gia</label>
                          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <input
                              {...register("country", { required: true })}
                              name="country"
                              id="country"
                              placeholder="Country"
                              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            />
                            <button
                              tabIndex="-1"
                              className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                            >
                              <svg
                                className="w-4 h-4 mx-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                            <button
                              tabIndex="-1"
                              className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                            >
                              <svg
                                className="w-4 h-4 mx-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="state">Bang / Tỉnh</label>
                          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <input
                              {...register("state", { required: true })}
                              name="state"
                              id="state"
                              placeholder="State"
                              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            />
                            <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                              <svg
                                className="w-4 h-4 mx-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                            <button
                              tabIndex="-1"
                              className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                            >
                              <svg
                                className="w-4 h-4 mx-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-1">
                          <label htmlFor="zipcode">Mã bưu điện</label>
                          <input
                            {...register("zipcode", { required: true })}
                            type="text"
                            name="zipcode"
                            id="zipcode"
                            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder=""
                          />
                        </div>

                        <div className="md:col-span-5 mt-3">
                          <div className="inline-flex items-center">
                            <input
                              // onChange={(e) => setIsChecked(e.target.checked)}
                              type="checkbox"
                              name="billing_same"
                              id="billing_same"
                              className="form-checkbox"
                            />
                            <label htmlFor="billing_same" className="ml-2 ">
                              Tôi đồng ý với
                              <Link className="underline underline-offset-2 text-blue-600">
                                Điều khoản & Điều kiện
                              </Link>{" "}
                              và
                              <Link className="underline underline-offset-2 text-blue-600">
                                Chính sách mua sắm.
                              </Link>
                            </label>
                          </div>
                        </div>

                        <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Đặt hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CheckoutPage;
