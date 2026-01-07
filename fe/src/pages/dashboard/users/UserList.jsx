import React, { useState } from 'react';
import { useDeleteUserMutation, useFetchAllUsersQuery, useUpdateUserRoleMutation } from '../../../redux/features/users/userApi';
import { FaTrashAlt } from "react-icons/fa";

const UserList = () => {
    const { data: users = [], isLoading, error } = useFetchAllUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            try {
                await deleteUser(id).unwrap();
                alert("Xóa người dùng thành công!");
            } catch (err) {
                console.error("Failed to delete user:", err);
                alert("Lỗi khi xóa người dùng");
            }
        }
    };

    const handleRoleChange = async (email, newRole) => {
        try {
            await updateUserRole({ email, role: newRole }).unwrap();
            alert(`Cập nhật vai trò thành công: ${newRole}`);
        } catch (err) {
            console.error("Failed to update user role:", err);
            alert("Lỗi khi cập nhật vai trò");
        }
    }

    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (isLoading) return <div>Đang tải danh sách người dùng...</div>;
    if (error) return <div>Lỗi khi tải danh sách người dùng</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Danh sách người dùng</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm email..."
                        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <span className="font-medium">{user.id}</span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span>{user.email}</span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span>{user.username || "Chưa cập nhật"}</span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.email, e.target.value)}
                                            className={`py-1 px-3 rounded-full text-xs font-semibold cursor-pointer border-none outline-none focus:ring-2 focus:ring-blue-400 ${user.role === 'admin' ? 'bg-purple-200 text-purple-600' : 'bg-green-200 text-green-600'
                                                }`}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center gap-2">
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-gray-500 hover:text-red-500 transition-transform hover:scale-110"
                                                title="Xóa người dùng"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">Không tìm thấy người dùng nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
