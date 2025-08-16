import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const loadCart = () => {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const loadWishlist = () => {
  try {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cartItems: loadCart(),
  wishlist: loadWishlist(),
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotals = (cartItems) => {
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  return { totalQuantity, totalPrice };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        i => i.id === item.id && i.name === item.name && i.size === item.size
      );

      const updatedCartItems = existingItem
        ? state.cartItems.map(i =>
            i.id === item.id && i.name === item.name && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...state.cartItems, item];

      const totals = calculateTotals(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        ...totals,
      };
    }

    case 'REMOVE_FROM_CART': {
      const { id, name, size } = action.payload;
      const updatedCartItems = state.cartItems.filter(
        item => !(item.id === id && item.name === name && item.size === size)
      );
      const totals = calculateTotals(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        ...totals,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, name, size, quantity } = action.payload;
      const updatedCartItems = state.cartItems.map(item =>
        item.id === id && item.name === name && item.size === size
          ? { ...item, quantity }
          : item
      );
      const totals = calculateTotals(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        ...totals,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        totalQuantity: 0,
        totalPrice: 0,
      };

    case 'TOGGLE_WISHLIST': {
      const item = action.payload;
      const exists = state.wishlist.some(
        i => i.id === item.id && i.name === item.name
      );
      const updatedWishlist = exists
        ? state.wishlist.filter(i => !(i.id === item.id && i.name === item.name))
        : [...state.wishlist, item];
      return {
        ...state,
        wishlist: updatedWishlist,
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id, name, size) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, name, size } });
  };

  const updateQuantity = (id, name, size, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, name, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleWishlist = (item) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: item });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        wishlist: state.wishlist,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
