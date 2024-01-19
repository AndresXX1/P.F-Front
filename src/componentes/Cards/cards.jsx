import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSneakers } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from "./Cards.module.css"


const Cards = ({sneakers, message}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSneakers());
}, [dispatch]);
if (!sneakers || sneakers.length === 0) {
  return <p>{message}</p>;
}


  return (
    <div className={style.container}>
      <div className={style.cardContent}>
        {sneakers.map(({id,image,name,colors,brand,size,price}) => (
          <div key={id} className={style.linkContainer}>
            <Link 
              to={`/detail/${id}`}
              style={{textDecoration:'none'}} >
            <Card
            id={id}
            image={image && image.length > 0 ? image[0] : 'defaultImagePath'}
            model={name}
            color={colors[0] || "DefaultColor"}
            brand={brand}
            size={size[0] || "DefaultSize"}
            price={price}
             />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;