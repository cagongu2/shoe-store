import React, { useState } from 'react';
import axios from 'axios';
import getBaseUrl from '../../../util/baseUrl';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageColors = () => {
    const [colors, setColors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [editingColor, setEditingColor] = React.useState(null);
    const [formData, setFormData] = React.useState({ name: '', hex: '' });

    React.useEffect(() => {
        fetchColors();
    }, []);

    const fetchColors = async () => {
        try {
            const response = await axios.get(`${getBaseUrl()}/api/v1/colors`);
            setColors(response.data);
        } catch (error) {
            console.error('Error fetching colors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingColor) {
                await axios.put(`${getBaseUrl()}/api/v1/colors/${editingColor.id}`, formData);
                await Swal.fire('Thành công', 'Cập nhật màu sắc thành công', 'success');
            } else {
                await axios.post(`${getBaseUrl()}/api/v1/colors`, formData);
                await Swal.fire('Thành công', 'Thêm màu sắc thành công', 'success');
            }
            await fetchColors();
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
                await axios.delete(`${getBaseUrl()}/api/v1/colors/${id}`);
                await Swal.fire('Đã xóa!', 'Màu sắc đã được xóa.', 'success');
                await fetchColors();
            } catch (error) {
                await Swal.fire('Lỗi', 'Không thể xóa màu sắc', 'error');
            } finally {
                setSubmitting(false);
            }
        }
    };

    const openModalForAdd = () => {
        setEditingColor(null);
        setFormData({ name: '', hex: '#000000' });
        setShowModal(true);
    };

    const openModalForEdit = (color) => {
        setEditingColor(color);
        setFormData({ name: color.name, hex: color.hex || '#000000' });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingColor(null);
        setFormData({ name: '', hex: '#000000' });
    };

    if (loading) return <div className="flex justify-center items-center h-64">Đang tải...</div>;

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#3B8AC4]/10 animate-fadeIn overflow-hidden">
            <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-white to-[#EFDBCB]/10 p-4 rounded-2xl">
                <div>
                    <h1 className="text-2xl font-black text-[#345DA7] tracking-tight">Quản lý Màu sắc</h1>
                    <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Bảng mã màu sản phẩm</p>
                </div>
                <button
                    onClick={openModalForAdd}
                    className="bg-[#345DA7] text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-[#3B8AC4] transition-all shadow-lg shadow-[#345DA7]/20 hover:scale-105"
                >
                    <FaPlus className="text-xs" /> <span className="font-bold text-sm">Thêm màu mới</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-[#345DA7]/5">
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider">Mã HEX</th>
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider">Tên màu</th>
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider">Hiển thị</th>
                            <th className="px-6 py-4 text-xs font-black text-[#345DA7] uppercase tracking-wider text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3B8AC4]/5">
                        {colors.filter(color => !color.isDeleted).map((color) => (
                            <tr key={color.id} className="hover:bg-[#EFDBCB]/10 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-400 uppercase tracking-widest">{color.hex || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-black text-gray-800 group-hover:text-[#345DA7] transition-colors">{color.name}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div
                                        className="w-12 h-6 rounded-full border border-white shadow-sm ring-1 ring-gray-100"
                                        style={{ backgroundColor: color.hex || '#000000' }}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => openModalForEdit(color)}
                                            className="p-2.5 bg-[#3B8AC4]/10 text-[#3B8AC4] rounded-xl hover:bg-[#3B8AC4] hover:text-white transition-all transform hover:rotate-12"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(color.id)}
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
                                {editingColor ? 'Cập nhật màu' : 'Thêm màu sắc'}
                            </h2>
                            <div className="h-1 w-12 bg-[#4BB4DE] rounded-full"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[#345DA7] text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Tên màu hiển thị
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3B8AC4] font-bold text-gray-700 transition-all placeholder:font-normal"
                                    placeholder="Ví dụ: Ocean Blue, Sand..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#345DA7] text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Chọn mã màu
                                </label>
                                <div className="flex gap-4">
                                    <div className="relative w-16 h-14 overflow-hidden rounded-2xl shadow-inner bg-gray-100">
                                        <input
                                            type="color"
                                            value={formData.hex}
                                            onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
                                            className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.hex}
                                        onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
                                        className="flex-1 px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3B8AC4] font-mono font-bold text-[#3B8AC4] uppercase tracking-widest transition-all"
                                        placeholder="#000000"
                                    />
                                </div>
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
                                    {editingColor ? 'Lưu thay đổi' : 'Xác nhận tạo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageColors;
