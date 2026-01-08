import { useSelector } from 'react-redux';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import Loading from '../../components/Loading';

const OrderHistory = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { data: orders = [], isLoading: loading } = useGetOrderByEmailQuery(currentUser?.email, {
        skip: !currentUser?.email
    });

    if (loading) return <Loading />;

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
