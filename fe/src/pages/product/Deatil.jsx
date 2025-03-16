import React, { useState } from "react";
import Slider from "react-slick";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Deatil = () => {
    
    // Giả lập danh sách ảnh sản phẩm
    const images = [
        "https://shoes.themedemo.site/backend/uploads/product/gallery/1701279314-DD9284-401-1.jpg",
        "https://shoes.themedemo.site/backend/uploads/product/gallery/1701279314-DD9284-401-3.jpg",
        "https://shoes.themedemo.site/backend/uploads/product/gallery/1701279314-DD9284-401-4.jpg",
        "https://shoes.themedemo.site/backend/uploads/product/gallery/1701279314-DD9284-401-5.jpg",
        "https://shoes.themedemo.site/backend/uploads/product/1701279232-DD9284-401-2.jpg",
    ];
    const [mainImage, setMainImage] = useState(images[0]);
    const [openPolicy, setOpenPolicy] = useState(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
      };


    return (
    <div className=' w-full'>  
    <div className='container mx-auto px-5 py-10'>  
      {/* Đường dẫn */}
      <div className="mb-3">
        <ul className="flex space-x-2 text-gray-600">
          <li><a href="/" className="hover:text-blue-500">Trang chủ</a></li>
          <li>/</li>
          <li><a href="/san-pham" className="hover:text-blue-500">Danh mục</a></li>
          <li>/</li>
          <li className="text-gray-800 font-semibold">Nike Flex Experience Rn 11</li>
        </ul>
      </div>

      {/* Chi tiết sản phẩm */}
      <div className='flex flex-col lg:flex-row gap-10'>  
        
        {/* Hình ảnh */}
        <div className='lg:w-1/2 flex flex-col items-center'>
          <div className="w-full flex justify-center">
            <img className="max-w-[500px] h-auto border rounded-lg" src={mainImage} alt="Sản phẩm" />
          </div>
          {/* Thư viện ảnh */}
          <div className="mt-5 w-full">
            <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index} onClick={() => setMainImage(img)}>
                  <img className="cursor-pointer border rounded-md p-1 w-full" src={img} alt="Sản phẩm" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='lg:w-1/2'>
        <h1 className="text-3xl font-bold">Nike Flex Experience Rn 11</h1>
  <p className="text-gray-600 mt-1 font-semibold">SKU: DD9284-401</p>
  <p className="text-red-500 text-2xl font-semibold mt-2">2.109.000 VNĐ</p>

  {/* Màu sắc */}
  <div className="mt-4">
    <p className="font-semibold mb-2">Màu sắc:</p>
    <div className="flex items-center gap-3">
      <button className="w-6 h-6 bg-black rounded-full border-2 border-gray-400 focus:border-gray-800"></button>
      <button className="w-6 h-6 bg-white rounded-full border-2 border-gray-400 focus:border-gray-800"></button>
    </div>
  </div>

  {/* Size */}
  <div className="mt-4">
    <p className="font-semibold mb-2">Size:</p>
    <div className="grid grid-cols-5 gap-2">
      {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49].map((size) => (
        <button key={size} className="border px-4 py-2 rounded-md hover:bg-gray-200 focus:bg-gray-800 focus:text-white">
          {size}
        </button>
      ))}
    </div>
  </div>

  {/* Số lượng */}
  <div className="mt-4 flex items-center gap-3">
    <p className="font-semibold">Số lượng:</p>
    <div className="flex items-center border rounded-md">
      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300">-</button>
      <input type="text" value="1" className="w-12 text-center border-l border-r outline-none" readOnly />
      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300">+</button>
    </div>
  </div>

  {/* Nút mua hàng */}
  <div className="mt-6 flex gap-3">
    <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 flex-1">
      Tiếp tục mua hàng
    </button>
    <button className="border px-6 py-3 rounded-md flex items-center gap-2 hover:bg-gray-200">
      🤍 Thêm mục yêu thích
    </button>
  </div>

  <div className="mt-4">
    <button className="bg-orange-500 text-white px-6 py-3 w-full rounded-md hover:bg-orange-600">
      Mua hàng
    </button>
  </div>

  {/* Chính sách */}
  <div className="mt-6">
              {["Chính sách thanh toán", "Chính sách bảo mật", "Chính sách giao hàng", "Chính sách bảo hành và đổi trả"].map((policy, index) => (
                <div key={index} className="border-t py-2">
                  <button 
                    className="w-full text-left font-semibold flex justify-between items-center"
                    onClick={() => setOpenPolicy(openPolicy === index ? null : index)}
                  >
                    {policy} <span>{openPolicy === index ? "▲" : "▼"}</span>
                  </button>
                  {openPolicy === index && (
                    <p className="text-gray-600 mt-2">Chi tiết về {policy.toLowerCase()}...</p>
                  )}
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  </div>
    );
}

export default Deatil;
