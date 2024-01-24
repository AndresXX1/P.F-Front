import axios from "axios";
import {
  GET_ALL_SNEAKERS,
  GET_ALLL_SNEAKERS,
  GET_SEARCH_REQUEST,
  GET_SEARCH_NOTFOUND,
  GET_SEARCH_SUCCESS,
  RESET_CURRENTPAGE,
  BRAND_VALUE,
  COLOR_VALUE,
  SIZE_VALUE,
  ORDER_PRICE,
  POST_PRODUCT_FAILURE,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CLEAR_PRODUCT_DETAIL,
  CLEAR_CREATE_PRODUCT_STATE,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE,
  SET_SELECTED_SNEAKER,
  SET_SELECTED_SNEAKER_INDEX,
  SAVE_USER_DATA_SESSION,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from "../action-types/action-types";

export const registerUser = (datauser) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const response = await axios.post(
      "http://localhost:3000/users/create",
      datauser
    );
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
  }
};

export const postProductRequest = () => ({
  type: POST_PRODUCT_REQUEST,
});

export const clearProductDetail = () => ({
  type: CLEAR_PRODUCT_DETAIL,
});

export const postProductSuccess = (product) => ({
  type: POST_PRODUCT_SUCCESS,
  payload: product,
});

export const postProductFailure = (error) => ({
  type: POST_PRODUCT_FAILURE,
  payload: error,
});

export const fetchProductDetail = (idKey) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:3000/products/detail/${idKey}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    dispatch({ type: FETCH_PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching product detail:", error);
    dispatch({ type: FETCH_PRODUCT_DETAIL_FAILURE });
  }
};

export const getSneakers = (
  page,
  pageSize = "1000",
  brand,
  colors,
  size,
  price
) => {
  return async function (dispatch) {
    try {
      const queryParams = {
        page: encodeURIComponent(page),
        pageSize: encodeURIComponent(pageSize),
      };

      if (brand) {
        queryParams.brand = encodeURIComponent(brand);
      }

      if (colors) {
        queryParams.colors = encodeURIComponent(colors);
      }

      if (size) {
        queryParams.size = encodeURIComponent(size);
      }

      if (price) {
        queryParams.price = encodeURIComponent(price);
      }

      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const url = `http://localhost:3000/products?${queryString}`;
      console.log(url);
      const response = await axios.get(url);
      const sneakersData = response.data;

      dispatch({
        type: GET_ALL_SNEAKERS,
        payload: {
          sneakers: sneakersData.paginatedResponse,
          currentPage: sneakersData.setCurrentPage,
          totalSneaker: sneakersData.totalSneaker,
        },
      });
    } catch (error) {
      console.error("Error al traer las zapatillas:", error);
    }
  };
};

export const getAlllSneakers = () => {
  return async function (dispatch) {
    try {
      const url = `http://localhost:3000/products/?page=1&pageSize=10`; // Asumiendo que tienes un endpoint que devuelve todas las zapatillas
      const response = await axios.get(url);
      const sneakersData = response.data;

      dispatch({
        type: GET_ALLL_SNEAKERS,
        payload: sneakersData,
      });
    } catch (error) {
      console.error("Error al traer las zapatillas:", error);
    }
  };
};

export const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

export const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product,
});

export const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

export const clearCreateProductState = () => ({
  type: CLEAR_CREATE_PRODUCT_STATE,
});

export const getSearchRequest = () => ({
  type: GET_SEARCH_REQUEST,
});

export const getSearchSuccess = (data) => ({
  type: GET_SEARCH_SUCCESS,
  payload: {
    sneakers: data.productsFound,
    totalSneaker: data.totalSneakers,
  },
});

export const getSearchNotFound = (error) => ({
  type: GET_SEARCH_NOTFOUND,
  payload: error,
});

export const searchBar = (searchTerm) => {
  return async (dispatch) => {
    try {
      dispatch(getSearchRequest());

      const response = await axios.get(
        `http://localhost:3000/products/search/${searchTerm}`
      );

      console.log(response.data);
      if (response.data) {
        console.log(response.data);
        dispatch(getSearchSuccess(response.data));
      }
    } catch (error) {
      dispatch(getSearchNotFound(error.message || "Error en la búsqueda"));
    }
  };
};

export const resetCurrentPage = (page) => ({
  type: RESET_CURRENTPAGE,
  payload: page,
});

export const brandValue = (value) => ({
  type: BRAND_VALUE,
  payload: value,
});

export const colorValue = (value) => ({
  type: COLOR_VALUE,
  payload: value,
});

export const sizeValue = (value) => ({
  type: SIZE_VALUE,
  payload: value,
});

export const orderPrice = (value) => ({
  type: ORDER_PRICE,
  payload: value,
});

export const setCurrentPage = (page) => ({
  type: "SET_CURRENT_PAGE",
  payload: page,
});

export const resetSearch = () => ({
  type: "RESET_SEARCH",
});

export const setSneakers = (sneakers) => ({
  type: "SET_SNEAKERS",
  payload: sneakers,
});

export const setSelectedSneaker = (sneaker) => ({
  type: SET_SELECTED_SNEAKER,
  payload: sneaker,
});

export const updateSelectedSneaker = (sneaker) => ({
  type: "UPDATE_SELECTED_SNEAKER",
  payload: sneaker,
});

export const setSelectedSneakerIndex = (index) => ({
  type: SET_SELECTED_SNEAKER_INDEX,
  payload: index,
});

export const saveUserDataSession = (userData) => ({
  type: SAVE_USER_DATA_SESSION,
  payload: userData,
});



export const postReviews = (userId, idKey, value, review) => async (dispatch) => {
  try {
     const response = await axios.post(
       "http://localhost:3000/reviews/create",
       { userId, idKey, value, review }
     );
     dispatch({ type: "POST_REVIEWS_SUCCESS", payload: response.data });
  } catch (error) {
     dispatch({ type: "POST_REVIEWS_FAILURE", payload: error.message });
  }
 };


 export const postCreateProduct = (productData) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    // Lógica para enviar la solicitud al backend y crear el producto
    const response = await axios.post("http://localhost:3000/products/create", productData);

    // Si la solicitud fue exitosa
    dispatch(createProductSuccess(response.data));
  } catch (error) {
    // Si la solicitud falla
    dispatch(createProductFailure(error.message || "Error al crear el producto"));
  }
}


const validation = (input, existingNames) => {
  let errors = {};

  let noEmpty = /\S+/;
  let validateName = /^[a-zA-ZñÑ\s]*$/; // Permitir espacios en blanco en el nombre

  if (
    Array.isArray(existingNames) &&
    existingNames.some(
      (name) => name.toLowerCase() === input.name.toLowerCase()
    )
  ) {
    errors.name = "Este nombre ya está en uso. Por favor, elige otro.";
  } else if (
    !noEmpty.test(input.name),
    !validateName.test(input.name),
    input.name.trim().length < 3
  ) {
    errors.name = "Nombre necesario. Mayor de 3 letras y único";
  }

  if (!(input.image instanceof File)) {
    errors.image = "Debe ser un archivo válido";
  }

  if (
    isNaN(parseFloat(input.price)),
    parseFloat(input.price) < 1,
    parseFloat(input.price) > 10000
  ) {
    errors.price = "Ingrese un precio entre 1 y 10000";
  }

  return errors;
};

