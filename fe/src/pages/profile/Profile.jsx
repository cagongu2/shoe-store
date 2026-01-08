import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import getBaseUrl from '../../util/baseUrl';
import { getImgUrl } from '../../util/getImageUrl';
import { setUser } from '../../redux/features/auth/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { user: currentUser, token } = useSelector((state) => state.auth);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setValue('username', currentUser.username);
            setValue('email', currentUser.email);
            // photo handled by preview state
            setValue('phone', currentUser.phone);
            setValue('address', currentUser.address);

            if (currentUser.photo) {
                setImagePreview(getImgUrl(currentUser.photo));
            }
        }
    }, [currentUser, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage('');
        setIsError(false);
        try {
            const token = localStorage.getItem('token');

            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('phone', data.phone || ''); // Backend expects string
            formData.append('address', data.address || '');

            // If user explicitly uploaded file
            if (selectedFile) {
                formData.append('photo', selectedFile);
            } else if (currentUser.photo) {
                // Keep old photo logic managed by backend (if undefined/null sent, keep old)
                // But we can also send URL if it's external link?
                // Our controller logic: if req.file exists -> use it. Else if req.body.photo -> use it.
                // We don't append 'photo' string here if we want to keep old one implicitly, 
                // OR we can append currentUser.photo just to be safe if it was a URL.
                // Safest: Don't append if no change. Backend logic `req.body.photo || user.photo` handles it.
            }

            const response = await axios.put(`${getBaseUrl()}/api/v1/users/${currentUser.email}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage('Cập nhật hồ sơ thành công!');
            const updatedUser = response.data;
            dispatch(setUser({ user: updatedUser, token }));

            setTimeout(() => {
                setMessage('');
            }, 3000);

        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Cập nhật thất bại. Vui lòng thử lại.');
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="md:flex">
                        {/* Sidebar / Left Column: Avatar & Basic Info */}
                        <div className="md:w-1/3 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white flex flex-col items-center justify-center text-center">
                            <div className="relative group mb-6">
                                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
                                    <img
                                        src={imagePreview || "https://placehold.co/150x150?text=User"}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.target.src = "https://placehold.co/150x150?text=Error"}
                                    />
                                </div>
                                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-white text-indigo-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>

                            <h2 className="text-2xl font-bold mb-1">{currentUser?.username}</h2>
                            <p className="opacity-80 text-sm mb-4">{currentUser?.email}</p>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider backdrop-blur-sm border border-white/30">
                                {currentUser?.role || 'Khách hàng'}
                            </span>
                        </div>

                        {/* Main Content / Right Column: Detailed Form */}
                        <div className="md:w-2/3 p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Chỉnh sửa thông tin</h3>

                            {message && (
                                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                    {isError ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    )}
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="text"
                                            {...register('email')}
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
                                        <input
                                            type="text"
                                            {...register('username')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            {...register('phone')}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            placeholder="Chưa có số điện thoại"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
                                        <span>Địa chỉ giao hàng mặc định</span>
                                        <span className="text-xs text-blue-500 cursor-pointer hover:underline">Tìm trên bản đồ?</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <textarea
                                            {...register('address')}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors min-h-[100px]"
                                            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Địa chỉ này sẽ được sử dụng tự động khi bạn thanh toán đơn hàng.
                                    </p>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading && (
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
