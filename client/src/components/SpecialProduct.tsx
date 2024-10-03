import React from "react";
import { IProduct } from "../types/product.types";
import { Link } from "react-router-dom";

type Props = {
  title: String;
  products: IProduct[];
};

const SpecialProduct = ({ title, products }: Props) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-[10px] px-[50px]">
          <Link
            to=""
            className="text-3xl font-light capitalize cursor-pointer hover:underline"
          >
            <h2>{title}</h2>
          </Link>
          <Link
            to=""
            className="text-base text-[#a66920] cursor-pointer hover:underline uppercase"
          >
            <p>View More</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <>
              <div>
                <img
                  src={product.images && product.images[0].url}
                  alt={product.images && product.images[0].title}
                  className="w-[full] h-auto object-contain"
                />
                <h2 className="capitalize">{product.productName}</h2>
                <div className="flex justify-between">
                  <p className="text-[#a66920] mb-2 font-semibold text-sm">
                    Sale: $
                    {product.price &&
                      product.price -
                        product.price * ((product?.discount ?? 0) / 100)}
                  </p>
                  <div className="flex items-center mb-2">
                    <p className="text-sm text-gray-500 font-medium">
                      Rating: {product.averageRating} / 5
                    </p>
                    <p className="ml-2 text-sm text-gray-500 font-medium">
                      ({product.reviewsCount} reviews)
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialProduct;
