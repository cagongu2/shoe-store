import React, { useState } from 'react';
import axios from 'axios';
import getBaseUrl from '../../../util/baseUrl';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageSizes = () => {
    const [sizes, setSizes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [editingSize, setEditingSize] = React.useState(null);
    const [formData, setFormData] = React.useState({ name: '', value: '' });

    React.useEffect(() => {
        fetchSizes();
    }, []);

    const fetchSizes = async () => {
        try {
            const response = await axios.get(`${getBaseUrl()}/api/v1/sizes`);
            setSizes(response.data);
        } catch (error) {
            console.error('Error fetching sizes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingSize) {
                await axios.put(`${getBaseUrl()}/api/v1/sizes/${editingSize.id}`, formData);
                await Swal.fire('Thành công', 'Cập nhật kích cỡ thành công', 'success');
            } else {
                await axios.post(`${getBaseUrl()}/api/v1/sizes`, formData);
                await Swal.fire('Thành công', 'Thêm kích cỡ thành công', 'success');
            }
            await fetchSizes();
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
                await axios.delete(`${getBaseUrl()}/api/v1/sizes/${id}`);
                await Swal.fire('Đã xóa!', 'Kích cỡ đã được xóa.', 'success');
                await fetchSizes();
            } catch (error) {
                await Swal.fire('Lỗi', 'Không thể xóa kích cỡ', 'error');
            } finally {
                setSubmitting(false);
            }
        }
    };

    const openModalForAdd = () => {
        setEditingSize(null);
        setFormData({ name: '', value: '' });
        setShowModal(true);
    };

    const openModalForEdit = (size) => {
        setEditingSize(size);
        setFormData({ name: size.name, value: size.value || '' });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingSize(null);
        setFormData({ name: '', value: '' });
    };

    if (loading) return <div className="flex justify-center items-center h-64">Đang tải...</div>;

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#3B8AC4]/10 animate-fadeIn overflow-hidden">
            <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-white to-[#EFDBCB]/10 p-4 rounded-2xl">
                <div>
                    <h1 className="text-2xl font-black text-[#345DA7] tracking-tight">Quản lý Kích cỡ</h1>
                    <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Hệ thống Size tiêu chuẩn</p>
                </div>
                <button
                    onClick={openModalForAdd}
                    className="bg-[#345DA7] text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-[#3B8AC4] transition-all shadow-lg shadow-[#345DA7]/20 hover:scale-105"
                >
                    <FaPlus className="text-xs" /> <span className="font-bold text-sm">Thêm Size mới</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-[#345DA7]/5">
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider">Mã ID</th>
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider">Tên Size</th>
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider">Giá trị số</th>
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3B8AC4]/5">
                        {sizes.filter(size => !size.isDeleted).map((size) => (
                            <tr key={size.id} className="hover:bg-[#EFDBCB]/10 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-400">#{String(size.id).slice(0, 8)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-black text-gray-800 group-hover:text-[#345DA7] transition-colors">{size.name}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-3 py-1 bg-[#3B8AC4]/10 text-[#3B8AC4] rounded-lg text-xs font-black uppercase tracking-widest">
                                        {size.value || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => openModalForEdit(size)}
                                            className="p-2.5 bg-[#3B8AC4]/10 text-[#3B8AC4] rounded-xl hover:bg-[#3B8AC4] hover:text-white transition-all transform hover:rotate-12"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(size.id)}
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
                                {editingSize ? 'Cập nhật Size' : 'Thêm Size mới'}
                            </h2>
                            <div className="h-1 w-12 bg-[#4BB4DE] rounded-full"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[#345DA7] text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Tên kích cỡ
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3B8AC4] font-bold text-gray-700 transition-all placeholder:font-normal"
                                    placeholder="Ví dụ: Size 40, Large..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#345DA7] text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Giá trị cụ thể
                                </label>
                                <input
                                    type="text"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3B8AC4] font-bold text-gray-700 transition-all placeholder:font-normal"
                                    placeholder="Ví dụ: 40"
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
                                    {editingSize ? 'Lưu thay đổi' : 'Xác nhận tạo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSizes;
