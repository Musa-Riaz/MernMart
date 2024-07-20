import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

 async function handleSubmit(e){
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/v1/category/create-category', {name: name});
      if(data?.status === "success"){
        toast.success(`${data.category.name} created successfully`);
        setName("");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      console.log(err);
      toast.error("Something went wrong in input form ");
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
      toast.error("Something went wrong in getting the categories");
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  //update category
  async function handleUpdate(e){
    e.preventDefault();
    try{

      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name: updatedName});
      if(data.status === "success"){
        toast.success("Category updated successfully");
        setVisible(false);
        getAllCategories();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      console.log(err);
      toast.error("Something went wrong in updating the category");
    }
  }
  //delete category
  async function handleDelete(id){
    try{ 
      const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`);
      if(data.status === "success"){
        toast.success("Category deleted successfully");
        getAllCategories();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      console.log(err);
      toast.error("Something went wrong in updating the category");
    }
  }


  return (
    <Layout title={"Dashboard - create category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className="p-3">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="width-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <>
                      <tr>
                        <td key={category._id}>{category.name}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() =>{setVisible(true); setUpdatedName(category.name); setSelected(category)}}>Edit</button>
                          <button className="btn btn-danger ms-3" onClick={()=>handleDelete(category._id)}>Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}><CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/></Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
