import axios from "axios";
import {
  GET_ALL_SNEAKERS,
  GET_SEARCH_REQUEST,
  GET_SEARCH_NOTFOUND,
  GET_SEARCH_SUCCESS,
  RESET_CURRENTPAGE,
  BRAND_VALUE,
  COLOR_VALUE,
  SIZE_VALUE,
  ORDER_PRICE,
  POST_PRODUCT_SUCCESS,
  STATE_DATA_PAGE,
  POST_PRODUCT_FAILURE,
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
  SET_SELECTED_IMAGE_INDEX,
  SET_REVIEWS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  REVIEW_POSTED_FAILURE,
  REVIEW_POSTED_SUCCESS,
  REVIEW_POST_REQUEST,
  UPDATE_USER_SUCCESS, 
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_USER_PROFILE_REQUEST, 
  UPDATE_USER_PROFILE_SUCCESS, 
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_PROFILE_PICTURE_REQUEST,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  UPDATE_PROFILE_PICTURE_FAILURE,

  UPDATE_USER_PAYMONTH_FAILURE,
  UPDATE_USER_PAYMONTH_SUCCESS,
  UPDATE_USER_PAYMONTH_REQUEST,

  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,

  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,

  UPDATE_USER_ADMIN_REQUEST,
  UPDATE_USER_ADMIN_SUCCESS,
  UPDATE_USER_ADMIN_FAILURE,

  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_ERROR,
} from "../action-types/action-types";

export const registerUser = (datauser) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const response = await axios.post(
      "http://localhost:3003/users/create",
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
      `http://localhost:3003/products/detail/${idKey}`
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

export const getSneakers = (page, pageSize ="8", brand, colors, size, price) => {
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

      const url = `http://localhost:3003/products?${queryString}`;
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

export const postCreateProduct = (productData) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    // Lógica para enviar la solicitud al backend y crear el producto
    const response = await axios.post("http://localhost:3003/products/create", productData);

    // Si la solicitud fue exitosa
    dispatch(createProductSuccess(response.data));
  } catch (error) {
    // Si la solicitud falla
    dispatch(createProductFailure(error.message || "Error al crear el producto"));
  }
}

export const getSearchRequest = () => ({
  type: GET_SEARCH_REQUEST,
});

export const getSearchSuccess = (data) => ({
  type: GET_SEARCH_SUCCESS,
  payload:{
    sneakers:data.paginatedResponse,
    currentPage:data.setCurrentPage,
    totalSneaker:data.totalSneakers
  },
});

export const getSearchNotFound = (error) => ({
  type: GET_SEARCH_NOTFOUND,
  payload: error,
});



