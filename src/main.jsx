import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';   // ✅ Import AuthProvider
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>          {/* ✅ Provide Auth Context */}
      <CartProvider>        {/* ✅ Provide Cart Context */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
