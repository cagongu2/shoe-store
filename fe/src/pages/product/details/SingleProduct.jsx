import React, { useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper/modules";
import { getImgUrl } from "../../../util/getImageUrl";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../../redux/features/favorites/favoriteSlice";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { useAuth } from "../../../context/AuthContext";
import { useFetchUserByEmailQuery } from "../../../redux/features/users/userApi";
import { useAddCartMutation } from "../../../redux/features/carts/cartsApi";
import {setCartCount} from "../../../redux/features/status/statusSlice"

const SingleProduct = () => {
  const policies = [
    {
      title: "Chính sách thanh toán",
      content:
        "Chính sách thanh toán của chúng tôi mang đến sự thuận lợi và an toàn cho bạn. Với nhiều phương thức thanh toán đa dạng, thông tin của bạn được bảo vệ với các biện pháp an ninh hàng đầu. Hỗ trợ linh hoạt với các lựa chọn thanh toán một lần hoặc trả góp, cùng với chính sách hoàn trả chi tiết, chúng tôi cam kết đảm bảo mỗi giao dịch là trải nghiệm dễ dàng và an tâm cho bạn.",
    },
    {
      title: "Chính sách bảo mật",
      content:
        "Chính sách bảo mật của chúng tôi tập trung vào việc bảo vệ thông tin cá nhân của bạn. Chúng tôi chỉ thu thập và sử dụng thông tin cần thiết để cung cấp dịch vụ một cách hiệu quả, đồng thời cam kết duy trì mức độ an toàn cao trong quá trình giao tiếp dữ liệu. Đảm bảo tính minh bạch và tuân thủ quy định pháp luật liên quan, chính sách bảo mật của chúng tôi nhằm đảm bảo bạn có trải nghiệm trực tuyến an toàn và tin cậy.",
    },
    {
      title: "Chính sách giao hàng",
      content:
        "Chính sách Giao hàng của chúng tôi được xây dựng với mục tiêu tối ưu hóa trải nghiệm mua sắm của bạn. Chúng tôi cam kết đảm bảo sản phẩm đến tay bạn một cách nhanh chóng và an toàn nhất. Hệ thống giao hàng của chúng tôi được tối ưu hóa để đáp ứng nhu cầu của khách hàng một cách hiệu quả.",
    },
    {
      title: "Chính sách bảo hành và đổi trả",
      content:
        "Chính sách Bảo hành và Đổi/Trả của chúng tôi được xây dựng với mục tiêu bảo vệ quyền lợi và sự hài lòng của khách hàng. Chúng tôi cam kết cung cấp sản phẩm chất lượng cao. Đối với mỗi sản phẩm, chúng tôi áp dụng chính sách bảo hành cụ thể, đảm bảo rằng sản phẩm sẽ hoạt động đúng như mô tả trong thời gian xác định. Chính sách đổi/trả của chúng tôi cho phép bạn đổi hoặc trả lại sản phẩm trong một khoảng thời gian nhất định kể từ ngày mua hàng, với điều kiện sản phẩm không bị hỏng và đầy đủ hóa đơn mua hàng.",
    },
  ];

  const { id } = useParams();
  const { data: product = {} } = useFetchProductByIdQuery(id);
  console.log(product);
  const { currentUser } = useAuth();
  const { data: userData } = useFetchUserByEmailQuery(currentUser?.email);
  const [addToCart] = useAddCartMutation();
  const currentCartCount = useSelector((state) => state.status.cartCount);

  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorite.favoriteItems);

  const handleAddToFavorite = () => {
    const cartItem = {
      product_id: product?.id,
      name: product?.name,
      price: product?.price,
      brand: product?.brand,
      images: product?.images,
    };

    if (!currentUser) {
      if (isFavorite) {
        dispatch(removeFromFavorite(cartItem.product_id));
      } else {
        dispatch(addToFavorite(cartItem));
      }
    }

    setIsFavorite((prev) => !prev);
  };
  const isProductFavorite = favoriteItems.some(
    (item) => item.product_id === product?.id
  );
  const [isFavorite, setIsFavorite] = useState(isProductFavorite);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Vui lòng chọn size.");
      return;
    }
    if (!selectedColor) {
      alert("Vui lòng chọn màu sắc.");
      return;
    }

    const cartItem = {
      product_id: product?.id,
      name: product?.name,
      price: product?.price,
      brand: product?.brand,
      size: selectedSize,
      quantity,
      color: selectedColor,
      images: product?.images,
    };

    if (!currentUser) {
      dispatch(addToCart(cartItem));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sản phẩm đã được thêm thành công!!!",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(setCartCount(currentCartCount + 1));
    } else {
      if (userData) {
        try {
          await addToCart({
            userId: userData.id,
            product_id: product?.id,
            name: product?.name,
            price: product?.price,
            brand: product?.brand,
            size: selectedSize,
            color: selectedColor,
            quantity,
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sản phẩm đã được thêm thành công!!!",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(setCartCount(currentCartCount + 1));
        } catch (error) {
          console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Lỗi khi thêm sản phẩm vào giỏ hàng:",
            error,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product?.images[0].link);
    }
  }, [product]);

  const [quantity, setQuantity] = useState(1);
  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div>
        <div className="mt-12">
          <div className="px-12">
            {/* navigation breadcrumb */}
            <div className="mb-4"></div>
            {/* product detail */}
            <div className="mx-[-12px] grid grid-cols-12">
              <div className="col-span-12 lg:col-span-6 px-3">
                <div className="mb-4">
                  <div>
                    <div>
                      <div className="h-[250px] md:h-[500px] sm:h-[400px] overflow-hidden border-1 rounded-xl border-gray-200">
                        {/* big img */}
                        <img
                          className=" "
                          src={`${getImgUrl(selectedImage)}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-10 flex items-center">
                  <button className="px-3 mr-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center text-base">
                    <FaAngleLeft />
                  </button>

                  <Swiper
                    slidesPerView={5}
                    loop={true}
                    spaceBetween={10}
                    freeMode={true}
                    grabCursor={true}
                    breakpoints={{
                      640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                      },
                      1024: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                      },
                    }}
                    modules={[FreeMode]}
                    className="mySwiper"
                  >
                    {product?.images?.map((image, index) => (
                      <SwiperSlide key={index} className="min-w-30 min-h-30">
                        {/* small img */}
                        <img
                          className={`max-w-[180px] max-h-[180px] min-w-30 min-h-30 rounded border-1 border-gray-200 object-contain
                          ${
                            selectedImage === image.link
                              ? "opacity-100"
                              : "opacity-20"
                          }
                          `}
                          src={`${getImgUrl(image.link)}`}
                          alt=""
                          onClick={() => setSelectedImage(image.link)}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <button className="px-3 ml-3 py-1.5 w-10 h-10 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center text-base">
                    <FaAngleRight />
                  </button>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 px-3">
                {/* product name */}
                <div className="mt-4">
                  <p className="font-normal text-3xl mb-2">{product?.name}</p>
                  <p className="mb-2 font-semibold">
                    SKU: <span className="font-normal">{product?.id}</span>
                  </p>
                </div>
                {/* product price */}
                <div className="mt-6">
                  <p className="font-semibold text-3xl text-orange-500">
                    {product?.price} VNĐ
                  </p>
                </div>
                {/* color */}
                <div className="mt-6 flex items-center gap-3">
                  <p> Màu sắc</p>
                  <div className="flex flex-wrap gap-3">
                    {product?.stocks?.map((productStock) => (
                      <div
                        key={productStock?.color?.name.toLowerCase()}
                        className="relative"
                      >
                        <input
                          type="radio"
                          id={`color-${productStock?.color?.name.toLowerCase()}`}
                          name="color"
                          value={productStock?.color?.name.toLowerCase()}
                          className="hidden"
                        />
                        <label
                          htmlFor=""
                          tabIndex="0"
                          className={`${
                            productStock?.color?.name.toLowerCase() === "black"
                          } ? bg-black : bg-${productStock?.color?.name.toLowerCase()}-500 rounded-full w-7.5 h-7.5 border-1 block ${
                            selectedColor ===
                            productStock?.color?.name.toLowerCase()
                              ? "border-orange-500"
                              : "border-black"
                          }`}
                          onClick={() =>
                            setSelectedColor(
                              productStock?.color?.name.toLowerCase()
                            )
                          }
                        ></label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* size */}
                <div className="mt-4">
                  <label htmlFor="" className="">
                    Size:
                  </label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {product?.stocks?.map((productStock) => (
                      <div key={productStock?.size?.name} className="relative">
                        <input
                          type="radio"
                          id={`size-${productStock?.size?.name}`}
                          name="size"
                          value={productStock?.size?.name}
                          className="hidden"
                        />
                        <label
                          htmlFor={`size-${productStock?.size?.name}`}
                          className={`cursor-pointer px-6 py-1.5 border rounded-md text-center block transition-all 
            ${
              selectedSize === productStock?.size?.name
                ? "border-orange-500 text-orange-500 font-bold"
                : "border-gray-400 text-gray-700 hover:border-black"
            }`}
                          onClick={() =>
                            setSelectedSize(productStock?.size?.name)
                          }
                        >
                          {productStock?.size?.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* quantity */}
                <div className="mt-4">
                  <label className="mb-2 w-full block">Số lượng:</label>
                  <div className="inline-flex items-center border-gray-300 border-1 rounded-lg bg-white">
                    <button
                      onClick={decrease}
                      className="px-4 py-2 bg-gray-400 cursor-pointer text-gray-700 text-lg font-bold rounded-l-lg"
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-20 h-full text-center border-none bg-white text-base"
                    />
                    <button
                      onClick={increase}
                      className="px-4 py-2 bg-gray-400 cursor-pointer text-gray-700 text-lg font-bold rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* btn-card */}
                <div className="mt-4">
                  <div className="">
                    <div className="grid grid-cols-12">
                      <div className="col-span-12 md:col-span-7 xl:col-span-8 lg:col-span-10 flex justify-between items-center gap-3">
                        {/* Nút Tiếp tục mua hàng */}
                        <Link
                          to="/san-pham?hot=true"
                          className="w-[50%] flex justify-center items-center gap-2 bg-blue-500 text-white py-3  rounded-lg shadow-md hover:bg-blue-600 transition-all"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-shopping-bag"
                          >
                            <path d="M6 2l2 7h8l2-7"></path>
                            <path d="M5 9h14l1 9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3l1-9z"></path>
                          </svg>
                          Tiếp tục mua hàng
                        </Link>

                        {/* Nút Thêm mục yêu thích */}
                        <button
                          onClick={handleAddToFavorite}
                          className="flex items-center justify-center gap-2 w-[50%] bg-white text-black py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill={isFavorite ? "red" : "none"}
                            stroke={isFavorite ? "red" : "black"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-heart cursor-pointer"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          {isFavorite
                            ? "Đã thêm yêu thích"
                            : "Thêm mục yêu thích"}
                        </button>
                      </div>
                      {/* Nút Mua hàng */}
                      <div className="col-span-12 md:col-span-7 xl:col-span-8 lg:col-span-10 mt-4">
                        <button
                          onClick={handleAddToCart}
                          className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded-lg text-base font-semibold shadow-md hover:bg-orange-600 transition-all"
                        >
                          Mua hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* policy */}
                <div className="w-full mt-5 rounded-md">
                  {policies.map((policy, index) => (
                    <div key={index} className="border-b border-gray-300">
                      <button
                        className={`w-full text-left px-4 py-3 flex justify-between items-center transition-all ${
                          openIndex === index ? "bg-blue-100" : ""
                        }`}
                        onClick={() => toggleAccordion(index)}
                      >
                        <span className="text-base">{policy.title}</span>
                        <span>
                          {openIndex === index ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-750 ${
                          openIndex === index
                            ? "max-h-40 opacity-100 translate-y-0"
                            : "max-h-0 opacity-0 -translate-y-2"
                        }`}
                      >
                        <div className="px-4 py-2 bg-gray-50 text-sm text-gray-700">
                          {policy.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* decription and comment */}
            <div className="my-12">
              <div className="px-12">
                <div className="grid grid-cols-12 mx-[-12px]">
                  <div className="col-span-12 lg:col-span-8 mb-4">
                    <div className="py-4">
                      <div className="px-3">
                        <div className="mx-[-12px]">
                          <div className="grid grid-cols-12">
                            <div className="col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-3 xl:col-start-3 md:pr-5 mb-4">
                              <Link
                                to=""
                                className="flex h-10 text-base justify-center rounded-xl items-center text-white bg-blue-400"
                              >
                                Mô tả
                              </Link>
                            </div>
                            <div className="col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-3 xl:col-start-6 mb-4">
                              <Link
                                to=""
                                className="flex h-10 text-base justify-center rounded-xl items-center text-blue-400 border-1 border-blue-400"
                              >
                                Bình luận (14)
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-[16px] border-gray-400 border-b"></div>
                    {/* description */}
                    <div className="px-6 flex flex-col text-gray-400">
                      <p className="text-gray-600 font-semibold">
                        GIÀY THỜI TRANG NAM PUMA-180 PERF
                      </p>
                      <p>
                        Bước vào thế giới phong cách đích thực với Giày Thời
                        Trang Nam Puma-180 Perf. Sự kết hợp hoàn hảo giữa thiết
                        kế tinh tế và sự thoải mái đáng kinh ngạc, đây chắc chắn
                        sẽ là đôi giày yêu thích mà bạn có thể mang bất kỳ dịp
                        nào.
                      </p>
                    </div>
                  </div>
                  {/* san pham khac*/}
                  <div className="col-span-12 lg:col-span-4 mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
