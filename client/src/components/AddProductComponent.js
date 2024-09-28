import React, { useState } from "react";
import { FaTimes, FaUpload, FaStar, FaTag } from "react-icons/fa";

const CreateProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "USD",
    images: [],
    category: "",
    material: "",
    stockQuantity: "",
    availability: "In Stock",
    averageRating: 0,
    reviewsCount: 0,
    reviews: [],
    discount: 0,
    isFeatured: false,
    tags: [],
    shippingInfo: "",
    brand: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    validateField(name, type === "checkbox" ? checked : value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, e.target.value],
      }));
      e.target.value = "";
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        error = value.trim() === "" ? "Name is required" : "";
        break;
      case "price":
        error = isNaN(value) || value <= 0 ? "Invalid price" : "";
        break;
      case "stockQuantity":
        error = isNaN(value) || value < 0 ? "Invalid stock quantity" : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform final validation and submit data
    console.log("Form submitted:", formData);
    // Close modal after successful submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Product</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  required
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${
                      errors.price ? "border-red-500" : ""
                    }`}
                    placeholder="0.00"
                    aria-invalid={errors.price ? "true" : "false"}
                    aria-describedby="price-error"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                </div>
                {errors.price && (
                  <p id="price-error" className="mt-2 text-sm text-red-600">
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="home">Home & Garden</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="material"
                  className="block text-sm font-medium text-gray-700"
                >
                  Material
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.stockQuantity ? "border-red-500" : ""
                  }`}
                  min="0"
                  aria-invalid={errors.stockQuantity ? "true" : "false"}
                  aria-describedby="stockQuantity-error"
                />
                {errors.stockQuantity && (
                  <p
                    id="stockQuantity-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.stockQuantity}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="availability"
                  className="block text-sm font-medium text-gray-700"
                >
                  Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="shippingInfo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shipping Information
                </label>
                <textarea
                  id="shippingInfo"
                  name="shippingInfo"
                  rows="2"
                  value={formData.shippingInfo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 inline-flex text-indigo-400 focus:outline-none"
                      >
                        <span className="sr-only">Remove tag</span>
                        <FaTimes size={12} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    onKeyDown={handleTagAdd}
                    placeholder="Add a tag"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload images</span>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          multiple
                          onChange={handleImageUpload}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Uploaded image ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
                            }))
                          }
                          className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="isFeatured"
                name="isFeatured"
                type="checkbox"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isFeatured"
                className="ml-2 block text-sm text-gray-900"
              >
                Mark as featured product
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;

// import React, { useState } from "react";
// import { FaTimes, FaUpload, FaStar, FaCheck } from "react-icons/fa";

// const CreateProductModal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     currency: "",
//     images: [],
//     category: "",
//     material: "",
//     stockQuantity: 0,
//     availability: "",
//     averageRating: 0,
//     reviewsCount: 0,
//     reviews: [],
//     discount: 0,
//     isFeatured: false,
//     tags: [],
//     shippingInfo: "",
//     brand: ""
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const imageUrls = files.map((file) => URL.createObjectURL(file));
//     setFormData((prevData) => ({
//       ...prevData,
//       images: [...prevData.images, ...imageUrls]
//     }));
//   };

