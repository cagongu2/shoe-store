import React, { useState, useMemo, useEffect } from "react";
import { FaLongArrowAltRight, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import { getImgUrl } from "../../util/getImageUrl";
import { Link, useSearchParams } from "react-router-dom";
import { blogs as blogData } from "../../data/blogs"; // Import mock data

const Blog = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit } = useForm();

  // Xử lý tìm kiếm
  const onSubmit = (data) => {
    setSearchTerm(data.search);
  };

  // Lọc bài viết theo Type (từ URL) và SearchTerm
  const filteredBlogs = useMemo(() => {
    return blogData.filter((blog) => {
      // Filter by Type
      if (typeParam && blog.type !== typeParam) {
        return false;
      }
      // Filter by Search
      if (searchTerm && !blog.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [typeParam, searchTerm]);

  // Bài viết phổ biến (Demo: sort by viewed)
  const popularBlogs = [...blogData].sort((a, b) => b.viewed - a.viewed).slice(0, 5);

  return (
    <>
      <div className="bg-white">
        {/* banner */}
        <div className="px-12 bg-gray-500">
          <div className="py-25 pr-20 flex items-center justify-end">
            <div className="pr-10 text-white">
              <p className="text-3xl mb-2">Bài viết</p>
              <nav className="flex items-center text-base">
                <Link to="/">Trang chủ</Link>
                <FaLongArrowAltRight className="mx-[10px]" />
                <span className="text-gray-200">
                  {typeParam ? typeParam === 'meo-vat' ? 'Mẹo vặt' : typeParam === 'tin-tuc' ? 'Tin tức' : 'Tư vấn' : 'Tất cả bài viết'}
                </span>
              </nav>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="my-12 px-12">
          <div className="mx-[-12px] grid grid-cols-12">
            <div className="xl:col-span-8 lg:col-span-6 px-3 col-span-12">
              {/* LIST BLOGS */}
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <div key={blog.id} className="mb-4 border-solid border-1 rounded-xl border-gray-100">
                    <div className="grid grid-cols-12">
                      <div className="md:col-span-5 col-span-12">
                        <Link to={`/bai-viet/${blog.id}`}>
                          {/* Dùng ảnh placeholder nếu ảnh lỗi/không có */}
                          <img
                            src={blog.image.startsWith("uploads") ? getImgUrl(blog.image) : "https://placehold.co/600x400?text=Blog+Image"}
                            onError={(e) => { e.target.src = "https://placehold.co/600x400?text=No+Image" }}
                            className="object-cover w-full rounded-l-lg h-[260px]"
                            alt={blog.title}
                          />
                        </Link>
                      </div>
                      <div className="md:col-span-7 col-span-12">
                        <div className="m-4 overflow-hidden text-gray-700">
                          <Link to={`/bai-viet/${blog.id}`}>
                            <p className="mb-4 text-blue-600 text-xl font-semibold hover:text-blue-800 transition-colors">
                              {blog.title}
                            </p>
                          </Link>
                          <p className="mb-4 line-clamp-2 text-base/7">
                            {blog.description}
                          </p>
                          <p className="mb-4"></p>
                          <div className="flex gap-4 items-center mb-4 italic ">
                            <p className="">Ngày {blog.date}</p>
                            <div className="grid grid-cols-[auto_1fr] items-start gap-1">
                              <FaEye className="text-lg" />
                              <p>• {blog.viewed} Lượt xem</p>
                            </div>
                          </div>
                          <Link
                            to={`/bai-viet/${blog.id}`}
                            className="relative pl-1 pr-1 py-1.5 w-[140px] h-[45px] text-base text-nowrap group flex items-center justify-between rounded-2xl bg-orange-500 text-white font-semibold transition-all duration-500 hover:bg-white hover:border hover:border-orange-500 hover:text-orange-500 shadow-md"
                          >
                            <p className="absolute pl-3">Xem thêm</p>

                            <div className="absolute text-sm flex h-9 w-9 items-center justify-center rounded-xl right-1 bg-white text-orange-500 transition-all duration-500 group-hover:w-[90%] group-hover:pl-1 group-hover:bg-orange-500 group-hover:text-white">
                              <FaLongArrowAltRight />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <p className="text-xl">Không tìm thấy bài viết nào.</p>
                  <button onClick={() => { setSearchTerm(""); window.history.replaceState(null, '', '/bai-viet'); }} className="mt-4 text-blue-500 underline">Quay lại danh sách</button>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="xl:col-span-4 lg:col-span-6 col-span-12">
              <div className="px-[15px] py-5 border-solid border-1 rounded-xl border-gray-100">
                {/* search */}
                <div className="pb-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center">
                      <input
                        id="search"
                        type="text"
                        {...register("search")}
                        className="relative py-[6px] h-[42px] pl-5 pr-3 text-orange-500 rounded-full border-1 w-full border-orange-500 focus:outline-none"
                        placeholder="Tìm bài viết..."
                      />
                      <span className="absolute right-[68px]">
                        <button className="hover:cursor-pointer" type="submit">
                          <IoIosSearch className="text-base" />
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                {/* popular blog */}
                <div>
                  <p className="mb-2 text-[18px] font-semibold">Bài viết phổ biến</p>
                  <div className="mb-4 mt-2 w-full border-b border-gray-100"></div>

                  {popularBlogs.map((blog) => (
                    <div key={blog.id} className=" mb-4 border-0">
                      <div className="grid grid-cols-12 h-full md:h-[100px] gap-2">
                        <div className="col-span-12 md:col-span-4 h-full">
                          <Link to={`/bai-viet/${blog.id}`}>
                            <img
                              src={blog.image.startsWith("uploads") ? getImgUrl(blog.image) : "https://placehold.co/150x150"}
                              onError={(e) => { e.target.src = "https://placehold.co/150x150?text=Err" }}
                              className="h-full w-full object-cover rounded-lg"
                              alt={blog.title}
                            />
                          </Link>
                        </div>
                        <div className="col-span-12 md:col-span-8">
                          <div className="flex flex-col justify-center h-full">
                            <Link to={`/bai-viet/${blog.id}`}>
                              <p className="mb-1 text-sm text-blue-500 font-bold line-clamp-2 hover:underline">
                                {blog.title}
                              </p>
                            </Link>

                            <div className="flex gap-2 italic text-gray-500 text-xs mt-1">
                              <p className="mb-0">{blog.date} </p>
                              <div className="flex items-center gap-1">
                                <FaEye />
                                <p>{blog.viewed}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mb-4 mt-2 w-full border-b border-gray-100 my-[30px]"></div>
                </div>
                {/* blog menu */}
                <div className="mb-[30px]">
                  <p className="py-2 mb-[30px] block bg-orange-500 text-center text-white text-[18px] rounded">
                    Danh mục bài viết
                  </p>
                  <ul className="text-gray-500">
                    <li className="pb-3 border-b-1 border-dashed border-gray-400 ">
                      <Link
                        to="/bai-viet?type=meo-vat"
                        className={`flex justify-between hover:text-orange-500 ${typeParam === 'meo-vat' ? 'font-bold text-orange-500' : ''}`}
                      >
                        <p>Mẹo vặt</p>
                        <p>2</p>
                      </Link>
                    </li>
                    <li className="pt-[15px] pb-3 border-b-1 border-dashed border-gray-400">
                      <Link
                        to="/bai-viet?type=tin-tuc"
                        className={`flex justify-between hover:text-orange-500 ${typeParam === 'tin-tuc' ? 'font-bold text-orange-500' : ''}`}
                      >
                        <p>Tin tức</p>
                        <p>1</p>
                      </Link>
                    </li>
                    <li className="pt-[15px] pb-3 border-b-1 border-dashed border-gray-400">
                      <Link
                        to="/bai-viet?type=tu-van"
                        className={`flex justify-between hover:text-orange-500 ${typeParam === 'tu-van' ? 'font-bold text-orange-500' : ''}`}
                      >
                        <p>Tư vấn</p>
                        <p>1</p>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* tag - Static Demo */}
                <div>
                  <p className="py-2 mb-[30px] block bg-orange-500 text-center text-white text-[18px] rounded">
                    Thẻ tag
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {["Sneaker", "Nike", "Adidas", "Sale", "Hot Trend", "Mẹo vặt"].map(tag => (
                      <li key={tag} className="inline-block px-3 py-1 border border-gray-200 text-xs text-gray-600 rounded hover:bg-orange-500 hover:text-white transition-colors cursor-pointer">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
