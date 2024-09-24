import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("role:", role);
  }, [isLoggedIn, role]);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  if (isLoggedIn) {
    if (role === "user") {
      links.push({ title: "Cart", link: "/cart" });
    }

    if (role === "user") {
      links.push({ title: "Profile", link: "/profile" });
    } else if (role === "admin") {
      links.push({ title: "Admin Profile", link: "/profile" });
    }
  }

  return (
    <nav className="Navbar">
      <Link to="/" className="container">
        <img src="../images/book.png" alt="logo" />
        <h1>BookBloom</h1>
      </Link>
      <button className="small-button" onClick={toggleMenu}>
        <FaGripLines />
      </button>
      <div
        className={`nav-links-BookBloom dropdown ${isMenuOpen ? "show" : ""}`}
      >
        {links.map((item, i) => (
          <Link to={item.link} className="nav-link" key={i} onClick={closeMenu}>
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link to="/LogIn" className="nav-link LogIn" onClick={closeMenu}>
              Log In
            </Link>
            <Link to="/SignUp" className="nav-link SignUp" onClick={closeMenu}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
