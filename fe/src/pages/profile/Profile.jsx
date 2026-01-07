import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import getBaseUrl from '../../util/baseUrl';

const Profile = () => {
    const { currentUser, loginUser } = useAuth(); // loginUser used to refresh token if needed, or just re-fetch user
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [message, setMessage] = React.useState('');

    useEffect(() => {
        if (currentUser) {
            setValue('username', currentUser.username);
            setValue('email', currentUser.email);
            setValue('photo', currentUser.photo);
            setValue('phone', currentUser.phone);
            setValue('address', currentUser.address);
        }
    }, [currentUser, setValue]);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${getBaseUrl()}/api/v1/users/${currentUser.email}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Cập nhật thông tin thành công!');
            // Update local storage user if needed or trigger context refresh
            // Ideally AuthContext should have a 'updateUser' method, but for now we manually update LS
            const updatedUser = { ...currentUser, ...data };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload(); // Simple reload to reflect changes in context
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Cập nhật thất bại.');
        }
    };

    return (
        <div className="container mx-auto mt-10 p-5">
            <h2 className="text-2xl font-bold mb-5">Thông tin cá nhân</h2>
            {message && <p className="text-green-500 mb-3">{message}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Email (Không thể thay đổi)</label>
                    <input type="text" {...register('email')} disabled className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tên hiển thị</label>
                    <input type="text" {...register('username')} className="w-full border p-2 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Ảnh đại diện (URL)</label>
                    <input type="text" {...register('photo')} className="w-full border p-2 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Số điện thoại</label>
                    <input type="text" {...register('phone')} className="w-full border p-2 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Địa chỉ giao hàng mặc định</label>
                    <textarea {...register('address')} className="w-full border p-2 rounded" rows="3"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Lưu thay đổi</button>
            </form>
        </div>
    );
};

export default Profile;
