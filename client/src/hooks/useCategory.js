import { useEffect, useState} from 'react';
import axios from 'axios';//custom hook

export default function useCategory () {
    const [categories,setCategories] = useState([]);

    //get categories
    const getCategories = async () => {
        try{
            const {data} = await axios.get('/api/v1/category/get-category');
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
