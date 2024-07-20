import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import {useState, useEffect} from 'react'
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';
import {Select} from 'antd';
const {Option} = Select; //destructuring the Select component from antd
const UpdateProduct = () => {
    
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("Yes");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(''); 
  const [id, setId ] = useState("");
  const navigate = useNavigate();
  const params = useParams();
//get single product
async function getSingleProduct(){
    try{

        const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
        if(data?.status === 'success'){
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setCategory(data.product.category._id);
            setShipping(data.product.shipping);
        }
        else{
            console.log(data);
        }

    }
    catch(er){
        console.log(er)
    }
}

useEffect(()=>{
    getSingleProduct();
    //eslint-disable-next-line
}, [])


  //get all products
  async function getAllCategories() {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-category");
      if (data?.status === "success") {
        setCategories(data?.category);

      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting the categories");
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  //createproduct function
  
  async function updateProduct(e){
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('quantity', quantity);
      photo && productData.append('photo', photo);
      productData.append('category', category);
      const {data} = await axios.put(`/api/v1/product/update-product/${id}`, productData);
      if(data?.status === 'success'){
        toast.success(`${data.products.name} updated successfully`);  
        navigate('/dashboard/admin/products');
        
      }
      else{
        toast.error(data?.message);
        navigate('/dashboard/admin/products');
      };
    }
    catch(err){
      console.log(err)
      toast.error("Something went wrong in creating the product")
    }
  }


  //delete product
  async function deleteProduct(){

try{
    let answer =  window.prompt("Type DELETE to delete the product");
    if(!answer) return;

    else if(answer === "DELETE"){
    const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
    toast.success("Product deleted successfully");
    navigate('/dashboard/admin/products');
    }
}
catch(err){
    console.log(err);
    toast.error("Something went wrong while deleting")
}
  }

  return (
    <Layout title={"Dashboard - update product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Update Product</h1>
          <div className="m-1 w-75">
           <Select border={false} placeholder="Select a category" size="large" className="form-select m-3" onChange={(val) =>{setCategory(val)}} value={category.name}> 
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>{category.name}</Option>
            ))}
            </Select> 
            <div className="mb-3">
              <label  className="btn btn-outline-secondary">
                {photo ? photo.name : "Upload Photo"} 
                <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0]) } hidden/>
              </label>
            </div>
            <div className="mb-3">
              {photo ?  (<div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product-photo" height={'200px'} className="img img-responsive"/>
              </div>): (
                <div className="text-center">
                <img src={`/api/v1/product/product-photo/${id}`} alt="product-photo" height={'200px'} className="img img-responsive"/>
          </div>
              )}
            </div>
            <div className="mb-3">
              <input type="text" value={name} placeholder="write a name" className="form-control" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <textarea type="text" value={description} placeholder="write a description" className="form-control" onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="mb-3">
              <input type="text" value={price} placeholder="write a price" className="form-control" onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="mb-3">
              <input type="text" value={quantity} placeholder="write quantity" className="form-control" onChange={(e) => setQuantity(e.target.value)}/>
            </div>
            <div className="mb-3">
              <Select  type="text" value={shipping ? "Yes" : "No"  } size="large" placeholder="Select shipping" className="form-select" onChange={(value) => setShipping(value)} > 
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={updateProduct}>UPDATE PRODUCT</button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={deleteProduct}>DELETE PRODUCT</button>
            </div>
          
          </div>
        </div>
        </div>
       
      </div>
    </Layout>
  );
};

export default UpdateProduct;
