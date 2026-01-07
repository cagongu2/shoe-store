import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddBlogMutation } from '../../../redux/features/blogs/blogsApi';
import { useFetchAllBlogCategoriesQuery } from '../../../redux/features/blogCategories/blogCategoriesApi';

const AddBlog = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [addBlog, { isLoading }] = useAddBlogMutation();
    const { data: categories = [], isLoading: categoriesLoading } = useFetchAllBlogCategoriesQuery();
    const [imagePreview, setImagePreview] = useState(null); // Assuming simple URL input or file handling later
    // For now, let's stick to URL input for simplicity as per existing logic, or basic text input

    // NOTE: Real file upload requires FormData and backend support for multer. 
    // Given the previous Product Add logic, it might be using URLs or a separate upload endpoint.
    // I'll assume URL input for now or standard text inputs to match the Backend Model. 

    const onSubmit = async (data) => {
        try {
            // Basic data preparation
            const blogData = {
                title: data.title,
                image: data.image, // Assuming user inputs a URL path or filename
                description: data.description,
                content: data.content,
                categoryId: parseInt(data.categoryId),
                author: data.author || "Admin",
                tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
            };

            await addBlog(blogData).unwrap();
            alert("Thêm bài viết thành công!");
            reset();
            // Redirect to list
            localStorage.setItem("activeMenu", "blogList");
            window.location.reload();
        } catch (error) {
            console.error("Failed to add blog:", error);
            alert("Có lỗi xảy ra khi thêm bài viết");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Thêm bài viết mới</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tiêu đề bài viết</label>
                    <input
                        type="text"
                        {...register("title", { required: "Tiêu đề là bắt buộc" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhập tiêu đề..."
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
                        placeholder="uploads/blog/example.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Nhập đường dẫn ảnh (ví dụ: uploads/blog/anh.jpg)</p>
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
                        defaultValue="Admin"
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
                        placeholder="Mô tả ngắn gọn về bài viết..."
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Content - Using simple textarea for now, could be Rich Text Editor later */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nội dung chi tiết (HTML)</label>
                    <textarea
                        rows="10"
                        {...register("content", { required: "Nội dung là bắt buộc" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        placeholder="<p>Nội dung bài viết...</p>"
                    ></textarea>
                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tags (phân cách bằng dấu phẩy)</label>
                    <input
                        type="text"
                        {...register("tags")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Sneaker, Nike, Tips"
                    />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.setItem("activeMenu", "blogList");
                            window.location.reload();
                        }}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
                    >
                        {isLoading ? "Đang xử lý..." : "Thêm bài viết"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
