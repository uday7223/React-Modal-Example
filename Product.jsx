import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ConfirmModal from '../Modals/ConfirmModal'; 

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-product/${id}`);
      setProducts(products.filter(product => product.id !== id));
      setShowModal(false); // Close the modal after deleting
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const openModal = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    handleDelete(selectedProductId);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
   <>
    <div className="main-con">
      <div className="product"> 
            <div className="con1">
                    <h2><Inventory2OutlinedIcon className="icon"/>Products</h2>
                    <div className="addprod">
                    <Link to="/adminPortal/addproduct">
                      <button className='main-btn'>Add Product</button>
                    </Link>
                    </div>
            </div>

      <div className="con2">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Sub Category Name</th>
            <th>Category Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.subcategory_name}</td>
              <td>{product.category_name}</td>
              <td><img src={product.image} alt="" width="55px"/></td>
              <td>{product.status}</td>
              <td>
                <Link to={`/adminPortal/editproduct/${product.id}`}>
                  <button className='table-btn'>Edit</button>
                </Link>
                <button className='table-btn' onClick={() => openModal(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
      </div>

      <ConfirmModal
        showModal={showModal}
        message="Are you sure you want to delete this product?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
   </>
  );
};

export default Product;
