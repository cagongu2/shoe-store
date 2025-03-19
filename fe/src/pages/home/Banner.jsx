import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { getImgUrl } from "../../util/getImageUrl";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      navigation={true}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={`${getImgUrl("uploads/slide/1699767079.jpg")}`} 
        alt="" />
        <div className="content_slide">
          <div>
            <div>
              <h2
                className={`text-3xl font-bold transition-all duration-1200 ${
                  activeIndex === 0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                Đồ hiệu sale to - Không lo về giá
              </h2>
              <p
                className={`mt-4 transition-all duration-1200 ${
                  activeIndex === 0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Mua ngay các sản phẩm chính hãng từ các thương hiệu nổi tiếng
                giá tốt nhất thị trường chỉ có thể là Sneaker Square.
              </p>
              <a
                href="/san-pham"
                className={`inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg transition-all duration-1200 ${
                  activeIndex === 0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={`${getImgUrl("uploads/slide/1699767458.jpg")}`} alt="" />
        <div className="content_slide">
          <div>
            <div>
              <h2
                className={`text-3xl font-bold transition-all duration-1200 ${
                  activeIndex === 1 
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                Hãy rèn luyện để trở thành phiên bản xuất sắc nhất của bạn
              </h2>
              <p
                className={`mt-4 transition-all duration-1200 ${
                  activeIndex === 1 
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Nike React Pegasus Trail 4 mang đến trải nghiệm tuyệt vời trong
                quá trình tập luyện, với sự hỗ trợ từ các công nghệ giày cao
                cấp, giúp cải thiện và nâng cao hiệu suất.
              </p>
              <a
                href="/san-pham"
                className={`inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg transition-all duration-1200 ${
                  activeIndex === 1 
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={`${getImgUrl("uploads/slide/1700839642.png")}`} alt="" />
        <div className="content_slide">
          <div>
            <div>
              <h2
                className={`text-3xl font-bold transition-all duration-1200 ${
                  activeIndex === 2
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                ADIDAS ULTRABOOST LIGHT - Sự Kết Hợp Giữa Hiệu Suất Và Phong
                Cách
              </h2>
              <p
                className={`mt-4 transition-all duration-1200 ${
                  activeIndex === 2
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Được làm bằng chất liệu BOOST nhẹ hơn 30%, đây là dòng
                Ultraboost nhẹ nhất từ trước đến nay đến từ thương hiệu Adidas.
              </p>
              <a
                href="/san-pham"
                className={`inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg transition-all duration-1200 ${
                  activeIndex === 2
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={`${getImgUrl("uploads/slide/1700839986.png")}`} alt="" />
        <div className="content_slide">
          <div>
            <div>
              <h2
                className={`text-3xl font-bold transition-all duration-1200 ${
                  activeIndex === 3
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                Ưu đãi độc quyền các sản phẩm từ Nike
              </h2>
              <p
                className={`mt-4 transition-all duration-1200 ${
                  activeIndex === 3
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Ưu đãi online độc quyền: giảm đến 50% cho một số sản phẩm phát
                hành giới hạn của Nike. Chương trình diễn ra trong tháng
                12-2023.
              </p>
              <a
                href="/san-pham"
                className={`inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg transition-all duration-1200 ${
                  activeIndex === 3
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={`${getImgUrl("uploads/slide/puma-rsx-suede-vitruta.jpg")}`} alt="" />
        <div className="content_slide">
          <div>
            <div>
              <h2
                className={`text-3xl font-bold transition-all duration-1200 ${
                  activeIndex === 4
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                Puma RSX Suede Virtual - Chạm Vào Tương Lai Của Thời Trang
              </h2>
              <p
                className={`mt-4 transition-all duration-1200 ${
                  activeIndex === 4
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Biểu tượng của sự đẳng cấp và phong cách thời trang, với thiết
                kế bền bỉ và lớp vỏ da sang trọng, đôi giày này là sự kết hợp
                hoàn hảo giữa tiện ích và thẩm mỹ.
              </p>
              <a
                href="/san-pham"
                className={`inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg transition-all duration-1200 ${
                  activeIndex === 4
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
