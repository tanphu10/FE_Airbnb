import React from "react";
import Banner from "../../Components/Banner/Banner";
import ProductRoom from "../../Components/ProductRoom/ProductRoom";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div id="body">
      <div className="container mx-auto ">
        <div>
          <Banner />
        </div>
        <div className="my-10">
          <ProductRoom />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
