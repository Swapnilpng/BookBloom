import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../component/Loader/Loader";
import BookCard from "../component/BookCard/BookCard";
import "./AllBooks.css";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-all-book`
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="AllBooks">
      <h4>All books</h4>

      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      <div className="card-container">
        {data.map((item, i) => (
          <BookCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
