import { SET_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART,ADD_QUANTITY,SUB_QUANTITY, EMPTY_CART, SUB_ORDER, SET_SHIPTO_ADDRESS } from '../actions/types';
import productService from '../../services/product'
const initialState = {
    customer:'',
    address :'139 Pastuer',
    phone:'',
    note:'',
    totalAmount: 0,
    totalQuantity: 0,
    orderDetails:[],
    products:[],
}
export default  function(state=initialState, action) {
    switch(action.type){
        case SET_PRODUCTS:
          return {
            ...state,               
            products: action.payload
          };
        case ADD_TO_CART: 
            let prods = state.products.filter(item => item.id !== action.payload.id);
            let product = {...action.payload,'quantity':1};   
            prods =[...prods,product];           
            prods = prods.sort(function(obj1, obj2) {
                     return obj1.idex - obj2.idex;
                    });
            let orders = [...state.orderDetails, product];
            let qty = state.totalQuantity  + 1;          
            let totalAmount = state.totalAmount + parseFloat(action.payload.price);
            return {
                ...state,
                products: prods,
                orderDetails: orders,
                totalQuantity: qty,
                totalAmount : totalAmount
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                customer:'',
                address :'',
                phone:'',
                note:'',
                totalAmount: 0,
                totalQuantity: 0,
                orderDetails:[],
            };
        case ADD_QUANTITY:
            let updateItems =  state.orderDetails.filter(data => data.id == action.payload.id);
            if(updateItems.length > 0)
            {
                let item = updateItems[0];
                let qty = item.quantity + 1;
                let amount = state.totalAmount + parseFloat(item.price); 
                item = {... updateItems[0], 'quantity':qty};
                orders = state.orderDetails.filter(item => item.id !== action.payload.id);
                orders = [...orders, item];
                prods = state.products.filter(item => item.id !== action.payload.id);
                prods = [...prods, item];
                prods = prods.sort(function(obj1, obj2) {
                      return obj1.idex - obj2.idex;
                    });
                return {...state, orderDetails: orders, products: prods, totalQuantity: state.totalQuantity  + qty, totalAmount: amount}; 
            }           
            return state;
        case SUB_QUANTITY:
           updateItems =  state.orderDetails.filter(data => data.id == action.payload.id);
            if(updateItems.length > 0)
            {
                let item = updateItems[0];
                let qty = item.quantity - 1;
                let amount = state.totalAmount - parseFloat(item.price); 
                let totalQty = state.totalQuantity - 1; 
                if(qty > 0 )
                {
                    item = {... updateItems[0], 'quantity':qty};
                    orders = state.orderDetails.filter(item => item.id !== action.payload.id);
                    orders = [...orders, item];
                    prods = state.products.filter(item => item.id !== action.payload.id);
                    prods = [...prods, item];
                    prods = prods.sort(function(obj1, obj2) {
                     return obj1.idex - obj2.idex;
                    });
                    return {...state, orderDetails: orders, products: prods, totalAmount: amount, totalQuantity: totalQty}; 
                }
                else
                {
                    item = {... updateItems[0], 'quantity': qty};
                    orders = state.orderDetails.filter(item => item.id !== action.payload.id);
                    prods = state.products.filter(item => item.id !== action.payload.id);
                    prods = [...prods, item];
                    prods = prods.sort(function(obj1, obj2) {
                      return obj1.id - obj2.id;
                    });
                    return {...state, orderDetails: orders, products: prods, totalAmount: amount, totalQuantity: totalQty}; 
                }                
            }           
            return state;
        case EMPTY_CART:
           return {
                ...state,
                customer:'',
                address :'',
                phone:'',
                note:'',
                totalAmount: 0,
                totalQuantity: 0,
                orderDetails:[],
            };
        case SUB_ORDER:
            productService.submitSaleOrder(state);
            return state;      
        case SET_SHIPTO_ADDRESS:
             return {...state, address: action.payload};
           
        default:
            return state
    }
}