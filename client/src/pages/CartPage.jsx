import Layout from "../components/layout/Layout";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from 'react-hot-toast';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalprice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/brain-tree/token");
      console.log("Fetched client token:", data?.clientToken); // Debug statement
      setClientToken(data?.clientToken);
    } catch (err) {
      console.log("Error fetching client token:", err);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('/api/v1/product/brain-tree/payment', {
        nonce,
        cart
      });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success("Payment successful");
    } catch (err) {
      console.log("Payment error:", err);
      setLoading(false);
      toast.error("Payment failed");
    }
  };

  const handleRemoveItem = (productId) => {
    try {
      const newCart = cart.filter((item) => item._id !== productId);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `You have ${cart?.length} items in your cart ${auth?.token ? "" : "please login to checkout"}`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            {cart?.map((product) => (
              <div key={product._id} className="row mb-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top mt-5"
                    alt={product.name}
                    height={"100px"}
                    width={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{product.name}</p>
                  <p>{product.description.substring(0, 30)}</p>
                  <p>Price: {product.price}</p>
                  <button
                    className="btn btn-danger mb-3"
                    onClick={() => handleRemoveItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4 className="text-center">Total: {totalprice()}</h4>
            <div className="mb-3">
              <h4>Current Address</h4>
              <h5>{auth?.user?.address}</h5>
            </div>
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                "loading..."
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
