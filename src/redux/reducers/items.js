import axios from "axios";

const GET_ITEMS = 'GET_ITEMS';
const ADD_CART = 'ADD_CART';
const DELETE_CART = 'DELETE_CART';
const ADD_ORDER = 'ADD_ORDER';
const RESET_CART = 'RESET_CART';
const GET_PRODUCT = 'GET_PRODUCT';

const initState = {
    items: [],
    cart: [],
    order: [],
    product: {}

};


export default (state = initState, action) => {
    switch (action.type) {
        case GET_ITEMS: {
            return {
                ...state,
                items: action.arr
            }
        }
        case ADD_CART: {
            let idx = state.cart.findIndex((item) => {
                return item.offerId === action.product.offerId

            });
            if (idx > -1) {
                state.cart[idx].count++;
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.product]
                }
            }

        }
        case DELETE_CART: {
            let idx = state.cart.findIndex((item) => {
                return item.offerId === action.cart.offerId
            });
            if (action.cart.count > 1) {
                state.cart[idx].count--;
                return {
                    ...state,
                    cart: [...state.cart]
                }
            } else {
                return {
                    ...state,
                    cart: state.cart.filter((item) => {
                        return item.offerId !== action.cart.offerId
                    })
                }
            }
        }
        case ADD_ORDER : {
            return {
                ...state,
                order: [...state.order, {
                    orderNumber: `Заказ № ${Math.floor(Math.random() * 1000)}`,
                    order: action.arr
                }]
            }
        }
        case RESET_CART : {
            return {
                ...state,
                cart: action.cart
            }
        }
        case GET_PRODUCT:{
            return {
                ...state,
                product: action.product
            }
        }

        default:
            return state
    }

}

export const getItems = () => {
    return (dispatch) => {
        axios('https://fortniteapi.io/v2/shop?lang=en', {
            headers: {
                Authorization: '18e49612-8beeaeac-5902fe53-21bda48a'
            }
        }).then(({data}) => {
            dispatch({type: GET_ITEMS, arr: data.shop})
        })
    }
};

export const addCart = (obj) => {
    return (dispatch) => {
        dispatch({type: ADD_CART, product: {...obj, count: 1}})

    }
};

export const deleteCart = (obj) => {
    return (dispatch) => {
        dispatch({type: DELETE_CART, cart: obj})
    }
};

export const addOrder = (arr) => {
    return (dispatch) => {
        dispatch({type: ADD_ORDER, arr})
    }
};
export const resetCart = () => {
    return (dispatch) => {
        dispatch({type: RESET_CART, cart: []})
    }
};

export const getProduct = (idx) => {
    return (dispatch) => {
        axios('https://fortniteapi.io/v2/shop?lang=en', {
            headers: {
                Authorization: '18e49612-8beeaeac-5902fe53-21bda48a'
            }
        }).then(({data}) => {
            dispatch({
                type: GET_PRODUCT, product: data.shop[idx]
            })
        });

    }
};