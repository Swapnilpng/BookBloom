import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import "./Favourites.css";
import favoriteImage from "../../assets/favorite.png";
const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-book",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };

    fetchFavourites();
  }, [refresh]);

  const handleRemoveBook = async (bookId) => {
    try {
      await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        null,
        {
          headers: { ...headers, bookid: bookId },
        }
      );
      setFavouriteBooks(favouriteBooks.filter((book) => book._id !== bookId));
      setMessage("Book removed from favourites");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error removing book from favourites", error);
    }
  };

  return (
    <div className="favouriteBooks-container">
      <h1 className="favourites-heading">Favourites</h1>
      <div className="favouriteBooks">
        {favouriteBooks.length > 0 ? (
          favouriteBooks.map((book) => (
            <div key={book._id}>
              <BookCard
                data={book}
                showButton={true}
                onRemove={() => handleRemoveBook(book._id)}
              />
            </div>
          ))
        ) : (
          <div className="no-favourites">
            <p>No favourite books found.</p>
            <img src={favoriteImage} alt="No favourites" />
          </div>
        )}
      </div>
      {message && <div className="message-bottom">{message}</div>}
    </div>
  );
};

export default Favourites;
