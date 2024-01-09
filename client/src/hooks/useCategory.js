import { useEffect, useState} from 'react';
import axios from 'axios';

export default function useCategory () {
    const [categories,setCategories] = useState([]);

    //get categories
    const getCategories = async () => {
        try{
            const {data} = await axios.get('http://localhost:4000/api/v1/category/get-category');
            setCategories(data?.category);
        }catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        getCategories();
    },[]);
    //we want to globally use this state from anywhere
    return categories;
};
