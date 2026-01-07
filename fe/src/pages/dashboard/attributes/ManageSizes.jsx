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
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Kích cỡ</h1>
                <button
                    onClick={openModalForAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <FaPlus /> Thêm kích cỡ
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sizes.filter(size => !size.isDeleted).map((size) => (
                            <tr key={size.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{size.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{size.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.value || '-'}{size.isDeleted ? ' (Deleted)' : ''}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => openModalForEdit(size)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(size.id)}
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
                            {editingSize ? 'Sửa kích cỡ' : 'Thêm kích cỡ'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tên kích cỡ
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="VD: Size 40"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Giá trị
                                </label>
                                <input
                                    type="text"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="VD: 40"
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
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {editingSize ? 'Cập nhật' : 'Thêm'}
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
