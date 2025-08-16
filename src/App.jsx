import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Mainlayout from './layouts/Mainlayout.jsx';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import Product from './pages/Product/Product.jsx';
import ProductCard from './pages/Product/ProductCard.jsx';
import Cart from './components/Cart/Cart.jsx';
import Wishlist from './pages/Wishlist/Wishlist.jsx';
import AccountSettings from './components/MyAccount/AccountSettings.jsx';
import OrderHistory from './components/MyAccount/OrderHistory.jsx';

// Admin pages
import Admin from './layouts/Admin.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Products from './pages/admin/Products.jsx';
import Orders from './pages/admin/Orders.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Routes with layout (NavBar + Footer) */}
        <Route element={<Mainlayout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:category/:index" element={<ProductCard />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Route>


        {/* Admin routes */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
