import React, { useState } from 'react';
import axios from 'axios';
import getBaseUrl from '../../../util/baseUrl';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageCategories = () => {
    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [editingCategory, setEditingCategory] = React.useState(null);
    const [formData, setFormData] = React.useState({ name: '', description: '' });

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${getBaseUrl()}/api/v1/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingCategory) {
                await axios.put(`${getBaseUrl()}/api/v1/categories/${editingCategory.id}`, formData);
                await Swal.fire('Thành công', 'Cập nhật danh mục thành công', 'success');
            } else {
                await axios.post(`${getBaseUrl()}/api/v1/categories`, formData);
                await Swal.fire('Thành công', 'Thêm danh mục thành công', 'success');
            }
            await fetchCategories();
            closeModal();
        } catch (error) {
            await Swal.fire('Lỗi', 'Có lỗi xảy ra', 'error');
        } finally {
            setSubmitting(false);
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
            setSubmitting(true);
            try {
                await axios.delete(`${getBaseUrl()}/api/v1/categories/${id}`);
                await Swal.fire('Đã xóa!', 'Danh mục đã được xóa.', 'success');
                await fetchCategories();
            } catch (error) {
                await Swal.fire('Lỗi', 'Không thể xóa danh mục', 'error');
            } finally {
                setSubmitting(false);
            }
        }
    };

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

    if (loading) return <div className="flex justify-center items-center h-64">Đang tải...</div>;

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#3B8AC4]/10 animate-fadeIn overflow-hidden">
            <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-white to-[#EFDBCB]/10 p-4 rounded-2xl">
                <div>
                    <h1 className="text-2xl font-black text-[#345DA7] tracking-tight">Quản lý Danh mục</h1>
                    <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Phân loại sản phẩm hệ thống</p>
                </div>
                <button
                    onClick={openModalForAdd}
                    className="bg-[#345DA7] text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-[#3B8AC4] transition-all shadow-lg shadow-[#345DA7]/20 hover:scale-105"
                >
                    <FaPlus className="text-xs" /> <span className="font-bold text-sm">Thêm danh mục</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-[#345DA7]/5">
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider">Mã ID</th>
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider">Tên danh mục</th>
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider">Mô tả chi tiết</th>
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3B8AC4]/5">
                        {categories.filter(category => !category.isDeleted).map((category) => (
                            <tr key={category.id} className="hover:bg-[#EFDBCB]/10 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-400">#{String(category.id).slice(0, 8)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-black text-gray-800 group-hover:text-[#345DA7] transition-colors">{category.name}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-400 italic">
                                    {category.description || 'Chưa có mô tả'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => openModalForEdit(category)}
                                            className="p-2.5 bg-[#3B8AC4]/10 text-[#3B8AC4] rounded-xl hover:bg-[#3B8AC4] hover:text-white transition-all transform hover:rotate-12"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all transform hover:-rotate-12"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-md bg-[#345DA7]/20 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-[2rem] p-10 w-full max-w-md shadow-2xl border border-white/20 animate-slideDown">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-[#345DA7] tracking-tight mb-2">
                                {editingCategory ? 'Cập nhật' : 'Thêm danh mục'}
                            </h2>
                            <div className="h-1 w-12 bg-[#4BB4DE] rounded-full"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[#345DA7] text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Tên danh mục sản phẩm
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3B8AC4] font-bold text-gray-700 transition-all placeholder:font-normal"
                                    placeholder="Ví dụ: Giày thể thao, Sandals..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#345DA7] text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Mô tả ngắn gọn
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3B8AC4] font-bold text-gray-700 transition-all min-h-[120px]"
                                    placeholder="Đặc điểm chung của danh mục này..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 font-bold text-xs uppercase tracking-widest transition-all"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-4 bg-[#345DA7] text-white rounded-2xl hover:bg-[#3B8AC4] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#345DA7]/20 transition-all disabled:opacity-50"
                                >
                                    {editingCategory ? 'Lưu thay đổi' : 'Xác nhận tạo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategories;
