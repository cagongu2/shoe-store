import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from '../../../redux/features/blogs/blogsApi';
import { useFetchAllBlogCategoriesQuery } from '../../../redux/features/blogCategories/blogCategoriesApi';

const EditBlog = () => {
    // We need to get the ID from somewhere. Since the dashboard structure uses local state/localStorage for routing, 
    // we assume the ID is passed via localStorage or props. 
    // Given the current DashBoard structure, it seems we might need to store the 'editBlogId' in localStorage as well.
    const blogId = localStorage.getItem('editBlogId');

    const { data: blog, isLoading: isFetching } = useFetchBlogByIdQuery(blogId, {
        skip: !blogId
    });
    const { data: categories = [], isLoading: categoriesLoading } = useFetchAllBlogCategoriesQuery();

    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (blog) {
            setValue('title', blog.title);
            setValue('image', blog.image);
            setValue('description', blog.description);
            setValue('content', blog.content);
            setValue('categoryId', blog.categoryId);
            setValue('author', blog.author);
            setValue('tags', blog.tags ? JSON.stringify(blog.tags).replace(/[\[\]"]/g, '') : '');
        }
    }, [blog, setValue]);

    const onSubmit = async (data) => {
        try {
            const blogData = {
                id: blogId,
                title: data.title,
                image: data.image,
                description: data.description,
                content: data.content,
                categoryId: parseInt(data.categoryId),
                author: data.author,
                tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
            };

            await updateBlog(blogData).unwrap();
            alert("Cập nhật bài viết thành công!");
            localStorage.removeItem('editBlogId');
            localStorage.setItem("activeMenu", "blogList");
            window.location.reload();
        } catch (error) {
            console.error("Failed to update blog:", error);
            alert("Có lỗi xảy ra khi cập nhật bài viết");
        }
    };

    if (!blogId) return <div className="text-center p-6">Không tìm thấy ID bài viết cần sửa</div>;
    if (isFetching) return <div className="text-center p-6">Đang tải dữ liệu bài viết...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Chỉnh sửa bài viết</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tiêu đề bài viết</label>
                    <input
                        type="text"
                        {...register("title", { required: "Tiêu đề là bắt buộc" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Đường dẫn hình ảnh (URL)</label>
                    <input
                        type="text"
                        {...register("image")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                    <select
                        {...register("categoryId", { required: "Vui lòng chọn danh mục" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={categoriesLoading}
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
                </div>

                {/* Author */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tác giả</label>
                    <input
                        type="text"
                        {...register("author")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
                    <textarea
                        rows="3"
                        {...register("description", { required: "Mô tả là bắt buộc" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nội dung chi tiết (HTML)</label>
                    <textarea
                        rows="10"
                        {...register("content", { required: "Nội dung là bắt buộc" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    ></textarea>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tags (phân cách bằng dấu phẩy)</label>
                    <input
                        type="text"
                        {...register("tags")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.removeItem('editBlogId');
                            localStorage.setItem("activeMenu", "blogList");
                            window.location.reload();
                        }}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
                    >
                        {isUpdating ? "Đang xử lý..." : "Cập nhật bài viết"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;
