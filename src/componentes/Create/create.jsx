import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validation from "./validations";
import "./create.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  postCreateProduct,
  clearCreateProductState,
  createProductSuccess,
  createProductFailure
} from "../../redux/actions/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "@emotion/styled";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [input, setInput] = useState({
    name: "",
    brand: "",
    size: [],
    image: null,
    colors: [],
    price: "",
  });
  const [imageUrl, setImageUrl] = useState("");

 

  useEffect(() => {
    return () => {
      dispatch(clearCreateProductState());
    };
  }, [dispatch]);

  const handleValidation = () => {
    const newErrors = validation(input);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "size") {
      // Manejar cambios en el input de tallas si es necesario
    } else if (name === "image") {
      const imagesArray = value.split(',').map((url) => url.trim()); // Divide el string por comas y elimina espacios en blanco
      setInput((prevInput) => ({ ...prevInput, [name]: imagesArray }));
      setImageUrl(value.name); // Esto puede que ya no sea necesario si muestras una vista previa de todas las imágenes
    } else {
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (handleValidation()) {
      try {
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('brand', input.brand);
        // Asegúrate de que 'size' sea un array de strings
        input.size.forEach((size) => {
          formData.append('size', size);
        });
        formData.append('price', input.price);
        // Asegúrate de que 'colors' sea un array de strings
        input.colors.forEach((color) => {
          formData.append('colors', color);
        });
        // Agregar la imagen como un archivo
        if (input.image) {
          formData.append('image', input.image);
        }
  
        // Agregado para ver los datos enviados
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        console.log(input.image)
        const response = await dispatch(
          postCreateProduct( formData,)
        );
  
        console.log("Respuesta del servidor:", response);
        setMessage("Producto creado exitosamente.");
  
        setInput({
          name: "",
          brand: "",
          size: [],
          image: null,
          colors: [],
          price: "",
        });
        setImageUrl("");
      } catch (error) {
        console.error("Error al crear el producto:", error);
        dispatch(createProductFailure(error));
        setMessage("Error al crear el producto. Verifica la consola para más detalles.");
      }
    } else {
      setMessage("Por favor, completa el formulario correctamente.");
    }
  };
  const availableBrands = ["NIKE", "ADIDAS", "NEW BALANCE"];
  const brandColors = {
    nike: ["green", "white", "black"],
    adidas: ["blue", "white", "grey"],
    newbalance: ["black", "white", "red"],
  };
  
  const colorOptions = [
    { value: "all", label: "Todos" },
    ...(brandColors[input.brand] || []).map((color) => ({
      value: color,
      label: color,
    }))
  ];
  
  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      brand: selectedBrand,
      color: [],
    }));
  };
  
  const handleColorInputChange = (selectedOptions) => {
    const selectedColors = selectedOptions.map((option) => option.value);
    setInput((prevInput) => ({
      ...prevInput,
      colors: selectedColors,
    }));
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setInput((prevInput) => ({ ...prevInput, image: file }));
   };


  const sizeOptions = [
    { value: "all", label: "Todos" },
    { value: "7", label: "7" },
    { value: "7.5", label: "7.5" },
    { value: "8", label: "8" },
    { value: "8.5", label: "8.5" },
    { value: "9", label: "9" },
    { value: "9.5", label: "9.5" },
    { value: "10", label: "10" },
    { value: "10.5", label: "10.5" },
    { value: "11", label: "11" },
    { value: "11.5", label: "11.5" },
    { value: "12", label: "12" },
  ];

  const handleSizeChange = (selectedOptions) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setInput((prevInput) => ({
      ...prevInput,
      size: selectedSizes,
    }));
  };


 

  const colorStyles = {
    green: { backgroundColor: 'green', color: 'white' },
    white: { backgroundColor: 'white', color: 'black' },
    black: { backgroundColor: 'black', color: 'white' },
    blue: { backgroundColor: 'blue', color: 'white' },
    grey: { backgroundColor: 'grey', color: 'white' },
    red: { backgroundColor: 'red', color: 'white' },
  };

  const updatedInput = {
    ...input,
    size: input.size, // Asegúrate de que 'size' sea un array de strings
    image: input.image, // Envía 'image' como un string
   };


  return (
    <div className="container">
      <div className="form-and-preview-container">
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <label className="form-label">Modelo</label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Modelo..."
            onChange={(e) => handleChange(e)}
            className="form-input"
          />
          <p className="error-message">{errors.name}</p>

          <label className="form-label">Precio en USD$</label>
          <input
          type="number"
          value={input.price}
          name="price"
          placeholder="Precio..."
          onChange={(e) => {
          // Validar y convertir a número
          const value = parseFloat(e.target.value) || 0;
          handleChange({ target: { name: "price", value } });
        }}
          min="1"
          step="any" // Permite números decimales
          className="form-input"/>

          <p className="error-message">{errors.price}</p>
          
          <label className="form-label">Imagen</label>
          <input
 type="file"
 name="image"
 onChange={handleFileChange}
/>


            <p className="error-message">{errors.image}</p>
  
          <label className="form-label">Marca</label>
          <select
          value={input.brand}
          name="brand"
          onChange={(e) => {
          handleBrandChange(e);
          handleChange(e);
          }}
          className="form-input"
          >
          <option value="" disabled>Selecciona una marca</option>
            {availableBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}
            </option>
              ))} 
            </select>
          <p className="error-message">{errors.brand}</p>
  
          <label className="form-label">Talles</label>
          <Select
          value={input.size.map((size) => ({ value: size, label: size }))}
           name="size"
           onChange={(selectedOption) => handleSizeChange(selectedOption)}
           isMulti
           options={sizeOptions}
            />
          <p className="error-message">{errors.size}</p>


       <label className="form-label">Colores</label>
       <Select
    value={input.colors.map((color) => ({ value: color, label: color }))}
    name="colors"
    onChange={handleColorInputChange}
    isMulti
    options={colorOptions}
  />

          <p className="error-message">{errors.colors}</p>



  
          <div className="button-container">
          <button type="submit" className="submit-button">
            Crear Producto
          </button>
          <Link to="/home">
            <button className="submit-button">Volver a Home</button>
          </Link>
        </div>
      
    
  


          {message && (
            <div className={ message.includes("éxito") ? "success-message" : "error-message"}>
            {message}
            </div>
            )}

        </form>
  
        <div className="preview-container">
          <div className="nombre">
            <h3>{input.name ? input.name : "Nombre..."}</h3>
          </div>

          
          <h4 className="precio-preview"> {input.price ? `USD $${input.price}` : "Precio..."}</h4>
          <p className="feactures-container"></p>

          <div className="image-preview">
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="preview-image" />
            )}
          </div>
          <p className="feactures-container"></p>

          <div className="tipos">
            <p className="titulo">Marca seleccionada</p>
            <div className="selected-sizes-container">
            <span className="selected-size">
            {input.brand ? input.brand : "Marca"}
            </span>
            </div>
            </div>

            <div className="tipos">
            <p className="titulo">Colores seleccionados</p>
            <div className="selected-sizes-container">

            {input.colors.map((selectedColor, index) => (
            <span
            key={selectedColor}
            className="selected-size"
            style={colorStyles[selectedColor]}>
            {selectedColor}
            {index < input.colors.length - 1 && (
            <span className="size-separator"></span>
        )}
      </span>
    ))}
  </div>

  </div>
          <div className="tipos">
          <p className="titulo">Talles seleccionados</p>
          <div className="selected-sizes-container">
            {input.size.map((selectedSize, index) => (
            <span key={selectedSize} className="selected-size">
            {selectedSize}
            {index < input.size.length - 1 && <span className="size-separator"></span>}
            </span>
    ))}
  </div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;