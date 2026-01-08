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
        <div className="py-16 bg-[#345DA7]/5">
            <div className="px-12 flex justify-between items-end mb-10">
                <div className="text-left">
                    <h2 className="text-3xl font-black text-[#345DA7] mb-2">{title}</h2>
                    <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">{subtitle}</p>
                </div>
                <Link to="/tin-tuc" className="text-[10px] font-black uppercase tracking-widest text-[#3B8AC4] hover:underline">Xem tất cả bài viết</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
                {recommendedBlogs.map(blog => (
                    <div key={blog.id} className="group bg-white rounded-[2rem] overflow-hidden border border-[#3B8AC4]/10 hover:shadow-2xl transition-all duration-500">
                        <Link to={`/tin-tuc/${blog.id}`}>
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={getImgUrl(blog.image)}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-[#345DA7] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                                        {blog.category?.name || 'Tin tức'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-lg font-black text-gray-800 line-clamp-2 mb-4 group-hover:text-[#345DA7] transition-colors">{blog.title}</h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#EFDBCB] flex items-center justify-center text-[10px] font-bold text-[#345DA7]">
                                        {blog.author?.charAt(0) || 'A'}
                                    </div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {blog.author || 'Admin'}
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
