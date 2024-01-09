import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import {Helmet} from "react-helmet";
//import { Toaster } from 'react-hot-toast';


const Layout = ({ children,title,description,keywords,author }) => {   //directly destructuring children without props
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
     
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
   

        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "70vh" }}>
        {/* <Toaster /> */}
        {children}</main>
      {/* inline style */}
      <Footer />
    </div>
  );
};

//Default props for all pages/components
Layout.defaultProps = {
  title : 'Ecommerce app - shop now',
  description : 'Mern Stack Project',
  keywords : 'Mern,MongoDb,Express,React,Node',
  author : 'SohailKhan'
}

export default Layout;
