import {  SET_PRODUCTS,ADD_TO_CART, REMOVE_FROM_CART,ADD_QUANTITY,SUB_QUANTITY, EMPTY_CART, SUB_ORDER,SET_SHIPTO_ADDRESS } from './types';
import productService from '../../services/product'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import geohash from "ngeohash";

export  const  getProducts  =  () =>{
    return async dispatch => {
        let array = await productService.getProducts();
        dispatch({
            type: SET_PRODUCTS,
            payload: array
        })
    }
} 

export const getProductsWithCategoryId  =  (id) =>{
    return async dispatch => {
        let array = await productService.getProductsWithCategoryId(id);
        dispatch({
            type: SET_PRODUCTS,
            payload: array
        })
    }
} 
export const addToCart = (item) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: item
    })
}
export const removeItem = (item) => dispatch => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: item
    })
}
export const addQuantity = (item) => dispatch => {
    dispatch({
        type: ADD_QUANTITY,
        payload: item
    })
}
export const subQuantity = (item) => dispatch => {
    dispatch({
        type: SUB_QUANTITY,
        payload: item
    })
}
export const emptyCart = () => dispatch => {
    dispatch({
        type: EMPTY_CART
    })
}
export const submitOrder = (sale) => dispatch => {
    dispatch({
        type: SUB_ORDER 
    })
}

export const setAddress = (address) =>  dispatch => {  
    dispatch({
        type: SET_SHIPTO_ADDRESS,
        payload: address
    })
}