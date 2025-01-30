import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <h1>Welcome to the Book Store</h1>
        <p>Explore our collection of amazing books.</p>
        <Link to = "/books">View Books</Link>
    </div>
);
};

export default Home;