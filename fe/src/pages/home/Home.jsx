import React from "react";
import Banner from "./Banner";
import Features from "./Features";
import Collection from "./Collection";
import Brand from "./Brand";
import News from "./News";
import RecommendationSection from "./RecommendationSection";
import BlogRecommendationSection from "./BlogRecommendationSection";

const Home = () => {
  return (
    <>
      <Banner />
      <Features />
      <div className="space-y-0">
        <RecommendationSection
          type="view-based"
          title="Đang thịnh hành"
          subtitle="Dựa trên lượt xem và mức độ quan tâm"
        />
        <Collection />
        <RecommendationSection
          type="collaborative"
          title="Dành riêng cho bạn"
          subtitle="Gợi ý dựa trên phong cách mua sắm của bạn"
        />
        <BlogRecommendationSection
          type="purchase-pattern"
          title="Bài viết bạn có thể quan tâm"
          subtitle="Xu hướng được cộng đồng yêu thích"
        />
        <Brand />
        <News />
      </div>
    </>
  );
};

export default Home;
