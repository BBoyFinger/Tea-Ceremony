import React from "react";

type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  image: string[];
};

type Props = {
  relatedProducts: RelatedProduct[];
};

const RelatedProducts = ({ relatedProducts }: Props) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {relatedProducts.map((relatedProduct) => (
          <div
            key={relatedProduct.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={relatedProduct.image[0]}
              alt={relatedProduct.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {relatedProduct.name}
              </h3>
              <p className="text-gray-600 mb-4">
                ${relatedProduct.price.toFixed(2)}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
