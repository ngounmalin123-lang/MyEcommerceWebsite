import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './page/HomePage';
import AllProductPage from './page/ProductPage';
import ViewDetailProductPage from './page/ViewDetailProductPage';
import AboutPage from './page/AboutPage';
import ContactPage from './page/ContactPage';
import CartPage from './page/CartPage';
import SearchProductPage from './page/SearchProductPage';
import NotFoundPage from './page/NotFoundPage';
import AccountPage from './page/AccountPage';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/all-products" element={<AllProductPage />} />
            <Route path="/product/:id" element={<ViewDetailProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchProductPage />} />
            <Route path="/account" element={<AccountPage />} />
            {/* 404 Not Found - Must be last */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;