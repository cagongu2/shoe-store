import React from "react";

const News = () => {
  const blogs = [
    {
      title:
        "Adidas Yeezy Boost 350 v2 Granite HQ2059 - Bản phối màu mới sắp ra mắt",
      image: "../../src/assets/tmp/uploads/blog/1699845298.jpg",
      link: "https://shoes.themedemo.site/blog/adidas-yeezy-boost-350-v2-granite-hq2059-ban-phoi-mau-moi-sap-ra-mat.html",
      description:
        "Xu hướng mới: Bản phối màu Adidas Yeezy Boost 350 v2 Granite HQ2059 sẽ sớm ra mắt, hứa hẹn một diện mạo mới và độc đáo trong thế giới giày sneaker.",
    },
    {
      title: "Cách bảo quản giày",
      image: "../../src/assets/tmp/uploads/blog/cach-bao-quan-giay.jpg",
      link: "https://shoes.themedemo.site/blog/cach-bao-quan-giay.html",
      description:
        "Sneaker đã trở thành một trong những xu hướng thời trang được ưa chuộng trong những năm gần đây và vẫn đang tiếp tục phát triển mạnh mẽ. Nếu bạn chưa biết cách bảo quản giày sneaker thì hãy tham khảo ngay!",
    },
    {
      title: "Air Jordan 3 - Lịch sử của thiết kế đã cứu rỗi Nike",
      image:
        "../../src/assets/tmp/uploads/blog/air-jordan-3-lich-su-cua-thiet-ke-da-cuu-roi-nike.png",
      link: "https://shoes.themedemo.site/blog/air-jordan-3-lich-su-cua-thiet-ke-da-cuu-roi-nike.html",
      description:
        "Air Jordan 3 không chỉ là một đôi giày, mà còn là biểu tượng trong thế giới sneaker. Hãy cùng khám phá lịch sử thiết kế đã cứu rỗi Nike!",
    },
    {
      title: "Top 10 Đôi Giày Độc Lạ Nhất Trên Thế Giới",
      image: "../../src/assets/tmp/uploads/blog/1699894245.jpg",
      link: "https://shoes.themedemo.site/blog/top-10-doi-giay-doc-la-nhat-tren-the-gioi.html",
      description:
        "Trong thế giới giày thể thao và thời trang, có những đôi giày độc lạ với thiết kế ấn tượng. Hãy cùng khám phá ngay danh sách top 10 đôi giày độc lạ nhất thế giới!",
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className=" px-12">
        <div className=" mx-[-12px]">
          {/* Tiêu đề */}
          <div className="text-center px-3 mb-[50px]">
            <h1 className="text-4xl font-medium text-gray-800 mb-[8px]">
              Sneaker Square Blog
            </h1>
            <p className="text-sm  font-[Open_Sans] text-gray-600">
              Những thông tin chia sẻ hữu ích đến cho các bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 mx-[-12px] px-3 ">
            {/* Ảnh lớn */}
            <div className="rounded-xl overflow-hidden px-3 mb-12 h-full object-cover sm:pb-6">
              <a href="https://shoes.themedemo.site/blog/nhung-cach-tao-kieu-cho-cac-doi-sneaker-yeu-thich.html">
                <img
                  src="../../src/assets/tmp/uploads/blog/1699436131.jpg"
                  alt="Những cách tạo kiểu cho các đôi sneaker yêu thích"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => (e.target.src = "/uploads/img_error2.jpg")}
                />
              </a>
            </div>

            {/* Danh sách bài viết */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6  px-3">
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-t-lg overflow-hidden"
                >
                  <a href={blog.link}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-fit rounded-xl"
                      onError={(e) =>
                        (e.target.src = "/uploads/img_error2.jpg")
                      }
                    />
                  </a>
                  <div className="p-4">
                    <a href={blog.link}>
                      <h5 className=" mt-4 mb-2 text-base text-blue-400 font-semibold line-clamp-1">
                        {blog.title}
                      </h5>
                    </a>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {blog.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
