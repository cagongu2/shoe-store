import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import Loading from '../../components/Loading';
import getBaseUrl from '../../util/baseUrl';

const OrderHistory = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { data: orders = [], isLoading: loading } = useGetOrderByEmailQuery(currentUser?.email, {
        skip: !currentUser?.email
    });

    if (loading) return <Loading />;

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto mt-10 p-5 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Lịch sử đơn hàng</h2>
            {orders.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">Bạn chưa có đơn hàng nào.</p>
                </div>
            ) : (
                <div className="space-y-8 max-w-5xl mx-auto">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            {/* Order Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-600">
                                    <div className='flex items-center gap-1'>
                                        <span className="font-semibold text-gray-800">Đơn hàng:</span>
                                        <span className="font-mono text-indigo-600">#{order.id}</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <span className="font-semibold text-gray-800">Ngày đặt:</span>
                                        <span>{new Date(order.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(order.status)} border-opacity-20`}>
                                        {order.status === 'pending' ? 'Chờ xử lý' :
                                            order.status === 'completed' ? 'Hoàn thành' :
                                                order.status === 'cancelled' ? 'Đã hủy' : order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Order Items */}
                                <div className="space-y-6">
                                    {order.carts && order.carts.length > 0 ? (
                                        order.carts.map((item, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                                <div className="relative flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                    {item.product?.images && item.product.images.length > 0 ? (
                                                        <img
                                                            src={`${getBaseUrl()}/uploads/${item.product.images[0].url}`}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                                    )}
                                                    <span className="absolute bottom-0 right-0 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded-tl-md">
                                                        x{item.quantity}
                                                    </span>
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base font-semibold text-gray-900 truncate">{item.name}</h4>
                                                    <div className="flex flex-wrap gap-2 mt-1.5">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                            Size: {item.size}
                                                        </span>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                            Màu: {item.color}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="text-right sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                                                    <div className="font-semibold text-gray-900">{item.price?.toLocaleString()} đ</div>
                                                    {item.quantity > 1 && (
                                                        <div className="text-xs text-gray-500 mt-0.5">
                                                            ({(item.price / item.quantity)?.toLocaleString()} đ / cái)
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-gray-400 italic text-sm">
                                            Không có thông tin chi tiết sản phẩm cho đơn hàng này.
                                        </div>
                                    )}
                                </div>

                                {/* Order Footer / Info */}
                                <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-tight">Địa chỉ giao hàng</h5>
                                        {order.address ? (
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {order.address.state}, {order.address.city}, {order.address.country}
                                                {order.address.zipcode && <span className='block text-xs mt-1 text-gray-500'>Zip: {order.address.zipcode}</span>}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-400 italic">Không có thông tin địa chỉ</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-center items-end bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                                        <div className="text-sm text-gray-600 mb-1">Tổng cộng đơn hàng</div>
                                        <div className="text-2xl font-bold text-indigo-700">
                                            {order.totalPrice?.toLocaleString()} đ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
