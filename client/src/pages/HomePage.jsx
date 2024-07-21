import React from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import {Checkbox, Radio} from 'antd';
import { Prices } from "../components/Prices";
import {useNavigate} from 'react-router-dom';
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio , setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  //get total count
  async function getTotalCount() {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    if(page === 1) return
    loadMore();
  }, [page])

//load more

async function loadMore(){
  try{
    setLoading(true);
    const {data} =  await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false)
    setProducts([...products, ...data?.products]);
  }
  catch(err){
    console.log(err);
    setLoading(false)
  }
}


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
    getTotalCount();
  }, [])

  async function getAllProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  }

  useEffect(()=>{
   if(!checked.length || !radio.length) getAllProducts(); //if no category is checked, get all products
  }, [checked.length, radio.length])

  useEffect(()=>{
    if(checked.length || radio.length) filteredProduct(); //if category is checked, get filtered products
  }, [checked, radio])



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

  //get filtered product
  async function filteredProduct(){
    try{
      const {data} = await axios.post('/api/v1/product/product-filters', {checked, radio});
      setProducts(data?.products);
    }
    catch(err){
      console.log(err);
    }
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
          <div className="d-flex flex-column">
         <button className="btn btn-danger" onClick={() => window.location.reload()}>RESET FILTERS</button>
          </div>
        </div>
        <div className="col-md-9">
          
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
          {products?.map((product) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={product._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {product.price}</p>
                  <button className="btn btn-primary ms-1" onClick={()=> navigate(`/product/${product.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
          ))}
          </div>
          <div className = "m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-primary" onClick={((e)=>{
                e.preventDefault();
                setPage(page + 1);
              })}>{loading ? "loading..." : "Loadmore" }</button>
            )}
        </div>
        </div >
        
      </div>
    </Layout>
  );
}
export default HomePage;
