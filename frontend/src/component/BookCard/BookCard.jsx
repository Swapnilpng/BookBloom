import React from "react";
import "./BookCard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, showButton = false, onRemove }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        { bookId: data?._id },
        { headers }
      );
      console.log(response.data.message);

      if (onRemove) onRemove();
    } catch (error) {
      console.error("Error removing book from favourites", error);
    }
  };

  return (
    <div className="book-card-container">
      <Link to={`/view-book-details/${data?._id}`} className="book-link">
        <div className="book">
          <div className="image">
            <img src={data?.url} alt={data?.title} />
          </div>
          <h2 className="booktitle">{data?.title}</h2>
          <p className="author">by {data?.author}</p>
          <p className="price">₹ {data?.price}</p>
        </div>
      </Link>
      {showButton && (
        <button className="remove-favourite" onClick={handleRemoveBook}>
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
