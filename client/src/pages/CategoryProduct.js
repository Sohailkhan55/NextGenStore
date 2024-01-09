import Layout from '../components/Layout/Layout'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import "../styles/CategoryProductStyles.css";

const CategoryProduct = () => {
  const [products,setProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(params?.slug){
      getProductByCat();
    }
  },[params?.slug]);

  const getProductByCat = async (req,res) => {
    try{
      const {data} = await axios.get(`http://localhost:4000/api/v1/product/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    }catch(error){
      console.log(error);
    }
  }

    // Helper function to truncate text and append dots
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength) + '...';
    }

  return (
    <Layout>
        <div className='container mt-3'>
            <h4 className='text-center'>Category - {category?.name}</h4>
            <h6 className='text-center'>{products?.length} result found</h6>
            <div className='row'>
            <div className="col-md-9">
          <div className="d-flex flex-wrap">
          {products?.map((p) => (
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
                    <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button class="btn btn-secondary ms-1">Add to Cart</button>
                    
                  </div>
                </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length<total && (
              <button className="btn btn-warning" onClick={(e) =>{
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div> */}
        </div>
      </div>
            </div>
        
    </Layout>
  )
}

export default CategoryProduct