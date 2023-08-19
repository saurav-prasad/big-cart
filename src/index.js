import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserState } from './context/UserState';
import userReducer, { userInitialState } from './context/UserReducer';
import { ProductState } from './context/products/ProductState';
import productReducer, { productInitialState } from './context/products/ProductReducer';
import { CartState } from './context/cart/CartState';
import { WishListState } from './context/wishList/WishListState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductState initialState={productInitialState} reducer={productReducer}>
      <UserState initialState={userInitialState} reducer={userReducer}>
        <CartState>
          <WishListState>
            <App />
          </WishListState>
        </CartState>
      </UserState>
    </ProductState>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
