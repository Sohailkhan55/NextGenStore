import  Layout  from './../components/Layout/Layout'
import React from 'react';
import { useSearch } from '../context/search';

const Search = () => {
    const [values,setValues] = useSearch();



      // Helper function to truncate text and append dots
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  return (
    <Layout title={'Search results'}>
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{values?.results.length < 1 ? 'No Products Found': `Found ${values?.results.length} items`}</h6>
                <div className="d-flex flex-wrap mt-4">
          {values?.results.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{truncateText(p.description, 30)}</p>
                    <p className="card-text">₹ {p.price}</p>
                    <button class="btn btn-primary ms-1">More Details</button>
                    <button class="btn btn-secondary ms-1">Add to Cart</button>
                    
                  </div>
                </div>
            ))}
          </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search