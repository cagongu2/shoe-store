import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaLink,
  FaEye,
  FaLongArrowAltRight
} from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoEyeOutline } from "react-icons/io5";
import { getImgUrl } from "../../../util/getImageUrl";
import { Link, useParams } from "react-router-dom";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";
import { useFetchAllBlogCategoriesQuery } from "../../../redux/features/blogCategories/blogCategoriesApi";
import Loading from "../../../components/Loading";

const BlogDetail = () => {
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useFetchBlogByIdQuery(id);
  const { data: categories = [] } = useFetchAllBlogCategoriesQuery();

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();
  const comment = watch("comment", "");

  const onCommentSubmit = (data) => {
    console.log("Bình luận:", data.comment);
    alert("Cảm ơn bạn đã bình luận! (Tính năng đang phát triển)");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Loading state
  if (isLoading) return <Loading />;

  // Error or Not Found state
  if (isError || !blog) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Bài viết không tồn tại hoặc đã bị xóa</h2>
        <Link to="/bai-viet" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
          Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  // Parse tags
  const tags = Array.isArray(blog.tags) ? blog.tags : (typeof blog.tags === 'string' ? JSON.parse(blog.tags || '[]') : []);

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Banner header */}
        <div className="bg-gray-100 py-6 border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="flex items-center text-sm text-gray-500 flex-wrap">
              <Link to="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/bai-viet" className="hover:text-orange-500 transition-colors">Bài viết</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-800 font-medium truncate max-w-[200px] md:max-w-md">{blog.title}</span>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="py-12 container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Main Content Column */}
            <div className="col-span-1 lg:col-span-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-0 md:p-0 overflow-hidden">

                {/* image */}
                <div className="w-full relative aspect-video md:aspect-[21/9] overflow-hidden rounded-xl mb-8">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    src={getImgUrl(blog.image)}
                    onError={(e) => { e.target.src = "https://placehold.co/800x500?text=Blog+Image" }}
                    alt={blog.title}
                  />
                </div>

                {/* title & meta */}
                <div className="mb-8 px-0 md:px-2">
                  <div className="mb-4">
                    {blog.category && (
                      <Link
                        className="inline-block bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-orange-100 transition-colors border border-orange-100"
                        to={`/bai-viet?type=${blog.category.slug}`}
                      >
                        {blog.category.name}
                      </Link>
                    )}
                  </div>

                  <h1 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
                    {blog.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 md:gap-8 text-gray-500 text-sm border-b border-gray-100 pb-8">
                    <div className="flex items-center group">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-orange-100 transition-colors">
                        <CiUser className="text-lg text-gray-600 group-hover:text-orange-500" />
                      </div>
                      <span className="font-medium text-gray-700">{blog.author || "Admin"}</span>
                    </div>
                    <div className="flex items-center">
                      <SlCalender className="text-lg mr-2 text-orange-500" />
                      <span>{new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center">
                      <IoEyeOutline className="text-xl mr-2 text-orange-500" />
                      <span>{blog.viewed} lượt xem</span>
                    </div>
                  </div>
                </div>

                {/* Body Content - Fix Overflow Issues */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans blog-content break-words px-0 md:px-2">
                  {/* CSS fix for images and other elements inside content */}
                  <style>
                    {`
                          .blog-content img { max-width: 100% !important; height: auto !important; border-radius: 0.5rem; margin: 1.5rem auto; display: block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
                          .blog-content iframe { max-width: 100% !important; border-radius: 0.5rem; }
                          .blog-content table { display: block; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
                          .blog-content pre { overflow-x: auto; background-color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; }
                        `}
                  </style>
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                  {!blog.content && (
                    <div className="p-8 bg-gray-50 rounded-xl text-center border border-dashed border-gray-200">
                      <p className="italic text-gray-500">Nội dung bài viết đang được cập nhật.</p>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-gray-100 px-0 md:px-2">
                    <div className="flex items-start md:items-center flex-col md:flex-row gap-3">
                      <span className="font-bold text-gray-700 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                        Tags:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer shadow-sm border border-gray-200 hover:border-orange-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Share Box */}
                <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Bạn thấy bài viết này thế nào?</p>
                    <p className="text-gray-500 text-sm mt-1">Hãy chia sẻ để bạn bè cùng biết nhé!</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-[#1877F2] text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all font-medium">
                      <FaFacebook className="text-lg" /> Chia sẻ
                    </button>
                    <button className="flex items-center gap-2 bg-[#1DA1F2] text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all font-medium">
                      <FaTwitter className="text-lg" /> Tweet
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-16 pt-10 border-t border-gray-100 px-0 md:px-2">
                  <div className="flex items-center gap-3 mb-8">
                    <h3 className="text-2xl font-bold text-gray-800">Bình luận</h3>
                    <span className="bg-orange-100 text-orange-600 px-3 py-0.5 rounded-full text-sm font-bold">0</span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 mb-10">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0 border border-gray-200">
                      <CiUser size={24} className="text-gray-500" />
                    </div>
                    <div className="flex-1 w-full">
                      <form onSubmit={handleSubmit(onCommentSubmit)} className="relative">
                        <div className="w-full border border-gray-200 rounded-2xl overflow-hidden focus-within:ring-4 focus-within:ring-orange-100 focus-within:border-orange-400 transition-all bg-white shadow-sm hover:shadow-md">
                          <textarea
                            className="w-full p-4 border-none focus:outline-none resize-none min-h-[120px] text-gray-700 bg-transparent"
                            placeholder="Bạn nghĩ gì về bài viết này?"
                            {...register("comment", { required: true })}
                          ></textarea>
                          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-100">
                            <p className="text-xs text-gray-400">Đăng với tài khoản Khách</p>
                            <button
                              type="submit"
                              className="bg-orange-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                              disabled={!comment.trim()}
                            >
                              Gửi bình luận
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Placeholder Comments */}
                  <div className="space-y-6">
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                      </div>
                      <h4 className="text-gray-800 font-medium mb-1">Chưa có bình luận nào</h4>
                      <p className="text-gray-500 text-sm">Hãy là người đầu tiên chia sẻ suy nghĩ của bạn!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR Column */}
            <div className="col-span-1 lg:col-span-4 space-y-8">
              <div className="sticky top-24 space-y-8">
                {/* Author Card */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-orange-400 to-orange-500 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="w-24 h-24 mx-auto mb-4 relative z-10">
                    <img
                      src="https://placehold.co/150x150?text=Author"
                      alt={blog.author}
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white shadow-sm" title="Online"></div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{blog.author || "Admin"}</h3>
                    <p className="text-gray-500 text-sm mb-5 bg-gray-100 inline-block px-3 py-1 rounded-full">Content Creator</p>
                    <button className="w-full py-2.5 border-2 border-orange-500 text-orange-500 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-md">
                      Theo dõi tác giả
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
                    Danh mục
                  </h3>
                  <ul className="space-y-1">
                    <li>
                      <Link to="/bai-viet" className="flex justify-between items-center p-3 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all font-medium">
                        <span>Tất cả bài viết</span>
                        <FaLongArrowAltRight className="text-orange-400" />
                      </Link>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link to={`/bai-viet?type=${cat.slug}`} className="flex justify-between items-center p-3 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all font-medium group">
                          <span>{cat.name}</span>
                          <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-xs flex items-center justify-center group-hover:bg-orange-200 group-hover:text-orange-700 transition-colors">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Advertisement / Promo Placeholder */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-lg text-white text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                  <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Quảng cáo</p>
                    <h3 className="text-2xl font-bold mb-4">Giày thể thao mới nhất 2024</h3>
                    <p className="text-indigo-100 mb-6 text-sm">Giảm giá lên đến 50% cho thành viên mới.</p>
                    <Link to="/shop" className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors shadow-md">
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
