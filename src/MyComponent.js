import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function MyComponent() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch data from your backend API with pagination support.
    // Make sure to pass the current page and the number of items per page as query parameters.
    axios.get(`/api/data?page=${currentPage}&perPage=10`)
      .then((response) => {
        setData(response.data.items);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Display your paginated data here */}
      {data.map((item) => (
        // Render each item from the fetched data
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Render the Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default MyComponent;
