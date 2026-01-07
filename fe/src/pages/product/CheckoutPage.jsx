import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import getBaseUrl from "../../util/baseUrl";
import axios from "axios";
import { useFetchCartByUserIdQuery } from "../../redux/features/carts/cartsApi";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const { currentUser, loading } = useAuth();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id;
  const navigate = useNavigate();

  const { data: cartItemsFromDB = [] } = useFetchCartByUserIdQuery(userId);
  const cartItemsFromStore = useSelector((state) => state.cart.cartItems);
  const [cartItems, setCartItems] = useState([]);

  // State phương thức thanh toán: 'cod' | 'momo'
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalPrice = useMemo(() => {
    return Math.round(
      cartItems.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
      )
    );
  }, [cartItems]);

  useEffect(() => {
    if (currentUser && cartItemsFromDB.length > 0) {
      if (
        JSON.stringify(cartItems) !==
        JSON.stringify(cartItemsFromDB.filter((item) => !item.isPayed))
      ) {
        setCartItems(cartItemsFromDB.filter((item) => !item.isPayed));
      }
    } else if (
      !currentUser &&
      JSON.stringify(cartItems) !== JSON.stringify(cartItemsFromStore)
    ) {
      setCartItems(cartItemsFromStore);
    }
  }, [currentUser, cartItemsFromDB, cartItemsFromStore, cartItems]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Hook tạo order
  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();

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
      carts: cartItems.map((item) => item.id),
      totalPrice: totalPrice,
    };

    // Lưu tạm vào localStorage (dùng cho luồng Momo callback hoặc re-try)
    localStorage.setItem("newOrder", JSON.stringify(newOrder));

    try {
      if (paymentMethod === "momo") {
        // --- LOGIC MOMO ---
        console.log("Processing Momo payment...");
        const response = await axios.post(
          `${getBaseUrl()}/api/v1/momo/create-payment`,
          {
            amount: totalPrice,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data?.payUrl) {
          window.location.href = response.data.payUrl;
        } else {
          Swal.fire("Lỗi", "Không nhận được link thanh toán từ server", "error");
        }
      } else {
        // --- LOGIC COD ---
        console.log("Processing COD order...");
        await createOrder(newOrder).unwrap();

        Swal.fire({
          icon: "success",
          title: "Đặt hàng thành công!",
          text: "Đơn hàng của bạn đã được ghi nhận.",
          showConfirmButton: false,
          timer: 2000
        });

        localStorage.removeItem("newOrder");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Lỗi", "Đã xảy ra lỗi khi tạo đơn hàng", "error");
    }
  };

  // --- XỬ LÝ KẾT QUẢ TỪ MOMO ---
  const [searchParams] = useSearchParams();
  var resultCode = searchParams.get("resultCode");
  const message = searchParams.get("message");

  useEffect(() => {
    if (resultCode) {
      if (resultCode === "0") {
        const storedOrder = localStorage.getItem("newOrder");
        if (storedOrder) {
          const newOrderData = JSON.parse(storedOrder);
          createOrder(newOrderData)
            .then(() => {
              localStorage.removeItem("newOrder");
              Swal.fire("Thành công", "Thanh toán thành công!", "success");
            })
            .catch(e => console.error(e));
        }
      } else {
        localStorage.removeItem("newOrder");
      }
    }
  }, [resultCode, createOrder]);

  if (resultCode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center">
        <div className={`text-lg font-semibold ${resultCode === "0" ? 'text-green-600' : 'text-red-600'}`}>
          {resultCode === "0" ? "Giao dịch thành công!" : "Giao dịch thất bại"}
        </div>
        <p className="text-gray-600">{message}</p>

        <div className="flex gap-4">
          <Link
            to="/san-pham?hot=true"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Tiếp tục mua hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {!loading ? (
        <section>
          <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
              <div>
                <div>
                  <h2 className="font-semibold text-xl text-gray-600 mb-2">
                    Thông tin thanh toán
                  </h2>
                  <p className="text-gray-500 mb-2">
                    Tổng tiền: {totalPrice.toLocaleString()} VNĐ
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
                      <p className="font-medium text-lg">Thông tin giao hàng</p>
                      <p>Vui lòng điền đầy đủ các trường.</p>

                      {/* --- PHƯƠNG THỨC THANH TOÁN (MỚI) --- */}
                      <div className="mt-8 pt-4 border-t border-gray-200">
                        <p className="font-medium text-lg mb-4">Phương thức thanh toán</p>

                        <div className="flex flex-col gap-3">
                          <label className={`flex items-center p-4 border rounded cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                            <input
                              type="radio"
                              name="paymentParams"
                              value="cod"
                              checked={paymentMethod === 'cod'}
                              onChange={() => setPaymentMethod('cod')}
                              className="w-4 h-4 text-blue-600"
                            />
                            <div className="ml-3">
                              <span className="block text-sm font-medium text-gray-900">
                                Thanh toán khi nhận hàng (COD)
                              </span>
                            </div>
                          </label>

                          <label className={`flex items-center p-4 border rounded cursor-pointer transition-all ${paymentMethod === 'momo' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                            <input
                              type="radio"
                              name="paymentParams"
                              value="momo"
                              checked={paymentMethod === 'momo'}
                              onChange={() => setPaymentMethod('momo')}
                              className="w-4 h-4 text-pink-600"
                            />
                            <div className="ml-3 flex items-center gap-2">
                              <span className="block text-sm font-medium text-gray-900">
                                Ví điện tử Momo
                              </span>
                              <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" className="w-6 h-6 object-contain" />
                            </div>
                          </label>
                        </div>
                      </div>

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
                            <button
                              disabled={isCreating}
                              className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                            >
                              {isCreating ? "Đang xử lý..." : "Đặt hàng"}
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
