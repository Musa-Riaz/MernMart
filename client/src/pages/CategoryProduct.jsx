import React from 'react'
import {useState, useEffect} from 'react';
import Layout from '../components/layout/Layout'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../style/CategoryProductStyles.css'
const CategoryProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState({});

    async function getProductByCat(){
        try{
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
             setProduct(data?.product);
             setCategory(data?.category);
             

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{

        getProductByCat();
    }, [])
  return (
    <Layout>
      <div className="container">
        <h4 className='text-center mt-3'>Category - {category?.name}</h4>
        <h6 className='text-center mt-3'>Results found: {product?.length}</h6>
        <div className="row">
            
        <div className="d-flex flex-wrap">
          {product?.map((p) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
          ))}
          </div>





        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
