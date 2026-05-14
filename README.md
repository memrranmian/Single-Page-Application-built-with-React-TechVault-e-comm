# ⚡ TechVault — Single Page Application built with React

A modern, premium **e-commerce Single Page Application (SPA)** built with **React**. TechVault lets users explore, search, and filter tech products fetched from a live API, add them to a global cart, and checkout — all without a single page reload.

> **NAVTTC Final Project — 2026**

---

## 🖥️ Live Preview

![TechVault Screenshot](./docs/screenshot.png)

---

## 📋 Project Overview

TechVault is a fully functional front-end e-commerce app that demonstrates core React concepts through a real-world product browsing and shopping experience. The application contains **4 main pages** with smooth client-side navigation, API integration, dynamic rendering, and global state management.

### ✅ Requirements Fulfilled

| Requirement                        | Implementation                                              |
| ---------------------------------- | ----------------------------------------------------------- |
| Single Page Application (SPA)      | React + Vite — no full page reloads                         |
| At least 4 pages/components        | Home, Products, Explore, Cart (+ Navbar, Footer, etc.)      |
| React Router DOM                   | Client-side routing with `BrowserRouter`, `Routes`, `Route` |
| Functional Components              | All components are functional (no class components)         |
| Props                              | `ProductCard` and `LoadingSpinner` receive data via props   |
| Event Handling (onClick, onChange)  | Search input, filter buttons, add-to-cart, form validation  |
| API Integration (Axios)            | Fetches products & categories from FakeStore API            |
| Context API (Global State)         | `CartContext` — shared cart state across all pages           |
| Dynamic Rendering (map)            | Product cards, table rows, categories — all rendered via `map()` |

---

## 📄 Pages & Components

### 1️⃣ Home Page (`/`)
- **Entry point** of the application with navigation links to all pages
- Hero section with animated floating category cards
- Features section rendered dynamically using `map()`
- Tech stack showcase highlighting the tools used

### 2️⃣ Products Page (`/products`)
- Fetches **8 products** from the [FakeStore API](https://fakestoreapi.com/) using **Axios**
- Displays products in a **structured table** (image, title, category, price, rating)
- Click **"View Details"** to open a modal with full product information
- Add products to cart directly from the modal

### 3️⃣ Explore Page (`/explore`)
- Fetches **all products** and **categories** via parallel Axios API calls
- **Search bar** with real-time filtering (`onChange` event)
- **Category filter buttons** to filter by product type (`onClick` event)
- Products rendered as **reusable `ProductCard` components** receiving data via **props**
- Results count updates dynamically

### 4️⃣ Cart Page (`/cart`)
- Cart state managed globally via **Context API** (`CartContext`)
- Displays cart items with quantity controls (+/−) and remove buttons
- **Checkout form** with full **event handling**:
  - `onChange` — live input tracking
  - `onClick` — form submission
  - Client-side **form validation** (name, email, address, phone)
- Order success confirmation screen

---

## 🛠️ Tech Stack

| Technology       | Purpose                                |
| ---------------- | -------------------------------------- |
| **React 19**     | UI library (functional components, hooks) |
| **React Router DOM 7** | Client-side SPA routing           |
| **Axios**        | HTTP client for API calls              |
| **Context API**  | Global state management (cart)         |
| **Vite**         | Build tool & dev server                |
| **Vanilla CSS**  | Custom styling with CSS variables      |

---

## 📁 Project Structure

```
NAVTTC Final Project/
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
└── src/
    ├── main.jsx                # App entry — BrowserRouter + CartProvider
    ├── App.jsx                 # Route definitions
    ├── index.css               # Global styles (dark theme, animations)
    ├── context/
    │   └── CartContext.jsx      # Context API — global cart state
    ├── components/
    │   ├── Navbar.jsx           # Navigation bar with cart badge
    │   ├── Footer.jsx           # Footer with links
    │   ├── ProductCard.jsx      # Reusable product card (props)
    │   └── LoadingSpinner.jsx   # Loading indicator
    └── pages/
        ├── Home.jsx             # Page 1 — Landing / Hero
        ├── Products.jsx         # Page 2 — API data table + modal
        ├── Explore.jsx          # Page 3 — Dynamic cards + filters
        └── Cart.jsx             # Page 4 — Cart + checkout form
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/memrranmian/Single-Page-Application-built-with-React-TechVault-e-comm.git

# 2. Navigate into the project
cd Single-Page-Application-built-with-React-TechVault-e-comm

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173/**

---

## 🌐 API Used

This project uses the **[FakeStore API](https://fakestoreapi.com/)** — a free REST API for e-commerce prototyping.

| Endpoint                              | Usage                         |
| ------------------------------------- | ----------------------------- |
| `GET /products`                       | Fetch all products            |
| `GET /products?limit=8`              | Fetch limited products        |
| `GET /products/categories`           | Fetch all product categories  |

---

## 🎨 Design Features

- 🌙 **Dark theme** with premium glassmorphism effects
- 🎭 **Smooth animations** — fade-in, float, pulse, hover effects
- 📱 **Fully responsive** — works on desktop, tablet, and mobile
- 🎯 **Modern typography** — Inter font from Google Fonts
- ✨ **Gradient accents** and subtle glow effects
- 🍔 **Hamburger menu** for mobile navigation

---

## 📝 Key React Concepts Demonstrated

```
✔ Functional Components      ✔ useState & useEffect Hooks
✔ Props (data passing)        ✔ Context API (global state)
✔ React Router DOM            ✔ Client-side Navigation
✔ Axios API Calls             ✔ Event Handling (onClick, onChange)
✔ Dynamic Rendering (map)     ✔ Conditional Rendering
✔ Form Handling & Validation  ✔ Custom Hooks (useCart)
```

---

## 👤 Author

**Muhammad Imran MianNAVTTC Final Project — MERN Stack Program 2026**

---

## 📄 License

This project is created for educational purposes as part of the NAVTTC program.
