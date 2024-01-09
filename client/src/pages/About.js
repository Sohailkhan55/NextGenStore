import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title="About us-Ecommerce app">
      <div className="row about-us">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="About Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Welcome to E-Commerce So</h2>
          <p className="text-justify">
            At E-Commerce So, we are more than just an online store. We are a passionate team committed to providing you with the best shopping experience possible. Our journey began with a simple idea – to create a place where people can discover and purchase high-quality products effortlessly.
          </p>
          <p className="text-justify">
            What sets us apart is our dedication to quality, customer satisfaction, and innovation. We curate a diverse range of products, ensuring that every item you find on our platform meets our stringent standards for excellence.
          </p>
          <p className="text-justify">
            Thank you for choosing E-Commerece So for your shopping needs. We appreciate your trust in us and are committed to continually exceeding your expectations. Happy shopping!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
