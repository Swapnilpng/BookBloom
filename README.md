# BookBloom Full-Stack Project

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)

## Introduction
This is a full-stack bookstore project that allows users to browse, and purchase books. It includes functionalities like adding books to the cart, managing orders, and viewing order history. Admins can manage inventory, add new books, and handle user orders.

## Features
- **User Features:**
  - Browse books
  - Add and remove books from the cart
  - Place orders and view order history
  - View recently added books

- **Admin Features:**
  - Manage books (add, edit, delete)
  - View and manage all user orders
  - View recently added orders

## Technologies Used
### Frontend
- React (with Vite)
- React Router for routing
- Axios for API requests
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB for database management

### Other Tools
- Redux for state management
- Authentication with JWT

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Swapnilpng/Project.git
API Endpoints
This section outlines the API endpoints used in the backend.

### API Endpoints
GET /api/books - Retrieve a list of all available books.
GET /api/books/:id - Retrieve detailed information about a specific book.
POST /api/cart - Add a book to the cart.
DELETE /api/cart/:id - Remove a specific book from the cart.
POST /api/orders - Place an order with the books in the cart.
GET /api/orders - Fetch order history for the logged-in user.
Admin Endpoints
POST /api/books - Add a new book to the inventory.
PUT /api/books/:id - Update the details of an existing book.
DELETE /api/books/:id - Remove a book from the inventory.
GET /api/orders - View all orders placed by users.
PUT /api/orders/:id/status - Update the status of a specific order.

### Future Improvements

Potential enhancements for the project:

User Reviews and Ratings: Allow users to rate and review books.
Wishlist: Introduce a wishlist feature where users can save books for future purchase.
Advanced Search: Implement filters (e.g., by genre, author, price) to enhance search functionality.
User Profiles: Allow users to update their profiles and view order history in more detail.
Admin Dashboard: Create a comprehensive dashboard for admins to manage inventory and orders.