//   const handleTagsChange = (e) => {
//     const tags = e.target.value.split(",").map((tag) => tag.trim());
//     setFormData((prevData) => ({ ...prevData, tags }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = "Name is required";
//     if (!formData.description) newErrors.description = "Description is required";
//     if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
//     if (!formData.currency) newErrors.currency = "Currency is required";
//     if (formData.images.length === 0) newErrors.images = "At least one image is required";
//     if (!formData.category) newErrors.category = "Category is required";
//     if (!formData.material) newErrors.material = "Material is required";
//     if (formData.stockQuantity < 0) newErrors.stockQuantity = "Stock quantity cannot be negative";
//     if (!formData.availability) newErrors.availability = "Availability is required";
//     if (!formData.brand) newErrors.brand = "Brand is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Submit form data
//       console.log("Form submitted:", formData);
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Create New Product</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
//           >
//             <FaTimes className="w-6 h-6" />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? "border-red-500" : ""}`}
//                 aria-invalid={errors.name ? "true" : "false"}
//                 aria-describedby={errors.name ? "name-error" : undefined}
//               />
//               {errors.name && (
//                 <p className="mt-2 text-sm text-red-600" id="name-error">
//                   {errors.name}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//                 Price
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className={`block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 ${errors.price ? "border-red-500" : ""}`}
//                   aria-invalid={errors.price ? "true" : "false"}
//                   aria-describedby={errors.price ? "price-error" : undefined}
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center">
//                   <label htmlFor="currency" className="sr-only">
//                     Currency
//                   </label>
//                   <select
//                     id="currency"
//                     name="currency"
//                     value={formData.currency}
//                     onChange={handleChange}
//                     className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
//                   >
//                     <option value="USD">USD</option>
//                     <option value="EUR">EUR</option>
//                     <option value="GBP">GBP</option>
//                   </select>
//                 </div>
//               </div>
//               {errors.price && (
//                 <p className="mt-2 text-sm text-red-600" id="price-error">
//                   {errors.price}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               rows="3"
//               value={formData.description}
//               onChange={handleChange}
//               className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.description ? "border-red-500" : ""}`}
//               aria-invalid={errors.description ? "true" : "false"}
//               aria-describedby={errors.description ? "description-error" : undefined}
//             ></textarea>
//             {errors.description && (
//               <p className="mt-2 text-sm text-red-600" id="description-error">
//                 {errors.description}
//               </p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="images" className="block text-sm font-medium text-gray-700">
//               Images
//             </label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//               <div className="space-y-1 text-center">
//                 <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600">
//                   <label
//                     htmlFor="images"
//                     className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//                   >
//                     <span>Upload files</span>
//                     <input
//                       id="images"
//                       name="images"
//                       type="file"
//                       multiple
//                       onChange={handleImageUpload}
//                       className="sr-only"
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//               </div>
//             </div>
//             {errors.images && (
//               <p className="mt-2 text-sm text-red-600" id="images-error">
//                 {errors.images}
//               </p>
//             )}
//             {formData.images.length > 0 && (
//               <div className="mt-4 grid grid-cols-2 gap-2">
//                 {formData.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Uploaded product image ${index + 1}`}
//                     className="h-24 w-full object-cover rounded-md"
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <input
//                 type="text"
//                 id="category"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.category ? "border-red-500" : ""}`}
//                 aria-invalid={errors.category ? "true" : "false"}
//                 aria-describedby={errors.category ? "category-error" : undefined}
//               />
//               {errors.category && (
//                 <p className="mt-2 text-sm text-red-600" id="category-error">
//                   {errors.category}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="material" className="block text-sm font-medium text-gray-700">
//                 Material
//               </label>
//               <input
//                 type="text"
//                 id="material"
//                 name="material"
//                 value={formData.material}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.material ? "border-red-500" : ""}`}
//                 aria-invalid={errors.material ? "true" : "false"}
//                 aria-describedby={errors.material ? "material-error" : undefined}
//               />
//               {errors.material && (
//                 <p className="mt-2 text-sm text-red-600" id="material-error">
//                   {errors.material}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
//                 Stock Quantity
//               </label>
//               <input
//                 type="number"
//                 id="stockQuantity"
//                 name="stockQuantity"
//                 value={formData.stockQuantity}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.stockQuantity ? "border-red-500" : ""}`}
//                 aria-invalid={errors.stockQuantity ? "true" : "false"}
//                 aria-describedby={errors.stockQuantity ? "stockQuantity-error" : undefined}
//               />
//               {errors.stockQuantity && (
//                 <p className="mt-2 text-sm text-red-600" id="stockQuantity-error">
//                   {errors.stockQuantity}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
//                 Availability
//               </label>
//               <select
//                 id="availability"
//                 name="availability"
//                 value={formData.availability}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.availability ? "border-red-500" : ""}`}
//                 aria-invalid={errors.availability ? "true" : "false"}
//                 aria-describedby={errors.availability ? "availability-error" : undefined}
//               >
//                 <option value="">Select availability</option>
//                 <option value="in-stock">In Stock</option>
//                 <option value="out-of-stock">Out of Stock</option>
//                 <option value="pre-order">Pre-order</option>
//               </select>
//               {errors.availability && (
//                 <p className="mt-2 text-sm text-red-600" id="availability-error">
//                   {errors.availability}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
//                 Discount (%)
//               </label>
//               <input
//                 type="number"
//                 id="discount"
//                 name="discount"
//                 value={formData.discount}
//                 onChange={handleChange}
//                 min="0"
//                 max="100"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
//                 Brand
//               </label>
//               <input
//                 type="text"
//                 id="brand"
//                 name="brand"
//                 value={formData.brand}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.brand ? "border-red-500" : ""}`}
//                 aria-invalid={errors.brand ? "true" : "false"}
//                 aria-describedby={errors.brand ? "brand-error" : undefined}
//               />
//               {errors.brand && (
//                 <p className="mt-2 text-sm text-red-600" id="brand-error">
//                   {errors.brand}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div>
//             <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
//               Tags (comma-separated)
//             </label>
//             <input
//               type="text"
//               id="tags"
//               name="tags"
//               value={formData.tags.join(", ")}
//               onChange={handleTagsChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="shippingInfo" className="block text-sm font-medium text-gray-700">
//               Shipping Information
//             </label>
//             <textarea
//               id="shippingInfo"
//               name="shippingInfo"
//               rows="2"
//               value={formData.shippingInfo}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             ></textarea>
//           </div>
//           <div className="flex items-center">
//             <input
//               id="isFeatured"
//               name="isFeatured"
//               type="checkbox"
//               checked={formData.isFeatured}
//               onChange={handleChange}
//               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//             />
//             <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
//               Feature this product
//             </label>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Create Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProductModal;
