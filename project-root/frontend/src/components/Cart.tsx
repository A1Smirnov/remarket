// src/components/Cart.tsx

import React from 'react';
import { useCart } from '../pages/context/CartContext';

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
  
    const handleQuantityChange = (id: string, quantity: number) => {
      updateQuantity(id, quantity);
    };
  
    const handleRemoveFromCart = (id: string) => {
      removeFromCart(id);
    };
  
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };
  
    if (cart.length === 0) return <div>Your cart is empty</div>;
  
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.imageUrl} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
              />
              <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h3>Total: ${calculateTotal()}</h3>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    );
  };
  
  export default Cart;
