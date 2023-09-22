import { useContext } from "react";

import { CartContext } from "../../contexts/cart.contexts";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ checkoutItem }) => {
  const { imageUrl, name, quantity, price } = checkoutItem;
  const { addItemToCart, removeItemfromCart, clearItemfromCart } =
    useContext(CartContext);

  const addItemHandler = () => addItemToCart(checkoutItem);
  const removeItemHandler = () => removeItemfromCart(checkoutItem);
  const clearItemHandler = () => clearItemfromCart(checkoutItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &lt;
        </div>
        <div className="value">{quantity}</div> {/* Arrows in bold*/}
        <div className="arrow" onClick={addItemHandler}>
          &gt;
        </div>
      </div>
      <div className="price">{price}</div>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
