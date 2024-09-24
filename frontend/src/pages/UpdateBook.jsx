import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateBook.css";

const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
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
  return (
    <div className="UpdateBookBox">
      <h1 className="Update-Book">Update Book</h1>
      <div className="FormGroup">
        <label className="AddBookLabel">Image</label>
        <input
          type="text"
          className="BookImgInput AddBookInput"
          placeholder="URL of image"
          name="url"
          required
          value={Data.url}
          onChange={change}
        />
      </div>
      <div className="FormGroup">
        <label className="AddBookLabel">Title of book</label>
        <input
          type="text"
          className="TitleOfBookInput AddBookInput"
          placeholder="Title of book"
          name="title"
          required
          value={Data.title}
          onChange={change}
        />
      </div>
      <div className="FormGroup">
        <label className="AddBookLabel">Author of book</label>
        <input
          type="text"
          className="AuthorOfBookInput AddBookInput"
          placeholder="Author of book"
          name="author"
          required
          value={Data.author}
          onChange={change}
        />
      </div>
      <div className="FormGroup">
        <label className="AddBookLabel">Language</label>
        <input
          type="text"
          className="LanguageOfBookInput AddBookInput"
          placeholder="Language of book"
          name="language"
          required
          value={Data.language}
          onChange={change}
        />
      </div>
      <div className="FormGroup">
        <label className="AddBookLabel">Price of book</label>
        <input
          type="number"
          className="PriceOfBookInput AddBookInput"
          placeholder="Price of book"
          name="price"
          required
          value={Data.price}
          onChange={change}
        />
      </div>
      <div className="FormGroup">
        <label className="AddBookLabel">Description of book</label>
        <textarea
          className="DescriptionOfBookInput AddBookInput"
          placeholder="Description of book"
          name="desc"
          required
          value={Data.desc}
          onChange={change}
        />
      </div>
      <button className="BookSubmitButton" onClick={submit}>
        Update Book
      </button>
    </div>
  );
};

export default UpdateBook;
