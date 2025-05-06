export function BasketItem({
  item,
  decrementQuantity,
  incrementQuantity,
  removeFromBasket,
}) {
  return (
    <li className="collection-item">
      <div className="plus-minus-btn">
        <button
          className="minus-button"
          onClick={() => decrementQuantity(item.mainId)}
        >
          -
        </button>
        <button
          className="plus-button"
          onClick={() => incrementQuantity(item.mainId)}
        >
          +
        </button>
      </div>
      {item.displayName} * {item.quantity} ={" "}
      {item.price.finalPrice * item.quantity}
      <span className="secondary-content">
        <i
          className="material-icons basket-delete"
          onClick={() => removeFromBasket(item.mainId)}
        >
          clear
        </i>
      </span>
    </li>
  );
}