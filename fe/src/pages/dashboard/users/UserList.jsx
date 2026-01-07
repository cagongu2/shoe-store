import React from 'react';

const UserList = () => {
    // Demo data since getAllUsers API is not available yet
    const users = [
        { id: 1, email: "admin@example.com", role: "admin", username: "Super Admin" },
        { id: 2, email: "user1@example.com", role: "user", username: "Customer One" },
        { id: 3, email: "user2@example.com", role: "user", username: "Customer Two" },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Danh sách người dùng</h2>
                <button
                    onClick={() => {
                        localStorage.setItem("activeMenu", "addUser");
                        window.location.reload();
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Thêm người dùng
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Tên hiển thị</th>
                            <th className="py-3 px-6 text-center">Vai trò</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <span className="font-medium">{user.id}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{user.email}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{user.username}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className={`py-1 px-3 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-200 text-purple-600' : 'bg-green-200 text-green-600'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center gap-2">
                                        <button className="transform hover:text-blue-500 hover:scale-110">
                                            <span className="material-icons-outlined">Sửa</span>
                                        </button>
                                        <button className="transform hover:text-red-500 hover:scale-110">
                                            <span className="material-icons-outlined">Xóa</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 text-yellow-700 rounded text-sm italic">
                * Tính năng quản lý người dùng đang được phát triển (API chưa sẵn sàng). Đây là dữ liệu mẫu.
            </div>
        </div>
    );
};

export default UserList;
