import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

 const BookDetail=()=>{
    const {id} = useParams();
    const[ book,setBook ]=useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error,setError]= useState(null);

    useEffect(()=>{
        const fetchBook = async()=>{
            try{
                const response=await fetch ('/api/books/${id}');
            
                if(!response.ok){
                    const errorData=await response.json();
                    throw new Error (errorData.message || 'Failed to fetch book')
                }
                const data = await response.json();
                setBooks(data);
            } catch (err){
                setError(err.message)
            }
            finally{
                setLoading(false);
            }
        }
    })

 

 return(
    <div>
        <h1>{book.name}</h1>
        <p>Category:{book.category}</p>
        <p>Price:{book.price}</p>
        {}
    </div>
 );
};
export default BookDetail;