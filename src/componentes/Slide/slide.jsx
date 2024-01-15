import React from 'react';
import { Carousel } from 'antd';
import one from "../../assets/visa.jpg";
import two from "../../assets/Naranja.jpg";
import three from "../../assets/Enero.jpg";
import four from "../../assets/Tarjeta.jpg";


const contentStyle = {
  height: '200px',
  width: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const Slide = () => (
  <Carousel autoplay style={{width: '30%', height: '100%', 'margin-top': '420px', 'margin-left': '505px'}}>
    <div>
      <img src={one} style={contentStyle}></img>
    </div>
    <div>
     <img src={two} style={contentStyle}></img>
    </div>
    <div>
    <img src={three} style={contentStyle}></img>
    </div>
    <div>
    <img src={four} style={contentStyle}></img>
    </div>
  </Carousel>
);
export default Slide;