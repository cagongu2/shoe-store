import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaEye,
  FaLink
} from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { IoEyeOutline } from "react-icons/io5";
import { LuChevronsUpDown } from "react-icons/lu";
import { getImgUrl } from "../../../util/getImageUrl";
import { Link, useParams } from "react-router-dom";
import { blogs as blogData } from "../../../data/blogs";

const BlogDetail = () => {
  const { id } = useParams();

  // Tìm bài viết theo ID
  const blog = useMemo(() => {
    return blogData.find(b => b.id === Number(id));
  }, [id]);

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();
  const comment = watch("comment", "");

  const onCommentSubmit = (data) => {
    console.log("Bình luận:", data.comment);
    alert("Cảm ơn bạn đã bình luận! (Demo Only)");
  };

  // Nếu không tìm thấy bài viết
  if (!blog) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Bài viết không tồn tại</h2>
        <Link to="/bai-viet" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Quay lại danh sách
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white">
        {/* content */}
        <div className="my-12 px-12">
          <div className="mx-[-12px] grid grid-cols-12">
            <div className="xl:col-span-8 lg:col-span-6 px-3 col-span-12">
              {/* div */}
              <div className="px-3">
                <div className="mx-[-12px]">
                  {/* image */}
                  <div className="px-3">
                    <div>
                      <img
                        className="w-full h-auto rounded-lg shadow-md"
                        src={blog.image.startsWith("uploads") ? getImgUrl(blog.image) : "https://placehold.co/800x500"}
                        onError={(e) => { e.target.src = "https://placehold.co/800x500?text=Blog+Image" }}
                        alt={blog.title}
                      ></img>
                    </div>
                  </div>
                  {/* title */}
                  <div className="px-3">
                    <div className="pt-[30px]">
                      <div className="pb-5">
                        <Link
                          className="active text-orange-400 font-bold uppercase text-[14px]"
                          to={`/bai-viet?type=${blog.type}`}
                        >
                          {blog.categoryLabel}
                        </Link>
                      </div>
                      <h1 className="mb-2 text-3xl font-bold text-gray-800">
                        {blog.title}
                      </h1>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-gray-500 text-sm mt-4 gap-4">
                        <li className="pr-3 flex items-center">
                          <CiUser className="text-lg mr-1" />
                          <div className="">{blog.author}</div>
                        </li>
                        <li className="pr-3 flex items-center">
                          <SlCalender className="text-lg mr-1" />
                          <div className="">Ngày {blog.date}</div>
                        </li>
                        <li className="pr-3 flex items-center">
                          <IoEyeOutline className="text-lg mr-1" />
                          <div className="">{blog.viewed} lượt xem</div>
                        </li>
                      </ul>
                    </div>
                    <div className="my-4 w-full border-b border-gray-200"></div>
                  </div>
                  {/* content */}
                  <div className="px-3 text-base text-gray-700 leading-relaxed font-sans">
                    {/* Render HTML content safely */}
                    <div dangerouslySetInnerHTML={{ __html: blog.content ? blog.content : `<p>${blog.description}</p>` }} />

                    {!blog.content && (
                      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 italic">
                        Đây là nội dung mô phỏng cho bài viết có ID {blog.id}.
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </div>
                    )}
                  </div>

                  {/* comment section */}
                  <div className="px-3 mb-6 mt-12">
                    <div className="my-5 w-full border-b border-gray-200"></div>

                    <div>
                      <p className="font-semibold text-gray-600">Chia sẻ bài viết này:</p>
                      <ul className="pt-2 ml-5 flex gap-4">
                        <li>
                          <a
                            href="#"
                            className="text-white bg-blue-600 rounded items-center gap-2 px-3 py-1 inline-flex text-sm hover:opacity-90"
                          >
                            <FaFacebook />
                            <p>Facebook</p>
                          </a>
                        </li>
                        <li>
                          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                            <FaLink className="text-gray-600" />
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-xl font-bold">Bình luận</h3>
                        <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-sm">0</span>
                      </div>

                      {/* comment input */}
                      <div className="mb-6 flex gap-4">
                        <div className="w-12 h-12 flex-shrink-0">
                          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            <CiUser size={24} />
                          </div>
                        </div>
                        <form
                          onSubmit={handleSubmit(onCommentSubmit)}
                          className="border border-gray-300 rounded-lg overflow-hidden w-full focus-within:ring-2 focus-within:ring-blue-100 transition-all"
                        >
                          <textarea
                            className="w-full p-3 border-none focus:outline-none resize-none"
                            rows="3"
                            placeholder="Viết bình luận của bạn..."
                            {...register("comment", { required: true })}
                          ></textarea>
                          <div className="bg-gray-50 flex justify-end p-2 border-t border-gray-200">
                            <button
                              type="submit"
                              className="bg-blue-500 text-white px-6 py-1.5 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                              disabled={!comment.trim()}
                            >
                              Gửi bình luận
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR (Copy from Blog.jsx for consistency) */}
            <div className="xl:col-span-4 lg:col-span-6 col-span-12">
              {/* Author Info */}
              <div className="px-[15px] py-5 border-solid border-1 rounded-xl border-gray-100 mb-6 text-center">
                <img
                  src="https://placehold.co/150x150?text=Author"
                  alt={blog.author}
                  className="w-[100px] h-[100px] rounded-full object-cover mx-auto mb-4 border-4 border-gray-100 shadow-sm"
                />
                <p className="text-lg font-bold">{blog.author}</p>
                <p className="text-gray-500 text-sm mb-4">Content Creator</p>
                <div className="flex justify-center gap-4 text-gray-500">
                  <FaFacebook className="cursor-pointer hover:text-blue-600" />
                  <FaTwitter className="cursor-pointer hover:text-blue-400" />
                  <FaGithub className="cursor-pointer hover:text-black" />
                </div>
              </div>

              <div className="px-[15px] py-5 border-solid border-1 rounded-xl border-gray-100">
                {/* blog menu */}
                <div className="mb-[30px]">
                  <p className="py-2 mb-[30px] block bg-orange-500 text-center text-white text-[18px] rounded">
                    Danh mục bài viết
                  </p>
                  <ul className="text-gray-500">
                    <li className="pb-3 border-b-1 border-dashed border-gray-400 ">
                      <Link
                        to="/bai-viet?type=meo-vat"
                        className="flex justify-between hover:text-orange-500"
                      >
                        <p>Mẹo vặt</p>
                        {/* Static count */}
                        <p>2</p>
                      </Link>
                    </li>
                    <li className="pt-[15px] pb-3 border-b-1 border-dashed border-gray-400">
                      <Link
                        to="/bai-viet?type=tin-tuc"
                        className="flex justify-between hover:text-orange-500"
                      >
                        <p>Tin tức</p>
                        <p>1</p>
                      </Link>
                    </li>
                    <li className="pt-[15px] pb-3 border-b-1 border-dashed border-gray-400">
                      <Link
                        to="/bai-viet?type=tu-van"
                        className="flex justify-between hover:text-orange-500"
                      >
                        <p>Tư vấn</p>
                        <p>1</p>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Tags from Blog */}
                <div>
                  <p className="py-2 mb-[30px] block bg-orange-500 text-center text-white text-[18px] rounded">
                    Thẻ tag
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {blog.tags && blog.tags.map(tag => (
                      <li key={tag} className="inline-block px-3 py-1 border border-gray-200 text-xs text-gray-600 rounded bg-gray-50">
                        {tag}
                      </li>
                    ))}
                    {!blog.tags && <li>Không có tag</li>}
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

export default BlogDetail;
