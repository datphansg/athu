import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView,FlatList } from "react-native";
import Icon  from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
class ProductsListScreen extends Component { 
  constructor(props) {
    super(props);
    this.state={        
        products :[]
    }
  }  
  componentDidMount() {
    let array = [];
    const subscriber = firestore()
    .collection('Products')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          let obj = doc.data();
          obj ={...obj,'id':doc.id};  
          array.push(obj);            
      });
      console.log(array);
      this.setState({ products: array });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      //this.setState({ products: array });
    });
  }
  onPress(id)
  {  
    console.log(id);
    this.props.navigation.navigate('addingproduct');
  }
  renderOrder = ({item}) => (
    <TouchableOpacity   onPress={()=>this.onPress(item.id)}>
      <View style={styles.item}>
        <Image source={{uri:item.photo}}  style={{width:90, height:90,borderRadius:30}} />
        <View style={{alignItems:"flex-start",flex:1, padding:10}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
          <Text>{item.code}</Text>
          <Text>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  render() {
      return (
           <View style={styles.container}>
              <FlatList
                style={{width:'100%'}}
                data={this.state.products}
                ref={(ref) => { this.flatListRef = ref; }}
                keyExtractor={item => item.id.toString()}
                renderItem={this.renderOrder}
               /> 
           </View>
        );
    }
}
export default ProductsListScreen