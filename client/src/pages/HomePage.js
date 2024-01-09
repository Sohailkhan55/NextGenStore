import React,{useState,useEffect} from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import axios from 'axios';
import {Checkbox,Radio} from 'antd';
import { Prices } from "../components/Prices";
import "../styles/Homepage.css";
const HomePage = () => {
  const navigate = useNavigate();
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const [cart,setCart] = useCart();



    // get all category
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/v1/category/get-category');
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
      
      }
    };
  
    useEffect(() => {
      // for lifecycle
      getAllCategory();  //we will get it at initial time
      getTotal();
    }, []);

  //get products
  const getAllProducts = async () => {
    try{
      setLoading(true);
      const {data} = await axios.get(`http://localhost:4000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    }catch(error){
      setLoading(false);
      console.log(error);
    }
  };

    //getTotal count
    const getTotal = async () => {
      try{
        const{data} = await axios.get('http://localhost:4000/api/v1/product/product-count');
        setTotal(data?.total);
      }catch(error){
        console.log(error)
      }
    };

  useEffect(() => {
    if(page === 1 ){
      return;
    }
      loadMore();
  },[page]);

  //load more
  const loadMore = async () => {
    try{
      setLoading(true);
      const {data} = await axios.get(`http://localhost:4000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products,...data?.products]);
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  // filter by cat
  const handleFilter = (value,id) => {
      let all = [...checked]; //all checled values will be stored in all, let bcoz we need to change it
      if(value){
        all.push(id);
      }
      else{
        all = all.filter((c) => c!== id);
      }
      setChecked(all);
  };


  useEffect(() => {
    if(!checked.length || !radio.length){
      getAllProducts();
    }
  },[checked.length,radio.length]);

  useEffect(() => {
    if(checked.length || radio.length){
      filterProduct();
    }
  },[checked,radio])

  //get filtered product
  const filterProduct = async () => {
    try{
      const {data} = await axios.post('http://localhost:4000/api/v1/product/product-filters',{checked,radio});
      setProducts(data?.products)
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
    <Layout title={'All Products - Best offers'}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
          {categories?.map((c) => (
            <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
              {c.name}
            </Checkbox>
          ))}
          </div>
          {/* Price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={() => window.location.reload()}>RESET FILTERS</button>
          </div>


        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
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
                    <button class="btn btn-secondary ms-1" onClick={() => {
                      setCart([...cart,p])
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success('Item Added to Cart')
                      }}>Add to Cart</button>
                    
                  </div>
                </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length<total && (
              <button className="btn btn-warning" onClick={(e) =>{
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
