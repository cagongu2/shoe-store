import React from 'react';
import { useForm } from 'react-hook-form';
import { useAddUserMutation } from '../../../redux/features/users/userApi';

const AddUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addUser, { isLoading }] = useAddUserMutation();

    const onSubmit = async (data) => {
        try {
            await addUser(data).unwrap();
            alert("Thêm người dùng thành công!");
            localStorage.setItem("activeMenu", "userList");
            window.location.reload();
        } catch (error) {
            console.error("Failed to add user:", error);
            alert("Lỗi khi thêm người dùng (Email có thể đã tồn tại)");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Thêm người dùng mới</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email là bắt buộc" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tên hiển thị (Username)</label>
                    <input
                        type="text"
                        {...register("username")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Có thể để trống"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                    <input
                        type="password"
                        {...register("password", { required: "Mật khẩu là bắt buộc", minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" } })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                    <select
                        {...register("role")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.setItem("activeMenu", "userList");
                            window.location.reload();
                        }}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                    >
                        Hủy bỏ
                    </button>
                    <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
                        {isLoading ? "Đang xử lý..." : "Thêm người dùng"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
