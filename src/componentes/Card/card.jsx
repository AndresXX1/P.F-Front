import React from "react";
import "./Card.css"; // Asegúrate de tener un archivo Card.css en tu proyecto

const Card = ({ id, model, size, image, color, brand, price }) => {
  return (
    <div className="custom-card bg-light translucent-bg">
      <div className="card-image">
        <img
          src={image}
          alt="Zapatilla"
          className="card-img-top img-fluid"
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{brand}</h3>
        <div className="d-flex justify-content-evenly m-2">
          <h5 className="card-text">Talla: {size}</h5>
          <h5 className="price">
            Precio: {price} $
          </h5>
        </div>
        <button type="button" className="btn btn-primary col-12">
          Buy
        </button>
      </div>
    </div>
   );
   }

export default Card;