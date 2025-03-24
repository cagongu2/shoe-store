import React from "react";
import { FaFacebook, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const About = () => {
  return (
    <>
      <div className="mb-6 mt-12 ">
        <div className="px-12">
          {/* title */}
          <div className="mx-[-12px] flex items-center justify-center">
            <div className="px-3">
              <div>
                <div className="mb-[50px] text-center">
                  <p className="mb-[12px] text-4xl font-sans font-medium">
                    Về Sneaker Square
                  </p>
                  <p className="text-sm text-gray-500">
                    Nơi Trải Nghiệm Thế Giới Giày Thể Thao Chính Hãng
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* content */}
          <div className="my-6 mx-[-12px] text-gray-500 bg-white rounded">
            <div className="px-3">
              <div className="p-4">
                <p className="mb-4"></p>
                <p>
                  <span className="pb-4 text-base">
                    <span className="font-sans">
                      Chào mừng bạn đến với <strong>Sneaker Square</strong> -
                      một địa chỉ uy tín và tin cậy cho những người yêu thích
                      giày thể thao. Chúng tôi tự hào là cửa hàng chuyên cung
                      cấp giày thể thao chính hãng từ các thương hiệu nổi tiếng
                      trên toàn thế giới. Tại <strong>Sneaker Square</strong>,
                      chúng tôi cam kết đem đến cho bạn những sản phẩm chất
                      lượng, đa dạng về mẫu mã, và luôn tuân thủ nguyên tắc cung
                      cấp hàng hóa chính hãng.
                    </span>
                  </span>
                </p>

                <p>
                  <span className="pb-4 text-base">
                    <span className="font-sans">
                      Những điểm nổi bật tại Sneaker Square:
                    </span>
                  </span>
                </p>

                <ol className="pl-8 pb-4">
                  <li>
                    <p className="mb-4">
                      <span className="text-base font-sans">
                        <span>
                          <strong>Sản Phẩm Chính Hãng:</strong> Chúng tôi luôn
                          đặt uy tín và chất lượng lên hàng đầu. Mọi sản phẩm
                          tại Sneaker Square đều là hàng chính hãng, đảm bảo
                          nguồn gốc xuất xứ và chất lượng tốt nhất.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="mb-4">
                      <span className="text-base font-sans">
                        <span>
                          <strong>Đa Dạng Mẫu Mã:</strong> Sneaker Square tự hào
                          sở hữu một bộ sưu tập đa dạng về mẫu mã, từ giày thể
                          thao cổ điển đến những sản phẩm mới nhất trên thị
                          trường. Chúng tôi luôn cập nhật các xu hướng thời
                          trang giày để bạn có nhiều lựa chọn.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="mb-4">
                      <span className="text-base font-sans">
                        <span>
                          <strong>Dịch Vụ Tận Tâm:</strong> Đội ngũ nhân viên
                          của chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn
                          trong quá trình mua sắm. Chúng tôi hiểu rằng việc chọn
                          lựa đôi giày hoàn hảo có thể là một quá trình khá
                          thách thức, và chúng tôi sẽ giúp bạn tìm ra đúng sản
                          phẩm phù hợp với bạn.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="mb-4">
                      <span className="text-base font-sans">
                        <span>
                          <strong>Ưu Đãi Hấp Dẫn:</strong> Sneaker Square thường
                          xuyên tổ chức các chương trình khuyến mãi và giảm giá
                          đặc biệt để giúp bạn tiết kiệm hơn khi mua sắm giày
                          thể thao yêu thích.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="mb-4">
                      <span className="text-base font-sans">
                        <span>
                          <strong>Cộng Đồng Sneaker:</strong> Chúng tôi tự hào
                          có một cộng đồng đam mê giày thể thao đang phát triển
                          mạnh mẽ. Tại Sneaker Square, bạn sẽ có cơ hội kết nối
                          với những người có cùng niềm đam mê và đổi dẫn thảo về
                          giày thể thao.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>

                <p className="mb-4">
                  <span className="text-base font-sans">
                    <span>
                      Hãy đến và trải nghiệm thế giới giày thể thao chính hãng
                      tại Sneaker Square. Chúng tôi tin rằng bạn sẽ tìm thấy
                      những đôi giày ưng ý và có trải nghiệm mua sắm thú vị tại
                      cửa hàng của chúng tôi.
                    </span>
                  </span>
                </p>
                <p></p>
              </div>
            </div>
          </div>
          {/* member title */}
          <div className="mx-[-12px]">
            <div className="mt-4 px-3">
              <div className="flex items-center justify-center">
                <div className="mb-12.5">
                  <p className="mb-2 text-4xl font-medium">Thành viên</p>
                </div>
              </div>
            </div>
          </div>
          {/* member */}
          <div className="mx-[-12px]">
            <div className="px-3">
              {/* slide */}
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                loop={true}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="">
                    <div className="relative ">
                      <img
                        src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                        alt="Nguyễn Tấn Duy"
                        className=""
                      />
                      <div className="flex flex-row items-center justify-center text-orange-500 absolute bottom-[-22px] left-1/2 transform -translate-x-1/2">
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[4px]"
                          to="https://www.facebook.com/"
                          target="_blank"
                        >
                          <FaFacebook />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaTwitter />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaInstagramSquare />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 mt-6">
                      <p className="text-center text-lg mb-2 font-medium">
                        Phạm Minh Phát 
                      </p>
                      <p className="text-center mb-4 text-base text-gray-600">
                        CEO
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="">
                    <div className="relative ">
                      <img
                        src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                        alt="Nguyễn Tấn Duy"
                        className=""
                      />
                      <div className="flex flex-row items-center justify-center text-orange-500 absolute bottom-[-22px] left-1/2 transform -translate-x-1/2">
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[4px]"
                          to="https://www.facebook.com/"
                          target="_blank"
                        >
                          <FaFacebook />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaTwitter />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaInstagramSquare />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 mt-6">
                      <p className="text-center text-lg mb-2 font-medium">
                        Nguyễn Xuân Bắc
                      </p>
                      <p className="text-center mb-4 text-base text-gray-600">
                        CEO
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="">
                    <div className="relative ">
                      <img
                        src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                        alt="Nguyễn Tấn Duy"
                        className=""
                      />
                      <div className="flex flex-row items-center justify-center text-orange-500 absolute bottom-[-22px] left-1/2 transform -translate-x-1/2">
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[4px]"
                          to="https://www.facebook.com/"
                          target="_blank"
                        >
                          <FaFacebook />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaTwitter />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaInstagramSquare />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 mt-6">
                      <p className="text-center text-lg mb-2 font-medium">
                        Nguyễn Lê Gia Huy
                      </p>
                      <p className="text-center mb-4 text-base text-gray-600">
                        CEO
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="">
                    <div className="relative ">
                      <img
                        src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                        alt="Nguyễn Tấn Duy"
                        className=""
                      />
                      <div className="flex flex-row items-center justify-center text-orange-500 absolute bottom-[-22px] left-1/2 transform -translate-x-1/2">
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[4px]"
                          to="https://www.facebook.com/"
                          target="_blank"
                        >
                          <FaFacebook />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaTwitter />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaInstagramSquare />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 mt-6">
                      <p className="text-center text-lg mb-2 font-medium">
                        Hồ Phúc Thái
                      </p>
                      <p className="text-center mb-4 text-base text-gray-600">
                        CEO
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="">
                    <div className="relative ">
                      <img
                        src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                        alt="Nguyễn Tấn Duy"
                        className=""
                      />
                      <div className="flex flex-row items-center justify-center text-orange-500 absolute bottom-[-22px] left-1/2 transform -translate-x-1/2">
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[4px]"
                          to="https://www.facebook.com/"
                          target="_blank"
                        >
                          <FaFacebook />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaTwitter />
                        </Link>
                        <Link
                          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center py-2 px-3 mx-[5px]"
                          to=""
                          target="_blank"
                        >
                          <FaInstagramSquare />
                        </Link>
                      </div>
                    </div>
                    <div className="px-4 mt-6">
                      <p className="text-center text-lg mb-2 font-medium">
                        Nguyễn Trần Minh Tính
                      </p>
                      <p className="text-center mb-4 text-base text-gray-600">
                        CEO
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
