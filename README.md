# E-Commerce App with MERN Stack

## Overview

Explore the world of online shopping with our feature-rich E-Commerce App, developed using the MERN (MongoDB, Express.js, React, Node.js) stack. This comprehensive platform caters to both sellers and buyers, offering a seamless and secure online shopping experience.

## Key Features

1. **User Authentication and Registration:**
   - Secure account creation and login using email and password.
   - Utilizes JSON Web Tokens (JWT) for authentication and bcrypt for password hashing.

2. **Products Exploration:**
   - Browse through a diverse range of products.
   - Robust search functionality for quick item discovery.
   - Filters such as price range and category for a refined shopping experience.

3. **Cart Management:**
   - User-friendly cart page for reviewing and managing items.
   - "Add to Cart" button on each product for easy inclusion.

4. **Checkout Process:**
   - Streamlined checkout page for finalizing orders.
   - Option to provide delivery details and choose a payment method.

5. **Payment Integration:**
   - Secure payment processing through PayPal.
   - Integration with PayPal Brain Tree for enhanced payment functionality.
   - Option to save payment information for future orders.

6. **Responsive Design:**
   - Seamlessly responsive design for a consistent experience on various devices.

7. **Profile Page:**
   - Users can personalize their profiles by updating their name and address.
   - Enhanced security with a password update feature.

8. **Dashboard:**
   - View all orders and update profile information.
   - Efficient management of user-related tasks.

9. **Admin Features - Food Management:**
   - Add, edit, and delete food items to maintain an up-to-date menu.
   - Create new products and categories for a dynamic selection.

10. **Admin Features - User Management:**
    - View and edit user details.
    - Create new products and categories for a dynamic selection.

11. **Admin Features - Order Management:**
    - View all orders and change delivery status (delivered, processing, etc.).

## Installation

To run the application locally, follow these steps:

1. **Clone the Repository:**

    ```bash
    git clone [repository-url]
    ```

2. **Frontend Setup:**

    1. Navigate to the frontend folder:

        ```bash
        cd client
        ```

    2. Install dependencies:

        ```bash
        npm install
        ```

    3. Run the application:

        ```bash
        npm start
        ```

3. **Backend Setup:**

    1. Navigate to the backend folder:

        ```bash
        cd backend
        ```

    2. Install dependencies:

        ```bash
        npm install
        ```

    3. Start the server:

        ```bash
        npm start
        ```

4. **Connect to MongoDB:**

    1. Create a MongoDB Atlas account: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
    2. Update the connection details in the `.env` file located in the 'backend' directory:

        ```env
        DB_CONNECTION_STRING=<Your MongoDB Connection String>
        JWT_SECRET=<Your JWT Secret Key>
        ```

        Replace `<Your MongoDB Connection String>` and `<Your JWT Secret Key>` with your MongoDB connection string and a secret key for JWT.

Now, you're all set to run the E-Commerce App locally. Open your web browser and go to [http://localhost:4000](http://localhost:4000) to explore the application.
## Things to Learn

<details>
  <summary>JWT (JSON Web Tokens)</summary>
  
  - **Concept of JWT:**
    - Understand the structure and purpose of JSON Web Tokens (JWT) in the context of web applications.
    
  - **Secure User Authentication:**
    - Learn how JWT is used for secure user authentication, including the generation, verification, and decoding of tokens.

</details>

<details>
  <summary>Context API</summary>
  
  - **State Management:**
    - Understand the role of the Context API in managing global state within a React application.
    
  - **Data Propagation:**
    - Explore how the Context API facilitates the propagation of data to components without the need for prop drilling.

</details>

<details>
  <summary>Authenticated Routes and Hashing of Password</summary>
  
  - **Authenticated Routes:**
    - Learn how to implement authenticated routes to restrict access to certain parts of a web application based on user authentication.

  - **Hashing of Password:**
    - Explore the importance of password hashing for security and learn how to implement password hashing in a web application.

</details>

<details>
  <summary>Brain Tree</summary>
  
  - **Payment Processing:**
    - Understand how Brain Tree can be integrated into web applications for secure and reliable payment processing.

  - **Payment Gateway Integration:**
    - Learn the steps involved in integrating Brain Tree as a payment gateway in your application.

</details>

<details>
  <summary>Slugify</summary>
  
  - **URL Slug Creation:**
    - Explore the concept of slugify and how it is used to generate URL-friendly slugs from user-provided content.

  - **SEO-Friendly URLs:**
    - Understand the importance of creating SEO-friendly URLs using slugify for better search engine optimization.

</details>

