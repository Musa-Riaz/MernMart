import {useState, useEffect} from 'react';
import axios from 'axios'

export default function useCategory(){
    const [categories, setCategories] = useState([]);

    //get cat

    const getCategories = async ()=>{
        try{
            const {data} = await axios.get('/api/v1/category/get-all-category');
            setCategories(data?.category);
        }
        catch(err){
            console.log(err);
        }
    
    }

    useEffect(()=>{
        getCategories();

    }, [])

    return categories;
}

