import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from '../../../redux/features/blogs/blogsApi';
import { useFetchAllBlogCategoriesQuery } from '../../../redux/features/blogCategories/blogCategoriesApi';
import { getImgUrl } from "../../../util/getImageUrl";
import Swal from 'sweetalert2';

const EditBlog = () => {
    const blogId = localStorage.getItem('editBlogId');
    const { data: blog, isLoading: isFetching } = useFetchBlogByIdQuery(blogId, {
        skip: !blogId
    });
    const { data: categories = [], isLoading: categoriesLoading } = useFetchAllBlogCategoriesQuery();

    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Initial load
    useEffect(() => {
        if (blog) {
            setValue('title', blog.title);
            setValue('description', blog.description);
            setValue('content', blog.content);
            setValue('categoryId', blog.categoryId);
            setValue('author', blog.author);

            // Handle tags parse to string for input
            // blog.tags usually array from backend/JSON field. 
            // convert to string "tag1, tag2"
            if (Array.isArray(blog.tags)) {
                setValue('tags', blog.tags.join(', '));
            } else if (typeof blog.tags === 'string') {
                // Try parsing if it's JSON string in string field
                try {
                    const parsed = JSON.parse(blog.tags);
                    if (Array.isArray(parsed)) setValue('tags', parsed.join(', '));
                    else setValue('tags', blog.tags);
                } catch {
                    setValue('tags', blog.tags);
                }
            }

            // Image Preview
            if (blog.image) {
                setImagePreview(getImgUrl(blog.image));
            }
        }
    }, [blog, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            // Keep preview of existing image if cancel? Or clear?
            // Usually cancel keeps old value, but input onChange with empty -> clear
            // Let's safe clear new selection
            setSelectedFile(null);
            // Revert to original? Or null?
            // If user cancels, we should probably revert to server image
            if (blog?.image) setImagePreview(getImgUrl(blog.image));
            else setImagePreview(null);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
        setValue('imageUrl', ''); // Clear URL backup if any
        const fileInput = document.getElementById('blog-image-edit');
        if (fileInput) fileInput.value = "";
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("content", data.content);
            formData.append("categoryId", data.categoryId);
            formData.append("author", data.author);

            const tagsArray = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];
            formData.append("tags", JSON.stringify(tagsArray));

            // Logic image:
            // 1. If new file -> send 'image' file
            // 2. If no new file but URL input? -> send 'image' URL
            // 3. If no new file, no URL input -> send NOTHING?
            //    Backend controller: if req.file undefined AND req.body.image undefined -> keeps old image.

            if (selectedFile) {
                formData.append("image", selectedFile);
            } else if (data.imageUrl) {
                formData.append("image", data.imageUrl);
            } else {
                // If imagePreview is null (removed) -> maybe user wants to delete image?
                // Current backend update logic: 
                // if (req.file) ... else if (req.body.image) ...
                // If both missing, it keeps strict old value. 
                // To delete image, we might need explicit empty image send or separate flag.
                // For now, assume keeping old image is default behavior.
            }

            // Call API with { id, data: formData } structure we updated
            await updateBlog({ id: blogId, data: formData }).unwrap();

            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công',
                text: 'Bài viết đã được cập nhật!',
                timer: 1500,
                showConfirmButton: false
            });

            localStorage.removeItem('editBlogId');
            localStorage.setItem("activeMenu", "blogList");
            // Delay slightly for UX
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {
            console.error("Failed to update blog:", error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: error?.data?.message || 'Có lỗi xảy ra khi cập nhật bài viết',
            });
        }
    };

    if (!blogId) return <div className="text-center p-10 text-gray-500">Không tìm thấy ID bài viết cần sửa. Vui lòng quay lại danh sách.</div>;
    if (isFetching) return <div className="text-center p-10 text-gray-500">Đang tải dữ liệu bài viết...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Chỉnh sửa bài viết</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài viết</label>
                            <input
                                type="text"
                                {...register("title", { required: "Tiêu đề là bắt buộc" })}
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                            <select
                                {...register("categoryId", { required: "Vui lòng chọn danh mục" })}
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                disabled={categoriesLoading}
                            >
                                <option value="">-- Chọn danh mục --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
                            <input
                                type="text"
                                {...register("author")}
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (phân cách bằng dấu phẩy)</label>
                            <input
                                type="text"
                                {...register("tags")}
                                className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh đại diện</label>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative h-64 flex flex-col items-center justify-center">
                            {imagePreview ? (
                                <div className="relative w-full h-full group">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-contain rounded-md"
                                        onError={(e) => e.target.src = "https://placehold.co/400x300?text=No+Image"}
                                    />
                                    {/* Overlay actions */}
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-md">
                                        <label htmlFor="blog-image-edit" className="cursor-pointer bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition shadow-sm" title="Thay ảnh">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-sm"
                                            title="Xóa ảnh (Placeholder)"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600 mt-2 justify-center">
                                        <label htmlFor="blog-image-edit" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                            <span>Chọn ảnh mới</span>
                                            <input
                                                id="blog-image-edit"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF lên đến 5MB</p>
                                </>
                            )}
                            {/* Hidden input to keep binding if needed, though we use state */}
                            <input
                                id="blog-image-edit-hidden"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="mt-3">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Hoặc nhập URL ảnh (nếu không upload)</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                    <textarea
                        rows="3"
                        {...register("description", { required: "Mô tả là bắt buộc" })}
                        className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết (HTML)</label>
                    <textarea
                        rows="12"
                        {...register("content", { required: "Nội dung là bắt buộc" })}
                        className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm leading-relaxed"
                    ></textarea>
                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.removeItem('editBlogId');
                            localStorage.setItem("activeMenu", "blogList");
                            window.location.reload();
                        }}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                    >
                        {isUpdating && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;
