import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { Preloader } from "../components/Preloader";
import { GoodsList } from "../components/GoodsList";
import { BasketList } from "../components/BasketList";
import { Cart } from "../components/Cart";
import { Notification } from "../components/Notification";

export function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setIsBasketShow] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { Authorization: API_KEY },
        });
        const data = await response.json();
        setGoods(data.shop);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToBasket = (item) => {
    setOrder((prevOrder) => {
      const itemIndex = prevOrder.findIndex(
        (orderItem) => orderItem.mainId === item.mainId
      );

      if (itemIndex < 0) {
        setNotificationMessage(`"${item.displayName}" добавлен в корзину`);
        return [...prevOrder, { ...item, quantity: 1 }];
      }

      const updatedOrder = prevOrder.map((orderItem, index) =>
        index === itemIndex
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      
      setNotificationMessage(
        `"${item.displayName}" (${updatedOrder[itemIndex].quantity} шт. в корзине)`
      );
      return updatedOrder;
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const removeFromBasket = (mainId) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.mainId !== mainId));
  };

  const incrementQuantity = (mainId) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.mainId === mainId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (mainId) => {
    setOrder((prevOrder) =>
      prevOrder
        .map((item) => {
          if (item.mainId === mainId) {
            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleBasketShow = () => {
    setIsBasketShow((prev) => !prev);
  };

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsBasketShow(false);
    }
  };

  return (
    <main className="container content">
      <div className="cart-container">
        <Cart
          quantity={order.reduce((sum, item) => sum + item.quantity, 0)}
          handleBasketShow={handleBasketShow}
        />
      </div>

      <Notification 
        message={notificationMessage} 
        show={showNotification} 
      />

      {isBasketShow && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsBasketShow(false)}
            >
              &times;
            </button>
            <BasketList
              order={order}
              removeFromBasket={removeFromBasket}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          </div>
        </div>
      )}

      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      )}
    </main>
  );
}