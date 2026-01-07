import React, { useState } from 'react';
import { useFetchAllOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } from '../../../redux/features/orders/ordersApi';
import { FaTrashAlt, FaEye } from "react-icons/fa";

const OrderList = () => {
    const { data: orders = [], isLoading, error } = useFetchAllOrdersQuery();
    const [updateStatus] = useUpdateOrderStatusMutation();
    const [deleteOrder] = useDeleteOrderMutation();
    const [searchTerm, setSearchTerm] = useState("");

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap();
            alert("Cập nhật trạng thái thành công!");
        } catch (err) {
            console.error("Lỗi cập nhật trạng thái:", err);
            alert("Lỗi khi cập nhật trạng thái");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
            try {
                await deleteOrder(id).unwrap();
                alert("Xóa đơn hàng thành công!");
            } catch (err) {
                console.error("Lỗi xóa đơn hàng:", err);
                alert("Lỗi khi xóa đơn hàng");
            }
        }
    };

    const filteredOrders = orders.filter(order =>
        order.id.toString().includes(searchTerm) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'processing': return 'bg-blue-100 text-blue-700';
            case 'shipped': return 'bg-indigo-100 text-indigo-700';
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'Chờ xử lý';
            case 'processing': return 'Đang đóng gói';
            case 'shipped': return 'Đang vận chuyển';
            case 'delivered': return 'Đã giao hàng';
            case 'cancelled': return 'Đã hủy';
            default: return status;
        }
    }

    if (isLoading) return <div className="text-center py-10">Đang tải danh sách đơn hàng...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Lỗi khi tải đơn hàng</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Quản lý Đơn hàng</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Tìm theo Mã, Email, Tên..."
                        className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            <th className="py-3 px-4 text-left">Mã ĐH</th>
                            <th className="py-3 px-4 text-left">Khách hàng</th>
                            <th className="py-3 px-4 text-center">Tổng tiền</th>
                            <th className="py-3 px-4 text-center">Ngày đặt</th>
                            <th className="py-3 px-4 text-center">Trạng thái</th>
                            <th className="py-3 px-4 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light divide-y divide-gray-200">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 text-left whitespace-nowrap">
                                        <span className="font-medium text-blue-600">#{order.id}</span>
                                    </td>
                                    <td className="py-4 px-4 text-left">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">{order.name}</span>
                                            <span className="text-xs text-gray-500">{order.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-center font-medium">
                                        {order.totalPrice.toLocaleString()}đ
                                    </td>
                                    <td className="py-4 px-4 text-center text-xs">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                        <br />
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`py-1 px-3 rounded-full text-xs font-semibold cursor-pointer border-none outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 ${getStatusColor(order.status)}`}
                                        >
                                            <option value="pending">Chờ xử lý</option>
                                            <option value="processing">Đang đóng gói</option>
                                            <option value="shipped">Đang vận chuyển</option>
                                            <option value="delivered">Đã giao hàng</option>
                                            <option value="cancelled">Đã hủy</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex item-center justify-center gap-3">
                                            <button className="text-gray-500 hover:text-blue-500 transition-transform hover:scale-110" title="Xem chi tiết (Chưa hoạt động)">
                                                <FaEye size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(order.id)} className="text-gray-500 hover:text-red-500 transition-transform hover:scale-110" title="Xóa đơn hàng">
                                                <FaTrashAlt size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500 italic">Không tìm thấy đơn hàng nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
