import { useState } from "react";
import { FaLongArrowAltRight } from 'react-icons/fa';

const Product = () => {
    const [showThuongHieu, setThuongHieu] = useState(true);
    const [showDacDiem, setDacDiem] = useState(true);
    const [showPhuKien, setPhuKien] = useState(true);
    const [sortOption, setSortOption] = useState("");
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
                
            <div className="px-12 w-full">
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
        {sortedProducts.map((product) => (
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

                    </div>



                </div>
            </div>

            </div>
          
        </div>
      
           
        
        
    );
}

export default Product;
