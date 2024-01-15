import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSneakers } from "../../redux/actions/actions";
import Card from "../Card/card";

const Cards = () => {
  const dispatch = useDispatch();
  const sneakers = [
    {
      "model": "Men's Fresh Foam 880 V12",
      "id":1,
      "price":"132,06",
      "brand":"newbalance",
      "size": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5","12"],
      "colors": ["black", "white", "red"],
      "image": ["https://trcmnbco.s3.amazonaws.com/M880R12_2.jpg", "https://trcmnbco.s3.amazonaws.com/M880R12_1.jpg",  "https://trcmnbco.s3.amazonaws.com/M880R12_3.jpg",  "https://trcmnbco.s3.amazonaws.com/M880R12_4.jpg"]
    },
    {
      "model": "TENIS EQ19 RUN ",
      "id":2,
      "price": "81,09",
      "brand":"adidas",
      "size": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5","12"],
      "colors": ["blue", "white", "grey"],
      "image": ["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/479598102fe54bdc9d94ac9200ed3096_9366/Tenis_EQ19_Run_Negro_H00924_01_standard.jpg",  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/030a2c3839434da0af77ac9200ed3e76_9366/Tenis_EQ19_Run_Negro_H00924_02_standard_hover.jpg",  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7dcf860a2bd4411f816cac9200ed4611_9366/Tenis_EQ19_Run_Negro_H00924_03_standard.jpg",  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f0bca7313e264a09b45cac9200ed4eb2_9366/Tenis_EQ19_Run_Negro_H00924_04_standard.jpg"]
    },
    {
      "model": "Nike Air Force 1 Low Retro",
      "id":3,
      "price":"97,47",
      "brand":"nike",
      "size": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5","12"],
      "colors": ["green", "white", "black"],
      "image": ["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fbe2af03-4f91-4522-8b47-4fbd41323cd1/air-force-1-low-retro-zapatillas-Wr9Chh.png",  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/81405e8c-137d-4c1f-ae01-c74054b66efa/air-force-1-low-retro-zapatillas-Wr9Chh.png",  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/64737ed9-76b6-493f-b4d3-9f94f9691b2d/air-force-1-low-retro-zapatillas-Wr9Chh.png",  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/492ccccb-4993-4a0b-aeae-80100b00821d/air-force-1-low-retro-zapatillas-Wr9Chh.png"]
    },
    {
      "model": "Jumpman Two Trey",
      "id":4,
      "price":"74,97",
      "brand":"nike",
      "size": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5","12"],
      "colors": ["orange", "white", "black"],
      "image": ["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/360cc5e1-a404-4a0d-b6a7-b7c415ed4282/jumpman-two-trey-zapatillas-bqMXW0.png",  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a20e2783-4670-497b-a0fe-817aacee0a64/jumpman-two-trey-zapatillas-bqMXW0.png",  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/022b906b-9413-4969-be85-6eab75d209a8/jumpman-two-trey-zapatillas-bqMXW0.png",  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bf40a62a-d7e1-45fc-ace7-cfd4764f8b89/jumpman-two-trey-zapatillas-bqMXW0.png"]
    },  {
      "model": " Air Jordan 1 Low SE ",
      "id":5,
      "price": "69,97",
      "brand":"nike",
      "size": ["8", "8.5", "9", "10"],
      "colors": ["https://static.nike.com/a/images/t_PDP_144_v1/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/07f289b9-7ca1-49ec-a347-b69b95e17032/air-jordan-1-low-se-zapatillas-Z8CHrq.png",  "https://static.nike.com/a/images/t_PDP_144_v1/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/15aba2af-36a6-449c-a9a8-aeb373c035d9/air-jordan-1-low-se-zapatillas-Z8CHrq.png",  "https://static.nike.com/a/images/t_PDP_144_v1/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ef66458b-6949-44e7-a35e-21818fc5d1e1/air-jordan-1-low-se-zapatillas-Z8CHrq.png"],
      "image": ["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8d7704ed-3fbc-4cd8-a19c-c7fe3c628371/air-jordan-1-low-se-zapatillas-Z8CHrq.png"]
    },  {
      "model": "Jordan Stay Loyal 2 ",
      "id":6,
      "price": "59,99",
      "brand":"nike",
      "size": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5","12"],
      "colors": ["https://static.nike.com/a/images/t_PDP_144_v1/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ff577974-03ff-4f47-ac97-e1d4e7b8414a/jordan-stay-loyal-2-zapatillas-bCNRV3.png", "https://static.nike.com/a/images/t_PDP_144_v1/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36ca72c6-e3f3-449a-afe5-c870da55a946/jordan-stay-loyal-2-zapatillas-bCNRV3.png", "https://static.nike.com/a/images/t_PDP_144_v1/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6346ca2b-570f-41ab-9add-208eac3de60d/jordan-stay-loyal-2-zapatillas-bCNRV3.png"],
      "image": ["https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b6f0d993-9ad7-407b-8815-02115b7ac77d/jordan-stay-loyal-2-zapatillas-bCNRV3.png"]
    },  {
      "model": "TENIS ULTRABOOST LIGHT ",
      "id":7,
      "price": "268,53",
      "brand":"adidas",
      "size": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5","12"],
      "colors": ["https://assets.adidas.com/images/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/cc8933fd0c2b429c9073bedfc6bbf8dd_9366/Tenis_Ultraboost_Light_Azul_ID3276_HM1.jpg", "https://assets.adidas.com/images/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/a09692e4425f40e28a0e3e8fc9d41c54_9366/Tenis_Ultraboost_Light_Rojo_ID3277_HM1.jpg" ],
      "image": ["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cc8933fd0c2b429c9073bedfc6bbf8dd_9366/Tenis_Ultraboost_Light_Azul_ID3276_HM1.jpg"]
    },  {
      "model": "TENIS CORERACER",
      "id":8,
      "price": "329.950",
      "brand":"adidas",
      "size": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5","12"],
      "colors": ["https://assets.adidas.com/images/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/6ca4b6ca6af04319825dab89012737bf_9366/Tenis_Coreracer_Negro_FX3581_01_standard.jpg", "https://assets.adidas.com/images/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/2bf0a6ef75d64d639237ab890127b388_9366/Tenis_Coreracer_Negro_FX3593_01_standard.jpg", "https://assets.adidas.com/images/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/6ca4b6ca6af04319825dab89012737bf_9366/Tenis_Coreracer_Negro_FX3581_01_standard.jpg"],
      "image": ["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3fe78e47bdf54e4d8fc8abaa013044be_9366/Tenis_Coreracer_Azul_FX3594_01_standard.jpg"]
    },  {
      "model": "Men's Fresh Foam 1080 V12 ",
      "id":9,
      "price": "271,11",
      "brand":"newbalance",
      "size": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
      "colors": ["https://trcmnbco.s3.amazonaws.com/M108012A_1.jpg"],
      "image": ["https://trcmnbco.s3.amazonaws.com/M108012A_1.jpg"]
    },  {
      "model": "Men's 420 V3 ",
      "id":10,
      "price": "102,29",
      "brand":"newbalance",
      "size": [ "8.5", "9", "9.5"],
      "colors": ["https://trcmnbco.s3.amazonaws.com/ME420LB3_1.jpg"],
      "image": ["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/479598102fe54bdc9d94ac9200ed3096_9366/Tenis_EQ19_Run_Negro_H00924_01_standard.jpg",  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/030a2c3839434da0af77ac9200ed3e76_9366/Tenis_EQ19_Run_Negro_H00924_02_standard_hover.jpg",  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7dcf860a2bd4411f816cac9200ed4611_9366/Tenis_EQ19_Run_Negro_H00924_03_standard.jpg",  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f0bca7313e264a09b45cac9200ed4eb2_9366/Tenis_EQ19_Run_Negro_H00924_04_standard.jpg"]
    }
  ]//useSelector((state) => state.sneakers);

  useEffect(() => {
    dispatch(getSneakers());
  }, [dispatch]);

  if (!sneakers) {
    return console.log({sneakers},"not Found");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row ">
        {sneakers.map((zapatilla) => (
          <div key={zapatilla.id} className="col-md-3 mb-3 ml-8 mr-8">
            <Link
              to={`/detail/${zapatilla.id}`}
              className="card-link text-decoration-none"
            >
            <Card
              id={zapatilla.id}
              image={zapatilla.image && zapatilla.image.length > 0 ? zapatilla.image[0] : 'defaultImagePath'}
              model={zapatilla.name}
              color={zapatilla.colors[0] || "DefaultColor"}
              brand={zapatilla.brand}
              gender=""
              size={zapatilla.size[0] || "DefaultSize"}
              price={zapatilla.price}
/>
            
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;