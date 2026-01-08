import React from 'react';
import { useGetBlogRecommendationsQuery } from '../../redux/features/suggestions/suggestionsApi';
import { useFetchAllBlogsQuery } from '../../redux/features/blogs/blogsApi';
import { getImgUrl } from '../../util/getImageUrl';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogRecommendationSection = ({ type, title, subtitle, productId }) => {
    const { user } = useSelector(state => state.auth);
    const { data: recommendedIds = [], isLoading: isIdsLoading } = useGetBlogRecommendationsQuery({
        type,
        email: user?.email,
        productId
    });

    const { data: allBlogs = [] } = useFetchAllBlogsQuery();

    const recommendedBlogs = allBlogs.filter(b => recommendedIds.includes(String(b.id)));

    if (isIdsLoading) return <div className="px-12 py-4 text-xs font-bold text-gray-400 animate-pulse uppercase tracking-widest">Đang tìm bài viết phù hợp...</div>;
    if (recommendedBlogs.length === 0) return null;

    return (
        <div className="py-24 bg-[#345DA7]/5 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B8AC4]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EFDBCB]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-end mb-16 relative z-10">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-4xl md:text-5xl font-black text-[#345DA7] mb-4">{title}</h2>
                    <div className="w-20 h-1.5 bg-[#3B8AC4] rounded-full mb-4 mx-auto md:mx-0"></div>
                    <p className="text-gray-400 uppercase text-xs font-black tracking-[0.3em]">{subtitle}</p>
                </div>
                <Link to="/bai-viet" className="group flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#345DA7]">Xem tất cả bài viết</span>
                    <div className="w-6 h-6 rounded-full bg-[#345DA7] flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                    </div>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                {recommendedBlogs.map(blog => (
                    <div key={blog.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                        <Link to={`/bai-viet/${blog.id}`}>
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={getImgUrl(blog.image)}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md text-[#345DA7] text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">
                                        {blog.category?.name || 'Tin tức'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-[#3B8AC4]"></span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tin mới nhất</span>
                                </div>
                                <h3 className="text-xl font-black text-gray-800 line-clamp-2 mb-6 group-hover:text-[#345DA7] transition-colors leading-tight">{blog.title}</h3>
                                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-[#EFDBCB]/30 flex items-center justify-center text-xs font-black text-[#345DA7] border border-[#EFDBCB]/50 shadow-inner">
                                            {blog.author?.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">{blog.author || 'Admin'}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Biên tập viên</p>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-[#345DA7] group-hover:text-white group-hover:border-[#345DA7] transition-all duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogRecommendationSection;