export const searchBar = (searchTerm,page,pageSize="4",price) => {
  return async (dispatch) => {
    try {
      dispatch(getSearchRequest());
      const queryParams = {
        page: encodeURIComponent(page),
        pageSize: encodeURIComponent(pageSize),
      };
      if (price) {
        queryParams.price = encodeURIComponent(price);
      }
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
        const url =`http://localhost:3003/products/search/${searchTerm}?${queryString}`
        console.log(url)
      const response = await axios.get(url);
      
      console.log(response)
      if ( response.data ) {
        console.log(response.data)
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

export const stateSearch = (search) => ({
  type: STATE_DATA_PAGE,
  payload: search,
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

export const setSelectedImageIndex = (index) => ({
  type: SET_SELECTED_IMAGE_INDEX,
  payload: index,
});



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

export const postReviews = (productId, rating, content, name, profileImage) => async (dispatch) => {
  dispatch({ type: REVIEW_POST_REQUEST });
  console.log("ESTO RECIBE LA ACTION POSTREVIEW", productId, rating, content, name, profileImage)
  try {
    const response = await axios.post(`http://localhost:3003/reviews/products/detail/${productId}`, {
      profileImage,
      productId,
      content,
      rating,
      name
    });
    console.log("ESTO VIENE DE LA ACTION ", response)
    dispatch({ type: REVIEW_POSTED_SUCCESS, payload: response.data.review });
  } catch (error) {
    console.error("Error en la acción postReviews:", error);
    dispatch({ type: REVIEW_POSTED_FAILURE, payload: error.message });
  }
  };

   export const setReviews = (reviews) => ({
    type: SET_REVIEWS,
    payload: reviews || [],
  });
  
  export const fetchReviews = () => async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3003/reviews'); // Update the URL to the correct endpoint
      const data = response.data;
      console.log("TODAS LAS REVIEWS:", data)
      if (Array.isArray(data)) {
        dispatch(setReviews(data));
      } else {
        console.error('Error: The response is not an array of reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }

  };

  export const updateUserRequest = () => ({
    type: UPDATE_USER_REQUEST,
  });
  
  export const updateUserSuccess = () => ({
    type: UPDATE_USER_SUCCESS,
  });
  
  export const updateUserFailure = (error) => ({
    type: UPDATE_USER_FAILURE,
    payload: error,
  });
  
  //action para modificar el mail
  export const updateUser = (id, updatedFields) => {
    return async (dispatch) => {
      dispatch(updateUserRequest());
  
      try {
        console.log('Datos enviados al servidor:', { id, updatedFields });
  
        const response = await fetch(`http://localhost:3003/users/perfil/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFields),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        dispatch(updateUserSuccess());
      } catch (error) {
        console.error('Error en la acción:', error);
        dispatch(updateUserFailure(error.message));
      }
    };
  };

export const updatePasswordRequest = () => ({
  type: UPDATE_PASSWORD_REQUEST,
});

export const updatePasswordSuccess = () => ({
  type: UPDATE_PASSWORD_SUCCESS,
});

export const updatePasswordFailure = (error) => ({
  type: UPDATE_PASSWORD_FAILURE,
  payload: error,
});

//action para el pasww
export const updatePassword = (id, currentPassword, newPassword) => {
  return async (dispatch) => {
    dispatch(updatePasswordRequest());

    try {
      const response = await fetch(`http://localhost:3003/users/perfil/updatepassword/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error (${response.status}): ${errorData.message}`);
      }

      dispatch(updatePasswordSuccess());
    } catch (error) {
      dispatch(updatePasswordFailure(error.message));
    }
  };
};

export const updateUserProfileRequest = () => ({
  type: UPDATE_USER_PROFILE_REQUEST,
});

export const updateUserProfileSuccess = (data) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: data,
});

export const updateUserProfileFailure = (error) => ({
  type: UPDATE_USER_PROFILE_FAILURE,
  payload: error,
});

// Acción para modificar cualquier dato del perfil de usuario
export const updateUserProfileData = (idKey, updatedFields) => async (dispatch) => {
  dispatch(updateUserProfileRequest());

  try {
    
    const response = await axios.put(`http://localhost:3003/users/perfil/${idKey}`, updatedFields);

   
    dispatch(updateUserProfileSuccess(response.data));
  } catch (error) {
    
    console.error('Error al actualizar datos de usuario:', error);
    dispatch(updateUserProfileFailure(error.response?.data || 'Error en el servidor'));
  }
};


export const updateProfilePictureRequest = () => ({
  type: UPDATE_PROFILE_PICTURE_REQUEST,
});

export const updateProfilePictureSuccess = (data) => ({
  type: UPDATE_PROFILE_PICTURE_SUCCESS,
  payload: data,
});

export const updateProfilePictureFailure = (error) => ({
  type: UPDATE_PROFILE_PICTURE_FAILURE,
  payload: error,
});


// action para modificar la foto de perfil
export const updateProfilePicture = (idKey, updatedFields) => async (dispatch) => {
  dispatch(updateUserProfileRequest());

  try {
    
    const response = await axios.put(`http://localhost:3003/users/profile/picture/${idKey}`, updatedFields);

    dispatch(updateUserProfileSuccess(response.data));
  } catch (error) {
    console.error('Error al actualizar datos de usuario:', error);
    dispatch(updateUserProfileFailure(error.response?.data || 'Error en el servidor'));
  }
};




// action para agregar tarjeta
export const updateUserpay = (userId, paymentMethods) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_PAYMONTH_REQUEST });

    try {
      const response = await fetch(`http://localhost:3003/users/${userId}/paymentMethods`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentMethods), // Envía solo los datos de la tarjeta, no un objeto anidado
      });

      if (!response.ok) {
        throw new Error('Error al actualizar paymentMethods');
      }

      const updatedProfile = await response.json();

      dispatch({
        type: UPDATE_USER_PAYMONTH_SUCCESS,
        payload: updatedProfile,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PAYMONTH_FAILURE,
        payload: error.message || 'Error al actualizar el perfil del usuario',
      });
    }
  };
};



//action para modificar usuarios desde admin

const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());

    try {
      const response = await axios.get('http://localhost:3003/users/'); // Assuming your endpoint is '/users'
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      console.error('Error fetching users:', error);
      dispatch(fetchUsersFailure('Error fetching users'));
    }
  };
};


//action para eliminar usuarios
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3003/users/delete/${userId}`);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: userId,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.message || "Failed to delete user",
    });
  }
};

//action para modificar los datos del usuario desde admin
const updateUserAdminRequest = () => ({
  type: UPDATE_USER_ADMIN_REQUEST,
});

const updateUserAdminSuccess = (user) => ({
  type: UPDATE_USER_ADMIN_SUCCESS,
  payload: user,
});

const updateUserAdminFailure = (error) => ({
  type: UPDATE_USER_ADMIN_FAILURE,
  payload: error,
});

export const updateUserAdmin = (userId, userData) => async (dispatch) => {
  dispatch(updateUserAdminRequest());

  try {
    const response = await axios.put(`http://localhost:3003/users/eddituseradmin/${userId}`, userData);
    dispatch(updateUserAdminSuccess(response.data));  // Puedes ajustar esto según la estructura de tu respuesta
  } catch (error) {
    console.error('Error updating user by admin:', error);
    dispatch(updateUserAdminFailure('Error updating user by admin'));
  }
};


  export const deleteReviewAction = (reviewId) => async (dispatch) => {
    try {
      // Realizar la petición para eliminar la revisión
      await axios.delete(`http://localhost:3003/reviews/${reviewId}`);
  
      // Dispatch de la acción de éxito
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId });
    } catch (error) {
      // Dispatch de la acción de error
      dispatch({ type: DELETE_REVIEW_ERROR, payload: error });
    }
  };

  export const addPaymentMethod = (paymentInfo) => {
    return async (dispatch) => {
      dispatch({ type: ADD_PAYMENT_METHOD_REQUEST });
      try {
        const response = await axios.post('http://localhost:3003/users/addPayment', paymentInfo);
        dispatch({
          type: ADD_PAYMENT_METHOD_SUCCESS,
          payload: response.data 
        });
      } catch (error) {
        dispatch({
          type: ADD_PAYMENT_METHOD_FAILURE,
          payload: error.response.data 
        });
      }
    };
  };