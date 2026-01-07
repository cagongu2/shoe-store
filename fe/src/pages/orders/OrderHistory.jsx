import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getBaseUrl from '../../util/baseUrl';
import { useAuth } from '../../context/AuthContext';

const OrderHistory = () => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!currentUser) return;
            try {
                // Assuming there is an endpoint to get orders by user email or ID
                // Check backend routes: order.route.js -> router.get("/email/:email", getOrderByEmail);
                const response = await axios.get(`${getBaseUrl()}/api/v1/orders/email/${currentUser.email}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentUser]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto mt-10 p-5">
            <h2 className="text-2xl font-bold mb-5">Đơn hàng của tôi</h2>
            {orders.length === 0 ? (
                <p>Bạn chưa có đơn hàng nào.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b">Mã đơn hàng</th>
                                <th className="py-2 px-4 border-b">Ngày đặt</th>
                                <th className="py-2 px-4 border-b">Tổng tiền</th>
                                <th className="py-2 px-4 border-b">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b text-center">{order.id}</td>
                                    <td className="py-2 px-4 border-b text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b text-center">{order.totalPrice?.toLocaleString()} VND</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <span className={`px-2 py-1 rounded text-sm ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
