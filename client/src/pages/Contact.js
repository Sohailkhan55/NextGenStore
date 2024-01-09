import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const Contact = () => {
  return (
    <Layout title={'Contact Us'}>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <div className="contact-content">
              <h1 className="bg-dark p-2 text-white text-center mb-4">CONTACT US</h1>
              <p className="text-justify">
                If you have any questions or need assistance with our products,
                feel free to contact us. Our support team is available 24/7 to
                assist you.
              </p>
              <p className="mt-3">
                <BiMailSend /> : <a href="mailto:khanshail33624@gmail.com">help@ecommerceapp.com</a>
              </p>
              <p className="mt-3">
                <BiPhoneCall /> : <a href="tel:+0123456789">012-3456789</a>
              </p>
              <p className="mt-3">
                <BiSupport /> : 1800-0000-0000 (toll-free)
              </p>

              {/* Social Media Icons */}
              <div className="social-icons mt-4">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} style={{ marginRight: "10px", color: "red" }} />
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={30} style={{ marginLeft: "10px", color: "red" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
