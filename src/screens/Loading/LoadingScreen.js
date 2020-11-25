import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView,FlatList } from "react-native";
import Icon  from 'react-native-vector-icons/Ionicons';
class LoadingScreen extends Component { 
  render() {
      const { cartItems, navigation, cartTotal } = this.props;
      return (
           <View style={styles.container}>
               <Text  style = {{ marginLeft:20}}>Danh mục sản phẩm</Text>
           </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item:{
    padding : 5,
    height : 32,
    backgroundColor:'white',
    flexDirection: "row",
  }
});


export default LoadingScreen