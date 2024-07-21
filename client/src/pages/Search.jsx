import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'
const Search = () => {
    const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
            <h1>Search Results</h1>
            <h6>{values?.result.length < 1 ? "No Products Found" : `Found ${values?.result.length}`}</h6>
            <div className="d-flex flex-wrap">
          {values?.result.map((value) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={value._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${value._id}`}
                  className="card-img-top"
                  alt={value.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{value.name}</h5>
                  <p className="card-text">{value.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {value.price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
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

export default Search
