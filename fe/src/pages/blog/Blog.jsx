import React, { useState, useMemo, useEffect } from "react";
import { FaLongArrowAltRight, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import { getImgUrl } from "../../util/getImageUrl";
import { Link, useSearchParams } from "react-router-dom";
import { useFetchAllBlogsQuery } from "../../redux/features/blogs/blogsApi";
import { useFetchAllBlogCategoriesQuery } from "../../redux/features/blogCategories/blogCategoriesApi";
import Loading from "../../components/Loading";

// Mock data cho bài viết phổ biến (theo yêu cầu)
const mockPopularBlogs = [
  { id: 101, title: "Top 10 giày chạy bộ tốt nhất 2024", image: "", date: "2024-01-15", viewed: 1250 },
  { id: 102, title: "Cách vệ sinh giày Sneaker trắng", image: "", date: "2024-02-20", viewed: 980 },
  { id: 103, title: "Phân biệt Nike Real và Fake", image: "", date: "2024-03-10", viewed: 850 },
  { id: 104, title: "Xu hướng giày mùa hè năm nay", image: "", date: "2024-04-05", viewed: 720 },
  { id: 105, title: "Chọn size giày chuẩn nhất", image: "", date: "2024-05-12", viewed: 640 },
];

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get("type"); // Đây là slug của category
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit } = useForm();

  // 1. Fetch Categories để map slug -> id
  const { data: categories = [], isLoading: isCategoriesLoading } = useFetchAllBlogCategoriesQuery();

  // 2. Tìm categoryId dựa trên slug (typeParam)
  const selectedCategory = useMemo(() => {
    return categories.find(cat => cat.slug === typeParam);
  }, [categories, typeParam]);

  // 3. Fetch Blogs với categoryId và searchTerm
  const { data: blogs = [], isLoading: isBlogsLoading, isError } = useFetchAllBlogsQuery({
    categoryId: selectedCategory ? selectedCategory.id : undefined,
    search: searchTerm
  });

  // Handle Search Submit
  const onSubmit = (data) => {
    setSearchTerm(data.search);
  };

  const handleCategoryClick = (slug) => {
    if (slug) {
      setSearchParams({ type: slug });
    } else {
      setSearchParams({});
    }
  };

  if (isCategoriesLoading) return <Loading />;

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
                  {selectedCategory ? selectedCategory.name : 'Tất cả bài viết'}
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
              {isBlogsLoading ? (
                <div className="text-center py-10"><Loading /></div>
              ) : isError ? (
                <div className="text-center py-10 text-red-500">Có lỗi khi tải bài viết.</div>
              ) : blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div key={blog.id} className="mb-4 border-solid border-1 rounded-xl border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-12">
                      <div className="md:col-span-5 col-span-12">
                        <Link to={`/bai-viet/${blog.id}`}>
                          <img
                            src={getImgUrl(blog.image)}
                            onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Blog+Image" }}
                            className="object-cover w-full rounded-l-lg h-[260px] md:h-full"
                            alt={blog.title}
                          />
                        </Link>
                      </div>
                      <div className="md:col-span-7 col-span-12">
                        <div className="m-4 overflow-hidden text-gray-700 flex flex-col justify-between h-full pb-4">
                          <div>
                            <Link to={`/bai-viet/${blog.id}`}>
                              <p className="mb-2 text-blue-600 text-xl font-semibold hover:text-blue-800 transition-colors line-clamp-2">
                                {blog.title}
                              </p>
                            </Link>

                            <p className="mb-3 text-sm text-gray-500 font-medium">
                              {blog.category?.name && (
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs mr-2 text-gray-600 uppercase">
                                  {blog.category.name}
                                </span>
                              )}
                            </p>

                            <p className="mb-4 line-clamp-3 text-base text-gray-600">
                              {blog.description}
                            </p>
                          </div>

                          <div>
                            <div className="flex gap-4 items-center mb-4 italic text-sm text-gray-500">
                              <p className="">Ngày {new Date(blog.createdAt).toLocaleDateString('vi-VN')}</p>
                              <div className="flex items-center gap-1">
                                <FaEye />
                                <p>{blog.viewed} Lượt xem</p>
                              </div>
                            </div>
                            <Link
                              to={`/bai-viet/${blog.id}`}
                              className="relative pl-1 pr-1 py-1.5 w-[140px] h-[40px] text-base text-nowrap group flex items-center justify-between rounded-2xl bg-orange-500 text-white font-semibold transition-all duration-500 hover:bg-white hover:border hover:border-orange-500 hover:text-orange-500 shadow-md"
                            >
                              <p className="absolute pl-3 text-sm">Xem chi tiết</p>

                              <div className="absolute text-sm flex h-8 w-8 items-center justify-center rounded-xl right-1 bg-white text-orange-500 transition-all duration-500 group-hover:w-[90%] group-hover:pl-1 group-hover:bg-orange-500 group-hover:text-white">
                                <FaLongArrowAltRight />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <p className="text-xl">Không tìm thấy bài viết nào.</p>
                  {(searchTerm || typeParam) && (
                    <button
                      onClick={() => { setSearchTerm(""); setSearchParams({}); }}
                      className="mt-4 text-blue-500 underline hover:text-blue-700"
                    >
                      Xem tất cả bài viết
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="xl:col-span-4 lg:col-span-6 col-span-12 pl-0 lg:pl-4 mt-8 lg:mt-0">
              <div className="px-[15px] py-5 border-solid border-1 rounded-xl border-gray-100 bg-gray-50">
                {/* search */}
                <div className="pb-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative w-full">
                      <input
                        id="search"
                        type="text"
                        {...register("search")}
                        className="w-full py-2 pl-4 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Tìm bài viết..."
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500" type="submit">
                        <IoIosSearch className="text-xl" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* blog categories */}
                <div className="mb-[30px]">
                  <p className="py-2 mb-[20px] block bg-slate-800 text-center text-white text-[18px] rounded font-medium">
                    Danh mục
                  </p>
                  <ul className="text-gray-600">
                    <li className="pb-2 border-b border-dashed border-gray-300 last:border-0">
                      <button
                        onClick={() => handleCategoryClick(null)}
                        className={`w-full text-left py-2 hover:text-orange-500 transition-colors flex justify-between ${!typeParam ? 'font-bold text-orange-500' : ''}`}
                      >
                        <span>Tất cả</span>
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id} className="border-b border-dashed border-gray-300 last:border-0">
                        <button
                          onClick={() => handleCategoryClick(cat.slug)}
                          className={`w-full text-left py-2 hover:text-orange-500 transition-colors flex justify-between ${typeParam === cat.slug ? 'font-bold text-orange-500' : ''}`}
                        >
                          <span>{cat.name}</span>
                          {/* <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-500">0</span> */}
                          {/* Số lượng bài viết cần BE trả về đếm, hiện tại chưa có */}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* popular blog - MOCK DATA */}
                <div>
                  <p className="mb-2 text-[18px] font-semibold text-gray-800 border-l-4 border-orange-500 pl-3">Bài viết phổ biến</p>
                  <div className="mb-4 mt-2 w-full border-b border-gray-200"></div>

                  {mockPopularBlogs.map((blog) => (
                    <div key={blog.id} className="mb-4">
                      <div className="flex gap-3">
                        <div className="w-[80px] h-[80px] flex-shrink-0">
                          <Link to="#">
                            <img
                              src={blog.image || "https://placehold.co/150x150?text=Popular"}
                              className="h-full w-full object-cover rounded-md border border-gray-200"
                              alt={blog.title}
                            />
                          </Link>
                        </div>
                        <div className="flex flex-col justify-between py-1">
                          <Link to="#">
                            <p className="text-sm font-semibold text-gray-700 hover:text-orange-500 line-clamp-2 leading-snug transition-colors">
                              {blog.title}
                            </p>
                          </Link>

                          <div className="flex gap-3 text-xs text-gray-400 mt-1">
                            <span>{new Date(blog.date).toLocaleDateString('vi-VN')}</span>
                            <span className="flex items-center gap-1"><FaEye /> {blog.viewed}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* tag - Static Demo */}
                <div className="mt-8">
                  <p className="mb-4 text-[18px] font-semibold text-gray-800 border-l-4 border-orange-500 pl-3">Tags nổi bật</p>
                  <ul className="flex flex-wrap gap-2">
                    {["Sneaker", "Nike", "Adidas", "Tips", "Vệ sinh giày", "Phối đồ", "Sale"].map(tag => (
                      <li key={tag} className="inline-block px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded hover:bg-orange-500 hover:text-white transition-colors cursor-pointer border border-gray-200 hover:border-orange-500">
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
