import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Products.css'
import ImgMediaCard from './card';
import { getSneakers } from '../../redux/actions/actions';


const ProductManager = () => {
  // Estados para los filtros
  

  const [brandFilter, setBrandFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const currentPage = useSelector((state) => state?.currentPage);
  const pageSize = 8;
  const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state) => state?.colorValue);
  const size = useSelector((state) => state?.sizeValue);
  const price = useSelector((state) => state?.orderPrice);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSneakers(currentPage, pageSize, brand, color, size, price));}, [dispatch])
  // Datos de ejemplo de productos (podrían venir de una API)
  const products = useSelector((state)=> state.sneakers)
  console.log("aqui", products);

  const filteredProducts = products.filter(product => {
    return (
      (brandFilter === '' || product.brand.toLowerCase() === brandFilter.toLowerCase()) &&
      (sizeFilter === '' || product.size.includes(sizeFilter)) &&
      (colorFilter === '' || product.colors.includes(colorFilter.toLowerCase())) &&
      (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div>
      {/* Filtros */}
      <div>
        <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)}>
          <option value="">Todas las marcas</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          {/* Agregar más marcas aquí */}
        </select>
        <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)}>
          <option value="">Todos los talles</option>
          <option value="9">9</option>
          <option value="10">10</option>
          {/* Agregar más talles aquí */}
        </select>
        <select value={colorFilter} onChange={e => setColorFilter(e.target.value)}>
          <option value="">Todos los colores</option>
          <option value="Negro">Negro</option>
          <option value="Blanco">Blanco</option>
          {/* Agregar más colores aquí */}
        </select>
        <input type="text" placeholder="Buscar por nombre" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      {/* Contenedor de productos */}
      <div className="product-container">
        {filteredProducts.map(product => (
          <ImgMediaCard data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductManager;