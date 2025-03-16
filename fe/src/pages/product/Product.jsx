import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaLongArrowAltRight } from 'react-icons/fa';
import { motion } from "framer-motion";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Product = () => {
    const [showThuongHieu, setThuongHieu] = useState(true);
    const [showDacDiem, setDacDiem] = useState(true);
    const [showPhuKien, setPhuKien] = useState(true);
    const [sortOption, setSortOption] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Số sản phẩm mỗi trang

    
    const products = [
    {
      id: 1,
      name: "NIKE FLEX EXPERIENCE RN 11",
      price: 2109000,
      image: "https://i.ebayimg.com/images/g/tPgAAOSwQTZj2f6e/s-l1200.jpg",
    },
    {
      id: 2,
      name: "NIKE AIR ZOOM PEGASUS 39",
      price: 3519000,
      image: "https://sneakerdaily.vn/wp-content/uploads/2022/09/Thiet-ke-chua-co-ten-2022-09-19T212339.887.png",
    },
    {
      id: 3,
      name: "NIKE REACT ESCAPE RUN 2",
      price: 1859000,
      image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/8ab8e50f-ce86-43d1-8c9c-0e52d599b662/WMNS+NIKE+REACT+ESCAPE+RN+2.png",
    },
    {
      id: 4,
      name: "PUMA BLACK- GOLD-SHADOW GRAY",
      price: 3399000,
      image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_500,h_500/global/396863/02/sv02/fnd/PHL/fmt/png/Teveris-NITRO-Metallic-Sneakers",
    },
    {
      id: 5,
      name: "PUMA PERF 180",
      price: 3399000,
      image: "https://supersports.com.vn/cdn/shop/files/39479801-1_medium.jpg?v=1726720126",
    },
    {
      id: 6,
      name: "ADIDAS ULTRABOOST 21",
      price: 5399000,
      image: "https://m.media-amazon.com/images/I/31UdeNRrdnL._AC_.jpg",
    },
    {
      id: 7,
      name: "VỚ UNISEX SNEAKER CUSHIONED",
      price: 149900,
      oldPrice: 150000,
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR2MdEItPw92dd_lEz0VYILDOv3jXRbhWvwFM1Cb0kVFRqkYi0E",
    },
    {
      id: 8,
      name: "ADIDAS ALPHABOUNCE +",
      price: 2399000,
      oldPrice: 2500000,
      image: "https://supersports.com.vn/cdn/shop/files/IE9754-3_1024x1024.jpg?v=1696501431",
    },
    {
      id: 9,
      name: "ADIDAS ORIGINALS-RIVALRY LOW",
      price: 2499000,
      oldPrice: 2500000,
      image: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/c1337559438a4ab89863b7a1c1a9dbb4_9366/ID7560_06_standard.jpg",
    },
  ];
  const accessories = [
    {
      id: 1,
      name: "Vớ Sneaker",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR2MdEItPw92dd_lEz0VYILDOv3jXRbhWvwFM1Cb0kVFRqkYi0E",
    },
    {
      id: 2,
      name: "Dây giày thể thao",
      image: "https://down-vn.img.susercontent.com/file/f4fcb99a9cd319ca89e4b0c63fbb77c5",
    },
    {
      id: 3,
      name: "Dung dịch vệ sinh giày",
      image: "https://salt.tikicdn.com/ts/product/31/ee/74/cf202201f5699d37de609ed9587f8f57.jpg",
    },
    {
      id: 4,
      name: "Hộp đựng giày sneaker",
      image: "https://product.hstatic.net/200000528441/product/hop-dung-giay-sneaker_eeefc93ae4dc47bbba16c92d1e0a28ba.jpg",
    },
    {
      id: 5,
      name: "Bàn chải vệ sinh giày",
      image: "https://vn-test-11.slatic.net/p/c1bba840a62f7ef514009658a38d5ae0.jpg",
    },
  ];

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "Giá giảm dần":
        return b.price - a.price;
      case "Giá tăng dần":
        return a.price - b.price;
      case "A-Z":
        return a.name.localeCompare(b.name);
      case "Z-A":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  const totalPages = Math.ceil(products.length / itemsPerPage);

      const paginatedProducts = sortedProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
      );
      const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-white"> 
            {/* banner */}
            <div className="px-12 bg-gray-500">
            <div className="py-25 pr-20 flex items-center justify-end">
            <div className="pr-10 text-white">
            <p className="text-3xl mb-2">Sản phẩm</p>
            <nav className="flex items-center text-base">
            <a href="/">Trang chủ</a>
            <FaLongArrowAltRight className="mx-[10px]" />
            <a href="/san-pham">Sản phẩm</a>
            </nav>
            </div>
            </div>
            </div>
            {/* content */}
            <div className="">
                
            <div className="w-full px-20 my-20">
                <div className="flex">
                    <div className="md:w-5/12 lg:w-1/3 xl:w-1/4 p-3">
                        <div className="w-full bg-white rounded-lg shadow-md p-3">
        {/* Cột chính chứa các button */}
        <div className="flex flex-col space-y-2">  
          {/* Cột Thương Hiệu */}
          <div>
            <button
              className="bg-[#7ABFFF] h-full flex items-center justify-between text-white font-bold text-lg px-6 py-4 w-full rounded-md"
              onClick={() => setThuongHieu(!showThuongHieu)}
            >
              THƯƠNG HIỆU
              <span className="text-white text-xl">{showThuongHieu ? "▲" : "▼"}</span>
            </button>
            {showThuongHieu && (
              <div className="bg-white shadow-lg w-full p-3 rounded-md">
                <ul className="text-gray-700 font-sans text-[16px]">
                  <li className="py-3 border-b">Nike</li>
                  <li className="py-3 border-b">Adidas</li>
                  <li className="py-3 border-b">New Balance</li>
                  <li className="py-3">Puma</li>
                </ul>
              </div>
            )}
          </div>
          {/* Cột Đặc Điểm */}
          <div>
            <button
              className="bg-[#7ABFFF] flex justify-between items-center text-white font-bold text-lg px-6 py-4 w-full rounded-md"
              onClick={() => setDacDiem(!showDacDiem)}
            >
              ĐẶC ĐIỂM
              <span className="text-white text-xl">{showDacDiem ? "▲" : "▼"}</span>
            </button>
            {showDacDiem && (
              <div className="bg-white shadow-lg w-full p-3 rounded-md">
                <ul className="text-gray-700 font-sans text-[16px]">
                  <li className="py-3 border-b">Sản Phẩm Hot</li>
                  <li className="py-3 border-b">Sản Phẩm Sale</li>
                </ul>
              </div>
            )}
          </div>
          {/* Cột Phụ Kiện */}
          <div>
            <button
              className="bg-[#7ABFFF] flex justify-between items-center text-white font-bold text-lg px-6 py-4 w-full rounded-md"
              onClick={() => setPhuKien(!showPhuKien)}
            >
              PHỤ KIỆN
              <span className="text-white text-xl">{showPhuKien ? "▲" : "▼"}</span>
            </button>
            {showPhuKien && (
              <div className="bg-white shadow-lg w-full p-3 rounded-md">
                <ul className="text-gray-700 font-sans text-[16px]">
                  <li className="py-3 border-b">Vớ</li>
                  <li className="py-3 border-b">Dây giày</li>
                  <li className="py-3 border-b">Dung dịch vệ sinh giày</li>
                </ul>
              </div>
            )}
          </div>
        </div>
                        </div>
                    </div>


                    <div className="flex-1 p-3">
                    <div className="bg-[#7ABFFF] shadow-md rounded-lg p-1">
                        <div className="max-w-7xl mx-auto bg-transparent flex justify-end p-3">
                        <select
            id="sort"
            className="form-select getsort h-[38px] px-3 py-2 border border-gray-300 rounded bg-white text-[#212529] text-base font-medium cursor-pointer"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Sắp xếp theo</option>
            <option>Giá giảm dần</option>
            <option>Giá tăng dần</option>
            <option>Mới nhất</option>
            <option>Cũ nhất</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
                                
                    </div>
                    </div>
                        {/* danh sách*/}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                            {paginatedProducts.map((product) => (
                              <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                  <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                                  <p className="text-gray-700">{product.price.toLocaleString()} VNĐ</p>
                                  <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg">
                                  Mua ngay
                                  </button>
                              </div>
                              ))}

                        </div>
                              {/* Thanh phân trang */}
