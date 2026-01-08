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
        <div className="py-16 bg-white">
            <div className="px-12 text-center mb-10">
                <h2 className="text-3xl font-black text-[#345DA7] mb-2">{title}</h2>
                <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">{subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-12">
                {recommendedProducts.map(product => (
                    <div key={product.id} className="group bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <Link to={`/san-pham/${product.id}`}>
                            <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                                <img
                                    src={getImgUrl(product.images?.[0]?.link)}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {product.sale && (
                                    <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">Sale</span>
                                )}
                            </div>
                            <h3 className="text-sm font-black text-gray-800 line-clamp-1 mb-2 group-hover:text-[#345DA7] transition-colors">{product.name}</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-[#3B8AC4] font-black text-xs">{product.price.toLocaleString()} VNĐ</span>
                                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{product.brand?.name}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationSection;
