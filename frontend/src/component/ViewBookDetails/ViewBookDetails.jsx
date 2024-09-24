import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import "./ViewBookDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const deleteBook = async () => {
    const response = await axios.delete(
      "http://localhost:1000/api/v1/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };
  return (
    <div className="ViewBookDetails">
      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="content">
          <div className="imageSection">
            <div className="Book">
              <img src={data.url} alt={data.title} />
            </div>
            {isLoggedIn === true && role === "user" && (
              <div className="buttons">
                <button className="Heart" onClick={handleFavourite}>
                  <FaHeart />
                </button>
                <button className="Cart" onClick={handleCart}>
                  <FaCartShopping />
                </button>
              </div>
            )}
            {isLoggedIn === true && role === "admin" && (
              <div className="buttons">
                <Link to={`/updateBook/${id}`} className="Edit-book">
                  <FaEdit />
                </Link>
                <button className="delete-book" onClick={deleteBook}>
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
          <div className="bookDetails">
            <h1 className="Title">{data.title}</h1>
            <p className="Author">{data.author}</p>
            <p className="Desc">{data.desc}</p>
            <p className="Language">
              <GrLanguage className="language-icon" />
              {data.language}
            </p>
            <p className="Price">Price : ₹ {data.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBookDetails;
