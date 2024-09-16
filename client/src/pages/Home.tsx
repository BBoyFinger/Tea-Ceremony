import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <div className="container ">
        <div className="mt-[30px]">
          <h1 className="hidden lg:inline text-[40px] font-light font-normal-stretch text-left text-[#333333] leading-4 mt-5 mb-[10px] capitalize">
            {" "}
            Teaware
          </h1>
          <p className="hidden lg:block text-[17px] font-light leading-6 text-black ">
            Shop online for tea accessories and teaware items especially created
            for loose leaf tea. Whether you're looking for glass teapots,
            ceramic infuser mugs, innovative tea makers or electric tea kettles,
            our range covers all the bases when it comes to successfully
            preparing (and storing) your loose tea. Below are our bestselling
            accessories in each category.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
