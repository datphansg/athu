import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView,FlatList } from "react-native";
import Icon  from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
class CategoryListScreen extends Component { 
  constructor(props) {
    super(props);
    this.state={        
        products :[]
    }
  }  
  componentDidMount() {
    let array = [];
    const subscriber = firestore()
    .collection('Category')
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
  onPress()
  {     
    this.props.navigation.navigate('addingcategory');
  }
  renderOrder = ({item}) => (
    <TouchableOpacity   onPress={()=>this.onPress(item.id)}>
      <View style={styles.item}>
         <Text style={{fontWeight:"bold"}}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  render() {
      return (
           <View style={styles.container}>
               <TouchableOpacity   onPress={()=>this.onPress()}>
                  <View style={styles.item}>
                      <Text style={{fontWeight:"bold"}}>THEM DANH MUC</Text>
                  </View>
                </TouchableOpacity>
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
export default CategoryListScreen