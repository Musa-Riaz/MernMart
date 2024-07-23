import React from 'react';
import Layout from '../components/layout/Layout';
import UserMenu from '../components/layout/UserMenu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/orders', { cache: false})
      
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

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>All Orders</h1>
            
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
                        <td>{order?.status}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>{order?.payment?.success ? "Success" : "Failed"}</td>
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
      </div>
    </Layout>
  );
};

export default Orders;