<div className="flex justify-center items-center mt-6 space-x-2">
  <button
    className={`px-3 py-2 bg-gray-300 rounded-md ${
      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
    }`}
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    ◀
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      className={`px-4 py-2 rounded-md ${
        currentPage === index + 1
          ? "bg-blue-500 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
      onClick={() => handlePageChange(index + 1)}
    >
      {index + 1}
    </button>
  ))}

  <button
    className={`px-3 py-2 bg-gray-300 rounded-md ${
      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
    }`}
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    ▶
  </button>
</div>

                    </div>



                </div>
            </div>
            <motion.div
      className="col-lg-6 text-center"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="section-title">
        <h1 className="text-3xl font-bold text-gray-800">Phụ kiện</h1>
        <p className="text-lg text-gray-600 mt-2">
          Phụ kiện hoàn hảo cho đôi giày của bạn - cùng shop khám phá ngay
        </p>
      </div>
            </motion.div>        
            </div>
            {/* Slide chạy ngang tự động */}
            <div className="w-full max-w-7xl mx-auto">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="border rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />
              <div className="p-4 text-center">
              <h3 className="font-bold text-center text-sm h-12 overflow-hidden text-ellipsis line-clamp-2">
              {product.name}
                </h3>
                <p className="text-gray-700">{product.price}</p>
                <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg">
                  Mua ngay
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
        </div>
    );
}

export default Product;
