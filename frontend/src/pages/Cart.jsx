import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Loader from "../component/Loader/Loader";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [Total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-user-cart",
          { headers }
        );
        setCart(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const total = Cart.reduce((sum, item) => sum + item.price, 0);
      setTotal(total);
      setItemCount(Cart.length);
    };

    calculateTotal();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    try {
      const prevCart = [...Cart];
      setCart(prevCart.filter((item) => item._id !== bookid));
      setMessage("Item removed from cart.");

      const res = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      setCart(prevCart);
      setMessage("Failed to remove item from cart.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/order-history");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (Cart.length === 0) {
    return (
      <div className="Cart-Container">
        <h1>Empty Cart</h1>
        <img src="src/assets/empty-cart.png" alt="empty cart" />
      </div>
    );
  }

  return (
    <div className="Cart-Container">
      <h1>Your Cart</h1>
      {message && <div className="notification">{message}</div>}
      <div className="cart-grid">
        {Cart.map((item, i) => (
          <div className="cart-data" key={i}>
            <img src={item.url} alt={item.title} />
            <h2 className="Items-Title">{item.title}</h2>
            <p className="Item-desc">
              {item.desc?.slice(0, 100) || "No description available"}...
            </p>
            <div>
              <h2 className="Items-price"> ₹ {item.price}</h2>
              <button
                className="delete-btn"
                onClick={() => deleteItem(item._id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="Cart-Summary">
        <h2>Total Price: ₹ {Total}</h2>
        <h3>Total Items: {itemCount}</h3>
        <button className="place-order-btn" onClick={placeOrder}>
          Place Your Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
