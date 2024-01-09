import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" , marginTop: "150px"}}
            />
          </div>
          <div className="col-md-6">
            <div className="privacy-policy-content">
              <h2>Privacy Policy</h2>
              <p>
                This Privacy Policy governs the manner in which E-Commerce So collects, uses, maintains, and discloses information
                collected from users  of the 
                website .
              </p>

              <h3>Personal Identification Information</h3>
              <p>
                We may collect personal identification information from Users
                in a variety of ways, including, but not limited to, when Users
                visit our site, register on the site, place an order, subscribe
                to the newsletter, respond to a survey, fill out a form, and in
                connection with other activities, services, features, or
                resources we make available on our Site.
              </p>

              {/* Add more sections based on your specific practices */}

              <h3>How We Use Collected Information</h3>
              <p>
                E-Commerce So may collect and use Users personal
                information for the following purposes:
              </p>
              <ul>
                <li> To improve customer service</li>
                <li> To personalize user experience</li>
                <li> To process payments</li>
                <li> To send periodic emails</li>
              </ul>

              <h3>How We Protect Your Information</h3>
              <p>
                We adopt appropriate data collection, storage, and processing
                practices and security measures to protect against unauthorized
                access, alteration, disclosure, or destruction of your personal
                information, username, password, transaction information, and
                data stored on our Site.
              </p>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
