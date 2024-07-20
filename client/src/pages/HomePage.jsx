import React from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import {Checkbox, Radio} from 'antd';
import { Prices } from "../components/Prices";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio , setRadio] = useState([]);


  async function getAllCategories() {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-category");
      if (data.status === "success") {
        setCategories(data.category);

      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getAllCategories();
  }, [])

  async function getAllProducts() {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getAllProducts();

  }, [])

  function handleFilter(value, id){
    let all = [...checked]; //all checked categories will keep being stored here 
    if(value){
      all.push(id);
    }
    else{
    all =   all.filter((category) => category !== id);

    }

    setChecked(all);
  } 
  return (
    <Layout title={"Best offers"}>
      <div className="row mt-2">
        <div className="col-md-2">
          <h4 className="text-center mt-4">Filter By Category</h4>
          <div className="d-flex flex-column">
          {categories?.map((category) => (
            <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id )}>{category.name}</Checkbox>
          ))}
          </div>
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices.map((price) => (
              <div>
                 <Radio key={price._id} value={price.array}>{price.name}</Radio>
              </div>
             
              ))}
          </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
          {products?.map((product) => (
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
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
