import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Helmet} from 'react-helmet';
import  {Toaster} from 'react-hot-toast';
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
    <Helmet>
      <meta charSet = 'utf-8' />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <title>{title}</title>
    </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}
      <Toaster />
      </main>
     
      <Footer />
    </>
  );
};

//SEO features

Layout.defaultProps = {
  title: "Mern Mart- Shop Now",
  description: "Mern stack ecommerce website",
  keywords: "mern, react, node, express, mongodb",
}

export default Layout;
