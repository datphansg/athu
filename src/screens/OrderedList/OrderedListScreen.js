import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView,FlatList } from "react-native";
import Icon  from 'react-native-vector-icons/Ionicons';
import productService from '../../services/product'
import styles from './styles';
class OrderedListScreen extends Component { 
   constructor(props) {
    super(props);
    this.state = {
            Carts:[]
        }    
  }  
  async componentDidMount() {
    var saleOrders = await productService.getSalesOrders();
    console.log(saleOrders);
    this.setState({Carts:saleOrders});
  }
  onPress(id)
  {  
     this.props.navigation.navigate('order');
  }
  
  renderOrder = ({item}) => (
    <TouchableOpacity   onPress={()=>this.onPress(item.id)}>
       <View style={styles.item}>
          <View style={{alignItems:"flex-start",flex:2}}>
                <Text style={{fontWeight:"bold",fontSize:16}}>{item.OrderNumber} </Text>
                 <Text>{item.OrderDate}</Text>
                <Text>{item.ShiptoAddress}</Text>
            </View>
            <View style={{alignItems:"flex-end",flex:1, }}>
                 <Text>{item.TotalAmount}</Text>
            </View> 
       </View>
    </TouchableOpacity>
  );
  render() {
      return (
           <View style={styles.container}>
              <FlatList
                style={{width:'100%'}}
                data={this.state.Carts}
                ref={(ref) => { this.flatListRef = ref; }}
                keyExtractor={item => item.id.toString()}
                renderItem={this.renderOrder}
               /> 
           </View>
        );
    }
}
export default OrderedListScreen