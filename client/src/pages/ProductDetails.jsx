import Layout from "../components/layout/Layout";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../style/ProductDetailsStyles.css';
const ProductDetails = () => {
  const params = useParams();
  //initial details

  useEffect(() => {
    if (params.slug) getProducts();
  }, [params?.slug]);

  //get products

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  async function getProducts() {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (err) {
      console.log(err);
    }
  }

async function getSimilarProduct(pid, cid){

    try{

        const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
        setRelatedProducts(data?.products);
        console.log(data?.products)
    }
    catch(err){
        console.log(err);
    
    }
}

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={'300'}
            width={'350'}
          />
        </div>
        <div className="col-md-6 text-center">
        <h1>Product Details</h1>
        <h6 className="text-center">Name: {product.name}</h6>
         <h6 className="text-center">Description: {product.description}</h6>
        <h6 className="text-center">Price: ${product.price}</h6>
        <h6 className="text-center">Quantity: {product.quantity}</h6>
        <h6 className="text-center">Category: {product.category?.name}</h6>
        </div>
      </div>
      <hr/>
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length === 0 && <h6 className="text-center mt-2">No Similar Products to Show</h6>}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((realtedProduct) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={product._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${realtedProduct._id}`}
                  className="card-img-top"
                  alt={realtedProduct.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{realtedProduct.name}</h5>
                  <p className="card-text">{realtedProduct.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {realtedProduct.price}</p>
                </div>
              </div>
          ))}
          </div>
      </div>
 
    </Layout>
  );
};

export default ProductDetails;
