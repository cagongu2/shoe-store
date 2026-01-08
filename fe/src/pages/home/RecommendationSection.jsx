import React from 'react';
import { useGetProductRecommendationsQuery } from '../../redux/features/suggestions/suggestionsApi';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import { getImgUrl } from '../../util/getImageUrl';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecommendationSection = ({ type, productId, title, subtitle }) => {
    const { user } = useSelector(state => state.auth);
    const { data: recommendedIds = [], isLoading: isIdsLoading } = useGetProductRecommendationsQuery({
        type,
        productId,
        email: user?.email
    });

    const { data: allProducts = [] } = useFetchAllProductsQuery();

    const recommendedProducts = allProducts.filter(p => recommendedIds.includes(String(p.id)));

    if (isIdsLoading) return <div>Đang tải gợi ý...</div>;
    if (recommendedProducts.length === 0) return null;

    return (
        <div className="py-24 bg-white overflow-hidden">
            <div className="px-6 md:px-12 flex flex-col items-center text-center mb-16 relative">
                <div className="absolute -top-10 text-[100px] font-black text-gray-50 select-none -z-0 uppercase">Explore</div>
                <h2 className="text-4xl md:text-5xl font-black text-[#345DA7] mb-4 relative z-10">{title}</h2>
                <div className="w-20 h-1.5 bg-[#3B8AC4]  mb-4"></div>
                <p className="text-gray-400 uppercase text-xs font-black tracking-[0.3em] relative z-10">{subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-12 max-w-7xl mx-auto">
                {recommendedProducts.map(product => (
                    <div key={product.id} className="group relative">
                        <Link to={`/san-pham/${product.id}`} className="block">
                            <div className="relative overflow-hidden rounded-3xl bg-white aspect-[4/5] mb-6 border border-gray-100 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:border-[#345DA7]/10">
                                <img
                                    src={getImgUrl(product.images?.[0]?.link)}
                                    alt={product.name}
                                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
                                />

                                {product.sale && (
                                    <div className="absolute top-6 left-6 bg-gradient-to-br from-red-500 to-orange-500 text-white text-[10px] font-black px-4 py-1.5  uppercase tracking-widest shadow-lg transform -rotate-12">
                                        Sale
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-[#345DA7]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <span className="text-white text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 mb-2">Xem chi tiết</span>
                                    <div className="w-10 h-1 bg-white  translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100"></div>
                                </div>
                            </div>

                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-black text-[#3B8AC4] bg-[#3B8AC4]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">{product.brand?.name}</span>
                                    {product.hot && <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-wider">Trending</span>}
                                </div>
                                <h3 className="text-lg font-black text-gray-800 line-clamp-1 group-hover:text-[#345DA7] transition-colors duration-300">{product.name}</h3>
                                <div className="mt-3 flex items-center gap-4">
                                    <span className="text-xl font-black text-[#345DA7]">{product.price.toLocaleString()}đ</span>
                                    <span className="text-sm text-gray-300 line-through">{(product.price * 1.2).toLocaleString()}đ</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationSection;
