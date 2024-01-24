import {
  FETCH_PRODUCT_DETAIL_FAILURE,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  SET_SELECTED_SNEAKER_INDEX,
  CLEAR_CREATE_PRODUCT_STATE,
  GET_ALL_SNEAKERS_SUCCESS,
  UPDATE_SELECTED_SNEAKER,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  POST_PRODUCT_REQUEST,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAILURE,
  CLEAR_PRODUCT_DETAIL,
  GET_SEARCH_NOTFOUND,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
  RESET_CURRENTPAGE,
  GET_ALLL_SNEAKERS,
  GET_ALL_SNEAKERS,
  SEARCH_SUCCESS,
  SEARCH_REQUEST,
  SEARCH_FAILURE,
  BRAND_VALUE,
  COLOR_VALUE,
  ORDER_PRICE,
  SET_REVIEWS,
  SIZE_VALUE,
  SET_ADMIN,
  REVIEW_POSTED_FAILURE,
  REVIEW_POSTED_SUCCESS,
  REVIEW_POST_REQUEST
} from "../action-types/action-types";

const initialState = {
 loading: false,
 product: {
   detail: null,
   createdProduct: null,
   loading: false,
   error: null,
 },
 reviews: [],
 postingReview: false,
 postReviewError: null,
 postReviewSuccess: false,
 error: null,
 searchResults: [],
 sneakers: [],
 allCopySneakers:[],
 currentPage:[],
 totalSneakers:[],
 brandValue : [],
 colorValue :[],
 sizeValue:[],
 orderPrice:[],
 searchLoading: false,
 searchError: null,
 searchData: null,
 isAdmin:false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case POST_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null,
      };

    case POST_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        product: null,
        error: action.payload,
      };

    case GET_ALL_SNEAKERS:
      return {
        ...state,
        sneakers: action.payload.sneakers,
        allCopySneakers: action.payload.sneakers,
        currentPage: action.payload.currentPage,
        totalSneaker: action.payload.totalSneaker,
      };

    case GET_ALLL_SNEAKERS:
      return {
        ...state,
        sneakers: action.payload, // Actualiza solo la lista de zapatillas
      };

    case FETCH_PRODUCT_DETAIL_SUCCESS:
      console.log("Detalle del producto:", action.payload);
      return {
        ...state,
        product: {
          ...state.product,
          detail: action.payload,
        },
        error: null,
      };

    case FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        product: {
          ...state.product,
          detail: null,
        },
        error: action.payload,
      };

    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        product: {
          ...state.product,
          detail: null,
        },
      };

    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        createdProduct: action.payload,
        error: null,
      };

    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        createdProduct: null,
        error: action.payload,
      };

    case CLEAR_CREATE_PRODUCT_STATE:
      return { ...initialState };

    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        sneakers: action.payload.sneakers,
        totalSneaker: action.payload.totalSneaker,
        loading: false,
        error: null,
      };

    case GET_SEARCH_NOTFOUND:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };

    case RESET_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case BRAND_VALUE:
      return {
        ...state,
        brandValue: action.payload,
      };

    case COLOR_VALUE:
      return {
        ...state,
        colorValue: action.payload,
      };

    case SIZE_VALUE:
      return {
        ...state,
        sizeValue: action.payload,
      };

    case ORDER_PRICE:
      return {
        ...state,
        orderPrice: action.payload,
      };

    case 'RESET_SEARCH':
      return {
        ...state,
        sneakers: state.allCopySneakers,
        currentPage: 1,
      };

    case GET_ALL_SNEAKERS_SUCCESS:
      return {
        ...state,
        allSneakers: action.payload,
      };

    case UPDATE_SELECTED_SNEAKER:
      return {
        ...state,
        selectedSneaker: action.payload,
      };

    case SET_SELECTED_SNEAKER_INDEX:
      return {
        ...state,
        selectedSneakerIndex: action.payload,
      };

    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        error: null,
      };

case SEARCH_FAILURE:
 return {
   ...state,
   loading: false,
   searchResults: [],
   error: action.payload,
 };
 case SET_ADMIN:
 return {
    ...state,
    isAdmin: action.payload,
 };

 case SET_REVIEWS:
  return {
    ...state,
    reviews: action.payload,
  };

  case REVIEW_POST_REQUEST:
    return {
      ...state,
      postingReview: true,
      postReviewError: null,
      postReviewSuccess: false,
    };
  case REVIEW_POSTED_SUCCESS:
    return {
      ...state,
      reviews: [...state.reviews, action.payload],
      postingReview: false,
      postReviewSuccess: true,
    };
  case REVIEW_POSTED_FAILURE:
    return {
      ...state,
      postingReview: false,
      postReviewError: action.payload,
      postReviewSuccess: false,
    };

  default:
  return state;
  }
};

export default productReducer;