import { useContext } from "react";

import { CartContext } from "../../contexts/cart.contexts";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div>Product</div>
        <div>Description</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Remove</div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem checkoutItem={cartItem} key={cartItem.id}></CheckoutItem>
      ))}
      <div className="total">Total {cartTotal}</div>
    </div>
  );
};

export default Checkout;
