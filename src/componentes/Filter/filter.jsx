import { useDispatch, useSelector } from "react-redux";
import {  getSneakers,resetCurrentPage,brandValue,colorValue,sizeValue,orderPrice} from "../../redux/actions/actions";
import Select from "../Select/select.jsx";
import style from "./Filter.module.css"

function Filter({page,pageSize}) {
    console.log("Page in Filter:", page);
    const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state)=> state?.colorValue);
  const size = useSelector((state)=> state?.sizeValue);
  const price = useSelector((state)=> state?.orderPrice);
    /* 
  const allSneakers = useSelector((state) => state.allCopySneakers);
  const brands =[ ...new Set(allSneakers.map((sneaker) => sneaker.brand))];
  console.log(brands)
  */
  const dispatch = useDispatch();

    const handleFilterBrand = (value) => {
        dispatch(getSneakers( page=1, pageSize,value,color,size,price));
        dispatch(brandValue(value))
        dispatch(resetCurrentPage(1));
      };

      const handleFilterColor = (value) => {
        dispatch(getSneakers( page=1, pageSize,brand,value,size,price));
        dispatch(colorValue(value))
        dispatch(resetCurrentPage(1));
      };

      const handleFilterSize = (value) => {
        dispatch(getSneakers( page=1, pageSize,brand,color,value,price));
        dispatch(sizeValue(value))
        dispatch(resetCurrentPage(1));
      };

      const handleOrderPrice= (value) => {
        dispatch(getSneakers( page=1, pageSize,brand,color,size,value));
        dispatch(orderPrice(value))
        dispatch(resetCurrentPage(1));
      };

  return (
    <div className={style.containerContent}>
      <div className={style.container}>
       <Select
        name="FilterBrand"
        options={[
          { value: '', label: 'Brand' },
          { value: 'adidas', label: 'adidas' },
          { value: 'nike', label: 'nike' },
          { value: 'newbalance', label: 'newbalance' },  
        ]}
        onChange={(e) => handleFilterBrand(e.target.value)}
      />

<Select
        name="FilterColor"
        options={[
          { value: '', label: 'Color' },
          { value: 'black', label: 'black' },
          { value: 'red', label: 'red' },
          { value: 'blue', label: 'blue' },
          {value:"orange",label:"orange"},
          {value:"white",label:"white"}    
        ]}
        onChange={(e) => handleFilterColor(e.target.value)}
      />

<Select
        name="FilterSize"
        options={[
          { value: '', label: 'Size' },
          { value: '6', label: '6' },
          { value: '7', label: '7' },
          { value: '8', label: '8' },
          { value: '9', label: '9' },
          { value: '10', label: '10' },
          { value: '11', label: '11' },  
        ]}
        onChange={(e) => handleFilterSize(e.target.value)}
      />

<Select
        name="orderPrice"
        options={[
          { value: '', label: 'Price' },
          { value: 'min', label: 'min' },
          { value: 'max', label: 'max' }   
        ]}
        onChange={(e) => handleOrderPrice(e.target.value)}
      />
      </div>
    </div>
  );
}
export default Filter;