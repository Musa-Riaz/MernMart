import React from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import {useState, useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth';
import moment from 'moment';
import {Select} from 'antd'
const { Option } = Select;
const AdminOrders = () => {

    async function handleChange(orderId, value){
        try{


            const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}, {status: value}`)
            getOrders();
        }   
        catch(err){
            console.log(err);

        }
    }

    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();
    const getOrders = async () => {

     

        try {
          const { data } = await axios.get('/api/v1/auth/all-orders', { cache: false})
          
          console.log(data)
          setOrders(data.orders);
         
        } catch (err) {
          console.log('Error fetching orders:', err);
        }
      };
    
      useEffect(() => {
        console.log('Auth:', auth);
        
          getOrders();
        
      }, []);

    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "Deliverd",
        "Cancel",
    ])
    const [changeStatus, setChangeStatus] = useState('')
  return (
    <Layout title={'All Orders data'}>
     <div className="row">
        <div className="col-md-3"> 
            <AdminMenu />
        </div>
        <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.map((order, index) => {
              return (
                <div className="border shadow">
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Payments</th>
                        <th scope='col'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index +1}</td>
                        <td>
                            <Select bordered={false}  onChange={(value)=> handleChange(order._id, value)} defaultValue={order?.status}>
                                    {status.map((s, index) => (
                                        <Option key={index} value={s}>{s}</Option>
                                    ))}
                            </Select>
                        </td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                  {order?.products?.map((order) => (
              <div key={order._id} className="row mb-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${order._id}`}
                    className="card-img-top mt-5"
                    alt={order.name}
                    height={"100px"}
                    width={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{order.name}</p>
                  <p>{order.description.substring(0, 30)}</p>
                  <p>Price: {order.price}</p>
                  
                </div>
              </div>
            ))}
                  </div>
                </div>
              )
            })}
             </div>
            
            
    </div>   
      
    </Layout>
  )
}

export default AdminOrders
