import Products from './pages/admin/Products.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/client/Login.jsx';
import Signup from './pages/client/Signup.jsx';
import Mainlayout from './layouts/Mainlayout.jsx';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import Product from './pages/Product/Product.jsx';
import ProductCard from './pages/Product/ProductCard.jsx';
import Cart from './components/Cart/Cart.jsx';
import Wishlist from './pages/Wishlist/Wishlist.jsx';

// Admin pages
import Admin from './layouts/Admin.jsx';
import AdminMiddleware from './middleware/AdminMiddleware.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Orders from './pages/admin/Orders.jsx';
import TshirtCustomize from './konvaCanvas/TshirtCustomize.jsx';
import PageTransition from './layouts/PageTransition.jsx';
import UserLayout from './layouts/UserLayout.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageTransition />} >
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/canvas' element={<TshirtCustomize />}></Route>
        </Route>
          {/* Routes with layout (NavBar + Footer) */}
          <Route element={<Mainlayout />}>
            <Route path='/home' element={<HomePage />} />
            <Route element={<PageTransition />} >
              <Route path="/products" element={<Product />} />
              <Route path="/product/:category/:index" element={<ProductCard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />  
              <Route path="/user" element={<UserLayout/>} />  
            </Route>
        </Route>


          {/* Admin routes */}
          <Route element={<AdminMiddleware />} >
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
