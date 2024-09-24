import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecentlyAdded.css";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-recent-books"
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
    <div className="RecentlyAdded">
      <h4>Recently added books</h4>

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

export default RecentlyAdded;
