import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import Loading from '../../../../components/Loading';
import {
    useFetchAllBlogCategoriesQuery,
    useAddBlogCategoryMutation,
    useUpdateBlogCategoryMutation,
    useDeleteBlogCategoryMutation
} from "../../../../redux/features/blogCategories/blogCategoriesApi";

const ManageBlogCategories = () => {
    const { data: categories = [], isLoading } = useFetchAllBlogCategoriesQuery();
    const [addCategory, { isLoading: isAdding }] = useAddBlogCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateBlogCategoryMutation();
    const [deleteCategory] = useDeleteBlogCategoryMutation();

    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });

    const openModalForAdd = () => {
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
        setShowModal(true);
    };

    const openModalForEdit = (category) => {
        setEditingCategory(category);
        setFormData({ name: category.name, description: category.description || '' });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateCategory({ id: editingCategory.id, ...formData }).unwrap();
                Swal.fire('Thành công', 'Cập nhật danh mục thành công', 'success');
            } else {
                await addCategory(formData).unwrap();
                Swal.fire('Thành công', 'Thêm danh mục thành công', 'success');
            }
            closeModal();
        } catch (error) {
            console.error("Error submitting category:", error);
            Swal.fire('Lỗi', 'Có lỗi xảy ra', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa?',
            text: 'Bạn không thể hoàn tác thao tác này!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await deleteCategory(id).unwrap();
                Swal.fire('Đã xóa!', 'Danh mục đã được xóa.', 'success');
            } catch (error) {
                console.error("Error deleting category:", error);
                Swal.fire('Lỗi', 'Không thể xóa danh mục', 'error');
            }
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh mục Blog</h1>
                <button
                    onClick={openModalForAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <FaPlus /> Thêm danh mục
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.slug}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{category.description || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => openModalForEdit(category)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-gray-900/20 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {editingCategory ? 'Sửa danh mục' : 'Thêm danh mục'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tên danh mục
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Mô tả
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={isAdding || isUpdating}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                                >
                                    {editingCategory ? (isUpdating ? 'Đang lưu...' : 'Cập nhật') : (isAdding ? 'Đang lưu...' : 'Thêm')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlogCategories;
