import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, SetCategorise] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCate();
  }, [params?.slug]);

  const getProductsByCate = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product-category/${params.slug}`
      );
      setProducts(data?.products);
      SetCategorise(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h1>{categories.name}</h1>
        <h6>{products?.length} results found</h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products.map((product) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={product._id}
                >
                  <img
                    src={`/api/v1/product/product-image/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      {product.description.substring(0, 30)}....
                    </p>
                    <p className="card-text">{product.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
