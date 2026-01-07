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
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Màu sắc</h1>
                <button
                    onClick={openModalForAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <FaPlus /> Thêm màu sắc
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã màu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xem trước</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {colors.filter(color => !color.isDeleted).map((color) => (
                            <tr key={color.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{color.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{color.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{color.hex || '-'}{color.isDeleted ? ' (Deleted)' : ''}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div
                                        className="w-10 h-10 rounded border border-gray-300"
                                        style={{ backgroundColor: color.hex || '#000000' }}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => openModalForEdit(color)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(color.id)}
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
                            {editingColor ? 'Sửa màu sắc' : 'Thêm màu sắc'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tên màu
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
                                    Mã màu (Hex)
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={formData.hex}
                                        onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
                                        className="h-10 w-20 border border-gray-300 rounded-md cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={formData.hex}
                                        onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="#000000"
                                    />
                                </div>
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
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {editingColor ? 'Cập nhật' : 'Thêm'}
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
