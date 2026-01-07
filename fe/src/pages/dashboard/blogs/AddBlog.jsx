import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddBlogMutation } from '../../../redux/features/blogs/blogsApi';
import { useFetchAllBlogCategoriesQuery } from '../../../redux/features/blogCategories/blogCategoriesApi';
import Swal from 'sweetalert2';

const AddBlog = () => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [addBlog, { isLoading }] = useAddBlogMutation();
    const { data: categories = [], isLoading: categoriesLoading } = useFetchAllBlogCategoriesQuery();
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setImagePreview(null);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
        // Reset file input value if needed via ref, or just let rerender handle UI
        const fileInput = document.getElementById('blog-image-input');
        if (fileInput) fileInput.value = "";
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("content", data.content);
            formData.append("categoryId", data.categoryId);
            formData.append("author", data.author || "Admin");

            // Handle tags: clean spacing and join back or send as is? 
            // Backend Controller takes "tags" directly. Since it's formData, sending arrays is tricky unless using same key multiple times or JSON stringify.
            // Previous code sent array: tags.split(',')...
            // Backend controller expects 'tags' field. Sequelize JSON field usually parses stringified JSON or expects array.
            // Let's check backend model again. It's JSON type.
            // Since we are using FormData, best to stringify the array if backend expects complex object, 
            // OR if backend just saves what it gets.
            // Blog.create({ tags }) -> if tags is string (from formData), Sequelize MIGHT throw error for JSON column if not valid JSON string?
            // Safer to send as JSON string.
            const tagsArray = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];
            formData.append("tags", JSON.stringify(tagsArray));

            if (selectedFile) {
                formData.append("image", selectedFile);
            } else if (data.imageUrl) {
                // Fallback to URL input if we keep that option? Or just ignore.
                formData.append("image", data.imageUrl);
            }

            await addBlog(formData).unwrap();

            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Thêm bài viết mới thành công!',
                timer: 1500,
                showConfirmButton: false
            });

            reset();
            setImagePreview(null);
            setSelectedFile(null);

            // Redirect logic (reload page as requested in previous pattern)
            setTimeout(() => {
                localStorage.setItem("activeMenu", "blogList");
                window.location.reload();
            }, 1500);

        } catch (error) {
            console.error("Failed to add blog:", error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: error?.data?.message || 'Có lỗi xảy ra khi thêm bài viết',
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Thêm bài viết mới</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài viết <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                {...register("title", { required: "Tiêu đề là bắt buộc" })}
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Nhập tiêu đề hấp dẫn..."
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục <span className="text-red-500">*</span></label>
                            <select
                                {...register("categoryId", { required: "Vui lòng chọn danh mục" })}
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
                            <input
                                type="text"
                                {...register("author")}
                                defaultValue="Admin"
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (phân cách bằng dấu phẩy)</label>
                            <input
                                type="text"
                                {...register("tags")}
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Sneaker, Nike, Tips..."
                            />
                        </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh đại diện</label>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative h-64 flex flex-col items-center justify-center">
                            {imagePreview ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-contain rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm"
                                        title="Xóa ảnh"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600 mt-2 justify-center">
                                        <label htmlFor="blog-image-input" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                            <span>Tải ảnh lên</span>
                                            <input
                                                id="blog-image-input"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="pl-1">hoặc kéo thả vào đây</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF lên đến 5MB</p>
                                </>
                            )}
                        </div>

                        {/* URL Input Fallback (Optional) */}
                        <div className="mt-3">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Hoặc nhập URL ảnh (nếu có)</label>
                            <input
                                type="text"
                                {...register("imageUrl")}
                                className="w-full border border-gray-300 rounded p-2 text-sm text-gray-600 focus:ring-1 focus:ring-blue-500"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn <span className="text-red-500">*</span></label>
                    <textarea
                        rows="3"
                        {...register("description", { required: "Mô tả là bắt buộc" })}
                        className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Tóm tắt nội dung bài viết..."
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết (HTML) <span className="text-red-500">*</span></label>
                    <textarea
                        rows="12"
                        {...register("content", { required: "Nội dung là bắt buộc" })}
                        className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm leading-relaxed"
                        placeholder="<p>Viết nội dung bài viết tại đây...</p>"
                    ></textarea>
                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.setItem("activeMenu", "blogList");
                            window.location.reload();
                        }}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                    >
                        {isLoading && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isLoading ? "Đang xử lý..." : "Đăng bài viết"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
