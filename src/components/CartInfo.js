import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon  from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
class CartInfo extends React.Component {   
   render()
  {
     return (
     <View style={{height:55,width:'100%'}}>
          <Text> Quantity {this.props.totalQuantity}</Text>
      </View>
    );
  }
 
}
//export default ShopScreen
const mapStateToProps = (state) => ({
    totalQuantity: state.cart.totalQuantity
})

export default connect(mapStateToProps)(CartInfo);