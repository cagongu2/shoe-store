import React from "react";
import Banner from "./Banner";
import Features from "./Features";
import Collection from "./Collection";
import Brand from "./Brand";
import ExclusiveProduct from "./ExclusiveProduct";
import BestSeller from "./BestSeller";
import News from "./News";

const Home = () => {
  return (
    <>
      <Banner />
      <Features />
      <Collection />
      <Brand/>
      <ExclusiveProduct/>
      <BestSeller/>
      <News/>
    </>
  );
};

export default Home;
