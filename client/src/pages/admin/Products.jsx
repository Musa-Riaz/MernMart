import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products

  async function getAllProducts() {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      console.log(data.products);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting the products");
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All Products List</h1>

        <div className="d-flex">
          {products?.map((product) => (
            <Link to={`/dashboard/admin/product/${product.slug}`}  key={product._id} className="product-link">
              <div
                className="card m-2"
                style={{ width: "18rem" }}
               
              >
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Products;
