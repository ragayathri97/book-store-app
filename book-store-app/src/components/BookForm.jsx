import React, {useState, useEffect} from 'react';
import { Await } from 'react-router-dom';
const BookForm =({book, onBookUpdated, onBookAdded})=>{
    const[ name, setName ]=useState('');
    const[category, setCategory]=useState('');
    const [ Price, setPrice ]=useState('');
    const [ error, setError ]=useState(null);

    useEffect(()=>{
        if(book){
            setName(book.name ||'');
            setCategory(book.category ||'');
            setPrice(book.Price ||'');
        } else{
            setName('');
            setCategory('');
            setPrice('');
        }
    },[book]);

    const handleSubmit= async(e)=>{
        e.preventDefault();
        setError(null);

        try{
            const method = book? 'PUT':'POST';
            const url = book? '/api/books/${book.id}' :'api/books';

            const response = await fetch (url,{
                method: method,
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({name,category,Price}),
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save book');
            }

            const savedBook= await response.json();
            if(book){
                onBookUpdated(savedBook);
            } else{
                onBookAdded(savedBook);
            }
        } catch(err){
            setError(err.message);
        }
    };

    return(
        <div>
            <h2>{book? 'Edit Book': 'Add New Book'}
            </h2>

            {error && <p style={{color:'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder='Name'
                value={name}
                onChange={(e)=>setCategory(e.target.value)}
                required />

                <input type="number"
                placeholder='Price'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                required />
                <button type="submit">{book? 'Update Book':'Add Book'}</button>
            </form>
        </div>
    );
};
export default BookForm;