import { useSelector, useDispatch } from "react-redux";
import style from "./Shopping.module.css";
import { useEffect } from "react";
import React from "react";
import { getAllItems, removeFromCart } from "../../redux/actions/actions";

const Shopping = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shoppingItems);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const visibleItems = items.filter((item) => !item.deleted);

  return (
    <div className={style.shoppingContainer}>
      <div className={style.tableContainer}>
        <div className={style.tableRow}>
          {visibleItems.map((item) => (
            <div key={item.id} className={style.shoppingCard}>
              <img
                src={item.Product.image.secure_url}
                alt={item.Product.name}
                className={style.cardImage}
              />
              <div className={style.cardContent}>
                <div className={style.cardTitle}>{item.name}</div>
                <div className={style.cardPrice}>${item.price} USD</div>
                <div className={style.cardColors}>
                  Colors: {item.colors.join(", ")}
                </div>
                <div className={style.cardSizes}>
                  Sizes: {item.size.join(", ")}
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.productId)}
                  className={style.cardRemoveButton}
                >
                  Eliminar del carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={style.buyButtonContainer}>
        <button className={style.buyButton}>Comprar</button>
      </div>
    </div>
  );
};

export default Shopping;
