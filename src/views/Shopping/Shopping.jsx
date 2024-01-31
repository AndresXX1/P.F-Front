import { useSelector, useDispatch } from "react-redux";
import style from "./Shopping.module.css";
import { useEffect,useState } from "react";
import React, {useContext} from "react";
import axios from "axios";
import { getAllItems, removeFromCart } from "../../redux/actions/actions";
import { AuthContext } from "../../componentes/AuthProvider/authProvider";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


const Shopping = () => {
  const dispatch = useDispatch();
  const [preferenceId,setPreferenceId] = useState(null)
  initMercadoPago('TEST-c01faeb7-8f4e-4139-af86-ee00dd609386',{
    locale:"en-US"
  });
  const items = useSelector((state) => state.shoppingItems);
  const {auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    dispatch(getAllItems(auth.token.id));
  }, [dispatch]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const visibleItems = items.filter((item) => !item.deleted);

  const total = visibleItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);


  const mercadoPago = async () => {
    try {
      const response = await axios.post( `http://localhost:3000/payment/createOrder/${auth.token.id}`,{
        title : "pago eccomerce",
        quantity: 1,
        price: total
      });
     const {id} = response.data;
     return id

    } catch (error) {
      console.error("Error fetching items:", error);
      alert("Not found this data.");
    }
  };

  const handleBuy = async () => {
    const id = await mercadoPago();
    if(id){
        setPreferenceId(id)
    }
  }

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
                <div className={style.cardPrice}>${item.price * item.quantity} USD</div>
                <div>
                    valor unidad : ${item.price}
                </div>
                <div className={style.cardColors}>
                  Colors: {item.colors.join(", ")}
                </div>
                <div className={style.cardSizes}>
                  Sizes: {item.size.join(", ")}
                </div>
                <div className={style.cardColors}>
                  Amount: {item.quantity}
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
      <div>
        <span>total</span>
        <h4> ${total} </h4>
      </div>
      <div className={style.buyButtonContainer}>
        <button className={style.buyButton} onClick={handleBuy}>Comprar</button>
        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} /> }
        <div id="wallet_container"></div>
      </div>
    </div>
  );
};

export default Shopping;