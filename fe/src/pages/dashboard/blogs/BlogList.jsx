import React, { useState } from 'react';
import { useDeleteBlogMutation, useFetchAllBlogsQuery } from '../../../redux/features/blogs/blogsApi';
import { getImgUrl } from '../../../util/getImageUrl';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const { data: blogs = [], isLoading, error } = useFetchAllBlogsQuery();
    const [deleteBlog] = useDeleteBlogMutation();
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
            try {
                await deleteBlog(id).unwrap();
                alert("Xóa bài viết thành công!");
            } catch (err) {
                console.error("Failed to delete the blog:", err);
                alert("Lỗi khi xóa bài viết");
            }
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Lỗi khi tải bài viết</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Quản lý bài viết</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài viết..."
                        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            localStorage.setItem("activeMenu", "addBlog");
                            window.location.reload();
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Thêm bài viết
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Tiêu đề</th>
                            <th className="py-3 px-6 text-left">Hình ảnh</th>
                            <th className="py-3 px-6 text-center">Danh mục</th>
                            <th className="py-3 px-6 text-center">Tác giả</th>
                            <th className="py-3 px-6 text-center">Ngày tạo</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <tr key={blog.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap overflow-hidden max-w-[200px] text-ellipsis" title={blog.title}>
                                        <span className="font-medium">{blog.title}</span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <img
                                            src={getImgUrl(blog.image)}
                                            alt={blog.title}
                                            className="w-16 h-12 object-cover rounded"
                                            onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Err" }}
                                        />
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                                            {blog.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {blog.author}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    localStorage.setItem('editBlogId', blog.id);
                                                    localStorage.setItem('activeMenu', 'editBlog');
                                                    window.location.reload();
                                                }}
                                                className="transform hover:text-blue-500 hover:scale-110"
                                            >
                                                <span className="material-icons-outlined">Sửa</span>
                                            </button>
                                            <button onClick={() => handleDelete(blog.id)} className="transform hover:text-red-500 hover:scale-110">
                                                <span className="material-icons-outlined">Xóa</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">Chưa có bài viết nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogList;
