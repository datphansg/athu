import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView,FlatList } from "react-native";
import Icon  from 'react-native-vector-icons/Ionicons';
import { Product, Button } from '../../components/';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import styles from './styles';
import { submitOrder, subQuantity, addQuantity, emptyCart } from '../../redux/actions/cartActions';
import InputSpinner from "react-native-input-spinner";
class CartScreen extends Component { 
  onSubmitOrder()
  {
    this.props.submitOrder();
    this.props.emptyCart();
    this.props.navigation.navigate('orders');
  }
  onDecrease(item)
  {   
    this.props.subQuantity(item);
  }
  onIncrease(item)
  {
     this.props.addQuantity(item);
  }
  renderItem = ({item}) => (
     <View style={styles.item}>
        <Image source={{uri:item.photo}}  style={{width:75, height:75}} />
        <View style={{alignItems:"flex-start",flex:1, paddingRight:5, flexDirection:"row",}}>
          <View style={{alignItems:"flex-start",flex:2, padding:5}}>
              <Text>{item.name}</Text>
          </View>
          <View style={{alignItems:"flex-end",flex:1, }}>
               <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}  renderText={value => <Text style={{margin:10, fontWeight:'bold'}}>{value}</Text>}  />
                <InputSpinner
                  style={{marginTop:15}}
                  max={10}
                  min={0}
                  step={1}
                  height={35}
                  width={120}
                  fontSize={14}
                  buttonFontSize={14}
                  value={item.quantity}
                  onDecrease ={()=>this.onDecrease(item)}
                  onIncrease ={()=>this.onIncrease(item)}
                />
          </View>
        </View>
      </View>
  );
  render() {
      return (
           <View style={styles.container}>
              <View style={{width:'95%',backgroundColor:"#FFF", padding:10, marginTop:15, borderRadius:5}}>
                <Text style={{textAlign: 'left', fontSize:11}}>Địa điểm giao hàng</Text>
                <Text style={{textAlign: 'left', fontWeight:"bold"}}>{this.props.address}</Text>
              </View>
              <View style={{width:'95%',backgroundColor:"#FFF", padding:10, marginTop:15, borderRadius:5}}>
                <Text style={{textAlign: 'left', fontWeight:"bold"}}>Đơn hàng của bạn</Text>
              </View>
              <FlatList
                style={{width:'100%'}}
                data={this.props.carts}
                ref={(ref) => { this.flatListRef = ref; }}
                renderItem={this.renderItem}
               /> 
               <View style={[styles.cartButton]}>
                    <View style={[styles.cAmount]}>
                      <NumberFormat value={this.props.totalAmount} displayType={'text'} thousandSeparator={true}  renderText={value => <Text style={{margin:10, fontWeight:'bold'}}>{value}</Text>}  />
                    </View>                   
                    <Button onPress={()=>this.onSubmitOrder()}  style={styles.vButton}> Đặt hàng</Button> 
                 </View>
           </View>
        );
    }
}

const mapStateToProps = (state) => ({
    carts: state.cart.orderDetails,
    totalQuantity : state.cart.totalQuantity,
    totalAmount: state.cart.totalAmount,
    address: state.cart.address
})

export default connect(mapStateToProps, { submitOrder, subQuantity, addQuantity, emptyCart  })(CartScreen);