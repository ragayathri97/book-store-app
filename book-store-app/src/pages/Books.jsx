import React, { useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import BookForm from '../components/BookForm'

const Books = () => {
    const [ books,setBooks ]=useState([]);
    const [ loading,setLoading ]=useState(true);
    const [ error, setError]=useState(null);
    const [ SearchParams, setSearchParams]=useSearchParams();
    const [ sort, setSort ]=useState('');
    const [ currentPage, setCurrentPage ]=useState(1);
    const [showForm, setShowForm]=useState(false);
    const [ editingBook, setEditingBook ]= useState(null);

    useEffect(() =>{
        const fetchBooks= async() => {
            try{
                const params = new URLSearchParams();

                if (sort) params.append('sort,sort')
                    if(categoryFilter)params.append('category',categoryFilter);
                if(currentPage){
                    params.append('page', currentPage);
                    params.append('limit', booksPerPage);
                }
                
                const response=await fetch('api/books?${params.toString()}');
                if(!response.ok){
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data);

                if(currentPage){
                    setTotalPages(Math.ceil(data.lenght/booksPerPage));
                } else {
                    setTotalPages(1);
                }
            } catch (err){
                setError(err);
            } finally{
                setLoading(false);
            }
        };

        fetchBooks();
    },[sort, categoryFilter, currentPage, booksPerPage]);

    const handleSortChange = (e) =>{
        setSort(e.target.value);
        setCurrentPage(1)
    };

    const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange=(page) =>{
        setCurrentPage(page);
    };
    
    const handleBookAdded = (newBook) =>{
        setBooks([...books,newBook]);
        setShowForm(false);
    };

    const handleEditClick = (book) =>{
        setEditingBook(book);
    };

    const handleBookUpdate = (updatedBook) =>{
        setBooks(
            books.map((book) => (book.id === updatedBook.id? updatedBook:books))
        );
        setEditingBook(null);
    };

    const handleDeleteClick = async(bookld) =>{
        try{
            const response = await fetch('api/books/${bookld}',{
                method:'DELETE',
            });

            if(!response.ok){
                const errorData=await response.json();
                throw new Error (errorData.message || 'Failed to delete book');
            }

            setBooks(books.filter((book) => book.id !== bookId));

            if(books.length === booksPerPage && currentPage>1){
                setCurrentPage(currentPage-1);
            }

        } catch (err){
            console.error("Error deleting book:",err);
            alert("Error deleting book. Please try again later.")
        }
    };

    if(loading){
        return <div>Loading books...</div>
    }
     
    if(error){
        return <div>Error:{error.message}</div>
    }

    return(
        <div>
            <h1>Book List</h1>
            <label htmlFor = "sort">Sort By:</label>
            <select id= "sort" value={sort} onChange={handleSortChange}>
                <option value="">None</option>
                <option value="title">Alphabetical (A-Z)</option>
                <option value="price_asc">Price (Low to Hight)</option>
                <option value="price_desc">Price (High to Low)</option>
            </select>

            <label htmlFor="category">Category:</label>
            <select id="category" value={categoryFilter}
            onChange={handleCategoryFilterChange}>
                <option value="">All Categories</option>
                {}
            </select>

            {books.map((book) =>(
                <div key={book.id}>
                    <h2>{book.title}</h2>
                    <p>Author:{book.author}</p>
                    <button onClick={()=>handleEditClick(book)}>Edit</button>
                    <button onClick={()=>handleDeleteClick(book)}>Delete</button>
        </div>
            ))}
    

    {
        currentPage &&(
            <div>
                <button onClick={() =>
                    handlePageChange(currentPage-1)}
                    disabled={currentPage===1}>
                        Previous
                    </button>

                    <button onClick={() =>
                    handlePageChange(currentPage+1)}
                    disabled={currentPage===totalPages}>
                        Next
                    </button>
            </div>
        )}

        <button onClick={()=>setShowForm(true)}>Add New Book</button>

        {
            editingBook?(
                <BookForm book={editingBook}
                onBookUpdate={handleBookUpdated} />
            ):(
                showForm && <BookForm onBookAdded={ handleBookAdded} />
        )}
</div>
    );
};
export default Books;