import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { Checkbox } from 'antd';
import axios from 'axios';

import Layout from '../components/Layout/Layout';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-category');
      if(data?.message) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if(value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  };

  return (
    <Layout title={'All Products - Best Offers'}>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <h6 className='text-center'>Filter By Category</h6>
          {categories.map(cate => (
            <Checkbox 
              key={cate._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            ></Checkbox>
          ))}
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products.map((product) => (
              <div className="card m-2" style={{ width: "18rem" }} >
                <img 
                  src={`/api/v1/product/product-image/${product._id}`} 
                  className="card-img-top" 
                  alt={product.name} 
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button className='btn btn-primary'>More Details</button>
                  <button className='btn btn-secondary'>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage