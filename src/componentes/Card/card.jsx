import React from "react";
import BasicRating from "../Reviews/Reviews";
import style from "../Card/Card.module.css"; // Asegúrate de tener un archivo Card.css en tu proyecto

const Card = ({ id, model, size, image, color, brand, price }) => {
  let logoUrl;

  switch (brand) {
    case "NIKE":
      logoUrl = "https://d3sxshmncs10te.cloudfront.net/icon/free/svg/761696.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTcwNTcyNTA3OSwicSI6bnVsbCwiaWF0IjoxNzA1NDY1ODc5fQ__.08bf3f226aa8bf7c7b8e2048315c96f30e1f6b565f88fe4b7f3af9cf32bb12c5";
      break;
    case "ADIDAS":
      logoUrl = "https://d3sxshmncs10te.cloudfront.net/icon/free/svg/7581614.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTcwNTcyNTc2NiwicSI6bnVsbCwiaWF0IjoxNzA1NDY2NTY2fQ__.d77a53351cd89f5328123bec559ccfd67b3c778629d10bf40891b514f166c3d7";
      break;
    case "NEW BALANCE":
      logoUrl = "https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Emblem.png";
      break;
    default:
      logoUrl = null;
  }

  return (
    <div className={style.container}>
      <div className={style.cardContent}>
        <div className={style.cardTitle}>
        <h3 style={{fontWeight:'500'}}>{brand}</h3>
        </div>
        <img
          src={image}
          alt="Zapatilla"
        />
        <div className={style.brand}>
        <h3>{model}</h3>
        <div className={style.details}>
          <h4>
             ${price} USD
        </h4>
      </div>
        <div className={style.logoContainer}>
        {logoUrl && <img src={logoUrl} alt={`${brand} Logo`} />}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Card;
