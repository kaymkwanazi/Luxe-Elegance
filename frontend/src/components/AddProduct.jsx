import React, { useState } from 'react';
import swal from 'sweetalert';


const AddProduct = ({ newAddProduct, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, price, image, description, category);

    setLoading(true); // Start loader

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      const response = await fetch("http://localhost:5000/api/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ name, price, image, description, category }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }

      const data = await response.json();
      console.log('Product added:', data);

      // Reset fields
      setName('');
      setPrice('');
      setImage('');
      setDescription('');
      setCategory('');

      // Add the new product to the list
      newAddProduct(data);

      // Show success message with countdown
      swal({
        title: "Success",
        text: "Product added successfully!",
        icon: "success",
        timer: 2000,
        buttons: false,
      }).then(() => {
        onClose(); // Close the modal after SweetAlert closes
      });
    } catch (error) {
      console.error('Error adding product:', error.message);
      // Show error message with countdown
      swal({
        title: "Error",
        text: error.message,
        icon: "error",
        timer: 2000,
        buttons: false,
      }).then(() => {
        onClose(); // Close the modal after SweetAlert closes
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required >
              <option value="">Select a category</option>
              <option value="earring">Earring</option>
              <option value="bracelet">Bracelet</option>
              <option value="necklace">Necklace</option>
              <option value="watch">Watch</option>
            </select>         
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;