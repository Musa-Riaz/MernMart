import React from "react";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthStyle from "../../style/AuthStyle.css";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("")
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", { email, newpassword, answer });
      if (res.data.status) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title={"Forgot Password - MernMart"}>
      <div className="form-container">
        <h4 className="title">Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter your secret answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your New password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-check"></div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
